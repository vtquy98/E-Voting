import { path } from 'lodash/fp';
import { USER, ADMIN } from '../../../enums/userRole';
import { saveSession } from '../../../middlewares/session';
import auth from '../../../authentication';

module.exports = {
  User: {
    googleId: path('google_id'),
    walletAddress: path('wallet_address'),
    fullName: path('full_name'),
    token: (user, _, { req }) => {
      const jwt = auth.sign(user);
      saveSession(req.session, jwt);
      return 'bearer ' + jwt;
    }
  },
  Role: {
    ADMIN,
    USER
  }
};
