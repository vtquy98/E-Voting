//todo: fix all errorSelector -> dataSelector !!!!!!!!!
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
export const GET_ELECTION_RESULT_API = 'GetElectionResultAPI';
export const POLL_VOTE_API = 'PollVoteAPI';
export const CREATE_NEW_ELECTION_API = 'CreateNewElectionAPI';
export const GET_ELECTION_TEMP_API = 'GetElectionTempAPI';
export const FINISH_ELECTION_CREATION_API = 'FinishElectionCreationAPI';
export const START_VOTING_API = 'StartVotingAPI';
export const STOP_VOTING_API = 'StopVotingAPI';

const StopVotingAPI = makeFetchAction(
  STOP_VOTING_API,
  gql`
    mutation($electionId: String!) {
      end_voting(electionId: $electionId) {
        id
      }
    }
  `
);

export const stopVoting = electionId => {
  return respondToSuccess(StopVotingAPI.actionCreator({ electionId }), resp => {
    if (resp.errors) {
      console.error('Err:', resp.errors);
      return;
    }

    const electionId = resp.data.end_voting.id;
    Router.push('/election-result?id=' + electionId);

    return;
  });
};

export const stopVotingDataSelector = flow(
  StopVotingAPI.dataSelector,
  path('data.end_voting')
);

export const stopVotingErrorSelector = flow(
  StopVotingAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataGetStopVoting = dispatch => {
  dispatch(StopVotingAPI.resetter(['data', 'error']));
};

const StartVotingAPI = makeFetchAction(
  START_VOTING_API,
  gql`
    mutation($electionId: String!) {
      start_voting(electionId: $electionId) {
        id
      }
    }
  `
);

export const startVoting = electionId => {
  return respondToSuccess(
    StartVotingAPI.actionCreator({ electionId }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      const electionId = resp.data.start_voting.id;
      Router.push('/show-election?id=' + electionId);

      return;
    }
  );
};

export const startVotingDataSelector = flow(
  StartVotingAPI.dataSelector,
  path('data.start_voting')
);
export const startVotingErrorSelector = flow(
  StartVotingAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataGetStartVoting = dispatch => {
  dispatch(StartVotingAPI.resetter(['data', 'error']));
};

const FinishElectionCreationAPI = makeFetchAction(
  FINISH_ELECTION_CREATION_API,
  gql`
    mutation(
      $description: String!
      $votingType: Int!
      $votingTime: Int!
      $candidates: [String!]!
      $voters: [String!]!
      $electionId: String!
      $electionOwner: String!
    ) {
      finish_election_creation(
        description: $description
        votingType: $votingType
        votingTime: $votingTime
        candidates: $candidates
        voters: $voters
        electionId: $electionId
        electionOwner: $electionOwner
      ) {
        id
        electionAddress
      }
    }
  `
);

export const finishElectionCreation = ({
  description,
  votingType,
  votingTime,
  candidates,
  electionId,
  voters,
  electionOwner
}) => {
  return respondToSuccess(
    FinishElectionCreationAPI.actionCreator({
      description,
      votingType: parseInt(votingType),
      votingTime: parseInt(votingTime),
      candidates,
      electionId,
      voters,
      electionOwner
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

export const finishElectionCreationDataSelector = flow(
  FinishElectionCreationAPI.dataSelector,
  path('data.finish_election_creation')
);

export const finishElectionCreationErrorSelector = flow(
  FinishElectionCreationAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataGetFinishElectionCreation = dispatch => {
  dispatch(FinishElectionCreationAPI.resetter(['data', 'error']));
};

const GetElectionTempAPI = makeFetchAction(
  GET_ELECTION_TEMP_API,
  gql`
    query($id: String!) {
      get_election(id: $id) {
        name
        id
        state
      }
    }
  `
);

export const getElectionTemp = id => {
  return respondToSuccess(GetElectionTempAPI.actionCreator({ id }), resp => {
    if (resp.errors) {
      console.error('Err:', resp.errors);
      return;
    }

    return;
  });
};

export const getElectionTempDataSelector = flow(
  GetElectionTempAPI.dataSelector,
  path('data.get_election')
);

export const getElectionTempErrorSelector = flow(
  GetElectionTempAPI.errorSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataGetElectionTemp = dispatch => {
  dispatch(GetElectionTempAPI.resetter(['data', 'error']));
};

const CreateNewElectionAPI = makeFetchAction(
  CREATE_NEW_ELECTION_API,
  gql`
    mutation($name: String!) {
      create_election(name: $name) {
        id
      }
    }
  `
);

export const createNewElection = name => {
  return respondToSuccess(
    CreateNewElectionAPI.actionCreator({ name }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }
      const electionId = resp.data.create_election.id;
      Router.push('/finish-create?id=' + electionId);

      return;
    }
  );
};

export const createNewElectionDataSelector = flow(
  CreateNewElectionAPI.dataSelector,
  path('data.create_election')
);

export const createNewElectionErrorSelector = flow(
  CreateNewElectionAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataCreateNewElection = dispatch => {
  dispatch(CreateNewElectionAPI.resetter(['data', 'error']));
};

const PollVoteAPI = makeFetchAction(
  POLL_VOTE_API,
  gql`
    mutation($listUserId: [String!]!, $electionId: String!) {
      poll_vote2(listUserId: $listUserId, electionId: $electionId) {
        name
      }
    }
  `
);

export const pollVote = ({ listUserId, electionId }) => {
  return respondToSuccess(
    PollVoteAPI.actionCreator({ listUserId, electionId }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      return;
    }
  );
};

export const pollVoteDataSelector = flow(
  PollVoteAPI.dataSelector,
  path('data.poll_vote2')
);

export const pollVoteErrorSelector = flow(
  PollVoteAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataPollVote = dispatch => {
  dispatch(PollVoteAPI.resetter(['data', 'error']));
};

const GetElectionResultAPI = makeFetchAction(
  GET_ELECTION_RESULT_API,
  gql`
    query($electionId: String!) {
      get_election_result(electionId: $electionId) {
        userData {
          fullName
        }
        voteCount
        percentage
      }
    }
  `
);

export const getElectionResult = electionId => {
  return respondToSuccess(
    GetElectionResultAPI.actionCreator({ electionId }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        return;
      }

      return;
    }
  );
};

export const getElectionResultDataSelector = flow(
  GetElectionResultAPI.dataSelector,
  path('data.get_election_result')
);

export const resetDataGetElectionResult = dispatch => {
  dispatch(GetElectionResultAPI.resetter(['data', 'error']));
};

export const getElectionResultErrorSelector = flow(
  GetElectionResultAPI.errorSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

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
      get_all_voters(electionId: $electionId) {
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
        electionAddress
        createdAt
        updatedAt
        state
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
