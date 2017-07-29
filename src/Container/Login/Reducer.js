import {
  LOGIN_SUCCESS,
} from './ActionType';


const user = (state = {}, action) => {
  const { type, payload } = action;
  switch (type){
    case LOGIN_SUCCESS:
      return {
        state,
        ...payload,
      };
    default: return state;
  }
};

export default user;