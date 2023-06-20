import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, saveExpense, saveEditedExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { editor, idToEdit, expenses } = this.props;

    if (editor && prevProps.idToEdit !== idToEdit) {
      const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
      this.setState({
        value: expenseToEdit.value,
        description: expenseToEdit.description,
        currency: expenseToEdit.currency,
        method: expenseToEdit.method,
        tag: expenseToEdit.tag,
      });
    }
  }

  resetForm = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleSubmit = async (event) => {
    const { dispatch } = this.props;

    event.preventDefault();

    const exchangeRates = await dispatch(getCurrencies());

    const expense = {
      ...this.state,
      exchangeRates,
    };

    dispatch(saveExpense(expense));

    this.resetForm();
  };

  handleSaveEdit = async (event) => {
    const { dispatch, idToEdit, expenses } = this.props;

    event.preventDefault();

    const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);

    const expense = {
      ...expenseToEdit,
      ...this.state,
    };
    dispatch(saveEditedExpense(expense));

    this.resetForm();
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { currencies, editor } = this.props;

    const { value, description, currency, method, tag } = this.state;

    return (
      <form className='py-4 px-10 bg-zinc-100 rounded-b-xl dark:bg-zinc-800 text-blue-700 dark:text-blue-300 before:content-[""] before:bg-blue-700 w-3/4 z-10' onSubmit={ editor ? this.handleSaveEdit : this.handleSubmit }>

        
        <div className='w-full flex flex-row items-center justify-between mb-2 pt-2'>

          <label htmlFor="descrição">
            <span className='font-bold'>Descrição da despesa:</span>
          <input
          className={`pl-2 ml-2 rounded border ${editor ?  'border-red-700':  'border-blue-700' } text-blue-700 dark:text-blue-300 placeholder-blue-700 bg-zinc-100 dark:bg-zinc-800 dark:focus:bg-zinc-900`}
            onChange={ this.handleChange }
            name="description"
            id="descrição"
            type="text"
            data-testid="description-input"
            value={ description }
          />
        </label>


        <label htmlFor="tag">
            <span className='font-bold'>Categoria da despesa:</span>
            <select
            className={`ml-2 rounded border ${editor ?  'border-red-700':  'border-blue-700' } text-blue-700 dark:text-blue-300 placeholder-blue-700 bg-zinc-100 dark:bg-zinc-800 dark:focus:bg-zinc-900`}
            onChange={ this.handleChange }
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Transporte">Transporte</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        </div>

        <div className='w-full flex flex-row items-center justify-between mb-2 pt-2'>
                  
        <label htmlFor="valor">
            <span className='font-bold'>Valor:</span>
            <input
          className={`pl-2 ml-2 rounded border ${editor ?  'border-red-700':  'border-blue-700' } text-blue-700 dark:text-blue-300 placeholder-blue-700 bg-zinc-100 dark:bg-zinc-800 dark:focus:bg-zinc-900`}
            onChange={ this.handleChange }
            name="value"
            id="valor"
            type="number"
            data-testid="value-input"
            value={ value }
          />
        </label>


        <label htmlFor="currency">
            <span className='font-bold'>Moeda:</span>
            <select
            className={`ml-2 rounded border ${editor ?  'border-red-700':  'border-blue-700' } text-blue-700 dark:text-blue-300 placeholder-blue-700 dark:bg-zinc-800 dark:focus:bg-zinc-900`}
            onChange={ this.handleChange }
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ currency }
          >
            {currencies
              .map((currencyItem) => (
                <option
                  key={ currencyItem }
                  value={ currencyItem }
                >
                  {currencyItem}
                </option>))}
          </select>
        </label>

        <label htmlFor="method">
            <span className='font-bold'>Método de pagamento:</span>
            <select
            className={`ml-2 rounded border ${editor ?  'border-red-700':  'border-blue-700' } text-blue-700 dark:text-blue-300 placeholder-blue-700 dark:bg-zinc-800 dark:focus:bg-zinc-900`}
            onChange={ this.handleChange }
            name="method"
            id="method"
            data-testid="method-input"
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          </label>
        </div>

        
        <div className='flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 w-full py-5'>
        <input
          className={`py-2 px-4 rounded ${editor?  'bg-red-600 hover:bg-red-500' :  'bg-teal-600 dark:bg-teal-900 dark:hover:bg-teal-600 hover:bg-teal-500' } text-white cursor-pointer font-bold`}
          type="submit"
          value={ editor ? 'Salvar alterações' : 'Adicionar despesa' }
        />
        </div>

        </form>

    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ wallet: { currencies, editor, idToEdit, expenses } }) => ({
  currencies,
  editor,
  idToEdit,
  expenses,
});

export default connect(mapStateToProps)(WalletForm);
