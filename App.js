import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BadgerBuddies from './src/components/BadgerBuddies'


export default function App() {
  return <View style={styles.container}>
      <BadgerBuddies/>
      <StatusBar style="auto" />
    </View>
  ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
