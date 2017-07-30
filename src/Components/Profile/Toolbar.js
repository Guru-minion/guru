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
import {NavigationActions} from 'react-navigation';

const ProfileToolbar = (props) => {
  const {navigation, title} = props;

  const navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });
    navigation.dispatch(actionToDispatch)
  };

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

export default ProfileToolbar;
