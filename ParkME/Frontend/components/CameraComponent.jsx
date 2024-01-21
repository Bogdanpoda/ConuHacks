import { Camera, CameraType, FlashMode } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { useEffect } from "react";
import TopTimer from "./TopTimer";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageUploader from "./ImageUploader";

export default function CameraComponent({ triggerState, navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
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

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        flashMode={flash}
        ratio="16:9"
      >
        <TopTimer />
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
        <View style={styles.navigatorContainer}>
          <View style={styles.navigator}>
            <View>

            <ImageUploader navigation={navigation} />


            </View>
          
            <TouchableOpacity
              style={styles.addBtns}
              onPress={() => {
                console.log("Button pressed");
                takePicture();
              }}
            >
              <View style={styles.addBtnsView}>
                <Ionicons
                  name="camera-outline"
                  size={50}
                  color="white"
                  style={{}}
                />
              </View>
            </TouchableOpacity>


          </View>
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
    zIndex: 200,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  controlsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    transform: [{ rotate: "-90deg" }],
    zIndex: 1,
  },

  navigatorContainer: {
    flex: 1,
    position: "Absolute",
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 15,
    height: 150,
    alignItems: "center",
    justifyContent: "center", // Add this line
    zIndex: 100,
    justifyContent: "flex-end",
  },


  navigator: {
    position: "absolute",
    width: "87%",
    bottom: 25,
    backgroundColor: "#bca7c4",
    borderRadius: 15,
    height: 70,
    justifyContent: "center", // Add this line
    zIndex: 100,
  },
  addBtns: {
    top: -30,

    shadowColor: "#75f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    bottom: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    zIndex: 300,
  },
  addBtnsView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#8d58a1",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 300,
  },
});
