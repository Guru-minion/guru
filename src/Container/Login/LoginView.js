import React, {Component} from 'react';
import {View, StyleSheet, Image, Dimensions, Text} from 'react-native';
import {
  Button,
  Content,
  Form,
  Item,
  Input,
  Thumbnail,
  Container,
  Spinner,
} from 'native-base';
import firebase from '../../Lib/firebase';
import {set} from '../../Lib/storage';
import {loginSuccess} from './Action';
export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

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
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.setState({loading: true});
    firebase.signInWithEmailAndPassword(user)
      .then(firebaseUser => {
        const user = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
        };
        this.props.navigation.dispatch(loginSuccess(user));
        return set('USER_INFO', JSON.stringify(user));
      })
      .then(response => {
        this.setState({loading: false});
        console.log('[LoginView.js] login success', response);
        this.props.navigation.navigate('Main');
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
      <View style={styles.container}>
        <Content contentContainerStyle={styles.formSignIn}>
          <Form >
            <Image
              style={styles.logo}
              resizeMode='stretch'
              source={require('./logo.png')}/>
            <Item>
              <Input
                autoCorrect={false}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={this.handleUserNameChange}
                placeholder="Email"/>
            </Item>
            <Item last>
              <Input
                autoCorrect={false}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={this.handlePasswordChange}
                placeholder="Password"/>
            </Item>
            <Button
              block
              style={styles.button}
              onPress={this.handleSubmit}>
              {
                this.state.loading ?
                  (<Spinner size="small" color="#FFF" style={{marginRight: 16}}/>)
                  : null
              }
              <Text style={{color: 'white'}}>Sign In</Text>
            </Button>
          </Form>
          <Text style={styles.separationText}>
            —————OR—————
          </Text>
          <Button
            block
            bordered
            style={styles.button}
            onPress={this.handleRegisterButtonClicked}>
            <Text>Create New Account</Text>
          </Button>
        </Content>
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
  },
  formSignIn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 1.5,
    marginTop: 10,
    marginBottom: 20,
  },
  separationText: {
    marginTop: 80,
    color: 'grey',
  },
  button: {
    height: 30,
    marginTop: 20,
  },
};
