import client from './redis';

const addElectionForUser = async ({ voterId, electionId }) =>
  await client.lpush(`vId:${voterId}`, electionId);

const getListElections = async voterId => {
  const listElections = await client.lrangeAsync(`vId:${voterId}`, 0, -1); //get all elements
  return listElections;
};

const removeElection = async ({ voterId, electionId }) => {
  await client.lrem(`vId:${voterId}`, -2, electionId);
};

module.exports.addElectionForUser = addElectionForUser;
module.exports.getListElections = getListElections;
module.exports.removeElection = removeElection;
