import { Users } from '../../../services';

import { combineResolvers } from 'graphql-resolvers';
import { checkAuthentication } from '../../libs';

import { path } from 'lodash/fp';
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';
import voting_artifacts from '../../../build/contracts/Voting.json';

const Voting = contract(voting_artifacts);
const web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

module.exports = {
  Query: {
    // get_voting_user: combineResolvers(
    //   checkAuthentication,
    //   (_, __, { currentUser }) => {
    //     return Users.findOne({ id: currentUser.id });
    //   }
    // ),
    get_voting_data: async (_, { __ }) => {
      //   return Categories.findOne({ });
      //   web3.eth.getAccounts().then(console.log);

      console.log(voting_artifacts[Object.keys(voting_artifacts)[12]);
      //   console.log(Voting.options.address);

      //   web3.eth.net
      //     .isListening()
      //     .then(s => {
      //       console.log("We're still connected to the node");
      //       console.log(web3.currentProvider);
      //     })
      //     .catch(e => {
      //       console.log('Lost connection to the node, reconnecting');
      //       web3.setProvider(
      //         new web3.providers.HttpProvider('http://localhost:8545')
      //       );
      //     });
    }
  }
};
