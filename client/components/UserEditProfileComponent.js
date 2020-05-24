import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import {
  editUserInfo,
  editUserInfoDataSelector,
  editUserInfoErrorMessageSelector,
  getCurrentUserDataSelector,
  resetDataEditUserInfo
} from '../stores/UserState';
import { required } from '../utils/validation';
import RenderInputFieldComponent from './FormField/RenderInputFieldComponent';
import RenderTextAreaFieldComponent from './FormField/RenderTextAreaFieldComponent';
import RenderSelectedImageFieldComponent from './FormField/RenderSelectedImageFieldComponent';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { withTranslation } from '../i18n';

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: editUserInfoDataSelector,
    errorMessage: editUserInfoErrorMessageSelector,
    initialValues: getCurrentUserDataSelector
  }),
  dispatch => ({
    resetData: () => {
      resetDataEditUserInfo(dispatch);
    },
    onSubmit: values => {
      dispatch(editUserInfo(values));
    }
  })
);

const withForm = reduxForm({ form: 'edit_user_info' });

const enhance = compose(
  connectToRedux,
  withTranslation('profile'),
  withForm
);

class UserEditProfileComponent extends React.Component {
  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      reset,
      errorMessage,
      successMessage,
      t
    } = this.props;

    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">{t('profile.title')}</h1>

        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow border-none mb-4">
              <div className="card-header py-3 d-flex">
                <Link href="/user/profile">
                  <a className="btn btn-primary btn-icon-split mr-2">
                    <span className="icon text-white-50">
                      <FaArrowLeft />
                    </span>
                    <span className="text">{t('profile.backBtn')}</span>
                  </a>
                </Link>
              </div>
              <div className="card-body">
                {successMessage ? (
                  <div>
                    <h3 className="title text-center mt-2 mb-2">
                      {t('profile.profileUpdated')}
                    </h3>
                    <div className="d-flex justify-content-center">
                      <img
                        src="/static/assets/images/vote-success.svg"
                        alt="success"
                        width="50%"
                      />
                    </div>
                  </div>
                ) : (
                  <form
                    className="form form-horizontal form-bordered"
                    onSubmit={handleSubmit}
                  >
                    <div className="form-body">
                      <div className="row">
                        <div className="col-sm-4 d-flex align-items-center justify-content-center">
                          <Field
                            type="text"
                            className="form-control"
                            name="avatar"
                            component={RenderSelectedImageFieldComponent}
                            validate={[required]}
                            t={t}
                          />
                        </div>
                        <div className="col-sm">
                          <div className="form-group row">
                            <label
                              className="col-md-3 label-control"
                              for="projectinput1"
                            >
                              {t('profile.fullName')}
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                name="fullName"
                                component={RenderInputFieldComponent}
                                validate={[required]}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              className="col-md-3 label-control"
                              for="projectinput2"
                            >
                              {t('profile.profession')}
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                name="profession"
                                component={RenderInputFieldComponent}
                                validate={[required]}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-md-3 label-control">
                              {t('profile.department')}
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                name="department"
                                component={RenderInputFieldComponent}
                                validate={[required]}
                              />
                            </div>
                          </div>
                          <div className="form-group row last">
                            <label className="col-md-3 label-control">
                              {t('profile.dateOfBirth')}
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="date"
                                className="form-control"
                                name="birthDate"
                                component={RenderInputFieldComponent}
                                validate={[required]}
                              />
                            </div>
                          </div>
                          <div className="form-group row last">
                            <label className="col-md-3 label-control">
                              {t('profile.description')}
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                name="summaryDescription"
                                rows="5"
                                component={RenderTextAreaFieldComponent}
                                validate={[required]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>{' '}
                    </div>
                    <div className="form-actions text-center">
                      <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={pristine || submitting}
                      >
                        <i className="fa fa-check-square-o"></i>{' '}
                        {t('profile.saveBtn')}
                      </button>
                      <button
                        disabled={pristine || submitting}
                        className="btn btn-warning ml-1 text-white"
                        type="button"
                        onClick={reset}
                      >
                        <i className="ft-x"></i> {t('profile.resetBtn')}
                      </button>
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
                  </form>
                )}{' '}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default enhance(UserEditProfileComponent);
