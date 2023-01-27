require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("solidity-coverage");
require("dotenv").config();

const RPC_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork:"hardhat",
  networks:{
    goerli:{
      url:RPC_URL,
      chainId:5,
      accounts:[PRIVATE_KEY],
      blockConfirmations:3
    }
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        5:0,
    },
  }
};
