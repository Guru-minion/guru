export const ADD_NEW_REVIEW_LOADING = 'src/Redux/UIs/ADD_NEW_REVIEW_LOADING';
export const FOLLOW_USER = 'src/Redux/UIs/FOLLOW_USER';
export const RELOAD_BOOK = 'src/Redux/UIs/RELOAD_BOOK';

export const reviewLoadingVisibility = (payload) => ({
  type: ADD_NEW_REVIEW_LOADING,
  payload,
});

export const reloadBook = (payload) => ({
  type: RELOAD_BOOK,
  payload,
});

export const followUser = (payload) => ({
  type: FOLLOW_USER,
  payload,
});