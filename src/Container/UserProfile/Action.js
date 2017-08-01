import { followUser } from '../../Redux/UIs/Action';
import firebase from '../../Lib/firebase';

export const follow = (currentUserId, userInfo) => (dispatch) => {
  dispatch(followUser(true));

  firebase.follow(currentUserId, userInfo)
    .then(() => dispatch(followUser(false)));
};