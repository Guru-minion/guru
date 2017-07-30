import React from 'react';
import {
  Body,
  Button,
  Header,
  Left,
  Icon,
  Right,
  Text,
  Thumbnail,
  View,
} from 'native-base';
import {AppColors} from '@style/index';

const UserInfo = (props) => {
  const {email, name = 'Khac Vy', avatar, address = 'HCM', changeAvatar} = props;

  return (
    <View style={styles.container}>
      <Thumbnail
        style={styles.avatar}
        defaultSource={require('../../Assets/Images/avatar_holder.png')}
        source={{uri: avatar}}
      >
        <Button
          onPress={changeAvatar}
          transparent
          style={{width: 120,
            height: 120, flex : 1}}
        />
      </Thumbnail>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{email}</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 32,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.divider,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    color: AppColors.colorPrimaryText,
    fontSize: 26,
    marginTop: 16,
  },
  address: {
    color: AppColors.colorSecondaryText,
    fontSize: 22,
    marginTop: 4,
  },

};

export default UserInfo;
