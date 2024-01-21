import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Pressable, Alert, Text } from "react-native";

export default function SummaryPage({ navigation, route }) {
  const { summary } = route.params;

  if (summary.canPark) {
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

          <Pressable style={styles.summaryBtn}>
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

        <View>
          <Text style={styles.summaryText}>License Plate: {summary.plate}</Text>
        </View>
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
    gap: 20,
    width: "80%",
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryIcon: {
    top: -40,
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
});
