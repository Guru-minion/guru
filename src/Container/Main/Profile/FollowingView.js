import React, {Component} from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
  H3,
  List, ListItem, Left, Body, Right, Thumbnail,Spinner,
} from 'native-base';
import {get, set, clear} from '../../../Lib/storage';
import * as firebase from 'firebase';
const URL = 'https://pbs.twimg.com/profile_images/782474226020200448/zDo-gAo0_400x400.jpg';


export default class FollowingView extends Component {
  constructor(props){
    super(props);
    this.state = {
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
  render() {
    let { image, user } = this.state;
    if (!user){
      return <Spinner color='blue' />;
    }
    return (
      <View >
        <List contentContainer={{flexDirection: 'column'}} >
          <ListItem avatar  >
            <Left>
              <Thumbnail source={{ uri: user.picture.data.url }} />
            </Left>
            <Body>
              <Text>{user.name}</Text>
              <Text note>Commented on a review for book Blink . .</Text>
            </Body>
            <Right>
              <Text note>3:43 pm</Text>
            </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: user.picture.data.url }} />
              </Left>
              <Body>
                <Text>{user.name}</Text>
                <Text note>Commented on a review for book Blink . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: user.picture.data.url }} />
              </Left>
              <Body>
                <Text>{user.name}</Text>
                <Text note>Commented on a review for book Blink . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: user.picture.data.url }} />
              </Left>
              <Body>
                <Text>{user.name}</Text>
                <Text note>Commented on a review for book Blink . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
        </List>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
};
