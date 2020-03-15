import { combineResolvers } from 'graphql-resolvers';
import { Elections, Users, ElectionNotify } from '../../../services';
import { isAdmin, checkAuthentication, formatObject } from '../../libs';
import { STARTED, ENDED, CREATED, DRAFT } from '../../../enums/electionState';
import { SELECT_TO_VOTE, SELECT_TO_REMOVE } from '../../../enums/votingType';
import ElectionCreation from '../../libs/electionCreation';
import Election from '../../libs/election';
import { sendInviteVotingMail } from '../../../mail/mail';

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
          atLeastVote,
          dateTakePlace
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
          at_least_vote: atLeastVote,
          date_take_place: dateTakePlace
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

            await ElectionNotify.addElectionForUser({
              voterId: voter,
              electionId
            });

            await election.methods
              .registerVoter(userData.wallet_address, userData.full_name)
              .send({ from: ADMIN_WALLET, gas: '6721975' });

            sendInviteVotingMail(userData.email, {
              name: userData.full_name,
              department: electionOwner,
              electionName: electionStored.name,
              date: dateTakePlace
            });
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
                .pollVote(
                  userData.wallet_address,
                  currentUser.wallet_address,
                  true
                )
                .send({ from: ADMIN_WALLET, gas: '6721975' });
            })
          ));

        //auto remove them on list voter, TODO: handle it on manual voting type
        await ElectionNotify.removeElection({
          voterId: currentUser.id,
          electionId
        });

        electionStored.voted_count += 1;
        await electionStored.save();
        return electionStored;
      }
    ),
    manual_poll_vote: combineResolvers(
      isAdmin,
      async (_, { listUserId, electionId }) => {
        const electionStored = await Elections.findOne({
          id: electionId
        });
        const election = Election(electionStored.election_address);

        listUserId.length &&
          (await Promise.all(
            listUserId.map(async user => {
              const userData = await Users.findOne({ id: user });
              await election.methods
                .manualPollVote(userData.wallet_address)
                .send({ from: ADMIN_WALLET, gas: '6721975' });
            })
          ));

        //handle remove user from upcoming list !!!!!
        electionStored.voted_count += 1;
        await electionStored.save();
        return electionStored;
      }
    ),

    poll_vote_trust: combineResolvers(
      checkAuthentication,
      async (_, { userId, electionId, choice }, { currentUser }) => {
        //handle it with manual vote
        const electionStored = await Elections.findOne({
          id: electionId
        });
        const election = Election(electionStored.election_address);

        const userData = await Users.findOne({ id: userId });

        await election.methods
          .pollVote(userData.wallet_address, currentUser.wallet_address, choice)
          .send({ from: ADMIN_WALLET, gas: '6721975' });

        //auto remove them on list voter
        await ElectionNotify.removeElection({
          voterId: currentUser.id,
          electionId
        });

        electionStored.voted_count += 1;
        await electionStored.save();
        return electionStored;
      }
    ),

    report_participated_election: combineResolvers(
      checkAuthentication,
      async (_, { electionId }, { currentUser }) => {
        await ElectionNotify.removeElection({
          voterId: currentUser.id,
          electionId
        });

        const listElectionId = await ElectionNotify.getListElections(
          currentUser.id
        );

        const upComingElection = listElectionId.map(
          async election => await Elections.findOne({ id: election })
        );

        return upComingElection;
      }
    )
  }
};
