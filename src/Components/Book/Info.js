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
import { MaterialIcons } from '@expo/vector-icons';
import ExpanableTextView from '../Common/ExpanableTextView';
import Starbar from '../Common/Starbar';
//style
import { AppColors } from '@style/index';

const BookInfo = (props) => {
  const { isLiked, description, authors, categories = [], imageLinks, averageRating, publisher, publishedDate} = props;

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
            <Text></Text>
          </View>
          <Text note style={styles.category}>{categories.join(', ')}</Text>
          <Text note style={styles.publisher}>{`${publisher} (${publishedDate})`}</Text>

          <View style={{ flexDirection: 'row', flex: 1 }}>

            <Button style={{ alignSelf: 'flex-end'}} small rounded>
              <Text>Buy now</Text>
            </Button>

            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
              <Button transparent small>
                <Icon active={isLiked} style={{ color : isLiked ? AppColors.colorAccent : AppColors.colorPrimary}} size={24} name="heart" />
              </Button>

              <Button transparent small>
                <Icon size={24} name="chatbubbles" />
              </Button>
            </View>
          </View>

          <View>

          </View>

          {/*<View style={{flex: 1, flexDirection: 'column',
            justifyContent: 'flex-end'}}>
            <View style={styles.action}>
              <Button small rounded>
                <Text>See on Amazon</Text>
              </Button>

              <Button transparent small>
                <Icon name="heart" />
              </Button>
            </View>
          </View>*/}
        </View>
      </Item>

      <View style={styles.line}/>

      <View style={{ paddingHorizontal: 16}}>
        <ExpanableTextView
          numberOfLines={4}
          onReady={() => console.log('[Info.js] on ready')}>
          <Text note style={styles.description}>{description}</Text>
        </ExpanableTextView>
      </View>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  info: {
    height: 200,
    borderBottomColor: 'transparent',
    paddingHorizontal:16,
    marginTop: 16,
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
    fontFamily: 'Roboto_medium',
  },
  category: {
    color: AppColors.colorSecondaryText,
    marginTop: 8,
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
  },
  description: {
    color: AppColors.colorSecondaryText,
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
