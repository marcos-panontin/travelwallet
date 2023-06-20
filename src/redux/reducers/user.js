// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_EMAIL } from '../actions';

const USER_INITIAL_STATE = {
  email: '', // string que armazena o email da pessoa usuária
};

const user = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};

export default user;
