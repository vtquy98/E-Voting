import mongoose from 'mongoose';
import { Users } from './server/services';
import { MALE } from './server/enums/userGender';
import { USER_ACTIVE } from './server/enums/userStatus';
import { USER, ADMIN } from './server/enums/userRole';

const systemUser = {
  username: 'admin',
  password: '123456',
  first_name: 'Young Radio',
  last_name: 'Admin',
  email: 'youngradio.admin@gmail.com',
  gender: MALE,
  birth_date: '19/10/1998',
  quote: 'Death is like a wind, always by my side.',
  status: USER_ACTIVE,
  role: ADMIN,
  profession: 'Student'
};

const insertSystemUser = () => new Users(systemUser).save();

const { MONGODB_URI, MONGO_DB, MONGO_OPTIONS } = process.env;

const mongoUrl = MONGODB_URI || 'mongodb://localhost:27017';
const dbName = MONGO_DB || 'E-Voting';
const option = MONGO_OPTIONS
  ? JSON.parse(MONGO_URL)
  : {
      useNewUrlParser: true
    };

const connectDb = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(mongoUrl + '/' + dbName, option, err => {
      if (err) {
        reject(err);
      }
      resolve(mongoose);
    });
  });
};

module.exports.up = async function() {
  const db = await connectDb();
  await insertSystemUser();
  await db.disconnect();
};

module.exports.down = async function() {
  const db = await connectDb();

  await Promise.all([Users.deleteOne({ username: systemUser.username })]);

  await db.disconnect();
};
