import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
// import store from '../redux/store';

describe('Testes do Login', () => {
  const invalidPassword = '12345';
  const validPassword = '123456';
  const invalidEmail = 'emailInvalido.com.br';
  const validEmail = 'emailValido@email.com.br';

  it('Testa se, ao renderizar a rota /, o componente Login é renderizado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  it('Testa se os campos fazem a validação corretamente - Email e Senha Inválidos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    act(() => {
      userEvent.type(emailInput, invalidEmail);
      userEvent.type(passwordInput, invalidPassword);
    });
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(loginButton).toBeDisabled();
  });
  it('Testa se os campos fazem a validação corretamente - Email válido e Senha inválida', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    act(() => {
      userEvent.type(emailInput, validEmail);
      userEvent.type(passwordInput, invalidPassword);
    });
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(loginButton).toBeDisabled();
  });
  it('Testa se os campos fazem a validação corretamente - Email inválido e Senha válida', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    act(() => {
      userEvent.type(emailInput, invalidEmail);
      userEvent.type(passwordInput, validPassword);
    });
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(loginButton).toBeDisabled();
  });
  it('Testa se os campos fazem a validação corretamente - Email e Senha válidos', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    act(() => {
      userEvent.type(emailInput, validEmail);
      userEvent.type(passwordInput, validPassword);
    });
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    expect(loginButton).not.toBeDisabled();
  });
  it('Testa se a rota é alterada ao clicar no botão de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    act(() => {
      userEvent.type(emailInput, validEmail);
      userEvent.type(passwordInput, validPassword);
      userEvent.click(loginButton);
    });

    expect(history.location.pathname).toBe('/carteira');
  });
});
