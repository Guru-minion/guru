import React, {Component} from 'react';
import {View, StyleSheet, Image, Dimensions, Text} from 'react-native';
import {
  Button,
  Content,
  Form,
  Item,
  Input,
  Thumbnail, Container,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import firebase from '../../Lib/firebase';
import {get, set, clear} from '../../Lib/storage';

export default class SplashView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const {navigation} = this.props;
    //clear();
    get('USER_INFO')
      .then(response => {
        console.log('[SplashView.js] check user', response);
        if (response) {
          this.navigateTo('Main');
        } else {
          this.navigateTo('Login');
        }
      })
      .catch(error => {
        console.log('[SplashView.js] check user error', error);
      })
  };

  navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });
    this.props.navigation.dispatch(actionToDispatch)
  };


  render() {
    return (
      <View style={styles.container}>
        <Text>splash screen</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  formSignIn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    marginTop: 20,
    height: 30,
  },
};
