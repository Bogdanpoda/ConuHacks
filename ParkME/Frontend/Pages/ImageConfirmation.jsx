import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "@react-native-material/core";
import { isLoading } from "expo-font";
import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from "react-native";

function ImageConfirmation({ route, navigation }) {
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(route.params.timerState);
  const { imageUri, timerState } = route.params;
  console.log("Timer state:", timerState);

  const uploadImage = async (uri) => {
    const data = new FormData();
    data.append("image", {
      name: "uploaded_image.jpg",
      type: "image/jpeg",
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
    });

    try {
      setIsLoading(true);
      let response = await fetch("http://192.168.137.1:3000/upload-image", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      response = await response.json();

      setIsLoading(false);

      if (response.status === 500) {
        Alert.alert("Error uploading image", response.message);
        navigation.popToTop();
        return;
      }

      navigation.replace("SummaryPage", { summary: response.data });
    } catch (error) {
      navigation.pop();
      Alert.alert("Error uploading image", error.message);
    }
  };

  if (isLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#8d58a1" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.btnRow}>
        <Pressable style={styles.confirmBtn} onPress={() => navigation.pop()}>
          <Ionicons name="close-outline" size={40} color="white" />
        </Pressable>
        <Pressable style={styles.confirmBtn}>
          <Ionicons
            name="checkmark"
            size={40}
            color="white"
            onPress={() => uploadImage(imageUri)}
          />
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
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  confirmBtn: {
    width: 70,
    height: 70,
    bottom: 50,
    backgroundColor: "#8d58a1",
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 60,
  },
});

export default ImageConfirmation;
