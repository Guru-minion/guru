import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
// /Users/mac/Desktop/Others/Coderschool/FinalProject/Guru/node_modules/react-native/Libraries/Renderer/src/renderers/native/ReactNativePropRegistry.js

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
