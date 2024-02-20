import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import {
  addDoc,
  and,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  or,
} from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_STORE } from "../firebaseConfig";
import ChatLayout from "./Components/ChatLayout";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ChatScreen() {
  const [prompt, setPrompt] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userSpace, setUserSpace] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getMessages();
  }, [email]);

  const getUsers = async () => {
    try {
      const db = FIREBASE_STORE;
      const usersRef = collection(db, "Users");
      setLoading(true);
      const getUsersQuery = await query(usersRef);
      onSnapshot(getUsersQuery, (snapshot) => {
        let usersArr = [];
        snapshot.forEach((item) => {
          usersArr.push({ ...item?.data(), id: item?.id });
        });
        setUsers(usersArr);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getMessages = async () => {
    try {
      const db = FIREBASE_STORE;
      const auth = FIREBASE_AUTH;
      const messagessRef = collection(db, "messages");
      setLoading(true);
      setCurrentUser(auth.currentUser.email);
      const getMessageQuery = await query(
        messagessRef,
        or(
          and(
            where("sender_uid", "==", auth.currentUser.email),
            where("reciever_uid", "==", email)
          ),
          and(
            where("reciever_uid", "==", auth.currentUser.email),
            where("sender_uid", "==", email)
          )
        ),
        orderBy("createdAt")
      );
      onSnapshot(getMessageQuery, (snapshot) => {
        let messageArr = [];
        snapshot.forEach((item) => {
          messageArr.push({
            text: item?.data().text,
            id: item?.id,
            sender_uid: item?.data().sender_uid,
          });
        });
        setMessages(messageArr);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const generatePromtResponse = async (prompt) => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_STORE;
    setLoading(true);
    try {
      const ss = await addDoc(collection(db, "messages"), {
        text: prompt,
        sender_uid: auth.currentUser.email,
        reciever_uid: email,
        createdAt: serverTimestamp(),
      });
      if (ss) {
        setPrompt("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setPrompt("");
      setLoading(false);
    }
  };

  return (
    <>
      <ChatLayout
        generatePromtResponse={generatePromtResponse}
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        setUserSpace={setUserSpace}
        backIcon={true}
      >
        {userSpace
          ? !loading && (
              <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  position: "absolute",
                  zIndex: 1,
                  height: "100%",
                  width: "100%",
                  marginTop: 60,
                }}
                renderItem={(item) => (
                  <>
                    <TouchableOpacity
                      style={{
                        width: "90%",
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        borderStyle: "solid",
                        alignSelf: "center",
                        borderWidth: 2,
                        marginVertical: 5,
                        backgroundColor: "white",
                        display: "flex",
                        shadowColor: "grey",
                        shadowOpacity: 8,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setEmail(item?.item?.email);
                        setUserSpace(false);
                      }}
                    >
                      <Text>{item?.item?.name}</Text>
                    </TouchableOpacity>
                  </>
                )}
              />
            )
          : !loading && (
              <FlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  position: "absolute",
                  zIndex: 1,
                  height: "100%",
                  width: "100%",
                  marginTop: 60,
                }}
                renderItem={(item) => (
                  <>
                    <View
                      style={{
                        width: "80%",
                        borderRadius: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 12,
                        borderStyle: "solid",
                        borderWidth: 2,
                        marginVertical: 5,
                        backgroundColor: "white",
                        display: "flex",
                        ...(item?.item?.sender_uid === currentUser
                          ? { alignSelf: "flex-start" }
                          : { alignSelf: "flex-end" }),
                      }}
                    >
                      <Text>{item?.item?.text}</Text>
                    </View>
                  </>
                )}
              />
            )}
      </ChatLayout>
    </>
  );
}

const styles = StyleSheet.create({});
