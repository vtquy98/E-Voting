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
      successMessage,
      t
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
      <React.Fragment>
        <div className="card shadow border-none">
          <div className="card-header py-3 text-center">
            <h6 className="m-0 font-weight-bold text-primary ">
              <i className="fa fa-plus-circle"></i> {t('manualVoting.title')}
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
                  <h3 className="text-center mt-2">
                    {t('manualVoting.successMsg')}
                  </h3>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary mt-2"
                      onClick={onClick}
                    >
                      <i className="ft-x"></i> {t('manualVoting.closeBtn')}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card-text">
                    <p>{t('manualVoting.description')}</p>
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
                        <i className="fa fa-check-square-o"></i>{' '}
                        {t('manualVoting.saveBtn')}
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={onClick}
                      >
                        <i className="ft-x"></i> {t('manualVoting.closeBtn')}
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
      </React.Fragment>
    );
  }
}

export default enhance(ManualVotingPopup);
