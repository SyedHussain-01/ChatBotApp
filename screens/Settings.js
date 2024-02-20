import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_STORE } from "../firebaseConfig";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const Settings = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(()=>{
    getData();
  },[])

  const getData = async () => {
    try {
      const db = FIREBASE_STORE;
      const auth = FIREBASE_AUTH;
      setLoading(true);
      const dataRef = doc(db, "Users", auth.currentUser.uid);
      const getDataQuery = await getDoc(dataRef);
      if (getDataQuery.exists()) {
        setName(getDataQuery.data().name)
        setContact(getDataQuery.data().contact)
        setLoading(false)
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const update = async () => {
    setLoading(true);
    try {
      const auth = FIREBASE_AUTH;
      const db = FIREBASE_STORE;
      const uid = auth.currentUser.uid;
      const ss = await updateDoc(doc(db, "Users", uid), {
        ...(name != "" ? { name: name } : {}),
        ...(contact != "" ? { contact: contact } : {}),
      });
      setName(name);
      setContact(contact);
      setLoading(false);
    } catch (error) {
      const { code, message } = error;
      console.log(code, message);
      setLoading(false);
      setName("");
      setContact("");
    }
  };

  return (
    <View>
      <ImageBackground
        source={require("./../assets/chatbot.jpg")}
        style={{ height: "100%" }}
      />
      <View style={{ position: "absolute" }}>
        <View style={{ alignItems: "center", width: 400 }}>
          <Text
            style={{
              color: "white",
              fontSize: 44,
              fontWeight: "bold",
              marginTop: 70,
              marginBottom: 10,
            }}
          >
            PROFILE
          </Text>
          <View
            style={{
              backgroundColor: "white",
              height: 800,
              width: 460,
              borderTopLeftRadius: 130,
              paddingTop: 100,
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 40, color: "#172554", fontWeight: "bold" }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Update your information
            </Text>
            <TextInput
              placeholder="Name"
              onChangeText={(value) => setName(value)}
              value={name}
              keyboardType="default"
              style={{
                borderRadius: 100,
                color: "#172554",
                paddingHorizontal: 20,
                paddingVertical: 5,
                width: "78%",
                backgroundColor: "rgb(220,220, 220)",
                marginVertical: 10,
              }}
              placeholderTextColor={"#172554"}
            ></TextInput>
            <TextInput
              placeholder="Contact"
              onChangeText={(value) => setContact(value)}
              value={contact}
              keyboardType="phone-pad"
              style={{
                borderRadius: 100,
                color: "#172554",
                paddingHorizontal: 20,
                paddingVertical: 5,
                width: "78%",
                backgroundColor: "rgb(220,220, 220)",
                marginVertical: 10,
              }}
              placeholderTextColor={"#172554"}
            ></TextInput>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => update()}
                style={{
                  backgroundColor: "#172554",
                  borderRadius: 100,
                  alignItems: "center",
                  width: 350,
                  paddingVertical: 5,
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 25, fontWeight: "bold" }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;
