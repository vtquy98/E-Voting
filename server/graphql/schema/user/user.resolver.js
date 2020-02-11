import { path } from 'lodash/fp';
import { USER, ADMIN } from '../../../enums/userRole';
import { saveSession } from '../../../middlewares/session';
import auth from '../../../authentication';
import web3 from '../../libs/web3';

module.exports = {
  User: {
    googleId: path('google_id'),
    walletAddress: path('wallet_address'),
    fullName: path('full_name'),
    token: (user, _, { req }) => {
      const jwt = auth.sign(user);
      saveSession(req.session, jwt);
      return 'bearer ' + jwt;
    },
    balance: async user => {
      const balance = await web3.eth.getBalance(user.wallet_address);
      return web3.utils.fromWei(balance, 'ether');
    }
  },
  Role: {
    ADMIN,
    USER
  }
};
