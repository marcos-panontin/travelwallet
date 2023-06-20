// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const fetchCurrencies = (currenciesArray) => ({
  type: FETCH_CURRENCIES,
  payload: currenciesArray,
});

export const getCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  const currenciesArray = Object
    .keys(currencies).filter((currency) => currency !== 'USDT');
  dispatch(fetchCurrencies(currenciesArray));
  return currencies;
};

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  payload: expenseId,
});

export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  payload: expenseId,
});

export const saveEditedExpense = (expense) => ({
  type: SAVE_EDIT_EXPENSE,
  payload: expense,
});
