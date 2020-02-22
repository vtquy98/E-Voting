import web3 from './web3';
import ElectionCreation from '../../contract-build/ElectionCreation.json';
// import { Contracts } from '../../services';

//how to get contract address on db!!!??
//this is unique deployed contract!

const instance = new web3.eth.Contract(
  ElectionCreation.abi,
  process.env.CONTRACT_ADDRESS
);

export default instance;
