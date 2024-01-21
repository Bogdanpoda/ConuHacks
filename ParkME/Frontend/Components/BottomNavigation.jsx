import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../Pages/HomePage";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { green } from "@mui/material/colors";
import React, { useState, useEffect } from "react";


const Tab = createBottomTabNavigator();

const AddTabButton = (children, onPress) => {
  <TouchableOpacity onPress={onPress} style={styles.addBtn}>
    <View style={styles.addBtnView}>{children}</View>
  </TouchableOpacity>;
};

export default function BottomNavigation({ route, navigation }) {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    // Update the screen params dynamically whenever trigger changes

  }, [trigger]);

  const handleButtonPress = () => {
    // Toggle the trigger state
    setTrigger(!trigger);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: [
          {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#bca7c4",
            borderRadius: 15,
            height: 90,
            ...styles.shadow,
            alignItems: "center",
            justifyContent: "center", // Add this line
          },
          null,
        ],
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="addPet"
        //component={() => <HomePage trigger={trigger} />}
        //initialParams={{ triggerState: trigger }}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                console.log("Button pressed");
                handleButtonPress();
              }}
            >
              <View style={styles.addBtnView}>
                <Ionicons
                  name="camera-outline"
                  size={50}
                  color="white"
                  style={{}}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      >
        {() => <HomePage trigger={trigger} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#75f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
  addBtn: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#75f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  addBtnView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#8d58a1",
    justifyContent: "center",
    alignItems: "center",
  },
});
