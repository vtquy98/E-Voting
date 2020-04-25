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
  withForm
);

class UserInforComponent extends React.Component {
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
      successMessage
    } = this.props;

    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">Your Infomrmation</h1>

        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow border-none mb-4">
              <div className="card-header py-3 d-flex">
                <Link href="/user/info">
                  <a className="btn btn-primary btn-icon-split mr-2">
                    <span className="icon text-white-50">
                      <FaArrowLeft />
                    </span>
                    <span className="text">Back</span>
                  </a>
                </Link>
              </div>
              <div className="card-body">
                {successMessage ? (
                  <div>
                    <h3 className="title text-center mt-2 mb-2">
                      Your information was updated!
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
                            placeholder="Full Name"
                            name="avatar"
                            component={RenderSelectedImageFieldComponent}
                            validate={[required]}
                          />
                        </div>
                        <div className="col-sm">
                          <div className="form-group row">
                            <label
                              className="col-md-3 label-control"
                              for="projectinput1"
                            >
                              Full Name
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                placeholder="Full Name"
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
                              Profession
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                placeholder="Profession"
                                name="profession"
                                component={RenderInputFieldComponent}
                                validate={[required]}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label
                              className="col-md-3 label-control"
                              for="projectinput3"
                            >
                              Department
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                placeholder="Department"
                                name="department"
                                component={RenderInputFieldComponent}
                                validate={[required]}
                              />
                            </div>
                          </div>
                          <div className="form-group row last">
                            <label
                              className="col-md-3 label-control"
                              for="projectinput4"
                            >
                              Date of birth
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
                            <label
                              className="col-md-3 label-control"
                              for="projectinput4"
                            >
                              Summary Description
                            </label>
                            <div className="col-md-9">
                              <Field
                                type="text"
                                className="form-control"
                                placeholder="Type something about you..."
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
                        <i className="fa fa-check-square-o"></i> Save
                      </button>
                      <button
                        disabled={pristine || submitting}
                        className="btn btn-warning ml-1 text-white"
                        type="button"
                        onClick={reset}
                      >
                        <i className="ft-x"></i> Reset
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

export default enhance(UserInforComponent);
