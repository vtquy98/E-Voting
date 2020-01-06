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

const connectWithRedux = connect(
  createStructuredSelector({
    currentUser: getCurrentUserDataSelector
  })
);

export default function withAuth(AuthComponent) {
  class AuthenHOC extends React.Component {
    static getInitialProps = async ctx => {
      return AuthComponent.getInitialProps
        ? AuthComponent.getInitialProps(ctx)
        : {};
    };

    componentDidMount() {
      if (!isServer) {
        this.props.dispatch(getCurrentUser());
      }
    }

    render() {
      const { currentUser } = this.props;

      return (
        <div>
          {!verifyScopeAndRole(currentUser) ? (
            <LoadingComponent />
          ) : (
            <AuthComponent {...this.props} isLoggedIn={true} />
          )}
        </div>
      );
    }
  }

  return connectWithRedux(AuthenHOC);
}
