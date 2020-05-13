import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { userLogin } from '../stores/UserState';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import { saveToken } from '../libs/token-libs';
import Router from 'next/router';
import Link from 'next/link';
import { withTranslation } from '../i18n';

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
      Router.push('/user/dashboard');
    });
  });
};

const responseError = response => {
  response.error === 'popup_closed_by_user' &&
    toast.error('Error: Let choose your google account!');
};

const withUsernameState = withState('username', 'setUsername', '');
const withPasswordState = withState('password', 'setPassword', '');

const connectToRedux = connect(
  null,
  dispatch => ({
    doLogin: (username, password) =>
      username && password && dispatch(userLogin(username, password))
  })
);

const enhance = compose(
  withUsernameState,
  withPasswordState,
  withTranslation('login'),
  connectToRedux
);

const UserLoginComponent = ({
  doLogin,
  username,
  password,
  setUsername,
  setPassword,
  t
}) => (
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
            <div className="col-lg-6">
              <div className="p-3">
                <div className="text-center">
                  <img
                    src="/static/assets/images/e-voting-logo.png"
                    alt="branding logo"
                    width="50"
                  />
                  <h1 className="h4 text-gray-900 mb-4">{t('login.title')}</h1>
                </div>
                <form className="user">
                  <div className="form-group">
                    <input
                      type="username"
                      className="form-control form-control-user"
                      placeholder="Enter Username..."
                      onChange={e => setUsername(e.currentTarget.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-user"
                      placeholder="Password"
                      onChange={e => setPassword(e.currentTarget.value)}
                    />
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck"
                      />
                      <label className="custom-control-label" for="customCheck">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <a
                    className="btn btn-primary btn-user btn-block text-white"
                    onClick={e => {
                      e.preventDefault();
                      doLogin(username, password);
                    }}
                  >
                    Login
                  </a>
                  <hr />

                  <GoogleLogin
                    clientId={GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseError}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                      <a
                        onClick={renderProps.onClick}
                        className="btn btn-google btn-user btn-block text-white"
                      >
                        <i className="fab fa-google fa-fw"></i> Login with
                        Google
                      </a>
                    )}
                  />

                  <a
                    href="#"
                    className="btn btn-facebook btn-user btn-block"
                    onClick={() => toast.warn('Comming soon!')}
                  >
                    <i className="fab fa-facebook-f fa-fw"></i> Login with
                    Facebook
                  </a>
                </form>
                <hr />
                <div className="text-center">
                  <Link href="/forgot-password">
                    <a className="small">Forgot Password?</a>
                  </Link>
                </div>
                <div className="text-center">
                  <a
                    className="small"
                    href="#"
                    onClick={() => toast.warn('Comming soon!')}
                  >
                    Create an Account!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>
      {`
        .bg-login-image {
          background: url('/static/assets/images/lock.jpg');
          background-position: center;
          background-size: cover;
        }
      `}
    </style>
  </div>
);

export default enhance(UserLoginComponent);
