import {
  LOGIN,
  LOGIN_SUCCESS,
  UPDATE_USER_INFO,
} from './ActionType';
import firebase from '../../Lib/firebase';

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data
});

export const updateUserInfo = (data) => ({
  type: UPDATE_USER_INFO,
  payload: data
});

export const getUserInfo = (data) => (dispatch) => {
  firebase.getUserInfo(data.id)
    .then(snapshot => {
      dispatch(loginSuccess(snapshot.val()));
    });
};