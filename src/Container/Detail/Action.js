import {
  LOAD_BOOK_DETAIL,
  LOAD_BOOK_DETAIL_SUCCESS,
  LOAD_BOOK_DETAIL_ERROR,
} from './ActionType';
import firebase from '../../Lib/firebase';

export const loadBookById = (id) => dispatch => {
  dispatch({
    type: LOAD_BOOK_DETAIL,
  });

  firebase._getBookById(id)
    .then(snapshot => {
      const book = snapshot.val();
      dispatch({
        type: LOAD_BOOK_DETAIL_SUCCESS,
        payload: book
      })
    })
    .catch(error => dispatch({
      type: LOAD_BOOK_DETAIL_ERROR,
      payload: error,
    }))

};