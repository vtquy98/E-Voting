import web3 from '../graphql/libs/web3';

// var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// const WALLET_ADDRESS_DEFAULT_PASSWORD =
//   process.env.WALLET_ADDRESS_DEFAULT_PASSWORD;

export const generateWallet = async () => {
  // const addressWallet = await web3.eth.personal.newAccount(
  //   WALLET_ADDRESS_DEFAULT_PASSWORD
  // );
  // await web3.eth.personal.unlockAccount(
  //   addressWallet,
  //   WALLET_ADDRESS_DEFAULT_PASSWORD
  // );
  const addressWallet = await web3.eth.accounts.create();
  return addressWallet.address;
};
