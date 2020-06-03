import Web3 from 'web3';
require('dotenv').config({
  path: './.env'
});

const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  process.env.SEED_WORD,
  'https://ropsten.infura.io/v3/998063e97b9845389fea82d03592512a'
);
const web3 = new Web3(provider);

export default web3;
