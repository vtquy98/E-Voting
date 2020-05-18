import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import auth from './authentication';
import './db/mongodb';
import schema from './graphql';
import app from './server';
//using pubsub later in there: import listeners from './pubsub';
import { Users } from './services';
const pubsub = new PubSub();

const server = new ApolloServer({
  schema,
  context: async ({ req, res, connection }) => {
    if (connection) {
      return {
        ...connection.context,
        pubsub
      };
    } else {
      const currentToken = (req.headers.authorization || '').substr(7);
      try {
        const payload = await auth.verify(currentToken);
        const currentUser = await Users.getUser(payload);

        return {
          req,
          res,
          currentUser,
          pubsub
        };
      } catch (error) {
        throw error;
      }
    }
  }
});

server.applyMiddleware({
  app,
  path: process.env.GRAPHQL_PATH
});

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3003;

const http = require('http');
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log('environment:', env);
  console.log(
    `🚀 The GraphQL server is running on port http://localhost:${port}${server.graphqlPath}`
  );
  console.log(
    `🚀 The GraphQL Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  );
});
