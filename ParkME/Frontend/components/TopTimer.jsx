import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TopTimer() {
  const [appear, setAppear] = useState(false);

  function toggleAppear() {
    setAppear((current) => !current);
  }

  if (!appear) {
    return (
      <View style={styles.topbarContainer}>
        <View style={styles.timerContainer}>
          <View styles={styles.timer}>
            <Text style={styles.timerText}>Check your parking! </Text>
          </View>
        </View>
        <View style={styles.endButtonContainer}>
          <Pressable
            onPress={toggleAppear}
            style={({ pressed }) => [
              { backgroundColor: pressed ? "#bbb" : "#ddd" },
              styles.endButton,
            ]}
          >
            <Ionicons name="trash" style={styles.endButtonIcon} />
          </Pressable>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.topbarContainer}>
      <View style={styles.timerContainer}>
        <View styles={styles.timer}>
          <Text style={styles.timerText}>Time left: 00:00:00</Text>
        </View>
      </View>
      <View style={styles.endButtonContainer}>
        <Pressable
          onPress={toggleAppear}
          style={({ pressed }) => [
            { backgroundColor: pressed ? "#bbb" : "#ddd" },
            styles.endButton,
          ]}
        >
          <Ionicons name="trash" style={styles.endButtonIcon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topbarContainer: {
    backgroundColor: "#bca7c4",
    height: 70,
    width: "90%",
    top: "6%",
    borderRadius: 15,
    shadowColor: "#75f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  timerContainer: {
    marginTop: 22,
    marginLeft: 20,
  },
  timer: {
    height: 60,
    width: 60,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  endButtonContainer: {
    marginTop: 15,
    right: 20,
    position: "absolute",
  },
  endButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
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
  endButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  endButtonIcon: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
