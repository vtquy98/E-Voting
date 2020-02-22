import { combineResolvers } from 'graphql-resolvers';
import { Elections, Users } from '../../../services';
import { isAdmin, checkAuthentication, formatObject } from '../../libs';
import { STARTED, ENDED, CREATED, DRAFT } from '../../../enums/electionState';

import ElectionCreation from '../../libs/electionCreation';
import Election from '../../libs/election';

const ADMIN_WALLET =
  process.env.ADMIN_WALLET_ADDRESS ||
  '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';
// const ADMIN_WALLET = '0x86FA91238DdB108831766eC58c365bD0f291b101'; //local account

// web3.eth.sendTransaction({
//   to: '0xC82108760d430d8A2dF7c349981A87d608476121',
//   from: '0x001526F8bF8A346abF4d2d60B7e5BA4BeC75FB28',
//   value: Web3.utils.toWei('1', 'ether')
// });

module.exports = {
  Mutation: {
    create_election: combineResolvers(isAdmin, async (_, { name }) => {
      const description = 'do later!';
      const electionCreation = await ElectionCreation.methods
        .createElection(name, description)
        .send({
          from: ADMIN_WALLET,
          gas: '6721975'
        });

      const election = new Elections({
        name,
        election_address:
          electionCreation.events.ElectionCreated.returnValues.electionAddress
      });

      await election.save();
      return election;
    }),

    finish_election_creation: combineResolvers(
      isAdmin,
      async (
        _,
        {
          electionId,
          description,
          votingTime,
          votingType,
          candidates,
          voters,
          electionOwner
        }
      ) => {
        const electionStored = await Elections.findOne({ id: electionId });

        if (electionStored.state !== DRAFT) {
          throw new Error('The election has been finish created yet!');
        }

        const electionData = formatObject({
          description,
          voting_time: votingTime,
          voting_type: votingType,
          election_owner: electionOwner,
          state: CREATED
        });

        const election = Election(electionStored.election_address);

        //add candidate process
        await Promise.all(
          candidates.map(async candidate => {
            const userData = await Users.findOne({ id: candidate }); //got user
            await election.methods
              .registerCandidate(
                userData.wallet_address,
                userData.full_name,
                'this is a candidate description' //refactor later!
              )
              .send({ from: ADMIN_WALLET, gas: '6721975' });
          })
        );

        //add voter process
        await Promise.all(
          voters.map(async voter => {
            const userData = await Users.findOne({ id: voter }); //got user
            await election.methods
              .registerVoter(userData.wallet_address, userData.full_name)
              .send({ from: ADMIN_WALLET, gas: '6721975' });
          })
        );

        electionStored.updateDoc(electionData);
        await electionStored.save();
        return electionStored;
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

    start_voting: combineResolvers(isAdmin, async (_, { electionId }) => {
      const electionStored = await Elections.findOne({
        id: electionId
      });
      const election = Election(electionStored.election_address);

      await election.methods
        .startVote()
        .send({ from: ADMIN_WALLET, gas: '6721975' });

      // if (!startVoting.events.voteStarted) {
      //   throw new Error('Faild to start the election!');
      // }

      electionStored.state = STARTED;
      await electionStored.save();

      return electionStored;
    }),

    end_voting: combineResolvers(isAdmin, async (_, { electionId }) => {
      const electionStored = await Elections.findOne({
        id: electionId
      });
      const election = Election(electionStored.election_address);

      await election.methods
        .endVote()
        .send({ from: ADMIN_WALLET, gas: '6721975' });

      // if (!endVoting.events.voteEnd) {
      //   throw new Error('Faild to end the election!');
      // }

      electionStored.state = ENDED;

      await electionStored.save();
      return electionStored;
    }),

    poll_vote: combineResolvers(
      checkAuthentication,
      async (_, { userId, ElectionAddress }, { currentUser }) => {
        const userData = await Users.findOne({ id: userId });
        const election = Election(ElectionAddress);

        await election.methods
          .pollVote(userData.wallet_address)
          .send({ from: currentUser.wallet_address, gas: '6721975' });

        return userData;
      }
    ),

    poll_vote2: combineResolvers(
      checkAuthentication,
      async (_, { listUserId, electionId }, { currentUser }) => {
        // const userData = await Users.findOne({ id: userId });
        const electionStored = await Elections.findOne({
          id: electionId
        });
        const election = Election(electionStored.election_address);

        // listUserId.map(user => console.log(user));

        await Promise.all(
          listUserId.map(async user => {
            const userData = await Users.findOne({ id: user }); //got user
            await election.methods
              .pollVote(userData.wallet_address)
              .send({ from: currentUser.wallet_address, gas: '6721975' });
          })
        );

        return electionStored;
      }
    )
  }
};
