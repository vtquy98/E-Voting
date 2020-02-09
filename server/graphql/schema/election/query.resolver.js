import { Users } from '../../../services';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin } from '../../libs';

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const compiledContract = require('../../../contract-build/Election.json');

module.exports = {
  Query: {
    // check authen later
    get_all_candidate: async (_, { ElectionAddress }) => {
      const candidateList = await new web3.eth.Contract(
        compiledContract.abi,
        ElectionAddress
      ).methods
        .allCandidates()
        .call();

      if (!candidateList) {
        throw new Error('Faild to get call candidate!');
      }

      const candidateInfo = await Promise.all(
        candidateList.map(async candidate => {
          const user = await Users.findOne({ wallet_address: candidate });
          return user;
        })
      );

      return candidateInfo;
    },

    get_all_voter: combineResolvers(isAdmin, async (_, { ElectionAddress }) => {
      const voterList = await new web3.eth.Contract(
        compiledContract.abi,
        ElectionAddress
      ).methods
        .allVoters()
        .call();

      if (!voterList) {
        throw new Error('Faild to get all voter!');
      }

      const voterInfo = await Promise.all(
        voterList.map(async voter => {
          const user = await Users.findOne({ wallet_address: voter });
          return user;
        })
      );

      return voterInfo;
    })
  }
};
