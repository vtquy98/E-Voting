import { createListenerCallback } from '../libs';
import { Elections } from '../services';

const INCREASE_VOTE_COUNT = 'Increase vote count of election when user voted';

export const increaseVoteCount = createListenerCallback(
  INCREASE_VOTE_COUNT,
  async data => {
    const election = await Elections.findOne({ id: data });
    election.voted_count += 1;
    await election.save();
  }
);
