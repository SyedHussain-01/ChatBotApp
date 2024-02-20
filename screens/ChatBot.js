import {
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import OpenAI from "openai";
import ChatLayout from "./Components/ChatLayout";

const ChatBot = () => {
  const openai = new OpenAI({
    apiKey: "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",
  });
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState([]);

  const generatePromtResponse = async (prompt) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: "gpt-3.5-turbo",
      });
      const response = completion.choices[0].message.content;
      setData([
        ...data,
        { type: "user", text: prompt },
        { type: "bot", text: response },
      ]);
      setPrompt("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ChatLayout prompt={prompt} setPrompt={setPrompt} generatePromtResponse={generatePromtResponse}  >
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={{
          borderRadius: 20,
          padding: 10,
          position: "absolute",
          zIndex: 1,
          height: "100%",
          width: "100%",
          marginTop: 50,
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
                ...(item.item.type === "user"
                  ? { alignSelf: "flex-start" }
                  : { alignSelf: "flex-end" }),
              }}
            >
              <Text>{item.item.text}</Text>
            </View>
          </>
        )}
      />
    </ChatLayout>
  );
};

export default ChatBot;
