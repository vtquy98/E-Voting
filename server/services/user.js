import Users from '../models/user';
import { USER_ACTIVE } from '../enums/userStatus';

export const getUser = payload => {
  if (!payload) {
    return null;
  }
  return Users.findOne({ id: payload.id, status: USER_ACTIVE });
};

module.exports = Users;
module.exports.getUser = getUser;
