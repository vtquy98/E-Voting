import { Router } from 'express';
import auth from '../authentication';
import { saveSession } from '../middlewares/session';
import { Users } from '../services';
import { generateWallet } from '../libs/generateWalletAddress';
import verifier from 'google-id-token-verifier';

require('dotenv').config({
  path: './.env'
});

const router = Router();
const googleClientId = process.env.GOOGLE_CLIENT_ID;

router.use('/auth', async (req, res, next) => {
  try {
    const googleIdToken = req.body.tokenId;
    verifier.verify(googleIdToken, googleClientId, function(err) {
      if (err) {
        throw new Error('Invalid account');
      }
    });

    const userContent = req.body.user_content;
    const userWalletAdress = await generateWallet();
    const doLogin = () => {
      const jwt = auth.sign(userContent);
      saveSession(req.session, jwt);
      const token = 'bearer ' + jwt;
      return res.json({ success: true, token });
    };

    if (userContent.googleId) {
      Users.findOne({ google_id: userContent.googleId }).then(existingUser => {
        if (existingUser) {
          doLogin();
        } else {
          new Users({
            google_id: userContent.googleId,
            email: userContent.email,
            full_name: userContent.familyName + ' ' + userContent.givenName,
            wallet_address: userWalletAdress
          }).save();
          doLogin();
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
