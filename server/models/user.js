import { model, Types, Schema } from 'mongoose';
import uuid from 'uuid';

const UserSchema = Schema({
  _id: {
    type: Schema.ObjectId,
    default: Types.ObjectId
  },
  id: {
    type: String,
    default: uuid,
    required: true
  },
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
});

const Users = model('Users', UserSchema);

module.exports = Users;
