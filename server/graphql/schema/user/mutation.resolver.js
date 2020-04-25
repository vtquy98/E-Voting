import { combineResolvers } from 'graphql-resolvers';
import { generateWallet } from '../../../libs/generateWalletAddress';
import { Users } from '../../../services';
import { isAdmin, checkAuthentication } from '../../libs';
// import { sendInviteMail } from '../../../mail/mail'; TEMP CLOSE IT!
import { generatePassword } from '../../../libs';

module.exports = {
  Mutation: {
    add_users: combineResolvers(isAdmin, async (_, { listUserEmails }) => {
      listUserEmails.map(async user => {
        const userWalletAdress = await generateWallet();
        const existUser = await Users.findOne({ email: user });
        if (!existUser) {
          const username = user.substring(0, user.lastIndexOf('@'));
          const password = generatePassword(8);
          const userData = {
            wallet_address: userWalletAdress,
            email: user,
            full_name: user,
            username,
            password
          };
          const newUser = new Users(userData);
          await newUser.save();

          // sendInviteMail(user, { name: username, password });
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
    }),
    edit_user_info: combineResolvers(
      checkAuthentication,
      async (
        _,
        {
          birthDate,
          profession,
          department,
          summaryDescription,
          fullName,
          avatar
        },
        { currentUser }
      ) => {
        const existUser = await Users.findOne({ id: currentUser.id });
        if (!existUser) {
          throw new Error('User is not exist!');
        }

        const userData = {
          birth_date: birthDate,
          profession,
          department,
          summary_description: summaryDescription,
          full_name: fullName,
          avatar
        };

        existUser.updateDoc(userData);
        await existUser.save();
        return existUser;
      }
    ),
    change_password: combineResolvers(
      checkAuthentication,
      async (_, { currentPassword, newPassword }, { currentUser }) => {
        const user = await Users.findOne({ id: currentUser.id });
        if (user) {
          if (await user.comparePassword(currentPassword)) {
            user.password = newPassword;
            await user.save();
            return user;
          }
          throw new Error('Incorrect old password');
        }
      }
    )
  }
};
