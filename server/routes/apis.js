import { Router } from 'express';
import Users2 from '../models/user2';
import auth from '../authentication';
import { saveSession } from '../middlewares/session';

require('dotenv').config({
  path: './.env'
});

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const router = Router();

// router.use('/signout', async (req, res, next) => {
//   try {
//     if (req.session.key) {
//       await req.session.destroy();
//     }
//     console.log('deleted session!');
//     return res.json({ success: true, message: 'Sign out successfully.' });
//   } catch (error) {
//     next(error);
//   }
// });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users2.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (token, tokenSecret, profile, done) => {
      // Check if google profile exist.
      //   console.log('profile ne: ', profile);
      if (profile.id) {
        Users2.findOne({ googleId: profile.id }).then(existingUser => {
          if (existingUser) {
            // console.log(existingUser);
            done(null, existingUser);
          } else {
            new Users2({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.name.familyName + ' ' + profile.name.givenName
            })
              .save()
              .then(user => done(null, user));
          }
        });
      }
    }
  )
);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  async req => {
    const jwt = auth.sign(req.user);
    saveSession(req.session, jwt);
    return 'bearer ' + jwt;
  }
);

module.exports = router;
