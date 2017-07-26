import React, {Component} from 'react';
import { View, Image, Dimensions, Keyboard } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Item,
  Input,
} from 'native-base';
import { ImagePicker } from 'expo';
import {get, set, clear} from '../../../Lib/storage';
import * as firebase from 'firebase';

const IMAGE_URL = 'https://pbs.twimg.com/profile_images/782474226020200448/zDo-gAo0_400x400.jpg';

export default class Review extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: null,
      user: null,
    };
    this.users = firebase.database().ref('users');
  }

  componentDidMount = () => {
    get('USER_INFO')
      .then(response => {
        if (response) {
          this.users.once('value')
            .then(snapshot => {
              if (snapshot.val()) {
                const users = snapshot.val();
                let user = null;
                for (const userItem in users) {
                  if(userItem.id === response.id) {
                    user = users[userItem];
                  }
                }
                this.setState({
                  user,
                });
              }
            })
          }
        });
  };

  handleTextInputChange = (text) => {
    //console.log(text);
    //Keyboard.dismiss();
  }
  _pickImage = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3],
   });

   console.log(result);

   if (!result.cancelled) {
     this.setState({ image: result.uri });
   }
 };
  render() {
    let { image, user } = this.state;
    if (!user){
      return <Button>
        <Text>
          Loading
        </Text>
      </Button>;
    }
    return (
      <View style={styles.container}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: user.picture.data.url}} />
              <Body>
                <Text>{user.name}</Text>
              </Body>
            </Left>
            <Right>
            </Right>
          </CardItem>
          <CardItem >
            <Body>
            <Item style={styles.textBox}>
              <Input
                style={styles.input}
                placeholder={`Want to review a book, ${user.firstName}?`}
                onChangeText={this.handleTextInputChange}
                autoFocus={true}
              />
            </Item>
            <Item>
              <Button
                transparent
                onPress={this._pickImage}
              >
                <Icon name='camera' />
                {image &&
                  <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
              </Button>
            </Item>
            </Body>
          </CardItem>
          <CardItem>
            <Left>
            </Left>
          </CardItem>
        </Card>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  textBox: {
    height: 200,
    width: Dimensions.get('window').width,
  },
  input: {
    height: 200,
    alignItems: 'flex-start',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
};
