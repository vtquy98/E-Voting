export const generatePassword = () => {
  const result = Math.floor(Math.random() * 1000000);
  return result;
};
