import web3 from '../graphql/libs/web3';
export const generateWallet = async () => {
  const addressWallet = await web3.eth.accounts.create();
  return addressWallet.address;
};
