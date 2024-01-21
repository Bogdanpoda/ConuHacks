import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Pressable, Alert, Text } from "react-native";

export default function SummaryPage({ navigation, route }) {
  const { summary } = route.params;

  if (!summary.canPark) {
    return (
      <View style={styles.container}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons name="close-circle" size={100} color="red" />
            <Text style={[styles.summaryTitle, { color: "red" }]}>
              You can not park here!
            </Text>
          </View>

          <View>
            <Text style={styles.summaryText}></Text>
          </View>

          <Pressable style={styles.summaryBtn} onPress={() => navigation.popToTop()}>
            <Text style={styles.summaryBtnText}>
              Be notified when it's available
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryIcon}>
          <Ionicons name="checkmark-circle" size={100} color="green" />
          <Text style={styles.summaryTitle}>You can park here!</Text>
        </View>

        <Text style={styles.summaryText}>
            You can park here!
        </Text>

        <Pressable
          style={styles.summaryBtn}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.summaryBtnText}>
            Be notified when you should move your car
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  summaryCard: {
    flexDirection: "column",
    gap: 10,
    width: "80%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  summaryIcon: {
    top: 0,
    gap: 10,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    width: "100%",
  },
  summaryBtn: {
    width: "80%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bca7c4",
    fontWeight: "bold",
  },
  summaryBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  summaryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    width: "80%",
    textAlign: "center",
  },
});
