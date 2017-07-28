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

const NormalToolbar = (props) => {
  const { navigation, title, showBack } = props;

  const renderBackButton = () => {
    if(showBack){
      return (
        <Button
          onPress={() => navigation.goBack()}
          transparent>
          <Icon name='arrow-back' />
        </Button>
      )
    }else {
      return null;
    }
  };

  return (
    <Header>
      <Left style={{flex: 0}}>
        { renderBackButton() }
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right style={{flex: 0}}>
      </Right>
    </Header>
  );
};

export default NormalToolbar;
