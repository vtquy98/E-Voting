/* eslint-disable import/first */
require('dotenv').config({
  path: './.env'
});
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
// import { sessionMiddlewares, expressJWT } from './middlewares'; //build in the future
import session from './middlewares/session';
// import expressJWT from './middlewares/express-jwt';
// import expressJWT from './middlewares/express-jwt';
import api from './routes/apis';
const app = express();
const passport = require('passport');
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(passport.initialize());
// app.use(
//   bodyParser.urlencoded({
//     parameterLimit: 100000,
//     limit: '50mb',
//     extended: true
//   })
// );
app.use(logger('dev'));
app.use(session());
// app.use(expressJWT());
app.use(api);

// app.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email']
//   })
// );

// app.get('/auth/google/callback', passport.authenticate('google'));

app.use(function(err, req, res, next) {
  //todo: handle error below, try catch api with catch(e) { next(e) }
  if (err) {
    switch (err.name) {
      case 'GraphQLError': {
        // handle later
        return next();
      }
      case 'UnauthorizedError': {
        console.error('error:', err);
        return next(err);
      }

      default: {
        console.error('error:', err);
        return res.status(503).send('Server Error');
      }
    }
  } else {
    next();
  }
});

module.exports = app;
