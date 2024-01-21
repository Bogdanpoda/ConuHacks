// NotificationScreen.jsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const NotificationScreen = () => {
  const notifications = [
    {
      id: "1",
      title: "Notification 1",
      message: "This is the first notification.",
    },
    {
      id: "2",
      title: "Notification 2",
      message: "This is the second notification.",
    },
    // Add more notifications here
  ];

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  title: {
    fontWeight: "bold",
  },
});

export default NotificationScreen;
