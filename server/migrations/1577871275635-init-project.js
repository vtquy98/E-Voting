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

// ganache:
//   admin: 0x86FA91238DdB108831766eC58c365bD0f291b101
//   user: 0xA195956136328E5aFAA1eDD7185101BAf4e9166a

// ropsten:
//   admin: 0xc248515c28a64dFc462Df0301f0D12cF942dae2F
//   user: 0x842782b6F3243195083F96deEC7d065bf03a1c6D

const adminWalletAddress =
  ADMIN_WALLET_ADDRESS || '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';

const mockUserWalletAddress =
  USER_WALLET_ADDRES || '0x842782b6F3243195083F96deEC7d065bf03a1c6D';

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
