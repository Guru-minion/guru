import {
  ADD_NEW_REVIEW_LOADING,
  RELOAD_BOOK,
  FOLLOW_USER,
} from './Action';

const initialState = {
  addNewReviewLoading: false,
  reloadBook: false,
  followLoading: false,
};

const ui = (state = initialState, action ) => {
  const { type, payload } = action;
  switch (type){
    case ADD_NEW_REVIEW_LOADING:
      return {
        ...state,
        addNewReviewLoading: payload,
      };
    case RELOAD_BOOK:
      return {
        ...state,
        reloadBook: payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        followLoading: payload,
      };
    default:
      return state;
  }
};

export default ui;