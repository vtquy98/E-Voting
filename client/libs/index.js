export const isServer = !process.browser;

export const createVotingUrl = ({ electionId }) =>
  `${process.env.DOMAIN_NAME}/voting?id=${electionId}`;
