import React from 'react';
import {
  Container,
  Header, Content, List, ListItem, Left, Body, Right, Thumbnail,
  Text,
  View,
} from 'native-base';
import Starbar from '../Common/Starbar';

const IMAGE_URL = 'https://www.fahasa1.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/e/veembangnoinho.jpg';

const ReviewItem = (props) => {

  const {review, rating, user} = props;

  return (
    <ListItem avatar >
      <Left style={styles.container}>
        <Thumbnail
          style={styles.avatar}
          defaultSource={require('../../Assets/Images/avatar_holder.png')}
          source={{uri: IMAGE_URL}}/>
      </Left>
      <Body style={{ alignItems : 'flex-start'}}>
        <Text>{user ? user.email : 'Anonymous'}</Text>
        <Starbar style={{ marginTop: 4}} rating={rating} size={16} />
        <Text numberOfLines={3} note style={styles.review}>{review}</Text>
      </Body>
      {/*<Right>*/}
      {/*<Text note>3:43 pm</Text>*/}
      {/*</Right>*/}
    </ListItem>
  );
};

const styles = {
  container: {
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  review: {
    marginTop: 8,
  }
};

export default ReviewItem;
