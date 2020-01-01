require("babel-register");
const HDWalletProvider = require("truffle-hdwallet-provider");

// USING ENV LATER
MNENOMIC =
  "cross knee museum boring nose slush payment humble skull repair cannon little"; // Thay ABC bằng seed word của account bạn muốn dùng vào đây.
INFURA_API_KEY = "030c403805a24c12ba74d0148a49b4cf"; // Thay 123 bằng API KEY của Infura vào đây

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          MNENOMIC,
          "https://ropsten.infura.io/v3/" + INFURA_API_KEY
        ),
      network_id: 3,
      gas: 6700000,
      gasPrice: 21
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          MNENOMIC,
          "https://kovan.infura.io/v3/" + INFURA_API_KEY
        ),
      network_id: 42,
      gas: 470000,
      gasPrice: 21
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          MNENOMIC,
          "https://rinkeby.infura.io/v3/" + INFURA_API_KEY
        ),
      network_id: 4,
      gas: 470000,
      gasPrice: 21
    },

    // main ethereum network(mainnet)
    main: {
      provider: () =>
        new HDWalletProvider(
          MNENOMIC,
          "https://mainnet.infura.io/v3/" + INFURA_API_KEY
        ),
      network_id: 1,
      gas: 470000,
      gasPrice: 21
    }
  }
};
