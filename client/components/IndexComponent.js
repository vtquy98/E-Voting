import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Web3 from 'web3';
import isEmpty from 'lodash/isEmpty';
import {
  getTypycalUsers,
  getTypycalUsersDataSelector
} from '../stores/UserState';

import { getVotingData, getVotingDataDataSelector } from '../stores/Web3State';

const connectToRedux = connect(
  createStructuredSelector({
    data: getVotingDataDataSelector
  }),
  dispatch => ({
    // web3Connect: () => {
    //   dispatch(web3Connect());
    // }
    getVotingData: () => {
      dispatch(getVotingData());
    }
  })
);

const MOST_VIEW_ARTICLES = 3;
const LASTED_ARTICLES = 3;

// const fetchNetwork = () => {
//   return new Promise((resolve, reject) => {
//     const { web3 } = window;

//     web3 &&
//       web3.version &&
//       web3.version.getNetwork((err, netId) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(netId);
//         }
//       });
//   });
// };

// const getAccounts = () => {
//   try {
//     const { web3 } = window;
//     // throws if no account selected
//     console.log(web3.eth.accounts);
//     return web3.eth.accounts;
//   } catch (e) {
//     return [];
//   }
// };

// const fetchAccounts = () => {
//   return new Promise((resolve, reject) => {
//     const { web3 } = window;
//     const ethAccounts = getAccounts();

//     if (isEmpty(ethAccounts)) {
//       web3 &&
//         web3.eth &&
//         web3.eth.getAccounts((err, accounts) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(accounts);
//           }
//         });
//     } else {
//       resolve(ethAccounts);
//     }
//   });
// };

class IndexBodyComponent extends React.Component {
  componentDidMount() {
    // this.loadBlockchainData();
    // fetchNetwork();
    // fetchAccounts();
    // web3Connect();
    this.props.getVotingData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] });
    console.log(Web3.givenProvider);
  }

  render() {
    // const {
    //   mostViewArticles = [],
    //   lastedArticles = [],
    //   typycalUsers = []
    // } = this.props;
    console.log(this.props.data);
    return 'AHIHI';
  }
}

export default connectToRedux(IndexBodyComponent);
