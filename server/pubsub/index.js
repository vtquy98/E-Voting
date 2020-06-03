import { EventEmitter } from 'events';

import { USER_VOTED } from './events';
import { addEventListeners } from '../libs';
import { increaseVoteCount } from './vote.listener';

export const PubSub = new EventEmitter();
const eventListenerCreator = addEventListeners(PubSub);

export default () => {
  eventListenerCreator({
    [USER_VOTED]: [increaseVoteCount]
  });

  console.log('finished registering Event Listeners!');
  return eventListenerCreator;
};
