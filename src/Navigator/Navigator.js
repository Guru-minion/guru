import React from 'react';
import { Icon } from 'native-base';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import Placeholder from '@components/Common/PlaceHolder';
import NormalToolbar from '@components/Common/Toolbar';
//screen
import LoginView from '@container/Login/LoginView';
import MainView from '@container/Main/MainView';
import HomeView from '@container/Main/Home/HomeView';
import FriendsView from '@container/Main/Friends/FriendsView';
import ProfieView from '@container/Main/Profile/ProfileView';
import Review from '@container/Main/Review/Review';
import BarcodeScanner from '@container/Demo/BarcodeScanner';


const MainNavigator = TabNavigator({
  Home: {
    screen: HomeView,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" style={{ color : '#FFF'}}
        />
      )
    }
  },
  Friends: {
    screen: FriendsView,
    navigationOptions: {
      title: 'Friends',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="people" style={{ color : '#FFF'}}
        />
      )
    }
  },
  Add: {
    screen: Review,
    navigationOptions: {
      title: 'Review',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="add" style={{ color : '#FFF'}}
        />
      )
    }
  },
  Profile: {
    screen: ProfieView,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="contact" style={{ color : '#FFF'}}
        />
      )
    }
  },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#B48B41',
    inactiveTintColor: '#7D8388',
    // showIcon: false,
    labelStyle: {
      // flex: 1,
      // fontSize: 16,
      // marginTop: 12,
    },
    style: {
      backgroundColor: '#262C36',
    },
  },
});

const AppNavigator = StackNavigator({
  Login: {
    screen: LoginView,
    header: null,
  },
  Main: {
    screen: MainNavigator,
    navigationOptions: {
      header: NormalToolbar,
    }
  },
  Barcode: {
    screen: BarcodeScanner,
    navigationOptions: {
      header: NormalToolbar,
    }
  },
}, {
  // headerMode: 'none',
  initialRouteName: 'Login',
});

export default AppNavigator;