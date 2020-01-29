import {
  emptyDirSync,
  readdirSync,
  readFileSync,
  outputJsonSync
} from 'fs-extra';
import { compile } from 'solc';
import { resolve } from 'path';

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

module.exports.up = async function() {
  createBuildFolder();
  compileContracts();
};
