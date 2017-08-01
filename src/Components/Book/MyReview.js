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
    <List>
      <ListItem style={styles.item} itemHeader first>
        <Text style={{ fontWeight: 'bold'}}>My Review</Text>
      </ListItem>

      <ReviewItem
        goToProfile={goToProfile}
        {...review} />
    </List>
  );
};

const styles = {
  item: {
    borderBottomColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: AppColors.divider,
    paddingHorizontal: 16,
  },
};

export default MyReview;
