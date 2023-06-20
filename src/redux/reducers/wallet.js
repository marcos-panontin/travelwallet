// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_CURRENCIES,
  SAVE_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: -1, // valor numérico que armazena o id da despesa que esta sendo editada};
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };

  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload, id: state.expenses.length }],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  case SAVE_EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: -1,
      editor: false,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.payload.id), action.payload],
    };

  default:
    return state;
  }
};

export default wallet;
