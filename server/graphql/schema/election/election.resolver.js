import { path } from 'lodash/fp';
import { CREATED, STARTED, ENDED } from '../../../enums/electionState';
import Election from '../../libs/election';

module.exports = {
  Election: {
    electionAddress: path('election_address'),
    createdAt: path('created_at'),
    updatedAt: path('updated_at'),
    shortenCode: path('shorten_code'),
    electionOwner: path('election_owner'),
    votingTime: path('voting_time'),
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
  ElectionState: {
    CREATED,
    STARTED,
    ENDED
  }
};
