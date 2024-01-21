import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from "react-native";


function ImageConfirmation({ route, navigation }) {
  const { imageUri } = route.params;

  const uploadImage = async (uri) => {
    const data = new FormData();
    data.append("image", {
      name: "uploaded_image.jpg",
      type: "image/jpeg",
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
    });

    try {
      let response = await fetch("http://0.0.0.0:3000/upload-image", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      navigation.pop();
      Alert.alert("Error uploading image", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {/* Add any other UI elements you want here */}
      <View style={styles.btnRow}>
        <Pressable style={styles.confirmBtn} onPress={() => navigation.pop()}>
          <Ionicons name="close-outline" size={40} color="white" />
        </Pressable>
        <Pressable style={styles.confirmBtn}>
          <Ionicons
            name="checkmark"
            size={40}
            color="white"
            onPress={() => {uploadImage(imageUri), navigation.navigate('SummaryPage')}}
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
    width: "100%",
    height: "80%",
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
