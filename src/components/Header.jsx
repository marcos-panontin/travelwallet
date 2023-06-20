import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../images/logo.png'
import profilevector from '../images/profilevector.png'
// import moedas from '../images/Moedas.png'
import moedas from '../images/Moedas.svg'
import DarkmodeToggle from './DarkmodeToggle';

class Header extends Component {
  expensesSum = () => {
    const { expenses } = this.props;

    return expenses.reduce((previousValue, currentValue, currentIndex) => {
      const exchangeRate = expenses[currentIndex].exchangeRates[currentValue
        .currency].ask;
      return previousValue + (currentValue.value * exchangeRate);
    }, 0);
  };

  render() {
    const { email } = this.props;

    return (
      <div className='w-3/4 flex flex-row items-center justify-between bg-white dark:bg-zinc-700  p-10 rounded-t-xl z-10'>

        <div className='flex flex-row items-center'>
          <img className="m-2" src={logo} />
          <h1 className='text-5xl'><span className='text-blue-700 dark:text-blue-300 font-light' >Travel</span><span className='text-teal-600 font-bold'>Wallet</span></h1>
          
          </div>

        <p data-testid="total-field" className='flex flex-row items-center text-blue-700 dark:text-blue-300'>
          <svg className='fill-blue-600 dark:fill-blue-300 mr-2' width="29" height="29" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.8398 0C13.3852 0 8.97131 1.57895 8.97131 3.58853V7.17705C3.58853 7.35648 0 8.86366 0 10.7656V14.3541V17.9426V21.5312C0 23.4869 4.41389 25.1197 9.86845 25.1197H9.98866C11.3021 25.1197 12.5903 25.021 13.8517 24.8326C15.1041 27.1741 17.6089 28.7046 20.4725 28.7046C24.0916 28.7046 27.1382 26.259 28.0515 22.9325C28.4265 22.5754 28.6687 22.1394 28.71 21.646V17.9426V3.58853C28.71 1.57895 24.2961 0 18.8416 0L18.8398 0ZM9.86845 8.97131C14.3541 8.97131 17.9426 9.77873 17.9426 10.7656C17.9426 11.7524 14.3541 12.5598 9.86845 12.5598C5.38279 12.5598 1.79426 11.7524 1.79426 10.7656C1.79426 9.77873 5.38279 8.97131 9.86845 8.97131ZM9.86845 23.3254C5.00599 23.3254 2.24283 22.0515 1.79426 21.5312V20.0957C3.94558 21.0144 6.45038 21.5473 9.07897 21.5473C9.35708 21.5473 9.6334 21.5419 9.90792 21.5294C10.8194 21.5276 11.756 21.4755 12.6783 21.3768C12.6011 22.0425 12.7177 22.6544 12.899 23.2375C12.0879 23.2752 11.1639 23.329 10.2291 23.329C10.1035 23.329 9.9761 23.3272 9.8505 23.3254H9.86845ZM12.6854 19.5754C11.8475 19.6777 10.8768 19.7369 9.89357 19.7369C9.88459 19.7369 9.87562 19.7369 9.86845 19.7369C5.00779 19.7369 2.24462 18.463 1.79606 17.9426V16.4354C3.99044 17.3954 6.54906 17.9534 9.23687 17.9534C9.45935 17.9534 9.68184 17.9498 9.90254 17.9426C11.0365 17.9408 12.183 17.8637 13.3063 17.713C12.9528 18.262 12.7841 18.8864 12.6926 19.5341L12.6854 19.5754ZM9.86845 16.1484C5.00599 16.1484 2.24283 14.8744 1.79426 14.3541V12.7393C3.98865 13.6992 6.54727 14.2572 9.23507 14.2572C9.45756 14.2572 9.68005 14.2536 9.90074 14.2464C10.0586 14.2536 10.2811 14.2572 10.5054 14.2572C13.1932 14.2572 15.75 13.6992 18.0664 12.6926L17.9444 13.3493C16.5503 13.8248 15.375 14.6358 14.4725 15.689C13.1232 15.9851 11.582 16.1484 10.003 16.1484C9.95636 16.1484 9.90971 16.1484 9.86486 16.1484H9.86845ZM20.4725 26.9139C17.0939 26.9139 14.3541 24.1741 14.3541 20.7955C14.3541 17.4169 17.0939 14.6771 20.4725 14.6771C23.8511 14.6771 26.591 17.4169 26.591 20.7955C26.591 24.1741 23.8511 26.9139 20.4725 26.9139ZM26.9139 14.3541C26.5999 14.6537 26.2232 14.8924 25.8069 15.0467C25.2901 14.6089 24.7303 14.2213 24.1239 13.9091C25.1556 13.6346 26.0993 13.2775 26.9821 12.8146L26.9139 14.3541ZM26.9139 10.7656C26.4833 11.3218 24.0252 12.4522 19.7369 12.5598V10.7656H19.7566C22.3457 10.7656 24.8057 10.2183 27.0288 9.23148L26.9139 10.7656ZM26.9139 7.17705C26.4654 7.76916 23.7022 8.97131 18.8398 8.97131H18.4271C16.2506 7.84093 13.6759 7.17705 10.9468 7.17705C10.9217 7.17705 10.8948 7.17705 10.8696 7.17705H10.7656V5.56221C12.96 6.52215 15.5186 7.08016 18.2064 7.08016C18.4289 7.08016 18.6514 7.07657 18.8721 7.0694C19.03 7.07657 19.2524 7.08016 19.4767 7.08016C22.1645 7.08016 24.7214 6.52215 27.0377 5.51556L26.9157 7.17705H26.9139ZM18.8398 5.38279C14.3541 5.38279 10.7656 4.57537 10.7656 3.58853C10.7656 2.60168 14.3541 1.79426 18.8398 1.79426C23.3254 1.79426 26.9139 2.60168 26.9139 3.58853C26.9139 4.57537 23.3254 5.38279 18.8398 5.38279Z"/>
          <path d="M18.8397 19.7369H19.7369V25.1197H21.5311V16.1484H20.634L18.8397 19.7369Z"/>
          <circle cx="20" cy="21" r="7"/>
          <rect x="17" y="20" width="7" height="2" className='fill-white dark:fill-zinc-700'/>
          </svg>

          <span className='font-bold pr-2 '>Total de despesas: </span >R$ {this.expensesSum().toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}       </p>

      <div className='flex flex-row items-center'>
          <img className="m-2"  src={profilevector} />
        <p data-testid="email-field" className='text-teal-500 font-bold'>{email}</p>    
        </div>
                <DarkmodeToggle />

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

export default connect(mapStateToProps)(Header);
