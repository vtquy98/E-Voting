// import { Users } from '../../../services';
// import { combineResolvers } from 'graphql-resolvers';
// import { checkAuthentication } from '../../libs';
// import { path } from 'lodash/fp';

// import { default as Web3 } from 'web3';
// import { default as contract } from 'truffle-contract';
// import voting_artifacts from '../../../build/contracts/Voting.json';
// var contract = require('@truffle/contract');
// const Voting = contract(voting_artifacts);

// var Web3 = require('web3');
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// const abi = voting_artifacts.abi;

// const MyTruffleContract = contract({
//   abi: abi
// });

// MyTruffleContract.setProvider(web3.currentProvider);

// MyTruffleContract.at('0x1A98A4619a3a90c7c40F9Fc4610DEBAB0b8f58C8').then(
//   instance => {
//     // instance.allCandidates().then(candidates => console.log(candidates));
//     instance
//       .voteForCandidate(
//         '0x4e69636b00000000000000000000000000000000000000000000000000000000',
//         { from: '0x47A8D0AD555fc02311778f3b437cdE1732B8290B' }
//       )
//       .then(v => {
//         console.log(v);
//       });
//   }
// );

// console.log(web3.eth.getAccounts();
//
module.exports = {
  Query: {
    // get_voting_user: combineResolvers(
    //   checkAuthentication,
    //   (_, __, { currentUser }) => {
    //     return Users.findOne({ id: currentUser.id });
    //   }
    // ),
    // get_voting_data: async (_, { __ }) => {
    //   // console.log(MyTruffleContract);
    // }
  }
};
