import React from 'react';
import { Icon } from 'native-base';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import Placeholder from '@components/Common/PlaceHolder';

import HomeToolbar from '@components/Home/Toolbar';
import NormalToolbar from '@components/Common/Toolbar';
import ReviewToolbar from '@components/Common/ReviewBar';
import NewReviewToolbar from '@components/Review/Toolbar';
import BookToolbar from '@components/Book/Toolbar';
import ProfileHeader from '@components/Common/ProfileHeader';

//screen
import SplashScreen from '@container/Splash/SplashView';
import IntroView from '@container/Intro/IntroView';
import LoginScreen from '@container/Login/LoginContainer';
import RegisterView from '@container/Register/RegisterView';
import HomeScreen from '@container/Main/Home/HomeContainer';
import FriendsView from '@container/Main/Friends/FriendsView';
import WishListView from '@container/Main/Profile/WishListView';
import Activities from '@container/Main/Profile/FollowingView';
import Review from '@container/Main/Review/Review';
import DetailScreen from '@container/Detail/DetailContainer';
import ReviewScreen from '@container/Review/ReviewContainer';

//style
import { AppColors } from '@style/index';

const ReviewView = StackNavigator({
   Review: {
     screen: Review,
     navigationOptions: {
       header: null,//ReviewToolbar,
     }
  }
});

const ProfileStackNavigator = StackNavigator({
  Activities: {
    screen: Activities,
    navigationOptions: {
      header: ProfileHeader,
    }
  },
  WishList: {
    screen: WishListView,
    navigationOptions: {
      header: ProfileHeader,
    }
  },
});

const HomeNavigator = StackNavigator({
  HomeNavigator: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      header: (<HomeToolbar navigation={navigation} title="Home"/>)
    })
  }
});

const BookNavigator = StackNavigator({
  BookNavigator: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      header: <BookToolbar navigation={navigation} />
    })
  }
});

const NewReviewNavigator = StackNavigator({
  NewReviewNavigator: {
    screen: ReviewScreen,
    navigationOptions: ({navigation}) => ({
      header: <NewReviewToolbar navigation={navigation} />
    })
  }
});

const MainNavigator = TabNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      showLabel: false,
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
      showLabel: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="people" style={{ color : '#FFF'}}
        />
      ),
    }
  },
  Add: {
    screen: ReviewView,
    navigationOptions: {
      title: 'Add Review',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="add" style={{ color : '#FFF'}}
        />
      ),
      header: null,
    }
  },
  Profile: {
    screen: ProfileStackNavigator,
    navigationOptions: {
      title: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="contact" style={{ color : '#FFF'}}
        />
      ),
      header: null,
    }
  },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#B48B41',
    inactiveTintColor: '#7D8388',
    labelStyle: {
    },
    style: {
      backgroundColor: AppColors.colorPrimary,
    },
  },
});

const AppNavigator = StackNavigator({
  Splash: {
    screen: SplashScreen,
  },
  Intro: {
    screen: IntroView,
    navigationOptions: {
      header: null,
    }
  },
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterView,
    navigationOptions: {
      header: NormalToolbar,
    }
  },
  Main: {
    screen: MainNavigator,
  },
  Book: {
    screen: BookNavigator,
  },
  NewReview: {
    screen: NewReviewNavigator,
  },
}, {
  headerMode: 'none',
  initialRouteName: 'Splash',
});

export default AppNavigator;
