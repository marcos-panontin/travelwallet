import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className='flex flex-col items-center'>
        <Header />
        <WalletForm />
        <Table />
      </div>

    );
  }
}

export default Wallet;
