import React from 'react';
import {
  Container,
  Header,
  List, ListItem, Text
} from 'native-base';
import ReviewItem from './ReviewItem';

const MyReview = (props) => {
  const {review, goToProfile} = props;
  console.log('[MyReview.js] MyReview', review);
  return (
    <List>
      <ListItem itemHeader first>
        <Text>My Review</Text>
      </ListItem>

      <ReviewItem
        goToProfile={goToProfile}
        {...review} />
    </List>
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

export default MyReview;
