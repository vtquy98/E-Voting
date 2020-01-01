//use later

import expressJWT from 'express-jwt';

const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';

const allowPaths = ['/signin', '/signup', graphqlPath];

export default () =>
  expressJWT({
    secret: process.env.JWT_SECRET
  }).unless({
    path: allowPaths
  });
