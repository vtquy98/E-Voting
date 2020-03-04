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
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-1">
              <h3 className="content-header-title">Edit your info</h3>
            </div>
          </div>
          <div className="content-body">
            <div className="card">
              <div className="card-content collpase show">
                <div className="card-body">
                  {successMessage ? (
                    <div>
                      <h1 className="title text-center mt-2 mb-2">
                        Your information was updated!
                      </h1>
                      <div className="d-flex justify-content-center">
                        <img
                          src="/static/assets/images/vote-success.svg"
                          alt="success"
                          className="height-200"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="card-text">
                        <p>
                          Edit your information for anyone know more about you.
                        </p>
                      </div>
                      <form
                        className="form form-horizontal form-bordered"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-body">
                          <h4 className="form-section">
                            <i className="ft-user"></i> Personal Info
                          </h4>

                          <Field
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            name="avatar"
                            component={RenderSelectedImageFieldComponent}
                            validate={[required]}
                          />
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(UserInforComponent);
