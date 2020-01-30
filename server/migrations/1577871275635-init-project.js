import mongoose from 'mongoose';
import { ADMIN, USER } from '../enums/userRole';
import { Users } from '../services';

const {
  MONGODB_URI,
  MONGO_DB,
  MONGO_OPTIONS,
  ADMIN_WALLET_ADDRESS,
  USER_WALLET_ADDRES
} = process.env;

const adminWalletAddress =
  ADMIN_WALLET_ADDRESS || '0x001526F8bF8A346abF4d2d60B7e5BA4BeC75FB28';

const mockUserWalletAddress =
  USER_WALLET_ADDRES || '0x8a0Aa7Fd4fC557dBF8d97291c520Fa7a6E64F696';

const systemUser = {
  username: 'admin',
  password: '123456',
  full_name: 'AGU E-VOTING',
  email: 'agu-evoting.admin@gmail.com',
  wallet_address: adminWalletAddress,
  role: ADMIN,
  google_id: 'undefined'
};

const mockUser = {
  username: 'user',
  password: '123456',
  full_name: 'AGU E-VOTING',
  email: 'agu-evoting.user@gmail.com',
  wallet_address: mockUserWalletAddress,
  role: USER,
  google_id: 'undefined'
};

const insertSystemUser = () => new Users(systemUser).save();
const insertMockUser = () => new Users(mockUser).save();

const mongoUrl = MONGODB_URI || 'mongodb://localhost:27017';
const dbName = MONGO_DB || 'E-Voting';
const option = MONGO_OPTIONS
  ? JSON.parse(MONGODB_URI)
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
  await insertMockUser();
  await db.disconnect();
};

module.exports.down = async function() {
  const db = await connectDb();
  await Promise.all([
    Users.deleteOne({ username: systemUser.username }),
    Users.deleteOne({ username: mockUser.username })
  ]);
  await db.disconnect();
};
