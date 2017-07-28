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
const HomeToolbar = (props) => {
  console.log('[Toolbar.js] HomeToolbar xxxx', props);
  const { navigation, title } = props;

  return (
    <Header>
      <Left style={{flex: 0}}>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right style={{flex: 0}}>
      </Right>
    </Header>
  );
};

export default HomeToolbar;
