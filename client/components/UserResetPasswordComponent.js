import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import {
  checkTokenResetUserPassword,
  checkTokenResetUserPasswordErrorMessageSelector,
  userResetPassword,
  userResetPasswordSuccessMessageSelector,
  userResetPasswordErrorMessageSelector
} from '../stores/UserState';

const withNewPasswordState = withState('newPassword', 'setNewPassword', '');
const withReNewPasswordState = withState(
  'reNewPassword',
  'setReNewPassword',
  ''
);

const connectToRedux = connect(
  createStructuredSelector({
    errorMessage: userResetPasswordErrorMessageSelector,
    successMessage: userResetPasswordSuccessMessageSelector,
    tokenError: checkTokenResetUserPasswordErrorMessageSelector
  }),
  dispatch => ({
    doResetPassword: (token, newPassword) =>
      newPassword && dispatch(userResetPassword(token, newPassword)),
    checkToken: token => dispatch(checkTokenResetUserPassword(token))
  })
);

const enhance = compose(
  withNewPasswordState,
  withReNewPasswordState,
  connectToRedux
);

class UserResetPasswordComponent extends React.Component {
  componentWillMount() {
    const { initialValues, checkToken } = this.props;
    checkToken(initialValues.token);
  }

  render() {
    const {
      setNewPassword,
      newPassword,
      reNewPassword,
      setReNewPassword,
      doResetPassword,
      errorMessage,
      initialValues,
      tokenError
    } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                <div className="col-lg-6 min-500">
                  <div className="text-center pt-5">
                    <img
                      src="/static/assets/images/e-voting-logo.png"
                      alt="branding logo"
                      width="50"
                    />
                  </div>
                  {tokenError && tokenError.length ? (
                    <div>
                      <h1 className="h4 text-gray-900 mb-2 mt-2 text-center">
                        Your token is invalid!
                      </h1>

                      <div className="d-flex justify-content-center">
                        <Link href="/login">
                          <a className="btn btn-primary btn-user">Go to home</a>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="p-5">
                        <div className="text-center">
                          <h1 className="h4 text-gray-900 mb-2">
                            Forgot Your Password?
                          </h1>
                          <p className="mb-4">
                            We get it, stuff happens. Just enter your email
                            address below and we'll send you a link to reset
                            your password!
                          </p>
                        </div>
                        <form className="user">
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              placeholder="Enter new password..."
                              onChange={e => setNewPassword(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user"
                              placeholder="Type again..."
                              onChange={e => setReNewPassword(e.target.value)}
                            />
                          </div>
                          <button
                            className="btn btn-primary btn-user btn-block"
                            disabled={
                              !newPassword &&
                              !reNewPassword &&
                              newPassword !== reNewPassword
                            }
                            onClick={e => {
                              e.preventDefault();
                              doResetPassword(initialValues.token, newPassword);
                            }}
                          >
                            Reset Password
                          </button>
                        </form>
                        <hr />

                        {errorMessage && (
                          <div className="text-danger text-center mt-1">
                            <button type="button" className="close"></button>
                            <strong>Oh snap!</strong> {errorMessage}
                          </div>
                        )}

                        <div className="text-center">
                          <a className="small" href="register.html">
                            Create an Account!
                          </a>
                        </div>
                        <div className="text-center">
                          <a className="small" href="login.html">
                            Already have an account? Login!
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .bg-password-image {
            background: url('/static/assets/images/lock.jpg');
            background-position: center;
            background-size: cover;
          }
          .min-500 {
            min-height: 500px;
          }
        `}</style>
      </div>
    );
  }
}

export default enhance(UserResetPasswordComponent);
