import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import {
  manualVotingDataSelector,
  manualVoting,
  manualVotingErrorSelector,
  resetDataCreateNewElection,
  resetDataGetManualVoting
} from '../stores/ElectionState';
import { required } from '../utils/validation';
import RenderCandidateSelectionField from './FormField/RenderCandidateSelectionField';

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: manualVotingDataSelector,
    errorMessage: manualVotingErrorSelector
  }),
  dispatch => ({
    resetData: () => {
      resetDataCreateNewElection(dispatch);
      resetDataGetManualVoting(dispatch);
    }
  })
);

const withForm = reduxForm({
  form: 'manual_voting'
});

const enhance = compose(
  withForm,
  connectToRedux
);

class ManualVotingPopup extends React.Component {
  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const {
      handleSubmit,
      candidates,
      onClick,
      pristine,
      submitting,
      errorMessage,
      electionId,
      successMessage
    } = this.props;
    const submit = (values, dispatch) => {
      const candidateList = values.listUserId.map(candidate => candidate.value);
      dispatch(
        manualVoting({
          electionId,
          listUserId: candidateList
        })
      );
    };
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="card-title" id="basic-layout-form-center">
            <i className="fa fa-plus-circle"></i> Manual voting
          </h4>
        </div>
        <div className="card-content">
          <div className="card-body">
            {successMessage ? (
              <div>
                <div className="d-flex justify-content-center">
                  <img
                    src="/static/assets/images/vote-success.svg"
                    alt="success"
                    className="height-150"
                  />
                </div>
                <h3 className="text-center mt-2">Vote successfully</h3>
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
                    You are going to <code>manual vote</code> for candidate,
                    just select candiate in below base on the voter's ballot.
                  </p>
                </div>
                <form className="form" onSubmit={handleSubmit(submit)}>
                  <div className="form-actions center">
                    <Field
                      name="listUserId"
                      component={RenderCandidateSelectionField}
                      options={
                        candidates &&
                        candidates.map(candidate => {
                          return {
                            value: candidate.id,
                            label: candidate.fullName
                          };
                        })
                      }
                      validate={[required]}
                    />

                    <button
                      type="submit"
                      className="btn btn-primary mr-1"
                      disabled={pristine || submitting}
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
                  {errorMessage ? (
                    <div
                      className="mt-2 alert alert-danger border-0 mb-2"
                      role="alert"
                    >
                      <strong>Error: </strong>
                      {errorMessage}
                    </div>
                  ) : null}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(ManualVotingPopup);
