import web3 from './web3';
import ElectionCreation from '../../contract-build/ElectionCreation.json';
// import { Contracts } from '../../services';

//how to get contract address on db!!!??
//this is unique deployed contract!
const instance = new web3.eth.Contract(
  ElectionCreation.abi,
  // '0x6243E3b58d5267B742786Aa8EAA82F37Cc4d6761'
  '0xD10D742567da8F4c4c139e74Fac6ff61f742f108'
);

export default instance;
