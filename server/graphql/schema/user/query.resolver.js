import { Users } from '../../../services';

import { combineResolvers } from 'graphql-resolvers';
import { checkAuthentication } from '../../libs';

module.exports = {
  Query: {
    get_current_user: combineResolvers(
      checkAuthentication,
      (_, __, { currentUser }) => {
        return Users.findOne({ id: currentUser.id });
      }
    )
  }
};
