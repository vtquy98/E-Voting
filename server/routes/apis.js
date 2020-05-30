import { Router } from 'express';
import auth from '../authentication';
import { saveSession } from '../middlewares/session';
import { Users } from '../services';
import { generateWallet } from '../libs/generateWalletAddress';
import verifier from 'google-id-token-verifier';
import { sendGrettingMail } from '../mail/mail';
import { generatePassword } from '../libs';

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

    const doLogin = () => {
      const jwt = auth.sign(userContent);
      saveSession(req.session, jwt);
      const token = 'bearer ' + jwt;
      return res.json({ success: true, token });
    };

    const userWalletAdress = await generateWallet();
    const username = userContent.email.substring(
      0,
      userContent.email.lastIndexOf('@')
    );

    const createNewUser = async () => {
      const generateDefaultPassword = generatePassword();

      const user = new Users({
        username,
        password: generateDefaultPassword,
        google_id: userContent.googleId,
        email: userContent.email,
        full_name: userContent.familyName + ' ' + userContent.givenName,
        wallet_address: userWalletAdress,
        avatar: userContent.imageUrl
      });

      sendGrettingMail(userContent.email, {
        name: username,
        password: generateDefaultPassword
      });
      await user.save();
    };

    const existingUser = await Users.findOne({ email: userContent.email });

    if (existingUser) {
      if (existingUser.google_id) {
        doLogin(existingUser);
        return;
      }

      existingUser.updateDoc({
        username,
        google_id: userContent.googleId,
        full_name: userContent.familyName + ' ' + userContent.givenName,
        avatar: userContent.imageUrl
      });
      await existingUser.save();
      doLogin();
    } else {
      createNewUser();
      doLogin();
    }
  } catch (error) {
    next(error);
  }
});

router.use('/signout', async (req, res, next) => {
  try {
    if (req.session.key) {
      await req.session.destroy();
    }

    return res.json({ success: true, message: 'Sign out successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
