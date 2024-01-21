// camera.jsx
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect } from "react";
import TopTimer from "./TopTimer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UploadImageApi } from "../api/ApplicationApi";

const timeInfo = {
  timeLeft: 0,
  vignetteNumber: null,
  timeLeftVignette: null,
  arrow: false,
};

export default function CameraComponent({ triggerState }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const [image, setImage] = useState(null);

  const [timer, setTimer] = useState(0);
  const cameraRef = useRef(null);
  const [previous, setPrevious] = useState(false);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo.uri);
        setImage(photo);
      } catch (error) {
        console.error("Error taking photo:", error);
      }
    }
  };

  function toggleFlash() {
    setFlash((current) =>
      current === FlashMode.on ? FlashMode.off : FlashMode.on
    );
  }

  const handleUploadImage = async (imageUrl) => {
    try {
      const res = await UploadImageApi(imageUrl);
      console.log(res.timeLeft);
      setTimer(res.timeLeft);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  (async () => {
    if (previous !== triggerState) {
      console.log("Will take picture");
      await takePicture();
      setPrevious(triggerState);
      await handleUploadImage(image.uri);
    }
  })();

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        flashMode={flash}
        ratio="16:9"
      >
        <TopTimer timer={timer} setTimer={setTimer} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Ionicons
              style={{ color: "white", fontSize: 40 }}
              name="camera-reverse-outline"
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleFlash}>
            <Ionicons
              style={{ color: "white", fontSize: 40 }}
              name={
                flash === FlashMode.on ? "flash-outline" : "flash-off-outline"
              }
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
  camera: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    marginTop: 70,
  },
  button: {
    paddingHorizontal: 35,
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

//export default MyCamera;
