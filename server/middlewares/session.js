import redisConnect from 'connect-redis';
import session from 'express-session';
import uuid from 'uuid';
import { flow, nth, split } from 'lodash/fp';
import brn from 'brn';
import ms from 'ms';
const redis = require('redis');
const redisClient = redis.createClient();
// const redisClient = redis.createClient(process.env.REDIS_URL);

const SESSION_KEY = 'keyne';
const RedisStore = redisConnect(session);
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
// const redisUrl =
//   process.env.REDIS_URL ||
//   'redis://h:p23c383f9f020413ac10dd56b5507a68b1322478ccdf460184f418764cdb11700@ec2-3-232-50-151.compute-1.amazonaws.com:11199';

const generateSessionKey = flow(
  split('.'),
  brn(nth(2), nth(2), nth(0))
);
/*
for example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJlYWNiODA2LTA5YTYtNGVjOC1hZmY4LTIwZWFlNTVhOGY2ZiIsInVzZXJuYW1lIjoiYXV0aG9yIiwiZmlyc3RfbmFtZSI6IllvdW5nIFJhZGlvIiwibGFzdF9uYW1lIjoiQXV0aG9yIiwiZW1haWwiOiJ5b3VuZ3JhZGlvLmF1dGhvckBnbWFpbC5jb20iLCJpYXQiOjE1Njg3MjQ1NzAsImV4cCI6MTU2OTMyOTM3MH0.Xk5h4Zqy31QePyzXUjr3huL_sEFec6bhvbZ7cjLTKDM
split(.) -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
            eyJpZCI6IjJlYWNiODA2LTA5YTYtNGVjOC1hZmY4LTIwZWFlNTVhOGY2ZiIsInVzZXJuYW1lIjoiYXV0aG9yIiwiZmlyc3RfbmFtZSI6IllvdW5nIFJhZGlvIiwibGFzdF9uYW1lIjoiQXV0aG9yIiwiZW1haWwiOiJ5b3VuZ3JhZGlvLmF1dGhvckBnbWFpbC5jb20iLCJpYXQiOjE1Njg3MjQ1NzAsImV4cCI6MTU2OTMyOTM3MH0
            Xk5h4Zqy31QePyzXUjr3huL_sEFec6bhvbZ7cjLTKDM
brn(x, y, z) -> x = true -> y or -> z
so, token here is: Xk5h4Zqy31QePyzXUjr3huL_sEFec6bhvbZ7cjLTKDM
*/

export const saveSession = (session, token) => {
  if (session) {
    session[SESSION_KEY] = generateSessionKey(token);
    return true;
  }

  console.log('Session is not available');
  return false;
};
export default () =>
  session({
    name: 'session_redis',
    genid: function() {
      return uuid.v4();
    },
    store: new RedisStore({
      url: redisUrl,
      logErrors: true,
      client: redisClient
    }),
    secret: process.env.SESSION_SECRET || 'session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: ms('1d')
    }
  });
