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
import { AppColors } from '@style/index';
import {clear} from '../../Lib/storage';

const HomeToolbar = (props) => {
  const {navigation, title} = props;

  const logout = () => {
    clear().then(() => {
      alert('Clear storage success. Refresh to logout');
    })
      .catch(() => navigateTo('Login'))
  };

  const goToSearch = () => {
    navigation.navigate('Search');
  };

  const navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });
    navigation.dispatch(actionToDispatch)
  };

  return (
    <Header style={{backgroundColor: AppColors.colorPrimary}}>
      <Left style={{flex: 1}}>
      </Left>
      <Body>
      <Title style={{ color : '#FFF'}}>{title}</Title>
      </Body>
      <Right style={{flex: 1}}>
        <Button
          onPress={() => goToSearch()}
          transparent>
          <Icon name='search'/>
        </Button>

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
