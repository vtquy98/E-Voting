import { flow, path, map, join } from 'lodash/fp';
import Router from 'next/router';
import { makeFetchAction } from 'redux-api-call';
import { gql } from '../libs/graphql';
import { respondToSuccess } from '../middlewares/api-reaction';

export const CREATE_VOTING = 'CreateVotingAPI';
export const ADD_VOTING_INFO_API = 'AddVotingInfoAPI';
export const GET_VOTING_DATA_API = 'GetVotingDataAPI';
export const GET_ALL_VOTING_API = 'GetAllVotingAPI';

//NEWEST
export const GET_ALL_ELECTION_API = 'GetAllElectionAPI';
export const GET_ELECTION = 'GetElectionAPI';
export const GET_ALL_CANDIDATES_API = 'GetAllCandidatesAPI';
export const GET_ALL_VOTERS_API = 'GetAllVotersAPI';
export const GET_TOTAL_VOTES_COUNT_API = 'GetTotalVotesCountAPI';

const GetTotalVotesCountAPI = makeFetchAction(
  GET_TOTAL_VOTES_COUNT_API,
  gql`
    query($electionId: String!) {
      get_total_votes_count(electionId: $electionId) {
        totalVoteCount
      }
    }
  `
);

export const getTotalVotesCount = electionId => {
  return respondToSuccess(
    GetTotalVotesCountAPI.actionCreator({ electionId }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      return;
    }
  );
};

export const getTotalVotesCountDataSelector = flow(
  GetTotalVotesCountAPI.dataSelector,
  path('data.get_total_votes_count')
);

export const resetDatagetTotalVotesCount = dispatch => {
  dispatch(GetTotalVotesCountAPI.resetter(['data', 'error']));
};

const GetAllVotersAPI = makeFetchAction(
  GET_ALL_VOTERS_API,
  gql`
    query($electionId: String!) {
      get_all_candidates(electionId: $electionId) {
        id
        fullName
        avatar
      }
    }
  `
);

export const getAllVoters = electionId => {
  return respondToSuccess(
    GetAllVotersAPI.actionCreator({ electionId }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      return;
    }
  );
};

export const getAllVotersDataSelector = flow(
  GetAllVotersAPI.dataSelector,
  path('data.get_all_voters')
);

export const resetDataGetAllVoters = dispatch => {
  dispatch(GetAllVotersAPI.resetter(['data', 'error']));
};

const GetAllCandidatesAPI = makeFetchAction(
  GET_ALL_CANDIDATES_API,
  gql`
    query($electionId: String!) {
      get_all_candidates(electionId: $electionId) {
        id
        fullName
        avatar
        # description
      }
    }
  `
);
export const getAllCandidates = electionId => {
  return respondToSuccess(
    GetAllCandidatesAPI.actionCreator({ electionId }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      return;
    }
  );
};

export const getAllCandidatesDataSelector = flow(
  GetAllCandidatesAPI.dataSelector,
  path('data.get_all_candidates')
);

export const resetDataGetAllCandidates = dispatch => {
  dispatch(GetAllCandidatesAPI.resetter(['data', 'error']));
};

const GetElectionAPI = makeFetchAction(
  GET_ELECTION,
  gql`
    query($id: String!) {
      get_election(id: $id) {
        name
        id
        description
        thumbnail
        electionAddress
        createdAt
        updatedAt
        state
        shortenCode
        electionOwner
        votingTime
      }
    }
  `
);

export const getElection = id => {
  return respondToSuccess(GetElectionAPI.actionCreator({ id }), resp => {
    if (resp.errors) {
      console.error('Err:', resp.errors);
      return;
    }

    return;
  });
};

export const getElectionDataSelector = flow(
  GetElectionAPI.dataSelector,
  path('data.get_election')
);

export const getElectionErrorSelector = flow(
  GetElectionAPI.errorSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataGetElection = dispatch => {
  dispatch(GetElectionAPI.resetter(['data', 'error']));
};

const GetAllElectionAPI = makeFetchAction(
  GET_ALL_ELECTION_API,
  gql`
    query {
      get_all_election {
        name
        totalCandidateCount
        tocalVoterCount
        state
        id
      }
    }
  `
);

export const getAllElection = () => {
  return respondToSuccess(GetAllElectionAPI.actionCreator(), resp => {
    if (resp.errors) {
      console.error('Err:', resp.errors);
      return;
    }

    return;
  });
};

export const getAllElectionDataDataSelector = flow(
  GetAllElectionAPI.dataSelector,
  path('data.get_all_election')
);

export const resetDataGetAllElection = dispatch => {
  dispatch(GetAllElectionAPI.resetter(['data', 'error']));
};

//END NEWEST

const GetVotingDataAPI = makeFetchAction(
  GET_VOTING_DATA_API,
  gql`
    query($votingCode: Int!) {
      get_voting_data(votingCode: $votingCode) {
        imageDescription
        candidates {
          candidateName
          candidateDescription
        }
      }
    }
  `
);

export const getVotingData = code => {
  return respondToSuccess(
    GetVotingDataAPI.actionCreator({ votingCode: parseInt(code) }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      return;
    }
  );
};

export const getVotingDataDataSelector = flow(
  GetVotingDataAPI.dataSelector,
  path('data.get_voting_data')
);

export const resetDataGetVotingData = dispatch => {
  dispatch(GetVotingDataAPI.resetter(['data', 'error']));
};

const AddVotingInfoAPI = makeFetchAction(
  ADD_VOTING_INFO_API,
  gql`
    mutation(
      $votingCode: Int!
      $imageDescription: String!
      $description: String!
      $candidates: [createCandidateInput]!
      $votingDatetime: DateTime!
      $timeVoting: Int!
      $votingType: Int!
    ) {
      create_voting_info(
        votingCode: $votingCode
        imageDescription: $imageDescription
        description: $description
        candidates: $candidates
        votingDatetime: $votingDatetime
        timeVoting: $timeVoting
        votingType: $votingType
      ) {
        id
      }
    }
  `
);

export const addVotingInfo = ({
  votingCode,
  imageDescription,
  description,
  candidates,
  votingDatetime,
  timeVoting,
  votingType
}) => {
  return respondToSuccess(
    AddVotingInfoAPI.actionCreator({
      votingCode: parseInt(votingCode),
      imageDescription,
      description,
      candidates,
      votingDatetime,
      timeVoting: parseInt(timeVoting),
      votingType: parseInt(votingType)
    }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      return;
    }
  );
};

export const addVotingInfoDataSelector = flow(
  AddVotingInfoAPI.dataSelector,
  path('data.create_voting_info')
);

const CreateVotingAPI = makeFetchAction(
  CREATE_VOTING,
  gql`
    mutation($votingName: String!) {
      create_voting(votingName: $votingName) {
        id
        votingCode
      }
    }
  `
);

export const createVoting = votingName => {
  return respondToSuccess(
    CreateVotingAPI.actionCreator({ votingName }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }
      const votingCode = resp.data.create_voting.votingCode;
      Router.push('/create-voting?code=' + votingCode);
      return;
    }
  );
};

export const createVotingDataSelector = flow(
  CreateVotingAPI.dataSelector,
  path('data.create_voting')
);

export const resetDataCreateVoting = dispatch => {
  dispatch(CreateVotingAPI.resetter(['data', 'error']));
};
export const resetDataAddVotingInfo = dispatch => {
  dispatch(AddVotingInfoAPI.resetter(['data', 'error']));
};

export default {};
