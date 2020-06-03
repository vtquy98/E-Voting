import Web3 from 'web3';
require('dotenv').config({
  path: './.env'
});
// https://ropsten.infura.io/v3/998063e97b9845389fea82d03592512a

const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  process.env.SEED_WORD,
  'https://ropsten.infura.io/v3/3b8f30848f594e238c2bf081c0c0908d'
);
const web3 = new Web3(provider);

export default web3;
