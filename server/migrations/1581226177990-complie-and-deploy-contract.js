import {
  emptyDirSync,
  readdirSync,
  readFileSync,
  outputJsonSync
} from 'fs-extra';
import { compile } from 'solc';
import { resolve } from 'path';
import web3 from '../graphql/libs/web3';

import mongoose from 'mongoose';
import { Contracts } from '../services';
const { MONGODB_URI, MONGO_DB, MONGO_OPTIONS } = process.env;

const builPath = resolve('contract-build');

const createBuildFolder = () => {
  emptyDirSync(builPath);
};

//get source of contract
const contracstFolderPath = resolve('contracts');
const buildSources = () => {
  const sources = {};
  const contractsFiles = readdirSync(contracstFolderPath);

  contractsFiles.forEach(file => {
    const contractFullPath = resolve(contracstFolderPath, file);
    sources[file] = {
      content: readFileSync(contractFullPath, 'utf8')
    };
  });
  return sources;
};

//compile and write output:
const input = {
  language: 'Solidity',
  sources: buildSources(),
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi', 'evm.bytecode']
      }
    }
  }
};

const compileContracts = () => {
  const compiledContracts = JSON.parse(compile(JSON.stringify(input)))
    .contracts;

  for (let contract in compiledContracts) {
    for (let contractName in compiledContracts[contract]) {
      outputJsonSync(
        resolve(builPath, `${contractName}.json`),
        compiledContracts[contract][contractName],
        {
          spaces: 2
        }
      );
    }
  }
};

const mongoUrl = MONGODB_URI || 'mongodb://localhost:27017';
const dbName = MONGO_DB || 'E-Voting';
const option = MONGO_OPTIONS
  ? JSON.parse(MONGODB_URI)
  : {
      useNewUrlParser: true
    };

//this is deploy on ropsten network
// const adminWalletAddress =
//   ADMIN_WALLET_ADDRESS || '0xc248515c28a64dFc462Df0301f0D12cF942dae2F';

const adminWalletAddress = '0x86FA91238DdB108831766eC58c365bD0f291b101';

const deployContract = async () => {
  const ElectionCreation = require('../contract-build/ElectionCreation.json');
  const result = await new web3.eth.Contract(ElectionCreation.abi)
    .deploy({ data: '0x' + ElectionCreation.evm.bytecode.object })
    .send({ from: adminWalletAddress, gas: '6721975' });
  return result;
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

const deploy = async () => {
  const db = await connectDb();
  console.log('---Deploying e-voting contract---');
  const contractData = await deployContract();
  const contract = new Contracts({
    contract_address: contractData.options.address
  });
  console.log('---deployed!---');
  await contract.save();
  await db.disconnect();
};

const deleteDb = async () => {
  const db = await connectDb();
  await Contracts.remove({});
  await db.disconnect();
};

module.exports.up = async function() {
  createBuildFolder();
  compileContracts();
  await deploy();
};

module.exports.down = async function() {
  deleteDb();
};
