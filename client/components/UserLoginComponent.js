import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';

import { userLogin, userLoginErrorMessageSelector } from '../stores/UserState';

const withUsernameState = withState('username', 'setUsername', '');
const withPasswordState = withState('password', 'setPassword', '');

const connectToRedux = connect(
  createStructuredSelector({
    errorMessage: userLoginErrorMessageSelector
  }),
  dispatch => ({
    doLogin: (username, password) =>
      username && password && dispatch(userLogin(username, password))
  })
);

const enhance = compose(
  withUsernameState,
  withPasswordState,
  connectToRedux
);

const UserLoginComponent = ({
  doLogin,
  username,
  password,
  setUsername,
  setPassword,
  errorMessage
}) => (
  <div className="login-page sidebar-collapse">
    <div className="page-header header-filter background-test">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
            <form className="form" method="" action="">
              <div className="card card-login">
                <div className="card-header card-header-primary text-center">
                  <h4 className="card-title">Login</h4>
                  <div className="social-line">
                    <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-white"
                    >
                      <i className="fa fa-facebook-square"></i>
                    </a>
                    <a
                      href="#pablo"
                      className="btn btn-just-icon btn-link btn-white"
                    >
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </div>
                </div>
                <div className="card-body ">
                  <p className="card-description text-center">
                    Or Be Classical
                  </p>
                  <span className="bmd-form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">face</i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username..."
                        onChange={e => setUsername(e.currentTarget.value)}
                      />
                    </div>
                  </span>
                  <span className="bmd-form-group">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password..."
                        onChange={e => setPassword(e.currentTarget.value)}
                      />
                    </div>
                  </span>
                </div>
                <div className="card-footer justify-content-center">
                  <button
                    className="btn btn-rose btn-link btn-lg"
                    onClick={e => {
                      e.preventDefault();
                      doLogin(username, password);
                    }}
                  >
                    Lets Go
                  </button>
                </div>
                {errorMessage ? (
                  <div className="alert alert-danger">
                    <div className="alert-icon">
                      <i className="material-icons">error_outline</i>
                    </div>
                    <b>Error :</b> {errorMessage}
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .background-test {
        background-image: url('/static/material/assets/img/bg7.jpg');
        background-size: cover;
        background-position: top center;
        x-flow: row wrap;
      }
    `}</style>
  </div>
);

export default enhance(UserLoginComponent);
