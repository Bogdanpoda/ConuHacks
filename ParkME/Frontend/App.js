
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TopTimer from './components/TopTimer';
import MyCamera from './components/CameraComponent';


export default function App() {
  return (
    <View style={styles.container}>

      
   
      <MyCamera  />
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    allignItems: 'center', 
    justifyContent: 'center'
  },
});
