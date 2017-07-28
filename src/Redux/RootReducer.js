import { combineReducers } from 'redux';

import Nav from '../Navigator/NavigatorState';
import entities from './Entities';
import ui from './UIs/Reducer';
import books from '../Container/Main/Home/Reducer';
import book from '../Container/Detail/Reducer';
import login from '../Container/Login/Reducer';
import newReview from '../Container/Review/Reducer';

// Combine all
const appReducer = combineReducers({
  nav: Nav,
  entities,
  books,
  login,
  book,
  newReview,
  ui,
});

// Setup root reducer
const rootReducer = (state, action) => {
  const newState = (action.type === 'RESET') ? undefined : state;
  return appReducer(newState, action);
};

export default rootReducer;