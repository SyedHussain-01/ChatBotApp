import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ChatBot, Settings, ChatScreen } from "..";
import TabBar from "../Components/Tabar";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="ChatBotScreen"
        component={ChatBot}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false}}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false}}
      />
    </Tab.Navigator>
  );
}
