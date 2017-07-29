import {
  RESET_ADD_REVIEW,
  INITIAL_REVIEW,
  ON_REVIEW_CHANGE,
  ON_RATING_CHANGE,
} from './ActionType';
import { reloadBook } from '../../Redux/UIs/Action';
import firebase from '../../Lib/firebase';

export const reset = () => ({
  type: RESET_ADD_REVIEW,
});


export const initialReview = (payload) => ({
  type: INITIAL_REVIEW,
  payload,
});

export const onReviewChange = (payload) => ({
  type: ON_REVIEW_CHANGE,
  payload,
});

export const onRatingChange = (payload) => ({
  type: ON_RATING_CHANGE,
  payload,
});

export const addReview = () => (dispatch, getState) => {
  const review = getState().newReview;
  firebase.addReview(review)
    .then(() => {
      dispatch(reset());
    })
};

export const loadCurrentReview = (id) => (dispatch) => {
  firebase.getReviewById(id)
    .then(snapshot => {
      const review = snapshot.val();
      dispatch(initialReview(review));
    })
};