import {
  LOAD_LIST_DATA,
  ADD_ITEM,
  UPDATE_ITEM,
  RECEIVE_LIST_DATA,
} from './ActionType';

const entities = (state = {}, action ) => {
  const { type, payload } = action;
  switch (type){
    case LOAD_LIST_DATA:
      return {
        ...state,
        [payload]: undefined,
      };
    case ADD_ITEM:
      return {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          [payload.data.id]: payload.data,
        }
      };
    case UPDATE_ITEM:
      const { key, data } = payload;
      let x= {
        ...state,
        [key]: {
          ...state[key],
          [data.id]: data
        }
      };
      return x;
    case RECEIVE_LIST_DATA:
      let item = state[payload.key];
      if(!item){
        item = {};
      }
      payload.data.map(i => {
        item = {
          ...item,
          [i.id] : i
        };
      });

      return {
        ...state,
        [payload.key]: {
          ...state[payload.key],
          ...item,
        },
      };
    default:
      return state;
  }
};

export default entities;