import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraComponent from "./components/CameraComponent";
import ImageConfirmation from "./Pages/ImageConfirmation";
import NotificationScreen from "./Pages/NotificationPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Camera"
          component={CameraComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ImageConfirmation}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
