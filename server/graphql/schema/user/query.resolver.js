import { Users } from '../../../services';
import { combineResolvers } from 'graphql-resolvers';
import { checkAuthentication, isAdmin } from '../../libs';

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
      (_, __, { currentUser }) => {
        return Users.findOne({ id: currentUser.id });
      }
    ),
    get_all_users: combineResolvers(isAdmin, async () => {
      return Users.find({});
    })
  }
};
