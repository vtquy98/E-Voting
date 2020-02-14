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

    const doLogin = () => {
      const jwt = auth.sign(userContent);
      saveSession(req.session, jwt);
      const token = 'bearer ' + jwt;
      return res.json({ success: true, token });
    };
    const userContent = req.body.user_content;

    const createNewUser = async () => {
      const userWalletAdress = await generateWallet();
      const username = userContent.email.substring(
        0,
        userContent.email.lastIndexOf('@')
      );
      const generateDefaultPassword = Math.random()
        .toString(36)
        .slice(-8);

      const user = new Users({
        username,
        password: generateDefaultPassword,
        google_id: userContent.googleId,
        email: userContent.email,
        full_name: userContent.familyName + ' ' + userContent.givenName,
        wallet_address: userWalletAdress,
        avatar: userContent.imageUrl
      });

      await user.save();
    };

    if (userContent.googleId) {
      Users.findOne({ google_id: userContent.googleId }).then(existingUser => {
        if (existingUser) {
          doLogin();
        } else {
          createNewUser();
          //pubsub - emit - email for user their password later!
          doLogin();
        }
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
