import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyCamera from './components/camera';

export default function App() {
  
    return (
      <View style={{ flex: 1 }}>
        {/* Other components or content in your app */}
        <MyCamera />
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
