import React from 'react';
import {
  Container,
  Header,
  List, ListItem, Text
} from 'native-base';
import { AppColors } from '@style/index';
import ReviewItem from './ReviewItem';

const MyReview = (props) => {
  const {review, goToProfile} = props;
  return (
    <List style={styles.container}>
      <ListItem style={styles.item} itemHeader first>
        <Text style={styles.title}>My Review</Text>
      </ListItem>

      <ReviewItem
        removeUnderline
        goToProfile={goToProfile}
        {...review} />
    </List>
  );
};

const styles = {
  container: {
    marginTop: 16,
  },
  title: {
    fontFamily: 'Roboto_medium',
    color: AppColors.colorPrimaryText,
  },
  item: {
    borderBottomColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: AppColors.divider,
  },
};

export default MyReview;
