import Users from '../models/user';
// import { USER_ACTIVE } from '../enums/userStatus';

export const getUser = payload => {
  if (!payload) {
    return null;
  }
  //status: USER_ACTIVE add later!
  if (payload.googleId) {
    return Users.findOne({ google_id: payload.googleId });
  }
  return Users.findOne({ id: payload.id });
};

module.exports = Users;
module.exports.getUser = getUser;
