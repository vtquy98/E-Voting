import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isServer } from '../../libs';
import LoadingComponent from '../LoadingComponent';

import {
  getCurrentUserDataSelector,
  getCurrentUser,
  verifyScopeAndRole
} from '../../stores/UserState';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

const connectWithRedux = connect(
  createStructuredSelector({
    currentUser: getCurrentUserDataSelector
  })
);

export default function withAuth(AuthComponent) {
  class AuthenHOC extends React.Component {
    // static getInitialProps = async ctx => {
    //   return AuthComponent.getInitialProps
    //     ? AuthComponent.getInitialProps(ctx)
    //     : {};
    // };

    constructor(props) {
      super(props);
      this.props.fetchAccounts();
      this.props.fetchNetwork();
      this.interval = null;
      this.networkInterval = null;
    }

    componentDidMount() {
      this.props.fetchAccounts();
      this.props.fetchNetwork();
      this.initPoll();
      this.initNetworkPoll();
    }

    initNetworkPoll() {
      if (!this.networkInterval) {
        this.networkInterval = setInterval(this.props.fetchNetwork, ONE_MINUTE);
      }
    }

    initPoll() {
      if (!this.interval) {
        this.interval = setInterval(this.props.fetchAccounts, ONE_SECOND);
      }
    }

    render() {
      return null;
    }
  }

  return connectWithRedux(AuthenHOC);
}
