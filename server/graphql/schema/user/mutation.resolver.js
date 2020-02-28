import { combineResolvers } from 'graphql-resolvers';
import { generateWallet } from '../../../libs/generateWalletAddress';
import { Users } from '../../../services';
import { isAdmin } from '../../libs';
import { sendInviteMail } from '../../../mail/mail';
import { generatePassword } from '../../../libs';

module.exports = {
  Mutation: {
    add_users: combineResolvers(isAdmin, async (_, { listUserEmails }) => {
      const userWalletAdress = await generateWallet();
      listUserEmails.map(async user => {
        const existUser = await Users.findOne({ email: user });
        if (!existUser) {
          const password = generatePassword(8);
          const userData = {
            wallet_address: userWalletAdress,
            email: user,
            full_name: user,
            password
          };
          const newUser = new Users(userData);
          await newUser.save();

          sendInviteMail(user, { name: user, password });
        }
      });

      const allUser = await Users.find({});
      return allUser;
    }),
    delete_user: combineResolvers(isAdmin, async (_, { userId }) => {
      const existUser = await Users.findOne({ id: userId });
      if (!existUser) {
        throw new Error('User is not exist!');
      }

      await Users.deleteOne({ id: userId });
      const allUser = await Users.find({});
      return allUser;
    })
  }
};
