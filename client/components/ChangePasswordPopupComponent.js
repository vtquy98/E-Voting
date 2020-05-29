import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  changeUserPasswordErrorMessageSelector,
  changePassword,
  resetDataChangeUserPassword,
  changeUserPasswordDataSelector
} from '../stores/UserState';
import Link from 'next/link';

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
    successMessage: changeUserPasswordDataSelector,
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
      changePassword,
      successMessage,
      t
    } = this.props;
    return (
      <div className="card shadow border-none">
        <div className="card-header py-3 text-center">
          <h6 className="m-0 font-weight-bold text-primary ">
            <i className="fa fa-plus-circle"></i>
            {t('changePwd.title')}
          </h6>
        </div>
        <div className="card-content">
          <div className="card-body">
            {successMessage ? (
              <div>
                <div className="d-flex justify-content-center">
                  <img
                    src="/static/assets/images/vote-success.svg"
                    alt="success"
                    width="50%"
                  />
                </div>
                <h3 className="text-center mt-2">{t('changePwd.success')}</h3>

                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={onClick}
                  >
                    <i className="ft-x"></i>
                    {t('changePwd.cancelBtn')}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <form className="form-horizontal text-left" action="index.html">
                  <fieldset className="form-group floating-label-form-group">
                    <label>{t('changePwd.currentPassword')}</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={e => setCurrentPassword(e.currentTarget.value)}
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group mb-1">
                    <label>{t('changePwd.newPassword')}</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={e => {
                        setNewPassword(e.currentTarget.value);
                        setIsMatch(e.password === reInputNewPassword);
                      }}
                    />
                  </fieldset>
                  <fieldset className="form-group floating-label-form-group mb-1">
                    <label>{t('changePwd.newPasswordAgain')}</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={e => {
                        setReInputNewPassword(e.currentTarget.value);
                        setIsMatch(e.currentTarget.value === newPassword);
                      }}
                    />
                  </fieldset>
                  <div className="form-group row">
                    <div className="col-md-6 col-12 text-center text-sm-left"></div>
                    <div className="col-md-6 col-12 float-sm-left text-center text-sm-right">
                      <Link href="/forgot-password">
                        <a className="card-link">
                          {t('changePwd.forgotPassword')}
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-2 text-center">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={onClick}
                    >
                      <i className="ft-x"></i> {t('changePwd.cancelBtn')}
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
                      <i className="ft-unlock"></i> {t('changePwd.submitBtn')}
                    </button>
                  </div>
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(AddUserPopup);
