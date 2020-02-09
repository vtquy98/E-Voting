import { combineResolvers } from 'graphql-resolvers';
import { Elections, Users } from '../../../services';
import { isAdmin } from '../../libs';
import { STARTED, CREATED, ENDED } from '../../../enums/electionState';

import ElectionCreation from '../../libs/electionCreation';
import Election from '../../libs/election';

// const ADMIN_WALLET = '0xc248515c28a64dFc462Df0301f0D12cF942dae2F'; ropsten account
const ADMIN_WALLET = '0x86FA91238DdB108831766eC58c365bD0f291b101'; //local account

// web3.eth.sendTransaction({
//   to: '0xC82108760d430d8A2dF7c349981A87d608476121',
//   from: '0x001526F8bF8A346abF4d2d60B7e5BA4BeC75FB28',
//   value: Web3.utils.toWei('1', 'ether')
// });

module.exports = {
  Mutation: {
    create_election: combineResolvers(
      isAdmin,
      async (_, { name, description, thumbnail }) => {
        const electionCreation = await ElectionCreation.methods
          .createElection(name, description)
          .send({
            from: ADMIN_WALLET,
            gas: '6721975'
          });

        const election = new Elections({
          name,
          description,
          thumbnail,
          election_address:
            electionCreation.events.ElectionCreated.returnValues
              .electionAddress,
          state: CREATED
        });

        await election.save();
        return election;
      }
    ),

    add_candidate: combineResolvers(
      isAdmin,
      async (_, { userId, description, ElectionAddress }) => {
        const userData = await Users.findOne({ id: userId });
        const election = Election(ElectionAddress);

        await election.methods
          .registerCandidate(
            userData.wallet_address,
            userData.full_name,
            description
          )
          .send({ from: ADMIN_WALLET, gas: '6721975' });

        // if (!addCandidate.events) {
        //   throw new Error('Faild to add candidate!');
        // }

        return userData;
      }
    ),

    add_voter: combineResolvers(
      isAdmin,
      async (_, { userId, ElectionAddress }) => {
        const userData = await Users.findOne({ id: userId });

        const election = Election(ElectionAddress);
        await election.methods
          .registerVoter(userData.wallet_address, userData.full_name)
          .send({ from: ADMIN_WALLET, gas: '6721975' });

        // if (!addVoter.events) {
        //   throw new Error('Faild to add candidate!');
        // }
        return userData;
      }
    ),

    start_voting: combineResolvers(isAdmin, async (_, { ElectionAddress }) => {
      const election = Election(ElectionAddress);
      await election.methods
        .startVote()
        .send({ from: ADMIN_WALLET, gas: '6721975' });

      // if (!startVoting.events.voteStarted) {
      //   throw new Error('Faild to start the election!');
      // }

      const updateElection = await Elections.findOne({
        election_address: ElectionAddress
      });
      election.state = STARTED;
      await updateElection.save();

      return updateElection;
    }),

    end_voting: combineResolvers(isAdmin, async (_, { ElectionAddress }) => {
      const election = Election(ElectionAddress);
      await election.methods
        .endVote()
        .send({ from: ADMIN_WALLET, gas: '6721975' });

      // if (!endVoting.events.voteEnd) {
      //   throw new Error('Faild to end the election!');
      // }

      const updateElection = await Elections.findOne({
        election_address: ElectionAddress
      });
      election.state = ENDED;
      await updateElection.save();

      return updateElection;
    })
  }
};
