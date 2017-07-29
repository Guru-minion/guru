import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Text,
  H3,
  View,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import AppIntro from 'react-native-app-intro';
import { get, set } from '../../Lib/storage';

export default class IntroView extends Component {


  _nextBtnHandle = () => {

  };

  _doneBtnHandle = () => {
    this._goToMain();
  };

  _onSkipBtnHandle = () => {
    this._goToMain();
  };

  _onSlideChangeHandle = () => {
  };

  _renderStyle = (color) => ({
    ...styles.slide,
    backgroundColor: color,
  });

  _navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });
    this.props.navigation.dispatch(actionToDispatch)
  };

  _goToMain = () => {
    set('INTRO', 'seen')
      .then(() => this._checkUserSession())
      .catch(() => this._checkUserSession());
  };

  _checkUserSession = () => {
    get('USER_INFO')
      .then(response => {
        console.log('[SplashView.js] check user', response);
        if (response) {
          this._navigateTo('Main');
        } else {
          this._navigateTo('Login');
        }
      })
      .catch(error => {
        console.log('[SplashView.js] check user error', error);
        this._navigateTo('Login');
      })
  };

  render() {
    return (
      <AppIntro
        onNextBtnClick={this._nextBtnHandle}
        onDoneBtnClick={this._doneBtnHandle}
        onSkipBtnClick={this._onSkipBtnHandle}
        onSlideChange={this._onSlideChangeHandle}
      >
        <View style={this._renderStyle('#fa931d')}>
          <View level={8}><Text style={styles.text}>Page 1</Text></View>
        </View>
        <View style={this._renderStyle('#a4b602')}>
          <View level={20}><Text style={styles.text}>Page 2</Text></View>
        </View>
        <View style={this._renderStyle('#fa931d')}>
          <View level={-10}><Text style={styles.text}>Page 3</Text></View>
        </View>
        <View style={this._renderStyle('#a4b602')}>
          <View level={15}><Text style={styles.text}>Page 4</Text></View>
        </View>
      </AppIntro>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
};
