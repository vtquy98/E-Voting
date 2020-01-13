import { path } from 'lodash/fp';

module.exports = {
  User: {
    googleId: path('google_id'),
    walletAddress: path('wallet_address')
  }
};
