import { combineResolvers } from 'graphql-resolvers';
import { Elections, Users, ElectionNotify, Votes } from '../../../services';
import { isAdmin, checkAuthentication, formatObject } from '../../libs';
import { STARTED, ENDED, CREATED, DRAFT } from '../../../enums/electionState';
import { SELECT_TO_VOTE, SELECT_TO_REMOVE } from '../../../enums/votingType';
import ElectionCreation from '../../libs/electionCreation';
import Election from '../../libs/election';

import {
  sendInviteVotingMail,
  sendElectionResultMail
} from '../../../mail/mail';

const ADMIN_WALLET =
  process.env.ADMIN_WALLET_ADDRESS ||
  '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';

const DOMAIN_NAME = process.env.DOMAIN_NAME || 'https://e-voting.tech';
const GAS_LIMIT = process.env.GAS_LIMIT || '4712388';
const GAS_PRICE = process.env.GAS_PRICE || '20000000000';

module.exports = {
  Mutation: {
    create_election: combineResolvers(isAdmin, async (_, { name }) => {
      const description = 'do later!';
      const electionCreation = await ElectionCreation.methods
        .createElection(name, description)
        .send({
          from: ADMIN_WALLET,
          gas: parseInt(GAS_LIMIT),
          gasPrice: GAS_PRICE
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
              .send({
                from: ADMIN_WALLET,
                gas: parseInt(GAS_LIMIT),
                gasPrice: GAS_PRICE
              });
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
              .send({
                from: ADMIN_WALLET,
                gas: parseInt(GAS_LIMIT),
                gasPrice: GAS_PRICE
              });

            sendInviteVotingMail(userData.email, {
              name: userData.full_name,
              department: electionOwner,
              electionName: electionStored.name,
              date: dateTakePlace,
              linkToVote: `${DOMAIN_NAME}/voting?id=${electionId}`,
              description
            });
          })
        );

        electionStored.updateDoc(electionData);
        await electionStored.save();
        return electionStored;
      }
    ),

    start_voting: combineResolvers(isAdmin, async (_, { electionId }) => {
      const electionStored = await Elections.findOne({
        id: electionId
      });
      const election = Election(electionStored.election_address);

      await election.methods.startVote().send({
        from: ADMIN_WALLET,
        gas: parseInt(GAS_LIMIT),
        gasPrice: GAS_PRICE
      });

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
      const voterAddress = await election.methods.allVoters().call();

      await election.methods.endVote().send({
        from: ADMIN_WALLET,
        gas: parseInt(GAS_LIMIT),
        gasPrice: GAS_PRICE
      });

      electionStored.state = ENDED;

      await Promise.all(
        voterAddress.map(async voter => {
          const userData = await Users.findOne({ wallet_address: voter }); //got user

          sendElectionResultMail(userData.email, {
            name: userData.full_name,
            department: electionStored.election_owner,
            electionName: electionStored.name,
            resultLink: `${DOMAIN_NAME}/result?id=${electionId}`
          });
        })
      );

      await electionStored.save();
      return electionStored;
    }),

    poll_vote: combineResolvers(
      checkAuthentication,
      async (_, { listUserId, electionId }, { pubsub, currentUser }) => {
        const electionStored = await Elections.findOne({
          id: electionId
        });
        const election = Election(electionStored.election_address);
        const candidateList = await election.methods.allCandidates().call();

        const hasVoted = Votes.find({
          $and: [{ voter_id: currentUser.id }, { election_id: electionId }]
        });

        if (hasVoted && hasVoted.length) throw new Error('You already voted!');

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
              const voteAction = await election.methods
                .pollVote(
                  userData.wallet_address,
                  currentUser.wallet_address,
                  true
                )
                .send({
                  from: ADMIN_WALLET,
                  gas: parseInt(GAS_LIMIT),
                  gasPrice: GAS_PRICE
                });

              const voteData = new Votes({
                election_id: electionId,
                voter_id: currentUser.id,
                candidate_id: user,
                is_voted: true,
                transaction_hash: voteAction.transactionHash
              });

              await voteData.save();
            })
          ));

        electionStored.voted_count += 1;
        await electionStored.save();

        // auto remove them on list voter, TODO: handle it on manual voting type
        await ElectionNotify.removeElection({
          voterId: currentUser.id,
          electionId
        });

        pubsub.publish('voteAdded', {
          voteAdded: { election: electionStored, userId: currentUser.id }
        });

        return electionStored;
      }
    ),
    manual_poll_vote: combineResolvers(
      isAdmin,
      async (_, { listUserId, electionId }, { pubsub, currentUser }) => {
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
                .send({
                  from: ADMIN_WALLET,
                  gas: parseInt(GAS_LIMIT),
                  gasPrice: GAS_PRICE
                });
            })
          ));

        pubsub.publish('voteAdded', {
          voteAdded: { election: electionStored, userId: currentUser.id }
        });

        //handle remove user from upcoming list !!!!!
        electionStored.voted_count += 1;

        await electionStored.save();
        return electionStored;
      }
    ),

    poll_vote_trust: combineResolvers(
      checkAuthentication,
      async (_, { userId, electionId, choice }, { currentUser, pubsub }) => {
        //handle it with manual vote
        const electionStored = await Elections.findOne({
          id: electionId
        });
        const election = Election(electionStored.election_address);

        const userData = await Users.findOne({ id: userId });

        const voteAction = await election.methods
          .pollVote(userData.wallet_address, currentUser.wallet_address, choice)
          .send({
            from: ADMIN_WALLET,
            gas: parseInt(GAS_LIMIT),
            gasPrice: GAS_PRICE
          });

        const voteData = new Votes({
          election_id: electionId,
          voter_id: currentUser.id,
          candidate_id: userId,
          is_voted: choice,
          transaction_hash: voteAction.transactionHash
        });

        await voteData.save();

        //auto remove them on list voter
        await ElectionNotify.removeElection({
          voterId: currentUser.id,
          electionId
        });

        electionStored.voted_count += 1;

        pubsub.publish('voteAdded', {
          voteAdded: { election: electionStored, userId: currentUser.id }
        });

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
    ),

    add_candidates: combineResolvers(
      isAdmin,
      async (_, { electionId, candidates }) => {
        const electionStored = await Elections.findOne({ id: electionId });

        if (electionStored.state !== CREATED) {
          throw new Error('Can not add candidates at the moment!');
        }

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
              .send({
                from: ADMIN_WALLET,
                gas: parseInt(GAS_LIMIT),
                gasPrice: GAS_PRICE
              });
          })
        );

        return electionStored;
      }
    ),

    add_voters: combineResolvers(isAdmin, async (_, { electionId, voters }) => {
      const electionStored = await Elections.findOne({ id: electionId });

      if (electionStored.state !== CREATED) {
        throw new Error('Can not add voters at the moment!');
      }

      const election = Election(electionStored.election_address);

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
            .send({
              from: ADMIN_WALLET,
              gas: parseInt(GAS_LIMIT),
              gasPrice: GAS_PRICE
            });

          sendInviteVotingMail(userData.email, {
            name: userData.full_name,
            department: electionStored.election_owner,
            electionName: electionStored.name,
            date: electionStored.date_take_place,
            linkToVote: `${DOMAIN_NAME}/voting?id=${electionId}`,
            description: electionStored.description
          });
        })
      );

      return electionStored;
    })
  }
};
