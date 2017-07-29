import React from 'react';
import {
  Body,
  Container,
  Button,
  Header,
  Left,
  Icon,
  Item,
  Right,
  Title,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import ExpanableTextView from '../Common/ExpanableTextView';
import Starbar from '../Common/Starbar';
//style
import { AppColors } from '@style/index';

const IMAGE_URL = 'https://www.fahasa.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/e/veembangnoinho.jpg';

const BookInfo = (props) => {
  const { title, description, authors, categories = [], imageLinks, averageRating, publisher, publishedDate} = props;

  const getBiggerImage = () => `${imageLinks.thumbnail}&zoom=7`;

  return (
    <View style={styles.container}>
      <Item style={styles.info}>
        <Thumbnail
          square
          source={{uri: getBiggerImage()}}
          style={styles.cover}
        />
        <View style={styles.meta}>
          <Text style={styles.author}>{`by ${authors[0]}`}</Text>
          <View style={styles.voteWrapper}>
            <Starbar size={20} rating={averageRating} />
            <Text> 23k</Text>
          </View>
          <Text note style={styles.category}>{categories.join(', ')}</Text>
          <Text note style={styles.publisher}>{`${publisher} (${publishedDate})`}</Text>
          <View style={styles.action}>
            <Button transparent small>
              <Icon name="heart" />
            </Button>

            <Button transparent small>
              <Icon name="add" />
            </Button>
          </View>
        </View>
      </Item>

      <View style={styles.line}/>

      <ExpanableTextView
        numberOfLines={4}
        onReady={() => console.log('[Info.js] on ready')}>
        <Text note style={styles.description}>{description}</Text>
      </ExpanableTextView>

    </View>
  );
};

const styles = {
  container: {
    padding: 16,
  },
  info: {
    height: 200,
    borderBottomColor: 'transparent',
  },
  cover: {
    width: 120,
    height: 200,
  },
  meta: {
    flex: 1,
    height: 200,
    paddingLeft: 16,
    justifyContent: 'flex-start',
  },
  author: {
    color: AppColors.colorPrimaryText,
    fontWeight: '600',
  },
  category: {
    color: AppColors.colorSecondaryText,
    marginTop: 16,
  },
  publisher: {
    color: AppColors.colorSecondaryText,
    marginTop: 4,
  },
  voteWrapper: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  description: {
    color: AppColors.colorPrimaryText,
    fontSize: 16,
  },
  line: {
    height: 1,
    backgroundColor: AppColors.divider,
    marginTop: 16,
    marginBottom: 16
  }
};


export default BookInfo;
