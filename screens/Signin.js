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
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const signin = async (email, password) => {
    setLoading(true);
    try {
      const auth = FIREBASE_AUTH;
      const ss = await signInWithEmailAndPassword(auth, email, password);
      if (ss) {
        setLoading(false);
        setPass("");
        setEmail("");
        navigation.navigate("TabNavigation");
      }
    } catch (error) {
      const { code, message } = error;
      console.log(code, message);
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
            Login
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
              Login to your account
            </Text>
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
            ></TextInput>
            <View
              style={{
                alignItems: "flex-end",
                width: "78%",
                paddingRight: 16,
                marginBottom: 200,
              }}
            >
              <Text
                style={{ color: "#172554", fontWeight: "bold", fontSize: 16 }}
              >
                Forgot Password ?
              </Text>
            </View>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                onPress={() => signin(email, pass)}
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
                  Login
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
                Don't have an account ?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={{ color: "#172554", fontWeight: "bold", fontSize: 16 }}
                >
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Signin;
