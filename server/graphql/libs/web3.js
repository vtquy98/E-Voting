import Web3 from 'web3';

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('ws://localhost:8545')
);

//deploy using ropsten network
// const HDWalletProvider = require('truffle-hdwallet-provider');
// const provider = new HDWalletProvider(
//   'gesture erosion jump interest lesson frame record whisper smile profit recall avocado',
//   'https://ropsten.infura.io/v3/998063e97b9845389fea82d03592512a'
// );

// const web3 = new Web3(provider);

export default web3;
