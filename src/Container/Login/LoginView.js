import React, {Component} from 'react';
import { Dimensions } from 'react-native';
import {
  Button,
  Content,
  Form,
  Item,
  Icon,
  Input,
  Thumbnail,
  Container,
  Spinner,
  Text,
  View,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { AppColors } from '@style/index';
import firebase from '../../Lib/firebase';
import {set} from '../../Lib/storage';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  componentWillReceiveProps = (nextProps) => {
     if(nextProps.id && !this.props.id){
       if(this.state.loading){
         this.setState({loading: false});
       }
       this.navigateTo('Main');
     }
  };

  navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });
    this.props.navigation.dispatch(actionToDispatch)
  };

  handleUserNameChange = (name) => {
    this.setState({
      email: name,
    })
  }

  handlePasswordChange = (pw) => {
    this.setState({
      password: pw,
    })
  };

  handleSubmit = () => {
    const { loginSuccess } = this.props;

    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({loading: true});
    let userId;
    firebase.signInWithEmailAndPassword(user)
      .then(firebaseUser => {
        userId = firebaseUser.uid;
        const user = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
        };
        return set('USER_INFO', JSON.stringify(user));
      })
      .then(() => {
        console.log('[LoginView.js] save user info to storage success');
        return firebase.getUserInfo(userId);
      })
      .then(snapshot => {
        const user = snapshot.val();
        console.log('[LoginView.js] user info', user);
        loginSuccess(user);
      })
      .catch(error => {
        this.setState({loading: false});
        console.log('[LoginView.js] login error', error);
        alert(error.message);
      })

  };

  handleRegisterButtonClicked = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={{ flex: 1}}>
        <View style={styles.logoWrapper}>
          <Thumbnail
            style={styles.logo}
            resizeMode='stretch'
            source={require('../../Assets/Images/logo.png')}/>
        </View>

        <View style={styles.contentWrapper}>

          <Item style={styles.inputWrapper}>
            <Icon active style={styles.icon} name='mail' />
            <Input
              placeholder='Email'
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={this.handleUserNameChange}
            />
          </Item>

          <Item style={styles.inputWrapper}>
            <Icon active style={styles.icon} name='lock' />
            <Input
              placeholder='Password'
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="default"
              secureTextEntry
              onChangeText={this.handlePasswordChange}
            />
          </Item>

          <Button rounded
                  style={styles.loginButton}
                  onPress={this.handleSubmit}
          >
            {
              this.state.loading ?
                (<Spinner size="small" color="#FFF" style={{marginRight: 16}}/>)
                : null
            }
            <Text style={styles.loginText}>LOGIN</Text>
          </Button>

          {/*Dummy view*/}
          <View style={{flex: 1}}/>


          <Button transparent onPress={this.handleRegisterButtonClicked}>
            <Text style={styles.register}>Doesn’t have an account? Register</Text>
          </Button>
        </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 16,
  },
  logoWrapper:{
    flex: 2,
    padding: 16,
  },
  logo: {
    flex: 1,
    height:  null,
    width: null,
  },
  contentWrapper:{
    flex: 3,
    alignItems: 'center',
  },
  icon: {
    color: AppColors.colorPrimary,
  },
  inputWrapper: {
    marginTop: 16,
  },
  loginButton: {
    backgroundColor: AppColors.colorPrimary,
    marginTop: 32,
    alignSelf: 'center',
  },
  loginText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
    paddingHorizontal: 48,
  },
  register: {
    color: AppColors.colorPrimaryText,
    fontSize: 16,
  },
};
