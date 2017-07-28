import {
  LOAD_LIST_DATA,
  ADD_ITEM,
  UPDATE_ITEM,
  RECEIVE_LIST_DATA,
} from './ActionType';

export const loadListData = (payload) => ({
  type: LOAD_LIST_DATA,
  payload,
});

export const updateItem = (payload) => ({
  type: UPDATE_ITEM,
  payload,
});

export const addItem = (payload) => ({
  type: ADD_ITEM,
  payload,
});

export const receiveListData = (payload) => ({
  type: RECEIVE_LIST_DATA,
  payload,
});