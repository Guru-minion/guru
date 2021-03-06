import React, {Component} from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
  H3,
} from 'native-base';

export default class MainView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <H3>Home screen</H3>
        <Button onPress={() => this.props.navigation.navigate('Barcode')}>
          <Text>Go !</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
};
