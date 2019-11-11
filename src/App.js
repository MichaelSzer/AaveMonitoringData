import React from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import * as LendingPoolAddressesProvider from './contracts/LendingPoolAddressesProvider';
import * as LendingPool from './contracts/LendingPool';

async function LoadWeb3() {
  const Web3 = require('web3');
  const providerWebSocket = new Web3.providers.WebsocketProvider("wss://kovan.infura.io/ws");
  const providerHttps = new Web3.providers.HttpProvider("https://kovan.infura.io/v3/375d91eea988403eb8d1bcd27821c4d9");
  window.web3 = new Web3(providerWebSocket);
  window.web3Https = new Web3(providerHttps);
  
  // Load Lending Pool Addresses Provider
  window.lendingPoolAddressesProvider = new window.web3Https.eth.Contract(LendingPoolAddressesProvider.abi, LendingPoolAddressesProvider.address);

  const addrLendingPool = await window.lendingPoolAddressesProvider.methods.getLendingPool().call()
  LendingPool.setAddress(addrLendingPool);
  
  window.lendingPoolWebSocket = new window.web3.eth.Contract(LendingPool.abi, addrLendingPool);
  window.lendingPoolHttps = new window.web3Https.eth.Contract(LendingPool.abi, addrLendingPool);
  window.ready = true;
  /* const addressesAToken = await window.lendingPoolHttps.methods.getReserves().call();
  AToken.setAddresses(addressesAToken);
  window.reserveOne = new window.web3.eth.Contract(LendingPool.abi, addrLendingPool); */
}

function App() {
  
  LoadWeb3();

  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
