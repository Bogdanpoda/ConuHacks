// camera.jsx
import { AutoFocus, Camera, CameraType, FlashMode } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TopTimer from './TopTimer';

const MyCamera = () => {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [flash, setFlash] = useState(FlashMode.off);
    const cameraRef = useRef(null);


    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                console.log('Photo taken:', photo.uri);
            } catch (error) {
                console.error('Error taking photo:', error);
            }
        }
    }

    function toggleFlash() {
        setFlash(current => (current === FlashMode.on ? FlashMode.off : FlashMode.on));

    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef} flashMode={flash} ratio='16:9' autofocus={AutoFocus.on}>
                <TopTimer />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Ionicons style={{ color: 'white', fontSize: 40 }} name="camera-reverse-outline"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={toggleFlash}>
                        <Ionicons style={{ color: 'white', fontSize: 40 }} name={flash === FlashMode.on ? "flash-outline" : "flash-off-outline"}>

                        </Ionicons>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity> */}
                </View>
            </Camera>
        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        marginTop: 70,
    },
    button: {
        paddingHorizontal: 35,
        alignItems: 'center',
        textAlign: 'center',

    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default MyCamera;
