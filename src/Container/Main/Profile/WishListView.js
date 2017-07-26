import React, {Component} from 'react';
import { View, Image, ScrollView } from 'react-native';
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
  List,
  ListItem,Spinner,
} from 'native-base';
import {get, set, clear} from '../../../Lib/storage';
import * as firebase from 'firebase';

const IMAGE_URL='https://images-na.ssl-images-amazon.com/images/I/51eKKDBOXHL._SX305_BO1,204,203,200_.jpg';
const AVATAR_URL = 'https://pbs.twimg.com/profile_images/782474226020200448/zDo-gAo0_400x400.jpg';

export default class WishListView extends Component {
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
    let { user } = this.state;
    if (!user){
      return <Spinner color='blue' />;
    }
    return (
    <ScrollView>
      <Card style={{flex: 0}}>
         <CardItem>
           <Left>
             <Thumbnail source={{uri: user.picture.data.url}} />
             <Body>
              <View style={{flexDirection: 'row'}}>
               <Text>{user.name}</Text>
               <Text note> added this book</Text>
              </View>
               <Text note>July 23, 2017</Text>
             </Body>
           </Left>
         </CardItem>
         <CardItem>
           <Body>
             <Image source={{uri: IMAGE_URL}} style={{height: 300, width: 200}}/>
           </Body>
         </CardItem>
         <CardItem>
           <Left>
           <Button transparent textStyle={{color: '#87838B'}}>
            <Icon name="heart" style={{ color: 'red' }} />
                 <Text>3</Text>
           </Button>
           <Button transparent textStyle={{color: '#87838B'}}>
             <Icon name="chatbubbles" style={{ color: 'red' }} />
                 <Text>5</Text>
           </Button>
           </Left>
         </CardItem>
       </Card>
      <Card style={{flex: 0}}>
         <CardItem>
           <Left>
             <Thumbnail source={{uri:  user.picture.data.url}} />
             <Body>
               <View style={{flexDirection: 'row'}}>
                <Text>{user.name}</Text>
                <Text note> added this book</Text>
               </View>
               <Text note>July 23, 2017</Text>
             </Body>
           </Left>
         </CardItem>
         <CardItem>
           <Body>
             <Image source={{uri: IMAGE_URL}} style={{height: 300, width: 200}}/>
           </Body>
         </CardItem>
         <CardItem>
           <Left>
           <Button transparent textStyle={{color: '#87838B'}}>
            <Icon name="heart" style={{ color: 'red' }} />
                 <Text>3</Text>
           </Button>
           <Button transparent textStyle={{color: '#87838B'}}>
             <Icon name="chatbubbles" style={{ color: 'red' }} />
                 <Text>5</Text>
           </Button>
           </Left>
         </CardItem>
       </Card>
      <Card style={{flex: 0}}>
         <CardItem>
           <Left>
             <Thumbnail source={{uri:  user.picture.data.url}} />
             <Body>
               <View style={{flexDirection: 'row'}}>
                <Text>{user.name}</Text>
                <Text note> added this book</Text>
               </View>
               <Text note>July 23, 2017</Text>
             </Body>
           </Left>
         </CardItem>
         <CardItem>
           <Body>
             <Image source={{uri: IMAGE_URL}} style={{height: 300, width: 200}}/>
           </Body>
         </CardItem>
         <CardItem>
           <Left>
             <Button transparent textStyle={{color: '#87838B'}}>
              <Icon name="heart" style={{ color: 'red' }} />
                   <Text>3</Text>
             </Button>
             <Button transparent textStyle={{color: '#87838B'}}>
               <Icon name="chatbubbles" style={{ color: 'red' }} />
                   <Text>5</Text>
             </Button>
           </Left>
         </CardItem>
       </Card>
       </ScrollView>
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
