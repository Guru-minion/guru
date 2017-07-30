import React, {PropTypes, Component} from 'react';
import { View, Platform } from 'react-native';
import { Root } from 'native-base';
import { Constants } from 'expo';
import {addNavigationHelpers} from 'react-navigation';
import firebase from '../Lib/firebase';
import { addItem, receiveListData, updateItem } from '../Redux/Action';

import AppNavigator from './Navigator';

class NavigatorView extends Component {
  static displayName = 'NavigationView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired
      }))
    }).isRequired
  };

  render() {

    const AppStyle = {
      flex: 1,
      marginTop: Platform.OS === 'android' ? Constants.statusBarHeight/2 : 0
    };

    return (
      <View style={AppStyle}>
        <Root>

          <AppNavigator
            navigation={
              addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.navigatorState
              })
            }
          />
        </Root>
      </View>
    );
  }

  componentDidMount = () => {

    firebase.database().ref('books').on('child_changed', (snapshot) => {
      const book = snapshot.val();
      this.props.dispatch(updateItem({
        key: 'books',
        data: book,
      }));
    });

    firebase.database().ref('reviews').on('child_changed', (snapshot) => {
      const review = snapshot.val();
      this.props.dispatch(updateItem({
        key: 'reviews',
        data: review,
      }));
    });

    firebase.database().ref('users').on('child_changed', (snapshot) => {
      const user = snapshot.val();
      this.props.dispatch(updateItem({
        key: 'users',
        data: user,
      }));
    });


    firebase.database().ref('reviews').on('child_added', (snapshot) => {
      const review = snapshot.val();
      this.props.dispatch(addItem({
        key: 'reviews',
        data: review,
      }));
    });

    firebase.database().ref('wishlist').on('child_added', (snapshot) => {
      const wishlist = snapshot.val();
      this.props.dispatch(addItem({
        key: 'wishlist',
        data: wishlist,
      }));
    });

    //load all reviews
    firebase.database().ref('reviews').once('value', (snapshot) => {
      const reviews = snapshot.val();
      if(!reviews) return;
      const reviewsArray = Object.keys(reviews).map(key => reviews[key]);
      this.props.dispatch(receiveListData({
        key: 'reviews',
        data: reviewsArray,
      }))
    });

    //load all users
    firebase.database().ref('users').once('value', (snapshot) => {
      const users = snapshot.val();
      if(!users) return;
      const usersArray = Object.keys(users).map(key => users[key]);
      this.props.dispatch(receiveListData({
        key: 'users',
        data: usersArray,
      }))
    });

    //load all wishlist
    firebase.database().ref('wishlist').once('value', (snapshot) => {
      const wishlist = snapshot.val();
      if(!wishlist) return;
      const wishlistArray = Object.keys(wishlist).map(key => wishlist[key]);
      this.props.dispatch(receiveListData({
        key: 'wishlist',
        data: wishlistArray,
      }))
    });

  };
}

export default NavigatorView;
