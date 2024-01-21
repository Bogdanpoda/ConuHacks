import React, { useState } from "react";
import { Button, Image, View, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function ImageUploader({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      for (const key in result.assets) {
        console.log(result.assets[key].uri);
        navigation.navigate("Confirmation", {
          imageUri: result.assets[key].uri,
        });
      }
    }
  };

  return (
    <View>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      <Pressable onPress={chooseImage}>
        <Ionicons name="images-outline" size={30} color={"#fff"} />
      </Pressable>
    </View>
  );
}
