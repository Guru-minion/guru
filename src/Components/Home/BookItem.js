import React from 'react';
import {Image, Dimensions} from 'react-native';
import {
  Body,
  Container,
  Button,
  Header,
  Left,
  Icon,
  Right,
  Title,
  H3,
  Text,
  Card,
  CardItem,
  View,
  Thumbnail,
  Item,
} from 'native-base';
import Starbar from '../Common/Starbar';
import ButtonGroup from './ButtonGroup';
import { AppColors } from '@style/index';

const {width, height} = Dimensions.get('window');

const IMAGE_URL = 'https://www.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/e/veembangnoinho.jpg';

const BookItem = (props) => {
  const {item, itemClick, writeReview, addToWishlist, userId} = props;

  const getBiggerImage = () => `${item.imageLinks.thumbnail}&zoom=7`;

  return (
    <View style={{flex: 1}}>
      <Card style={styles.card}>
        <CardItem
          onPress={() => itemClick(item)}
          button
          cardBody>
          <Image
            source={{uri: getBiggerImage()}}
            style={styles.photo}
          />
        </CardItem>
        <View style={styles.meta}>
          <View style={{flex: 3}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{`by ${item.authors[0]}`}</Text>
            <Item style={styles.ratingWrapper}>
              <Starbar size={20} rating={item.averageRating}/>
              <Text>{` ${item.averageRating}k`}</Text>
            </Item>
          </View>
          <View style={{flex: 2}}>
            <Item style={{ borderBottomColor: 'transparent', marginTop: 8}}>
              <Icon name="chatbubbles" style={styles.icon}/>
              <Text style={{color: AppColors.colorPrimary}}>{item.reviews.length}</Text>
            </Item>
            <Item style={{ borderBottomColor: 'transparent', marginTop: 8}}>
              <Icon name="bookmark" style={styles.icon}/>
              <Text style={{color: AppColors.colorPrimary}}>{item.wishlist.length}</Text>
            </Item>

          </View>
        </View>
      </Card>

      <ButtonGroup
        book={item}
        userId={userId}
        writeReview={() => writeReview(item)}
        addToWishlist={() => addToWishlist(item)}
      />
    </View>
  );
};

const styles = {
  card: {
    width: width - 32,
    elevation: 3,
    paddingHorizontal: 8,
  },
  photo: {
    flex: 1,
    width: 200,//width - 48,
    height: 200,//350,
  },
  info: {
    flex: 1,
  },
  meta: {
    padding: 8,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: AppColors.colorPrimaryText,
    fontWeight: '800',
  },
  author: {
    fontSize: 12,
    color: AppColors.colorSecondaryText,
    marginTop: 4,
  },
  ratingWrapper:{
    padding: 0,
    borderBottomColor: 'transparent',
    marginTop: 8,
  },
  icon: {
    color: AppColors.colorPrimary,
    fontSize: 20,
  }
};

export default BookItem;
