var Voting = artifacts.require('../contracts/Voting.sol');
const web3 = require('web3');

// JUST FOR DEMO DEPLOY
module.exports = function(deployer) {
  deployer.deploy(
    Voting,
    ['Nick', 'Rama', 'Jose'].map(x => web3.utils.asciiToHex(x)),
    { gas: 6700000 }
  );
};

/* As you can see above, the deployer expects the first argument to   be the name of the contract followed by constructor arguments. In our case, there is only one argument which is an array of
candidates. The third argument is a hash where we specify the gas required to deploy our code. The gas amount varies depending on the size of your contract.
*/
