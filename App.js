import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./screens/Navigation/StackNavigation";

export default function App() {

  return (
    <>
      <NavigationContainer>
        <StackNavigation/>
      </NavigationContainer>
    </>
  );
}
