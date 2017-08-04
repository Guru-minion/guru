import React from 'react';
import {Image} from 'react-native';
import {
  Container,
  Header,
  View,
  Item,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from 'native-base';
import {AppColors} from '@style/index';
import Starbar from './Starbar';

const Activity = (props) => {

  const {type, rating, book, user} = props;

  const renderHeader = () => {
    if (type === 'review') {
      return (
        <Body style={styles.titleWrapper}>
          <Text style={styles.name}>{user.name}</Text>
          <Text note style={styles.message}>rated a book</Text>
          <Starbar
            style={styles.ratedBar}
            size={18}
            rating={rating}
          />
        </Body>
      );
    }else if(type === 'wishlist'){
      return (
        <Body style={styles.titleWrapper}>
          <Text style={styles.name}>{user.name}</Text>
          <Text note style={styles.message}>liked a book.</Text>
        </Body>
      )
    }
  };

  const getBiggerImage = (url) => `${url}&zoom=7`;

  return (
    <Card>
      <CardItem>
        <Left>
          <Thumbnail
            style={styles.avatar}
            source={{uri: user.avatar}}/>
          {
            renderHeader()
          }
        </Left>

      </CardItem>

      <CardItem cardBody>
        <Item style={styles.bookWrapper}>
          <Image source={{uri: getBiggerImage(book.imageLinks.thumbnail)}}
                 style={{height: 200, width: 120}}/>

          <View style={styles.bookInfoWrapper}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.author}>{`by ${book.authors[0]}`}</Text>
          </View>
        </Item>

      </CardItem>

      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up"/>
            <Text>12 Likes</Text>
          </Button>
        </Left>
        <Body>
        <Button transparent>
          <Icon active name="chatbubbles"/>
          <Text>4 Comments</Text>
        </Button>
        </Body>
        <Right>
          <Text>11h ago</Text>
        </Right>
      </CardItem>

    </Card>
  );
};

const styles = {
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  name: {
    color: AppColors.colorPrimary,
  },
  message: {
    color: '#000',
    marginLeft: 2,
  },
  ratedBar: {
    backgroundColor: '#FFFF00',
    marginLeft: 0,
    paddingLeft: 0,
  },
  title: {
    fontSize: 16,
    color: AppColors.colorPrimaryText,
    fontWeight: '800',
  },
  bookWrapper: {
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    borderBottomColor: 'transparent'
  },
  author: {
    fontSize: 12,
    color: AppColors.colorSecondaryText,
    marginTop: 4,
  },
  bookInfoWrapper: {
    flex: 1,
    paddingLeft: 8,
  }
};

export default Activity;
