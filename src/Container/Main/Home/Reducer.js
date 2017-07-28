import {
  LOAD_BOOK,
  LOAD_BOOK_SUCCESS,
  LOAD_BOOK_ERROR,
} from './ActionType';

const initialState = {
  loading: false,
  data: [],
  error: '',
};

const books = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOAD_BOOK:
      return {
        ...state,
        loading: true,
      };
    case LOAD_BOOK_SUCCESS:
      let itemIds = payload.map(item => item.id);
      return {
        ...state.books,
        loading: false,
        data: itemIds,
      };
    case LOAD_BOOK_ERROR:
      return {
        ...state.books,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default books;