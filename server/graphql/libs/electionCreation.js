import web3 from './web3';
import ElectionCreation from '../../contract-build/ElectionCreation.json';

const instance = new web3.eth.Contract(
  ElectionCreation.abi,
  process.env.CONTRACT_ADDRESS || '0x815185e7CB5954D7f6151B3ce83053A93e07e1a8'
);

export default instance;
