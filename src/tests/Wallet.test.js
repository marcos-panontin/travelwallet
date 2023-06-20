import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
// import store from '../redux/store';

describe('Testes da Tabela de gastos', () => {
  it('Testa se os elementos do formulário são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/carteira');
    });

    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const valueInput = screen.getByLabelText('Valor');
    const descriptionInput = screen.getByLabelText('Descrição');
    const currencyInput = screen.getByLabelText('Moeda:');
    const methodInput = screen.getByLabelText('Método de pagamento:');
    const tagInput = screen.getByLabelText('Categoria:');

    expect(addExpenseButton).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
  it.only('Testa a inserção e edição de uma despesa na tabela', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Moeda:')).toHaveTextContent('USD');
    });

    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });
    const valueInput = screen.getByLabelText('Valor');
    const descriptionInput = screen.getByLabelText('Descrição');
    const currencyInput = await screen.findByLabelText('Moeda:');
    const methodInput = screen.getByLabelText('Método de pagamento:');
    const tagInput = screen.getByLabelText('Categoria:');

    act(() => {
      userEvent.type(valueInput, '10');
      userEvent.type(descriptionInput, 'Descrição');
      userEvent.selectOptions(currencyInput, 'CAD');
      userEvent.selectOptions(methodInput, 'Dinheiro');
      userEvent.selectOptions(tagInput, 'Alimentação');
    });

    expect(screen.getByRole('option', { name: 'CAD' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Dinheiro' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Alimentação' }).selected).toBe(true);

    act(() => {
      userEvent.click(addExpenseButton);
    });

    // EDITING THE EXPENSE PREVIOUSLY ADDED

    const editExpenseButton = await screen.findByTestId('edit-btn');
    act(() => {
      userEvent.click(editExpenseButton);
    });
    expect(editExpenseButton).toBeInTheDocument();

    act(() => {
      userEvent.type(valueInput, '20');
      userEvent.type(descriptionInput, 'Descrição2');
      userEvent.selectOptions(currencyInput, 'ARS');
      userEvent.selectOptions(methodInput, 'Cartão de crédito');
      userEvent.selectOptions(tagInput, 'Lazer');
    });

    expect(screen.getByRole('option', { name: 'ARS' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Cartão de crédito' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Lazer' }).selected).toBe(true);

    const saveEditExpenseButton = await screen.findByRole('button', { name: /editar despesa/i });
    act(() => {
      userEvent.click(saveEditExpenseButton);
    });

    // DELETING THE EXPENSE PREVIOUSLY EDITED

    const deleteExpenseButton = await screen.findByTestId('delete-btn');
    act(() => {
      userEvent.click(deleteExpenseButton);
    });

    screen.debug();
  });
});
