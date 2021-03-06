/* eslint-disable import/first */
require('dotenv').config({
  path: './.env'
});
import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors';
import session from './middlewares/session';
import api from './routes/apis';
const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(logger('dev'));
app.use(session());
app.use(api);

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
