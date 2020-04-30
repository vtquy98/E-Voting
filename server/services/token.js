import client from './redis';
const TIME_VALID = process.env.RESET_PASSWORD_TOKEN_TIMEOUT || 3600;

const createTokenData = ({ token, email }) => {
  client.hsetAsync(`token:${token}`, 'email', email).then(async status => {
    await client.expireAsync(`token:${token}`, TIME_VALID);
    return status;
  });
};

const getTokenData = async token => await client.hgetallAsync(`token:${token}`);

const deleteToken = async token => {
  await client.delAsync(`token:${token}`);
};

module.exports.createTokenData = createTokenData;
module.exports.getTokenData = getTokenData;
module.exports.deleteToken = deleteToken;
