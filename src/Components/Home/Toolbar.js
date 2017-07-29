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
import {clear} from '../../Lib/storage';

const HomeToolbar = (props) => {
  const {navigation, title} = props;

  const logout = () => {
    clear().then(() => {
      alert('Clear storage success. Refresh to logout');
    })
      .catch(() => navigateTo('Login'))
  };

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
        <Button
          onPress={() => logout()}
          transparent>
          <Icon name='logo-freebsd-devil'/>
        </Button>
      </Right>
    </Header>
  );
};

export default HomeToolbar;
