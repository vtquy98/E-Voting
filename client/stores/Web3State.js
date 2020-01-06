import { flow, path, map, join } from 'lodash/fp';
import Router from 'next/router';
import { makeFetchAction } from 'redux-api-call';
import { gql } from '../libs/graphql';
import { respondToSuccess } from '../middlewares/api-reaction';
import { parse } from 'path';

// export const CREATE_VOTING = 'CreateVotingAPI';
// export const GET_VOTING = 'GetVotingAPI';
// export const ADD_VOTING_INFO_API = 'AddVotingInfoAPI';
// export const GET_VOTING_DATA_API = 'GetVotingDataAPI';
// export const GET_ALL_VOTING_API = 'GetAllVotingAPI';

// const GetAllVotingAPI = makeFetchAction(
//   GET_ALL_VOTING_API,
//   gql`
//     query {
//       get_all_voting {
//         name
//         createdAt
//         updatedAt
//         isClosed
//         votingCode
//       }
//     }
//   `
// );

// export const getAllVoting = () => {
//   return respondToSuccess(GetAllVotingAPI.actionCreator(), resp => {
//     if (resp.errors) {
//       console.error('Err:', resp.errors);
//       return;
//     }

//     return;
//   });
// };

// export const getAllVotingDataDataSelector = flow(
//   GetAllVotingAPI.dataSelector,
//   path('data.get_all_voting')
// );

// const GetVotingDataAPI = makeFetchAction(
//   GET_VOTING_DATA_API,
//   gql`
//     query($votingCode: Int!) {
//       get_voting_data(votingCode: $votingCode) {
//         imageDescription
//         candidates {
//           candidateName
//           candidateDescription
//         }
//       }
//     }
//   `
// );

// export const getVotingData = code => {
//   return respondToSuccess(
//     GetVotingDataAPI.actionCreator({ votingCode: parseInt(code) }),
//     resp => {
//       if (resp.errors) {
//         console.error('Err:', resp.errors);
//         return;
//       }

//       return;
//     }
//   );
// };

// export const getVotingDataDataSelector = flow(
//   GetVotingDataAPI.dataSelector,
//   path('data.get_voting_data')
// );

// export const resetDataGetVotingData = dispatch => {
//   dispatch(GetVotingDataAPI.resetter(['data', 'error']));
// };

// const AddVotingInfoAPI = makeFetchAction(
//   ADD_VOTING_INFO_API,
//   gql`
//     mutation(
//       $votingCode: Int!
//       $imageDescription: String!
//       $description: String!
//       $candidates: [createCandidateInput]!
//       $votingDatetime: DateTime!
//       $timeVoting: Int!
//       $votingType: Int!
//     ) {
//       create_voting_info(
//         votingCode: $votingCode
//         imageDescription: $imageDescription
//         description: $description
//         candidates: $candidates
//         votingDatetime: $votingDatetime
//         timeVoting: $timeVoting
//         votingType: $votingType
//       ) {
//         id
//       }
//     }
//   `
// );

// export const addVotingInfo = ({
//   votingCode,
//   imageDescription,
//   description,
//   candidates,
//   votingDatetime,
//   timeVoting,
//   votingType
// }) => {
//   return respondToSuccess(
//     AddVotingInfoAPI.actionCreator({
//       votingCode: parseInt(votingCode),
//       imageDescription,
//       description,
//       candidates,
//       votingDatetime,
//       timeVoting: parseInt(timeVoting),
//       votingType: parseInt(votingType)
//     }),
//     resp => {
//       if (resp.errors) {
//         console.error('Err:', resp.errors);
//         return;
//       }

//       return;
//     }
//   );
// };

// export const addVotingInfoDataSelector = flow(
//   AddVotingInfoAPI.dataSelector,
//   path('data.create_voting_info')
// );

// const GetVotingAPI = makeFetchAction(
//   GET_VOTING,
//   gql`
//     query($votingCode: Int!) {
//       get_voting(votingCode: $votingCode) {
//         name
//         votingCode
//       }
//     }
//   `
// );

// export const getVoting = code => {
//   return respondToSuccess(
//     GetVotingAPI.actionCreator({ votingCode: parseInt(code) }),
//     resp => {
//       if (resp.errors) {
//         console.error('Err:', resp.errors);
//         return;
//       }

//       return;
//     }
//   );
// };

// export const getVotingDataSelector = flow(
//   GetVotingAPI.dataSelector,
//   path('data.get_voting')
// );

// export const getVotingErrorSelector = flow(
//   GetVotingAPI.errorSelector,
//   path('errors'),
//   map('message'),
//   join(' | ')
// );

// export const resetDataGetVoting = dispatch => {
//   dispatch(GetVotingAPI.resetter(['data', 'error']));
// };

// const CreateVotingAPI = makeFetchAction(
//   CREATE_VOTING,
//   gql`
//     mutation($votingName: String!) {
//       create_voting(votingName: $votingName) {
//         id
//         votingCode
//       }
//     }
//   `
// );

// export const createVoting = votingName => {
//   return respondToSuccess(
//     CreateVotingAPI.actionCreator({ votingName }),
//     resp => {
//       if (resp.errors) {
//         console.error('Err:', resp.errors);
//         return;
//       }
//       const votingCode = resp.data.create_voting.votingCode;
//       Router.push('/create-voting?code=' + votingCode);
//       return;
//     }
//   );
// };

// export const createVotingDataSelector = flow(
//   CreateVotingAPI.dataSelector,
//   path('data.create_voting')
// );

// export const resetDataCreateVoting = dispatch => {
//   dispatch(CreateVotingAPI.resetter(['data', 'error']));
// };
// export const resetDataAddVotingInfo = dispatch => {
//   dispatch(AddVotingInfoAPI.resetter(['data', 'error']));
// };

// import getWeb3 from '../libs/getWeb3';

// export const WEB3_CONNECT = 'Web3ConnectAPI';

// const Web3ConnectAPI = makeFetchAction(WEB3_CONNECT, async () => {
//   const web3 = await getWeb3();
//   const accounts = await web3.eth.getAccounts();

//   if (web3.currentProvider.networkVersion !== '3') {
//     alert('Unknown network, please change network to Ropsten network');
//     return;
//   }

//   if (accounts.length > 0) {
//     const account = accounts[0];
//     const balance = await web3.eth.getBalance(account);
//     // dispatch({
//     //   type: WEB3_CONNECT,
//     //   web3,
//     //   account
//     // });
//   } else {
//     console.log('Account not found');
//   }
// });

// export const web3Connect = () =>
//   respondToSuccess(Web3ConnectAPI.actionCreator(), resp => {
//     if (resp.errors) {
//       console.error('Err:', resp.errors);
//       return;
//     }

//     console.log('resp', resp);
//     return;
//   });

export const GET_VOTING_DATA_API = 'GetVotingDataAPI';

const GetVotingDataAPI = makeFetchAction(
  GET_VOTING_DATA_API,
  gql`
    query {
      get_voting_data {
        candidate
      }
    }
  `
);

export const getVotingData = () => {
  return respondToSuccess(GetVotingDataAPI.actionCreator({}), resp => {
    if (resp.errors) {
      console.error('Err:', resp.errors);
      return;
    }

    return;
  });
};

export const getVotingDataDataSelector = flow(
  GetVotingDataAPI.dataSelector,
  path('data.get_voting_data')
);

export default {};
