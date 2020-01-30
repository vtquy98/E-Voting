import { combineResolvers } from 'graphql-resolvers';
import { Elections, Users } from '../../../services';
import { isAdmin } from '../../libs';

//refactor here
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const compiledContract = require('../../../contract-build/Election.json');
const ADMIN_WALLET = '0x001526F8bF8A346abF4d2d60B7e5BA4BeC75FB28';

module.exports = {
  Mutation: {
    create_election: combineResolvers(
      isAdmin,
      async (_, { name, description, thumbnail }) => {
        const deployedContract = await new web3.eth.Contract(
          compiledContract.abi
        )
          .deploy({
            data: '0x' + compiledContract.evm.bytecode.object,
            arguments: [name, description]
          })
          .send({
            from: ADMIN_WALLET,
            gas: '6721975'
          });

        const election = new Elections({
          name,
          description,
          thumbnail,
          contract_address: deployedContract.options.address
        });

        await election.save();
        return election;
      }
    ),

    add_candidate: combineResolvers(
      isAdmin,
      async (_, { userId, description, ElectionAddress }) => {
        const userData = await Users.findOne({ id: userId });
        const addCandidate = await new web3.eth.Contract(
          compiledContract.abi,
          ElectionAddress
        ).methods
          .addCandidate(userData.wallet_address, userData.name, description)
          .send({ from: ADMIN_WALLET, gas: '6721975' });

        if (!addCandidate.events) {
          throw new Error('Faild to add candidate!');
        }
        return userData;
      }
    ),

    add_voter: combineResolvers(
      isAdmin,
      async (_, { userId, ElectionAddress }) => {
        const userData = await Users.findOne({ id: userId });
        const addVoter = await new web3.eth.Contract(
          compiledContract.abi,
          ElectionAddress
        ).methods
          .addVoter(userData.wallet_address, userData.name)
          .send({ from: ADMIN_WALLET, gas: '6721975' });

        if (!addVoter.events) {
          throw new Error('Faild to add candidate!');
        }
        return userData;
      }
    )
  }
};
