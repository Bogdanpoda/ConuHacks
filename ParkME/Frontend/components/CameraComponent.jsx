// camera.jsx
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TopTimer from "./TopTimer";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from '@react-native-community/slider';



export default function CameraComponent({ triggerState }) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [flash, setFlash] = useState(FlashMode.off);
    const cameraRef = useRef(null);
    const [previous, setPrevious] = useState(false);
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



    if (previous != triggerState) {
        console.log("will take picture");
        takePicture();
        setPrevious(triggerState);
    }

    const handleZoomChange = (value) => {
        setZoom((value));
    };



    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={type}
                ref={cameraRef}
                flashMode={flash}
                ratio="16:9"
                autoFocus={Camera.Constants.AutoFocus.on}
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
                        style={{ width: '80%' }}
                        minimumValue={0}
                        maximumValue={0.03}
                        value={zoom}
                        onValueChange={handleZoomChange}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                </View>


            </Camera>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,


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
        paddingBottom: '40%',
        transform: [{ rotate: '-90deg' }],
        zIndex: 1,
    },

    

});

// export default MyCamera;
