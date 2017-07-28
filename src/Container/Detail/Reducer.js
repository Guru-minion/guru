import {
  LOAD_BOOK_DETAIL,
  LOAD_BOOK_DETAIL_SUCCESS,
  LOAD_BOOK_DETAIL_ERROR,
} from './ActionType';

const initialState = {
  loading: false,
  error: '',
};

const book = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type){
    case LOAD_BOOK_DETAIL:
      return {
        ...state,
        loading: true,
      };
    case LOAD_BOOK_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        [payload.id]: payload
      };
    case LOAD_BOOK_DETAIL_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };
    default:
      return state;
  }
};

export default book;