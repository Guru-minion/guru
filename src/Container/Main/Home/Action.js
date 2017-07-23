import {
  LOAD_LIST_DATA,
  RECEIVE_LIST_DATA,
} from '../../../Redux/ActionType';
import firebase from '../../../Lib/firebase';

export const preLoadListBooks = (payload) => ({
  type: LOAD_LIST_DATA,
  payload,
});

export const receiveListBooks = (payload) => ({
  type: RECEIVE_LIST_DATA,
  payload,
});

export const loadListBooks = (data) => (dispatch) => {
  dispatch(preLoadListBooks('books'));
  dispatch(receiveListBooks({
    key: 'books',
    data,
  }));
};