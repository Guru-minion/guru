import {
  RESET_ADD_REVIEW,
  INITIAL_REVIEW,
  ON_REVIEW_CHANGE,
  ON_RATING_CHANGE,
} from './ActionType';

const initialState = {
  userId: null,
  bookId: null,
  review: '',
  rating: 0,
};

const newReview = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type){
    case RESET_ADD_REVIEW:
      return initialState;
    case INITIAL_REVIEW:
      return {
        ...state,
        userId: payload.userId,
        bookId: payload.bookId,
      };
    case ON_REVIEW_CHANGE:
      return {
        ...state,
        review: payload,
      };
    case ON_RATING_CHANGE:
      return {
        ...state,
        rating: payload,
      };
    default:
      return state;
  }
};

export default newReview;