import {
  Users,
  Elections,
  ElectionNotify,
  Votes,
  Contracts
} from '../../../services';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, checkAuthentication } from '../../libs';
import Election from '../../libs/election';
import web3 from '../../libs/web3';

const ADMIN_WALLET =
  process.env.ADMIN_WALLET_ADDRESS ||
  '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';

module.exports = {
  Query: {
    get_all_election: combineResolvers(isAdmin, async () => {
      const elections = await Elections.find({});
      return elections;
    }),

    get_election: combineResolvers(checkAuthentication, async (_, { id }) => {
      const elections = await Elections.findOne({ id });
      return elections;
    }),

    get_all_candidates: combineResolvers(
      checkAuthentication,
      async (_, { electionId }) => {
        const electionStored = await Elections.findOne({ id: electionId });
        const election = Election(electionStored.election_address);
        const candidateList = await election.methods.allCandidates().call();

        // if (!candidateList) {
        //   throw new Error('Faild to get call candidate!');
        // }

        const candidateInfo = await Promise.all(
          candidateList.map(async candidate => {
            const user = await Users.findOne({ wallet_address: candidate });
            return user;
          })
        );

        return candidateInfo;
      }
    ),

    get_all_voters: combineResolvers(isAdmin, async (_, { electionId }) => {
      const electionStored = await Elections.findOne({
        id: electionId
      });

      const election = Election(electionStored.election_address);
      const voterList = await election.methods.allVoters().call();

      // if (!voterList) {
      //   throw new Error('Faild to get all voter!');
      // }

      const voterInfo = await Promise.all(
        voterList.map(async voter => {
          const user = await Users.findOne({ wallet_address: voter });
          return user;
        })
      );

      return voterInfo;
    }),

    get_candidate_votes: combineResolvers(
      isAdmin,
      async (_, { userId, ElectionAddress }) => {
        const userData = await Users.findOne({ id: userId });

        const election = Election(ElectionAddress);
        const candidateVote = await election.methods
          .totalVotesFor(userData.wallet_address)
          .call();

        return { ...userData._doc, totalVote: candidateVote };
      }
    ),

    get_total_votes_count: combineResolvers(
      isAdmin,
      async (_, { electionId }) => {
        const electionStored = await Elections.findOne({
          id: electionId
        });

        const election = Election(electionStored.election_address);
        const totalVoteCount = await election.methods.totalVotes().call();

        return { ...electionStored._doc, totalVoteCount };
      }
    ),

    //refactor later: merge 2 method below to one: get_election_infomation
    get_total_candidates_count: combineResolvers(
      isAdmin,
      async (_, { ElectionAddress }) => {
        const electionData = await Elections.findOne({
          election_address: ElectionAddress
        });

        const election = Election(ElectionAddress);
        const totalCandidateCount = await election.methods
          .getCandidatesCount()
          .call();

        return { ...electionData._doc, totalCandidateCount };
      }
    ),

    get_total_voters_count: combineResolvers(
      isAdmin,
      async (_, { ElectionAddress }) => {
        const electionData = await Elections.findOne({
          election_address: ElectionAddress
        });

        const election = Election(ElectionAddress);
        const tocalVoterCount = await election.methods.getVotersCount().call();

        return { ...electionData._doc, tocalVoterCount };
      }
    ),

    get_election_result: combineResolvers(
      checkAuthentication,
      async (_, { electionId }) => {
        const electionStored = await Elections.findOne({
          id: electionId
        });
        const election = Election(electionStored.election_address);
        const candidateAddress = await election.methods.allCandidates().call();
        const voterAddress = await election.methods.allVoters().call();

        const electionResult = await Promise.all(
          candidateAddress.map(async candidate => {
            const userData = await Users.findOne({ wallet_address: candidate });
            const voteCount = parseInt(
              await election.methods.totalVotesFor(candidate).call()
            );
            const percentage =
              voteCount > 0
                ? (
                    (parseInt(voteCount) * 100) /
                    parseInt(electionStored.voted_count)
                  ).toFixed(2)
                : 0;
            const doNotVoteCount = voterAddress.length - voteCount;
            return { userData, voteCount, percentage, doNotVoteCount };
          })
        );

        return electionResult;
      }
    ),
    get_upcoming_election: combineResolvers(
      checkAuthentication,
      async (_, __, { currentUser }) => {
        const listElectionId = await ElectionNotify.getListElections(
          currentUser.id
        );

        const upComingElection = listElectionId.map(
          async election => await Elections.findOne({ id: election })
        );

        return upComingElection;
      }
    ),

    get_vote_data: combineResolvers(isAdmin, async (_, { electionId }) => {
      const voteData = await Votes.find({
        election_id: electionId
      });

      return voteData;
    }),

    get_vote_history: combineResolvers(
      checkAuthentication,
      async (_, __, { currentUser }) => {
        const voteHistory = await Votes.aggregate([
          {
            $match: { voter_id: currentUser.id }
          },
          {
            $group: { _id: '$election_id', voteData: { $push: '$$ROOT' } }
          }
        ]);

        return voteHistory;
      }
    ),

    get_system_stats: async () => {
      const electionCount = await Elections.find({});
      const userCount = await Users.find({});
      const voteCount = await Votes.find({});

      const systemStats = {
        electionCount: electionCount.length,
        userCount: userCount.length,
        voteCount: voteCount.length
      };

      return systemStats;
    },

    get_blockchain_data: combineResolvers(isAdmin, async () => {
      const contractData = await Contracts.find({});

      const balance = await web3.eth.getBalance(ADMIN_WALLET);

      const blockchainData = {
        adminWallet: ADMIN_WALLET,
        balance: web3.utils.fromWei(balance, 'ether'),
        contractAddress: contractData[0].contract_address
      };

      return blockchainData;
    })
  }
};
