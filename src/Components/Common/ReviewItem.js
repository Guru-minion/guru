import React from 'react';
import { Image  } from 'react-native';
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Right,
  Body,
  Icon,
  H3,
  Item,
  Button,
} from 'native-base';
import StarRating from 'react-native-star-rating';

const ReviewItem = (props) => {
  const { item, userId, showReviewPopup } = props;
  const getBiggerImage = (url) => `${url}&zoom=7`;

  const renderReviews = () => {
    const reviews = item.reviews;
    if(reviews.length > 0){
      let reviewed = false;
      console.log('[ReviewItem.js] renderReviews', reviews);
      // let fitered = reviews.filter((review) => review.userId === userId);
      // if(fitered.length > 0){
      //   reviewed = true;
      // }
      return (
        <Button transparent onPress={showReviewPopup}>
          <Icon name="chatbubbles" style={{ color: `${reviewed ? 'red' : 'green'}` }} />
          <Text>{` ${reviews.length} reviews`}</Text>
        </Button>
      )
    }else {
      return (
        <Button transparent>
          <Icon name="chatbubbles" style={{ color: 'red' }} />
        </Button>
      )
    }
  };

  return (
    <Card style={{ elevation: 3 }}>
      <CardItem cardBody>
        <Image
          style={{ height: 300, flex: 1 }}
          source={{uri : getBiggerImage(item.imageLinks.thumbnail)}} />
      </CardItem>
      <Body style={styles.info}>
        <H3>{item.title}</H3>
        <Text note>{item.authors[0]}</Text>
      </Body>
      {/*<CardItem>
        <Left>
          <StarRating
            starSize={18}
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={item.averageRating}
            selectedStar={(rating) => {}}
            starColor={'red'}
          />
          <Text note>{item.averageRating}</Text>
        </Left>
        <Item style={{borderBottomColor: 'transparent'}}>
          <Icon name="star" />
          <Text>12,323</Text>
        </Item>
        <Item style={{borderBottomColor: 'transparent'}}>
          <Icon name="chatbubbles" />
          <Text>13,000</Text>
        </Item>
      </CardItem>*/}
      <CardItem>
        {/*<Body>*/}
        <StarRating
          starSize={18}
          disabled={false}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={item.averageRating}
          selectedStar={(rating) => {}}
          starColor={'red'}
        />
        <Text note>{item.averageRating}</Text>
        {/*</Body>*/}
      </CardItem>
      {/*<Body style={styles.info}>
        <H3>Rate it !</H3>
        <StarRating
          starSize={32}
          disabled={false}
          emptyStar={'ios-star-outline'}
          fullStar={'ios-star'}
          halfStar={'ios-star-half'}
          iconSet={'Ionicons'}
          maxStars={5}
          rating={0}
          selectedStar={(rating) => {}}
          starColor={'red'}
        />
      </Body>*/}
      <CardItem style={styles.actionWrapper}>
        {/*<Button transparent>
          <Icon name="chatbubbles" style={{ color: 'red' }} />
        </Button>*/}
        {
          renderReviews()
        }

        <Button transparent>
          <Icon name="heart" style={{ color: 'red' }} />
        </Button>
      </CardItem>
    </Card>
  );
};


const styles = {
  info: {
    marginTop: 16,
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
};

export default ReviewItem;
