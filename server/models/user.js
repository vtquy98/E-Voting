import { model, Types, Schema } from 'mongoose';
import uuid from 'uuid';
import { USER } from '../enums/userRole';
import { updateDocBuilder } from './utils';
import bcrypt from 'bcryptjs';

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
  google_id: { type: String, required: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  wallet_address: { type: String, required: true },
  role: {
    type: Number,
    default: USER,
    required: true
  },
  username: { type: String },
  password: { type: String }
});

UserSchema.methods.updateDoc = updateDocBuilder();

UserSchema.pre('save', function(next) {
  if (this.google_id) {
    return next();
  }
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        user.updated_at = Date.now();
        return next();
      });
    });
  } else {
    if (user.username) {
      user.username = user.username.toLowerCase();
    }
    return next();
  }
});

UserSchema.methods.comparePassword = function(password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (err) {
    return err;
  }
};

const Users = model('Users', UserSchema);

module.exports = Users;
