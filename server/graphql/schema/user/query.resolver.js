import { Users, Tokens } from '../../../services';
import { combineResolvers } from 'graphql-resolvers';
import { checkAuthentication } from '../../libs';

module.exports = {
  Query: {
    login_user: async (_, { username, password }) => {
      const user = await Users.findOne({ username });
      if (user) {
        if (await user.comparePassword(password)) {
          return user;
        }
      }
      throw new Error('Incorrect username or Password!');
    },
    get_current_user: combineResolvers(
      checkAuthentication,
      async (_, __, { currentUser }) => {
        return Users.findOne({ id: currentUser.id });
      }
    ),
    get_all_users: combineResolvers(checkAuthentication, async () => {
      return Users.find({});
    }),

    check_token_reset_password: async (_, { token }) => {
      const existToken = await Tokens.getTokenData(token);
      if (!existToken) {
        throw new Error('Token is invalid');
      }

      return existToken;
    }
  }
};
