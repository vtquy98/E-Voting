import Web3 from 'web3';
require('dotenv').config({
  path: './.env'
});

const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
  process.env.SEED_WORD,
  process.env.INFURA_API
);
const web3 = new Web3(provider);

export default web3;
