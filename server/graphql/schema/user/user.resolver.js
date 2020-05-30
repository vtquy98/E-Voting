import { path } from 'lodash/fp';
import { USER, ADMIN } from '../../../enums/userRole';
import { saveSession } from '../../../middlewares/session';
import auth from '../../../authentication';
import web3 from '../../libs/web3';

const ADMIN_WALLET =
  process.env.ADMIN_WALLET_ADDRESS ||
  '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';

module.exports = {
  User: {
    googleId: path('google_id'),
    walletAddress: path('wallet_address'),
    fullName: path('full_name'),
    createdAt: path('created_at'),
    updatedAt: path('updated_at'),
    summaryDescription: path('summary_description'),
    birthDate: path('birth_date'),
    token: (user, _, { req }) => {
      const jwt = auth.sign(user);
      saveSession(req.session, jwt);
      return 'bearer ' + jwt;
    },
    balance: async () => {
      const balance = await web3.eth.getBalance(ADMIN_WALLET);
      return web3.utils.fromWei(balance, 'ether');
    }
  },
  Role: {
    ADMIN,
    USER
  }
};
