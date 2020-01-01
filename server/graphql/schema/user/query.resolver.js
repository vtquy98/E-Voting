import { Users } from "../../../services";

import { combineResolvers } from "graphql-resolvers";
import { checkAuthentication } from "../../libs";

module.exports = {
  Query: {
    login_user: async (_, { username, password }) => {
      const user = await Users.findOne({ username });
      if (user) {
        if (await user.comparePassword(password)) {
          return user;
        }
      }
      throw new Error("Incorrect username or Password!");
    },

    //TODO: refactor later!
    get_three_authors_typical: async () => {
      return Users.aggregate([{ $sample: { size: 3 } }]);
    },

    get_current_user: combineResolvers(
      checkAuthentication,
      (_, __, { currentUser }) => {
        return Users.findOne({ id: currentUser.id });
      }
    ),

    get_author_by_id: async (_, { authorId }) => {
      return Users.findOne({ id: authorId }) || {};
    }
  }
};
