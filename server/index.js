import "./db/mongodb";
import { ApolloServer } from "apollo-server-express";
import app from "./server";
import schema from "./graphql";
import auth from "./authentication";
//using pubsub later in there: import listeners from './pubsub';
import { Users } from "./services";

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => {
    const currentToken = (req.headers.authorization || "").substr(7);
    try {
      const payload = await auth.verify(currentToken);
      const currentUser = await Users.getUser(payload);
      return {
        req,
        res,
        currentUser
      };
    } catch (error) {
      throw error;
    }
  }
});

server.applyMiddleware({
  app,
  path: process.env.GRAPHQL_PATH
});

const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3003;

app.listen({ port }, () => {
  console.log("environment:", env);
  console.log(`The GraphQL server is running on port ${port}`);
});
