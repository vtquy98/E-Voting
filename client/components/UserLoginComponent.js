import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';

import { userLogin, userLoginErrorMessageSelector } from '../stores/UserState';

import { GoogleLogin } from 'react-google-login';
import { saveToken } from '../libs/token-libs';
import Router from 'next/router';
const API_SERVER_URL = process.env.API_SERVER_URL || 'http://localhost:3003';
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '830741702755-h2vuh5arm3tg3t5bh64lp0d6qog62qhs.apps.googleusercontent.com';

const responseGoogle = response => {
  const content = new Blob(
    [
      JSON.stringify({
        tokenId: response.tokenId,
        user_content: response.profileObj
      })
    ],
    { type: 'application/json' }
  );
  const options = {
    method: 'POST',
    body: content,
    mode: 'cors',
    cache: 'default'
  };
  fetch(`${API_SERVER_URL}/auth`, options).then(r => {
    r.json().then(user => {
      saveToken(user.token);
      Router.push('/');
    });
  });
};

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
  <div className="app-content">
    <div className="content-wrapper">
      <div className="content-header row"></div>
      <div className="content-body">
        <section className="flexbox-container">
          <div className="col-12 d-flex align-items-center justify-content-center mt-2">
            <div className="col-md-4 col-10 box-shadow-2 p-0">
              <div className="card border-grey border-lighten-3 m-0">
                <div className="card-header border-0">
                  <div className="card-title text-center">
                    <div className="p-1">
                      <img
                        src="/static/assets/images/e-voting-logo.png"
                        alt="branding logo"
                        width="100"
                      />
                    </div>
                  </div>
                  <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                    <span>Easily Using</span>
                  </h6>
                </div>
                <div className="card-content">
                  <div className="card-body pt-0 text-center">
                    <a
                      href="#"
                      className="btn btn-social mb-1 mr-1 btn-outline-facebook"
                    >
                      <span className="fa fa-facebook"></span>
                      <span className="px-1">facebook</span>
                    </a>

                    <GoogleLogin
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Login with Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                      render={renderProps => (
                        <a
                          href="#"
                          onClick={renderProps.onClick}
                          className="btn btn-social mb-1 mr-1 btn-outline-google"
                        >
                          <span className="fa fa-google-plus font-medium-4"></span>
                          <span className="px-1">google</span>
                        </a>
                      )}
                    />
                  </div>
                  <p className="card-subtitle line-on-side text-muted text-center font-small-3 mx-2">
                    <span>OR Using Account Details</span>
                  </p>
                  <div className="card-body pt-0">
                    <form className="form-horizontal" action="index.html">
                      <fieldset className="form-group floating-label-form-group">
                        <label htmlFor="user-name">Your Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="user-name"
                          placeholder="Your Username"
                          onChange={e => setUsername(e.currentTarget.value)}
                        />
                      </fieldset>
                      <fieldset className="form-group floating-label-form-group mb-1">
                        <label htmlFor="user-password">Enter Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="user-password"
                          placeholder="Enter Password"
                          onChange={e => setPassword(e.currentTarget.value)}
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
                      <button
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                        onClick={e => {
                          e.preventDefault();
                          doLogin(username, password);
                        }}
                      >
                        <i className="ft-unlock"></i> Login
                      </button>
                    </form>

                    {errorMessage ? (
                      <div
                        className="mt-2 alert alert-danger border-0 mb-2"
                        role="alert"
                      >
                        <strong>Error: </strong>
                        {errorMessage}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default enhance(UserLoginComponent);
