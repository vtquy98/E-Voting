import { Router } from 'express';
import auth from '../authentication';
import { saveSession } from '../middlewares/session';
import { Users } from '../services';

require('dotenv').config({
  path: './.env'
});
const passport = require('passport');
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

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   Users2.findById(id).then(user => {
//     done(null, user);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback'
//     },
//     (token, tokenSecret, profile, done) => {
//       // Check if google profile exist.
//       //   console.log('profile ne: ', profile);
// if (profile.id) {
//   Users2.findOne({ googleId: profile.id }).then(existingUser => {
//     if (existingUser) {
//       // console.log(existingUser);
//       done(null, existingUser);
//     } else {
//       new Users2({
//         googleId: profile.id,
//         email: profile.emails[0].value,
//         name: profile.name.familyName + ' ' + profile.name.givenName
//       })
//         .save()
//         .then(user => done(null, user));
//     }
//   });
// }
//     }
//   )
// );

// MORE SECURE HERE LATER !
router.use('/auth', async (req, res, next) => {
  try {
    const userContent = req.body.user_content;

    const doLogin = () => {
      const jwt = auth.sign(userContent);
      saveSession(req.session, jwt);
      const token = 'bearer ' + jwt;
      return res.json({ success: true, token });
    };

    if (userContent.googleId) {
      Users.findOne({ googleId: userContent.googleId }).then(existingUser => {
        if (existingUser) {
          doLogin();
        } else {
          new Users({
            googleId: userContent.googleId,
            email: userContent.email,
            name: userContent.familyName + ' ' + userContent.givenName
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
