import React, {Component} from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import {
  View,
  Text,
  Button,
  Content,
  Form,
  Item,
  Input,
  Thumbnail, Container,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { loginSuccess, getUserInfo } from '../Login/Action';
import {get, set, clear } from '../../Lib/storage';
import {NavigationActions} from 'react-navigation';
import firebase from '../../Lib/firebase';
import {get, set} from '../../Lib/storage';

export default class SplashView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    get('INTRO')
      .then(savedInfo => {
        if(savedInfo){
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
        }else {
          this.navigateTo('Intro');
        }
      })
      .catch(error => {
        console.log('[SplashView.js] check user error', error);
      })
    //clear();
    setTimeout(() => {
      get('USER_INFO')
        .then(response => {
          console.log('[SplashView.js] check user', response);
          if (response) {
            this.props.navigation.dispatch(loginSuccess(JSON.parse(response)));
            this.navigateTo('Main');
          } else {
            this.navigateTo('Login');
          }
        })
        .catch(error => {
          console.log('[SplashView.js] check user error', error);
        })
    }, 1200);
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
        <Text style={styles.title}>Guru</Text>
        <Thumbnail
          style={styles.logo}
          source={require('../../Assets/Images/logo.png')}
          />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: Dimensions.get('window').height / 2,
    width: Dimensions.get('window').width - 32,
  },
  title: {
    fontSize: 80,
    fontFamily: 'HaydonBrush',
    color: '#FF7456',
    fontWeight: 'bold',
  }
};
