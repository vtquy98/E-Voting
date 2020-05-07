import { path } from 'lodash/fp';
import { DRAFT, CREATED, STARTED, ENDED } from '../../../enums/electionState';
import Election from '../../libs/election';
import { Users } from '../../../services';
import {
  SELECT_TO_REMOVE,
  SELECT_TO_VOTE,
  SELECT_TO_TRUST
} from '../../../enums/votingType';

module.exports = {
  Election: {
    electionAddress: path('election_address'),
    createdAt: path('created_at'),
    updatedAt: path('updated_at'),
    electionOwner: path('election_owner'),
    votingTime: path('voting_time'),
    atLeastVote: path('at_least_vote'),
    mostVote: path('most_vote'),
    votingType: path('voting_type'),
    votedCount: path('voted_count'),
    dateTakePlace: path('date_take_place'),
    totalCandidateCount: async election => {
      const electionSol = Election(election.election_address);
      const totalCandidateCount = await electionSol.methods
        .getCandidatesCount()
        .call();
      return totalCandidateCount;
    },
    tocalVoterCount: async election => {
      const electionSol = Election(election.election_address);
      const totalVoterCount = await electionSol.methods.getVotersCount().call();
      return totalVoterCount;
    }
  },
  VotingType: {
    SELECT_TO_REMOVE,
    SELECT_TO_VOTE,
    SELECT_TO_TRUST
  },
  ElectionState: {
    DRAFT,
    CREATED,
    STARTED,
    ENDED
  },

  VoteData: {
    electionID: path('election_id'),
    voterData: async voteData => {
      const voterData = await Users.findOne({ id: voteData.voter_id });
      return voterData;
    },
    candidateData: async voteData => {
      const candidateData = await Users.findOne({ id: voteData.candidate_id });
      return candidateData;
    },
    isVoted: path('is_voted'),
    transactionHash: path('transaction_hash')
  }
};
