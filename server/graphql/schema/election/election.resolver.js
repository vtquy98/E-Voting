import { path } from 'lodash/fp';
import { CREATED, STARTED, ENDED } from '../../../enums/electionState';

module.exports = {
  Election: {
    electionAddress: path('election_address'),
    createdAt: path('created_at'),
    updatedAt: path('updated_at')
  },
  ElectionState: {
    CREATED,
    STARTED,
    ENDED
  }
};
