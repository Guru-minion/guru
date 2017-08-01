import React, {Component} from 'react';
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
import { Constants } from 'expo';
import { AppColors, A } from '@style/index';
import firebase from '../../Lib/firebase';

export default class LoginView extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  handleEmailChange = (email) => {
    this.setState({ email })
  };

  handlePasswordChange = ( password ) => {
    this.setState({ password })
  };

  handleNameChange = (name) => {
    this.setState({ name })
  };

  handleSubmit = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    firebase.register(user)
      .then((response) => {
        console.log('[RegisterView.js] register success', response);
        this.props.navigation.navigate('Main');
      })
      .catch(error => {
        console.log('[RegisterView.js] register error', error);
        alert(error.message)
      })
  };

  _handleBack = () => {
    this.props.navigation.goBack();
  };


  render(){
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.content}>
          <View style={styles.logoWrapper}>
            <Thumbnail
              style={styles.logo}
              resizeMode='stretch'
              source={require('../../Assets/Images/register_logo.png')}/>
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
                onChangeText={this.handleEmailChange}
              />
            </Item>

            <Item style={styles.inputWrapper}>
              <Icon active style={styles.icon} name='lock' />
              <Input
                placeholder='Password'
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
                secureTextEntry
                onChangeText={this.handlePasswordChange}
              />
            </Item>

            <Item style={styles.inputWrapper}>
              <Icon active style={styles.icon} name='contact' />
              <Input
                placeholder='Name'
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="done"
                onChangeText={this.handleNameChange}
              />
            </Item>

            <Button
              rounded
              style={styles.loginButton}
              onPress={this.handleSubmit}
            >
              {
                this.state.loading ?
                  (<Spinner size="small" color="#FFF" style={{marginRight: 16}}/>)
                  : null
              }
              <Text style={styles.loginText}>REGISTER</Text>
            </Button>

            {/*Dummy view*/}
            <View style={{flex: 1}}/>


            <Button transparent onPress={this._handleBack}>
              <Text style={styles.register}>Already have an account? Login</Text>
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
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
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

/*

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
    height: Dimensions.get('window').height/3,
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
*/
