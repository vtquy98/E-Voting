import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  changeUserPasswordErrorMessageSelector,
  changePassword,
  resetDataChangeUserPassword
} from '../stores/UserState';

const withCurrentPassword = withState(
  'currentPassword',
  'setCurrentPassword',
  ''
);
const withNewPassword = withState('newPassword', 'setNewPassword', '');
const withReInputNewPassword = withState(
  'reInputNewPassword',
  'setReInputNewPassword',
  ''
);

const withIsMatched = withState('isMatch', 'setIsMatch', false);

const connectToRedux = connect(
  createStructuredSelector({
    // successMessage: addUsersDataSelector,
    errorMessage: changeUserPasswordErrorMessageSelector
  }),
  dispatch => ({
    changePassword: ({ currentPassword, newPassword }) => {
      currentPassword &&
        newPassword &&
        dispatch(changePassword({ currentPassword, newPassword }));
    },
    resetData: () => {
      resetDataChangeUserPassword(dispatch);
    }
  })
);

const enhance = compose(
  withCurrentPassword,
  withReInputNewPassword,
  withNewPassword,
  connectToRedux,
  withIsMatched
);

class AddUserPopup extends React.Component {
  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const {
      onClick,
      errorMessage,
      currentPassword,
      setCurrentPassword,
      newPassword,
      isMatch,
      setIsMatch,
      setNewPassword,
      reInputNewPassword,
      setReInputNewPassword,
      changePassword
    } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="card-title" id="basic-layout-form-center">
            <i className="ft-lock"></i> Change yor password
          </h4>
        </div>
        <div className="card-content">
          <div className="card-body">
            <form className="form-horizontal text-left" action="index.html">
              <fieldset className="form-group floating-label-form-group">
                <label>Current password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Current Password"
                  onChange={e => setCurrentPassword(e.currentTarget.value)}
                />
              </fieldset>
              <fieldset className="form-group floating-label-form-group mb-1">
                <label>Enter new Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                  onChange={e => {
                    setNewPassword(e.currentTarget.value);
                    setIsMatch(e.password === reInputNewPassword);
                  }}
                />
              </fieldset>
              <fieldset className="form-group floating-label-form-group mb-1">
                <label>Type again</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Re-input new password"
                  onChange={e => {
                    setReInputNewPassword(e.currentTarget.value);
                    setIsMatch(e.currentTarget.value === newPassword);
                  }}
                />
              </fieldset>
              <div className="form-group row">
                <div className="col-md-6 col-12 text-center text-sm-left"></div>
                <div className="col-md-6 col-12 float-sm-left text-center text-sm-right">
                  <a href="recover-password.html" className="card-link">
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="mt-2 text-center">
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={onClick}
                >
                  <i className="ft-x"></i> Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ml-1"
                  disabled={!isMatch}
                  onClick={e => {
                    e.preventDefault();
                    changePassword({
                      currentPassword,
                      newPassword
                    });
                  }}
                >
                  <i className="ft-unlock"></i> Submit
                </button>
              </div>
              {errorMessage ? (
                <div className="mt-2 alert alert-danger border-0" role="alert">
                  <strong>Error: </strong>
                  {errorMessage}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(AddUserPopup);
