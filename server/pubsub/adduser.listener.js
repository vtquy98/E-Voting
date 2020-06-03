import Election from '../graphql/libs/election';
import { createListenerCallback } from '../libs';
import { sendInviteVotingMail } from '../mail/mail';
import { ElectionNotify, Users } from '../services';

const ADD_CANDIATES = 'Add candiates to election';
const ADD_VOTERS = 'Add voters to election';

const ADMIN_WALLET =
  process.env.ADMIN_WALLET_ADDRESS ||
  '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';
const GAS_LIMIT = process.env.GAS_LIMIT || '4712388';
const GAS_PRICE = process.env.GAS_PRICE || '20000000000';
const DOMAIN_NAME = process.env.DOMAIN_NAME || 'https://e-voting.tech';

export const addCandidates = createListenerCallback(
  ADD_CANDIATES,
  async ({ candidates, electionAddress }) => {
    const election = Election(electionAddress);

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
  }
);

export const addVoters = createListenerCallback(
  ADD_VOTERS,
  async ({
    voters,
    electionAddress,
    electionId,
    electionOwner,
    electionName,
    dateTakePlace,
    description
  }) => {
    const election = Election(electionAddress);

    await Promise.all(
      voters.map(async voter => {
        const userData = await Users.findOne({ id: voter }); //got user

        await ElectionNotify.addElectionForUser({
          voterId: voter,
          electionId
        });

        sendInviteVotingMail(userData.email, {
          name: userData.full_name,
          department: electionOwner,
          electionName,
          date: dateTakePlace,
          linkToVote: `${DOMAIN_NAME}/voting?id=${electionId}`,
          description
        });

        await election.methods
          .registerVoter(userData.wallet_address, userData.full_name)
          .send({
            from: ADMIN_WALLET,
            gas: parseInt(GAS_LIMIT),
            gasPrice: GAS_PRICE
          });
      })
    );
  }
);
