import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_STORE } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const auth = FIREBASE_AUTH;
      const db = FIREBASE_STORE; 
      const ss = await createUserWithEmailAndPassword(auth, email, password);
      if (ss) {
        await setDoc(doc(db, "Users", ss.user.uid),{
            name,
            contact,
            email
        })
        setLoading(false);
        setName("");
        setContact("");
        setPass("");
        setEmail("");
        navigation.navigate("Signin");
      }
    } catch (error) {
      const { code, message } = error
      console.log(code, message);
      setName("");
      setContact("");
      setPass("");
      setEmail("");
      setLoading(false);
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
            SIGN UP
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
              Welcome
            </Text>
            <Text
              style={{
                color: "grey",
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Register your account
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
            <TextInput
              placeholder="Email / Username"
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
              value={email}
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
              placeholder="Password"
              onChangeText={(value) => setPass(value)}
              value={pass}
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
              secureTextEntry={true}
            ></TextInput>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => signup(email, pass)}
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
                  Signup
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Already have an account ?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
                <Text
                  style={{ color: "#172554", fontWeight: "bold", fontSize: 16 }}
                >
                  Signin
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signup;