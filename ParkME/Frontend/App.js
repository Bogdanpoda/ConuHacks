import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TopTimer from './Components/TopTimer';
import MyCamera from './components/camera';

export default function App() {
  return (
    <View style={styles.container}>
      <TopTimer/>
      <MyCamera />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
