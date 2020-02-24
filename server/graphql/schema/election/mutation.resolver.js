import { combineResolvers } from 'graphql-resolvers';
import { Elections, Users } from '../../../services';
import { isAdmin, checkAuthentication, formatObject } from '../../libs';
import { STARTED, ENDED, CREATED, DRAFT } from '../../../enums/electionState';
import { SELECT_TO_VOTE, SELECT_TO_REMOVE } from '../../../enums/votingType';
import ElectionCreation from '../../libs/electionCreation';
import Election from '../../libs/election';

const ADMIN_WALLET =
  process.env.ADMIN_WALLET_ADDRESS ||
  '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';

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
          electionOwner,
          mostVote,
          atLeastVote
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
          state: CREATED,
          most_vote: mostVote,
          at_least_vote: atLeastVote
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
      async (_, { listUserId, electionId }, { currentUser }) => {
        const electionStored = await Elections.findOne({
          id: electionId
        });
        const election = Election(electionStored.election_address);
        const candidateList = await election.methods.allCandidates().call();

        if (
          (electionStored.voting_type === SELECT_TO_VOTE &&
            listUserId.length < electionStored.at_least_vote) ||
          listUserId.length > electionStored.most_vote
        ) {
          throw new Error(
            `You must vote at least ${electionStored.at_least_vote} candidates and max ${electionStored.most_vote} candiadtes!`
          );
        }

        if (
          (electionStored.voting_type === SELECT_TO_REMOVE &&
            candidateList.length - listUserId.length <
              electionStored.at_least_vote) ||
          candidateList.length - listUserId.length > electionStored.most_vote
        ) {
          throw new Error(
            `You must remove at least ${electionStored.at_least_vote} candidates and max remove ${electionStored.most_vote} candiadtes!`
          );
        }

        listUserId.length &&
          (await Promise.all(
            listUserId.map(async user => {
              const userData = await Users.findOne({ id: user });
              await election.methods
                .pollVote(userData.wallet_address, currentUser.wallet_address)
                .send({ from: ADMIN_WALLET, gas: '6721975' });
            })
          ));

        return electionStored;
      }
    )
  }
};
