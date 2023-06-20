import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateEmailAndPassword } from '../services/formValidationFunctions';
import { saveEmail } from '../redux/actions';
import DarkmodeToggle from '../components/DarkmodeToggle';
import logo from '../images/logo.png'

class Login extends React.Component {
  state = {
    disabled: true,
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { email, password } = this.state;
      this.setState({
        disabled: !validateEmailAndPassword(email, password),
      });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { history, dispatch } = this.props;

    // CHANGING ROUTE TO /CARTEIRA
    history.push('/carteira');

    // SAVING EMAIL INTO GLOBALSTATE
    const { email } = this.state;
    dispatch(saveEmail(email));
  };

  render() {
    const { disabled, email, password } = this.state;
    return (

      <div className='w-96 p-2 m-2 p-10 rounded-lg bg-white dark:bg-zinc-800 shadow-2xl'>
        <div className='flex items-center justify-between text-3xl'>
          <img src={logo} />
          <h1><span className='text-blue-700 dark:text-blue-300 font-light' >Travel</span><span className='text-teal-600 font-bold'>Wallet</span></h1>
        <DarkmodeToggle />

        </div>
        <form onSubmit={ this.handleSubmit } className='flex flex-col '>
          <input
          className='p-2 mt-6 rounded-lg border border-blue-700 dark:border-blue-300 text-blue-700 dark:text-blue-300 placeholder-blue-700  dark:placeholder-blue-300 dark:bg-zinc-800'
            name="email"
            type="email"
            value={ email }
            placeholder="Email"
            data-testid="email-input"
            required
            onChange={ (event) => this.handleChange(event) }
          />
          <input
          className='p-2 my-2 rounded-lg border border-blue-700 dark:border-blue-300 text-blue-700 dark:text-blue-300 placeholder-blue-700  dark:placeholder-blue-300 dark:bg-zinc-800'            name="password"
            type="password"
            value={ password }
            placeholder="Senha"
            data-testid="password-input"
            required
            onChange={ (event) => this.handleChange(event) }
          />
          <input
          className='p-2 rounded-lg border border-blue-700 bg-blue-700 cursor-pointer text-white disabled:opacity-75 disabled:cursor-not-allowed'
            type="submit"
            value="Entrar"
            disabled={ disabled }
          />

        </form>
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape(
    { push: PropTypes.func.isRequired },
  ).isRequired,
};

export default connect()(Login);
