import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions';
import deletar from '../images/deletar.png'
import editar from '../images/editar.png'


class Table extends Component {
  handleDelete = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expenseId));
  };

  handleEdit = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expenseId));
  };

  render() {
    const { expenses } = this.props;
    const sortedExpenses = expenses.sort((a, b) => a.id - b.id);

    return (
      <div className='w-10/12 bg-blue-700 dark:bg-blue-900 flex justify-center shadow-xl pt-72 -mt-72 rounded-2xl'>

 <table className='bg-blue-700 dark:bg-blue-900 table-fixed w-10/12 z-10'>
        <thead>
          <tr className='text-white border-b border-white'>
            <th className='p-4 border-r'>Descrição</th>
            <th className='p-4 border-r'>Categoria</th>
            <th className='p-4 border-r'>Método de pagamento</th>
            <th className='p-4 border-r'>Valor</th>
            <th className='p-4 border-r'>Moeda</th>
            <th className='p-4 border-r'>Câmbio utilizado</th>
            <th className='p-4 border-r'>Valor convertido</th>
            <th className='p-4 border-r'>Moeda de conversão</th>
            <th className='p-4 border-l'>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>

          {sortedExpenses.map((expense) => (

            <tr key={ expense.id } className='text-teal-200 border-t border-teal-500 text-center'>
              <td className='p-5'>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{Number(expense.value).toFixed(2)}</td>
              <td>
                {expense.exchangeRates[expense.currency].name.match(/([^/]+)/)[0]}
              </td>
              <td>
                {Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>
                R$
                {' '}
                {Number(expense.value * expense.exchangeRates[expense.currency]
                  .ask).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </td>
              <td>Real</td>
              <td >
                <button
                  onClick={ () => this.handleEdit(expense.id) }
                  data-testid="edit-btn"
                  className='cursor-pointer mr-7'
                >
                  <img src={ editar }/>
                  
                </button>
                <button
                  onClick={ () => this.handleDelete(expense.id) }
                  data-testid="delete-btn"
                >
                  <img src={ deletar } />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
  idToEdit: wallet.idToEdit,
});

export default connect(mapStateToProps)(Table);
