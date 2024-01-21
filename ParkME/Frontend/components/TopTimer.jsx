import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TopTimer({ timer, setTimer, triggerState }) {
  const [appear, setAppear] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isDelete, setIsDelete] = useState(false);

function toggleAppear() {
    setAppear((current) => !current);
    

    setHour(0);
    setMinute(0);
    setSecond(0);
    setTimeRemaining(0);
    setTimer(0);
}
  useEffect(() => {
    const hours = Math.floor(timer / 60);
    const remainingMinutes = timer % 60;
    const minutes = Math.floor(remainingMinutes);
    const seconds = Math.round((remainingMinutes - minutes) * 60);

    setHour(hours);
    setMinute(minutes);
    setSecond(seconds);
    setTimeRemaining(timer * 60);
    if(timer >1 && triggerState){
        setAppear(true)
        setIsDelete(true)
    }
    
  }, [timer]);

  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;

        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  if (!appear) {
    return (
      <View style={styles.topbarContainer}>
        <View style={styles.timerContainer}>
          <View styles={styles.timer}>
            <Text style={styles.timerText}>Check your parking! </Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.topbarContainer}>
      <View style={styles.timerContainer}>
        <View styles={styles.timer}>
          <Text style={styles.timerText}>
            Time left: {hour}:{minute}:{second}
          </Text>
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