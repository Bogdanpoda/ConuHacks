// camera.jsx
import { Camera, CameraType, FlashMode, AutoFocus } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopTimer from "./TopTimer";
import Ionicons from "@expo/vector-icons/Ionicons";
import ImageUploader from "./ImageUploader";
import Slider from "@react-native-community/slider";

export default function CameraComponent({ route, navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef(null);
  const [zoom, setZoom] = useState(0);

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
        // Navigate to the confirmation screen
        navigation.push("Confirmation", { imageUri: photo.uri });
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

  const handleZoomChange = (value) => {
    setZoom(value);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        flashMode={flash}
        ratio="16:9"
        zoom={zoom}
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

        <View style={styles.controlsContainer}>
          <Slider
            style={{ width: "80%" }}
            minimumValue={0}
            maximumValue={0.03}
            value={zoom}
            onValueChange={handleZoomChange}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>

        <View style={styles.navigator}>
          <ImageUploader navigation={navigation} />
          <Pressable
            style={styles.addBtn}
            onPress={() => {
              console.log("Button pressed");
              takePicture();
            }}
          >
            <View style={styles.addBtnView}>
              <Ionicons
                name="camera-outline"
                size={40}
                color="white"
                style={{}}
              />
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.push("Notifications")}>
            <Ionicons
              name="mail-unread-outline"
              color={"#fff"}
              size={30}
            ></Ionicons>
          </Pressable>
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
  controlsContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
    paddingBottom: "40%",
    transform: [{ rotate: "-90deg" }],
    zIndex: 1,
  },
  navigator: {
    position: "absolute",
    flex: 1,
    width: "80%",
    flexDirection: "row",
    paddingHorizontal: 40,
    bottom: 25,
    elevation: 0,
    backgroundColor: "#bca7c4",
    borderRadius: 15,
    height: 70,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#75f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  addBtn: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#75f5df0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  addBtnView: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#8d58a1",
    justifyContent: "center",
    alignItems: "center",
  },
});

//export default MyCamera;
