import React from 'react';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  addUsers,
  addUsersDataSelector,
  addUsersErrorMessageSelector,
  resetDataAddUsers
} from '../stores/UserState';

const withUserEmailState = withState('listUserEmails', 'setEmail', []);

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: addUsersDataSelector,
    errorMessage: addUsersErrorMessageSelector
  }),
  dispatch => ({
    addUsers: listUserEmails =>
      listUserEmails && dispatch(addUsers(listUserEmails)),
    resetData: () => {
      resetDataAddUsers(dispatch);
    }
  })
);

const enhance = compose(
  withUserEmailState,
  connectToRedux
);

class AddUserPopup extends React.Component {
  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const {
      onClick,
      errorMessage,
      successMessage,
      listUserEmails,
      setEmail,
      addUsers
    } = this.props;
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          type="text/css"
          href="/static/assets/custom/tags-input.css"
        />
        <div className="card shadow border-none">
          <div className="card-header py-3 text-center">
            <h6 className="m-0 font-weight-bold text-primary ">
              <i className="fa fa-plus-circle"></i> Add new user
            </h6>
          </div>
          <div className="card-body">
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
                  <h3 className="text-center mt-2">Invite successfully!</h3>
                  <p className="text-center mt-2">
                    They will review an email include
                    <code> Username, password</code> to using E-Voting system
                  </p>

                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={onClick}
                    >
                      <i className="ft-x"></i> Close
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card-text">
                    <p>
                      You are going to <code>Add new user</code>. They will
                      receive an invitation mail to login. After adding user,
                      you can add them into any election.
                    </p>
                    <p>
                      Type each <code>user's email</code> then press{' '}
                      <code>enter</code>.
                    </p>
                  </div>

                  <div className="form-actions center">
                    <TagsInput
                      className="form-control form-control-custom-2"
                      value={listUserEmails}
                      onChange={email => setEmail(email)}
                    />
                    <div className="mt-2 text-right">
                      <button
                        type="submit"
                        className="btn btn-primary mr-1"
                        onClick={e => {
                          e.preventDefault();
                          addUsers(listUserEmails);
                        }}
                      >
                        <i className="fa fa-check-square-o"></i> Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={onClick}
                      >
                        <i className="ft-x"></i> Cancel
                      </button>
                    </div>
                  </div>
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

        <style jsx>{`
          .form-control-custom-2 {
            height: 48px !important;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default enhance(AddUserPopup);
