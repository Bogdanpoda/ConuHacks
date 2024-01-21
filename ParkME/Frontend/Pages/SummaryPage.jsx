import React from "react";
import { View, StyleSheet, Pressable, Alert, Text } from "react-native";

export default function SummaryPage({ navigation, route }) {
  const { summary } = route.params;
  return (
    <View style={styles.container}>
      <Text style={{ color: "#000" }}>{summary.timeLeft}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
