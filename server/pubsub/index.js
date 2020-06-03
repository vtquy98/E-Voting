import { EventEmitter } from 'events';

import { USER_VOTED, ADD_CANDIDATES, ADD_VOTERS } from './events';
import { addEventListeners } from '../libs';
import { increaseVoteCount } from './vote.listener';
import { addCandidates, addVoters } from './adduser.listener';

export const PubSub = new EventEmitter();
const eventListenerCreator = addEventListeners(PubSub);

export default () => {
  eventListenerCreator({
    [USER_VOTED]: [increaseVoteCount],
    [ADD_CANDIDATES]: [addCandidates],
    [ADD_VOTERS]: [addVoters]
  });

  console.log('finished registering Event Listeners!');
  return eventListenerCreator;
};
