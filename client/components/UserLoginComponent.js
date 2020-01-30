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
  <div className="bg-gradient-primary">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          className="form-control form-control-user"
                          placeholder="Enter Username..."
                          onChange={e => setUsername(e.currentTarget.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          onChange={e => setPassword(e.currentTarget.value)}
                        />
                      </div>

                      <a
                        href="index.html"
                        className="btn btn-primary btn-user btn-block"
                        onClick={e => {
                          e.preventDefault();
                          doLogin(username, password);
                        }}
                      >
                        Login
                      </a>

                      <hr />
                      {errorMessage ? (
                        <div className="alert alert-danger">
                          <b>Error :</b> {errorMessage}
                        </div>
                      ) : null}
                      <GoogleLogin
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                          <a
                            onClick={renderProps.onClick}
                            className="btn btn-google btn-user btn-block"
                          >
                            <div className="btn-google2">
                              <i className="fab fa-google fa-fw"></i> Login with
                              Google
                            </div>
                          </a>
                        )}
                      />
                      <a
                        href="index.html"
                        className="btn btn-facebook btn-user btn-block"
                      >
                        <i className="fab fa-facebook-f fa-fw"></i> Login with
                        Facebook
                      </a>
                    </form>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">
                        Forgot Password?
                      </a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="register.html">
                        Create an Account!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .btn-google2 {
        color: #fff;
      }
    `}</style>
  </div>
);

export default enhance(UserLoginComponent);
