import React from 'react';
import {
  Container,
  Header,
  Item,
  Icon,
  List, ListItem, Text
} from 'native-base';

const EmptyReview = () => {
  return (
    <Item>
      <Body>
        {/*<Icon*/}
          {/*name="sad" />*/}
        <Text>No review yet.</Text>
      </Body>
    </Item>
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

export default EmptyReview;
