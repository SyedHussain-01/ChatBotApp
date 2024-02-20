import React from "react";
import {
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ChatLayout = ({
  children,
  prompt,
  generatePromtResponse,
  setPrompt,
  loading = false,
  setUserSpace = () => {},
  promptInput = true,
  backIcon = false
}) => {
  return (
    <View style={{ flex: 1 }}>
      {
        backIcon
        ?
        <Icon
          name="keyboard-backspace"
          size={24}
          color={"white"}
          style={{ position: "absolute", zIndex: 1, top: 40, left: 10 }}
          onPress={() => {
            setUserSpace(true);
          }}
        />
        :
        null
      }
      <ImageBackground
        source={require("./../../assets/chatbot.jpg")}
        style={{ height: "100%" }}
      />
      {children}
      {promptInput ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 8,
            padding: 8,
            marginHorizontal: 20,
            bottom: 100,
            zIndex: 1,
          }}
        >
          <TextInput
            placeholder={"Enter Prompt"}
            onChangeText={(value) => setPrompt(value)}
            value={prompt}
            style={{
              flex: 1,
              paddingRight: 40,
              borderRadius: 100,
              color: "#172554",
              paddingHorizontal: 20,
              paddingVertical: 10,
              width: "78%",
              backgroundColor: "rgb(220,220, 220)",
              marginVertical: 10,
              zIndex: 1,
            }}
          />
          <TouchableOpacity
            onPress={() => generatePromtResponse(prompt)}
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Icon name="send" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default ChatLayout;
