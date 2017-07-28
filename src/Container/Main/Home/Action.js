import {
LOAD_BOOK,
  LOAD_BOOK_SUCCESS,
  LOAD_BOOK_ERROR,
  UPDATE_BOOK,
} from './ActionType';
import { receiveListData } from '../../../Redux/Action';
import { reloadBook } from '../../../Redux/UIs/Action';
import firebase from '../../../Lib/firebase';

export const loadBooks = () => ({
  type: LOAD_BOOK,
});

export const loadBooksSuccess = (payload) => ({
  type: LOAD_BOOK_SUCCESS,
  payload,
});

export const loadBooksError = (payload) => ({
  type: LOAD_BOOK_ERROR,
  payload,
});

export const loadListBooks = (update) => (dispatch) => {
  if(!update){
    dispatch(loadBooks());
  }

  let _books = [];

  firebase.getListBooks()
    .then(snapshot => {
      const books = snapshot.val();
      _books = Object.keys(books).map(key => books[key]);

      dispatch(receiveListData({
        key: 'books',
        data: _books,
      }));

      if(!update){
        dispatch(loadBooksSuccess(_books));
      }
    })
    .catch(error => {
      console.log('[Action.js] loadListBook', error);
      dispatch(loadBooksError(error));
    })
};

export const addToWishlist = (payload) => (dispatch) => {
  firebase.addToWishlist(payload)
    .then(() => {
      //dispatch(reloadBook(true));
    })
};