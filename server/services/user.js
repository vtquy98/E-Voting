import Users from '../models/user';
import { USER_ACTIVE } from '../enums/userStatus';

export const getUser = payload => {
  if (!payload) {
    return null;
  }
  //status: USER_ACTIVE add later!
  return Users.findOne({ googleId: payload.googleId });
};

module.exports = Users;
module.exports.getUser = getUser;
