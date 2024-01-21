import React, { useState } from "react";
import { Button, Image, View, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUploader = () => {
  const [imageUri, setImageUri] = useState(null);

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
      Alert.alert("Image uploaded!", responseJson.message);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Upload failed",
        "An error occurred while uploading the image"
      );
    }
  };

  const chooseImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      for (const key in result.assets) {
        console.log(result.assets[key].uri);
        uploadImage(result.assets[key].uri);
      }
    } else {
      Alert.alert("Image upload cancelled");
    }
  };

  return (
    <View>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Choose Image" onPress={chooseImage} />
    </View>
  );
};

export default ImageUploader;
