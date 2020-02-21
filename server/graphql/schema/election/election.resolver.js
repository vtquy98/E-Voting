import { path } from 'lodash/fp';
import { DRAFT, CREATED, STARTED, ENDED } from '../../../enums/electionState';
import Election from '../../libs/election';
import { SELECT_TO_REMOVE, SELECT_TO_VOTE } from '../../../enums/votingType';

module.exports = {
  Election: {
    electionAddress: path('election_address'),
    createdAt: path('created_at'),
    updatedAt: path('updated_at'),
    electionOwner: path('election_owner'),
    votingTime: path('voting_time'),
    votingType: path('voting_type'),
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
    SELECT_TO_VOTE
  },
  ElectionState: {
    DRAFT,
    CREATED,
    STARTED,
    ENDED
  }
};
