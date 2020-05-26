import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  userForgotPassword,
  userForgotPasswordErrorMessageSelector,
  userForgotPasswordSuccessMessageSelector
} from '../stores/UserState';
import Link from 'next/link';
import { withTranslation } from '../i18n';

const withEmailState = withState('email', 'setEmail', '');

const connectToRedux = connect(
  createStructuredSelector({
    errorMessage: userForgotPasswordErrorMessageSelector,
    successMessage: userForgotPasswordSuccessMessageSelector
  }),
  dispatch => ({
    doGetEmail: email => email && dispatch(userForgotPassword(email))
  })
);

const enhance = compose(
  withEmailState,
  connectToRedux,
  withTranslation('authen')
);

const UserLoginComponent = ({
  setEmail,
  email,
  doGetEmail,
  errorMessage,
  t
}) => (
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
            <div className="col-lg-6">
              <div className="text-center pt-5">
                <img
                  src="/static/assets/images/e-voting-logo.png"
                  alt="branding logo"
                  width="50"
                />
              </div>

              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-2">{t('forgot.title')}</h1>
                  <p className="mb-4">{t('forgot.description')} </p>
                </div>
                <form className="user">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-user"
                      placeholder={t('forgot.email')}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                  <button
                    href="login.html"
                    className="btn btn-primary btn-user btn-block"
                    onClick={e => {
                      e.preventDefault();
                      doGetEmail(email);
                    }}
                  >
                    {t('forgot.resetBtn')}
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
                  <a className="small" href="#">
                    {t('login.create')}
                  </a>
                </div>
                <div className="text-center">
                  <Link href="/login">
                    <a className="small"> {t('forgot.loginInstead')}</a>
                  </Link>
                </div>
              </div>
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
    `}</style>
  </div>
);

export default enhance(UserLoginComponent);
