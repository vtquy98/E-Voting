import { model, Types, Schema } from 'mongoose';
import uuid from 'uuid';

const UserSchema2 = Schema({
  _id: {
    type: Schema.ObjectId,
    default: Types.ObjectId
  },
  id: {
    type: String,
    default: uuid,
    required: true
  },
  googleId: String,
  email: String,
  name: String
});

const Users2 = model('Users2', UserSchema2);

module.exports = Users2;
