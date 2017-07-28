import React from 'react';
import {
  Body,
  Button,
  Header,
  Left,
  Icon,
  Right,
  Title,
} from 'native-base';
import { NavigationActions } from 'react-navigation';

const BookToolbar = (props) => {
  const { navigation } = props;

  const title = navigation.state.params.title;

  return (
    <Header>
      <Left style={{flex: 0}}>
        <Button
          onPress={() => navigation.dispatch(NavigationActions.back())}
          transparent>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
      <Title>{title}</Title>
      </Body>
      <Right style={{flex: 0}}>
      </Right>
    </Header>
  );
};

export default BookToolbar;
