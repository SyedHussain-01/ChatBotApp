import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin, Signup } from "..";
import TabNavigation from "./TabNavigation";

export default function StackNavigation() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='TabNavigation'
        component={TabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
