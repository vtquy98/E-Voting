import web3 from './web3';
import Election from '../../contract-build/Election.json';

export default address => {
  return new web3.eth.Contract(Election.abi, address);
};
