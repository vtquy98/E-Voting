import { Users, Elections } from '../../../services';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin } from '../../libs';
import Election from '../../libs/election';

module.exports = {
  Query: {
    get_all_election: combineResolvers(isAdmin, async () => {
      const elections = await Elections.find({});
      return elections;
    }),

    get_election: combineResolvers(isAdmin, async (_, { id }) => {
      const elections = await Elections.find({ id });
      return elections;
    }),

    get_all_candidate: combineResolvers(
      isAdmin,
      async (_, { ElectionAddress }) => {
        const election = Election(ElectionAddress);
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

    get_all_voter: combineResolvers(isAdmin, async (_, { ElectionAddress }) => {
      const election = Election(ElectionAddress);
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
      async (_, { ElectionAddress }) => {
        const electionData = await Elections.findOne({
          election_address: ElectionAddress
        });

        const election = Election(ElectionAddress);
        const totalVoteCount = await election.methods.totalVotes().call();

        return { ...electionData._doc, totalVoteCount };
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
      isAdmin,
      async (_, { ElectionAddress }) => {
        const election = Election(ElectionAddress);

        const totalVoteCount = await election.methods.totalVotes().call();
        const candidateAddress = await election.methods.allCandidates().call();

        const electionResult = await Promise.all(
          candidateAddress.map(async candidate => {
            const userData = await Users.findOne({ wallet_address: candidate });
            const voteCount = parseInt(
              await election.methods.totalVotesFor(candidate).call()
            );
            const percentage = (parseInt(voteCount) * 100) / totalVoteCount;
            return { userData, voteCount, percentage };
          })
        );

        return electionResult;
      }
    )
  }
};
