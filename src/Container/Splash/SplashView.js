import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Dimensions} from 'react-native';
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
import {NavigationActions} from 'react-navigation';
import {loginSuccess} from '../Login/Action';
import {get, set, clear} from '../../Lib/storage';
import firebase from '../../Lib/firebase';

class SplashView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    /*clear()
     .then(() => {
     setTimeout(() => {
     get('INTRO')
     .then(savedInfo => {
     if(savedInfo){
     this.checkUserSession();
     }else {
     this.navigateTo('Intro');
     }
     })
     .catch(error => {
     console.log('[SplashView.js] check user error', error);
     this.navigateTo('Login');
     })
     }, 1200);
     });*/

    setTimeout(() => {
      get('INTRO')
        .then(savedInfo => {
          if (savedInfo) {
            this.checkUserSession();
          } else {
            this.navigateTo('Intro');
          }
        })
        .catch(error => {
          console.log('[SplashView.js] check user error', error);
          this.navigateTo('Login');
        })
    }, 0);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.id && !this.props.id) {
      this.navigateTo('Main');
    }
  };

  checkUserSession = () => {
    get('USER_INFO')
      .then(response => {
        console.log('[SplashView.js] get user info from storage', response);
        const savedInfo = JSON.parse(response);
        firebase.getUserInfo(savedInfo.id)
          .then(snapshot => {
            const user = snapshot.val();
            console.log('[SplashView.js] user info', user);
            this.props.dispatch(loginSuccess(user));
          })
          .catch(error => {
            console.log('[SplashView.js] get user info from firebase error', error);
            this.navigateTo('Login');
          })

      })
      .catch(error => {
        console.log('[SplashView.js] check user error', error);
        this.navigateTo('Login');
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
        <Text style={styles.title}>Guru</Text>
        <Thumbnail
          style={styles.logo}
          source={require('../../Assets/Images/logo.png')}
        />
      </View>
    );
  }
}

// What data from the store shall we send to the component?
const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(SplashView);

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
