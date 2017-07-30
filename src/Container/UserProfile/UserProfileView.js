import React, {Component} from 'react';
import {
  Container,
  Content,
  H3,
  List,
  ActionSheet,
} from 'native-base';
import { ImagePicker } from 'expo';
import UserInfo from '../../Components/Profile/UserInfo';
import Activity from '../../Components/Common/ActivityItem';
import firebase from '../../Lib/firebase';

const BUTTONS = ["Gallery", "Camera", "Cancel"];
const CANCEL_INDEX = 2;

export default class UserProfileView extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  _changeAvatar = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Get image from"
      },
      buttonIndex => {
        if(buttonIndex === 0){
          //open galery
          this._getPhotoFromGallery();
        }else if(buttonIndex === 1){
          //open camera

        }else {
          return;
        }
      }
    )

  };

  _getPhotoFromGallery = async () => {
    const {user} = this.props;
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      base64: true,
    });

    if (!result.cancelled) {
      firebase.uploadImage(result.base64, result.uri)
        .then(url => {
          console.log('[ProfileView.js] xxx1', url);
          return firebase.updateUserInfo(user.id, { avatar: url});
        })
        .then(response => {
          console.log('[ProfileView.js] xxxx final', response);
        })
    }
  };

  render() {
    const {user, activities} = this.props;

    return (
      <Container style={styles.container}>
        <Content>
          <UserInfo
            { ...user}
            changeAvatar={this._changeAvatar}
          />

          <List style={styles.activities}>
            {
              activities.map((activity) =>
                (<Activity
                  key={activity.id}
                  user={user}
                  {...activity}
                />))
            }
          </List>

        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#FFF',
  },
  activities: {
    marginHorizontal: 16,
    marginTop: 16,
  }
};
