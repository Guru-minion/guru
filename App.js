import React from 'react';
import {Provider} from 'react-redux';
import {Platform, BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavigatorViewContainer from './src/Navigator/NavigatorViewContainer';
import store from './src/Redux/Store';
import firebase from './src/Lib/firebase';

export default class App extends React.Component {

  state = {fontsAreLoaded: false};

  async componentWillMount() {

    //firebase.initializeData();

    console.disableYellowBox = true;
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'HaydonBrush': require('./src/Assets/fonts/HaydonBrush_PERSONAL_USE.ttf'),
    });
    this.setState({fontsAreLoaded: true});
  }

  componentDidMount = () => {
    this.initBackButton();
  };

  initBackButton = () => {
    if (Platform.OS !== 'android') return;
    BackHandler.addEventListener('hardwareBackPress', this.onBackButton);
  };

  onBackButton = () => {
    const state = store.getState();
    const navigationState = state.nav;   // < the name of your reducer

    if (navigationState && navigationState.index > 1) {
      store.dispatch(NavigationActions.back());
      return true;  // will not exit, just go back
    }
    else {
      return false;   // will exit
    }
  };

  render() {
    if (!this.state.fontsAreLoaded) {
      return null;
    }
    return (
      <Provider store={store}>
        <NavigatorViewContainer />
      </Provider>
    );
  }
}
