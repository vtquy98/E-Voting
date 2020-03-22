import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import { toast } from 'react-toastify';

import {
  getAllCandidates,
  getAllCandidatesDataSelector,
  resetDataPollVote,
  getElection,
  getElectionDataSelector,
  pollVote,
  pollVoteDataSelector,
  pollVoteErrorSelector,
  pollVoteTrustType,
  pollVoteTrustTypeDataSelector,
  pollVoteTrustTypeErrorSelector,
  resetDataPollVoteTrustType
} from '../stores/ElectionState';

import { getCurrentUserDataSelector } from '../stores/UserState';
import RenderVoteCheckFieldComponent from './FormField/RenderVoteCheckFieldComponent';
import RenderTrustField from './FormField/RenderTrustField';

const connectToRedux = connect(
  createStructuredSelector({
    election: getElectionDataSelector,
    errorMessage: pollVoteErrorSelector,
    successMessage: pollVoteDataSelector,
    candidates: getAllCandidatesDataSelector,
    currentUser: getCurrentUserDataSelector,
    errorMessageTrustTypeVote: pollVoteTrustTypeErrorSelector,
    successMessageTrustTypeVote: pollVoteTrustTypeDataSelector
  }),
  dispatch => ({
    resetData: () => {
      resetDataPollVote(dispatch);
      resetDataPollVoteTrustType(dispatch);
    },
    getElection: id => dispatch(getElection(id)),
    getAllCandidates: electionId => dispatch(getAllCandidates(electionId))
  })
);

const withForm = reduxForm({
  form: 'voting'
});

const enhance = compose(
  connectToRedux,
  withForm
);

class ShowElectionComponent extends React.Component {
  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId.id);
    this.props.getAllCandidates(electionId.id);
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const {
      candidates = [],
      handleSubmit,
      pristine,
      reset,
      submitting,
      successMessage,
      errorMessage,
      errorMessageTrustTypeVote,
      successMessageTrustTypeVote,
      election = []
    } = this.props;

    const submit = (values, dispatch, props) => {
      const electionId = props.electionId.id;
      const candidateList = candidates.map(candidate => candidate.id);

      if (election.votingType !== 'SELECT_TO_TRUST') {
        toast(`Voting ...`, {
          autoClose: false,
          toastId: 'voting_toast'
        });
        const listToVote =
          values &&
          candidateList.filter(val => !values.listUserId.includes(val));
        dispatch(
          pollVote({
            listUserId:
              election.votingType === 'SELECT_TO_VOTE'
                ? values.listUserId
                : listToVote,
            electionId
          })
        );
      } else {
        toast(`Voting ...`, {
          autoClose: false,
          toastId: 'voting_toast'
        });
        dispatch(
          pollVoteTrustType({
            choice: values.voterChoice === 'true',
            electionId,
            userId: candidateList[0]
          })
        );
      }
    };

    return (
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="row">
              {election.state !== 'STARTED' ? (
                <div className="col-lg-12 card">
                  <div className="card-header">
                    <h4 className="card-title">{election.name}</h4>
                  </div>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="card-text">
                        <h1 className="text-center">
                          Sorry, this is not time to vote!
                        </h1>

                        <div className="text-center">
                          {election.state === 'ENDED' && (
                            <Link href={`/election-result?id=${election.id}`}>
                              <a
                                type="button"
                                className="btn btn-outline-info btn-min-width mr-1 mb-1"
                              >
                                <i className="fa fa-heart"></i> View result
                              </a>
                            </Link>
                          )}

                          <Link href="/user/dashboard">
                            <a
                              type="button"
                              className="btn btn-outline-secondary btn-min-width mr-1 mb-1"
                            >
                              <i className="fa fa-home"></i> Go to dashboard
                            </a>
                          </Link>
                        </div>
                        <div className="d-flex justify-content-center">
                          <img
                            src="/static/assets/images/party.svg"
                            alt="success"
                            className="height-300 mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <div className="col-md-4">
                    <div className="card text-white box-shadow-0 bg-warning">
                      <div className="card-header">
                        <h4 className="card-title">Before you vote</h4>
                      </div>
                      <div className="card-content collapse show">
                        <div className="card-body">
                          <p className="card-text">
                            Thank you for going there and voting. The type of
                            this election is
                            {election.votingType === 'SELECT_TO_TRUST'
                              ? ` Trust or Do not trust . So you must be choose one of selection to vote.`
                              : election.votingType === 'SELECT_TO_VOTE'
                              ? ` Select to vote . So you must be choose at least ${election.atLeastVote} candidate(s) and max ${election.mostVote} that you trust to vote for them.`
                              : ` Select to remove . So you must be choose at least ${election.atLeastVote} candidate(s) and max ${election.mostVote} that you do not trust to remove them.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-content">
                        <div className="card-body">
                          {successMessage || successMessageTrustTypeVote ? (
                            <div>
                              <h1 className="title text-center mt-2 mb-2">
                                Thank you for your participation!
                              </h1>
                              <div className="d-flex justify-content-center">
                                <img
                                  src="/static/assets/images/vote-success.svg"
                                  alt="success"
                                  className="height-200"
                                />
                              </div>
                              <h4 className="text-bold-400 text-center mt-2">
                                Keep calm and waiting for election result
                              </h4>
                            </div>
                          ) : (
                            <div>
                              <h1 className="title text-center mt-2 mb-2">
                                Who will you vote for?
                              </h1>
                              <div className="col-lg-12 col-md-6 col-sm-12">
                                <form onSubmit={handleSubmit(submit)}>
                                  {election.votingType === 'SELECT_TO_TRUST' ? (
                                    <Field
                                      name="voterChoice"
                                      component={RenderTrustField}
                                    />
                                  ) : (
                                    <Field
                                      name="listUserId"
                                      options={candidates}
                                      component={RenderVoteCheckFieldComponent}
                                      votingType={election.votingType}
                                    />
                                  )}

                                  <div className="text-center mt-2">
                                    <div className="form-group">
                                      <button
                                        type="submit"
                                        className="btn mr-1 mb-1 btn-success btn-lg"
                                        disabled={pristine || submitting}
                                      >
                                        <i className="fa fa-check-circle"></i>{' '}
                                        Submit
                                      </button>
                                      <button
                                        type="button"
                                        disabled={pristine || submitting}
                                        onClick={reset}
                                        className="btn mr-1 mb-1 btn-danger btn-lg"
                                      >
                                        <i className="fa fa-times"></i> Reset
                                      </button>
                                    </div>
                                    {errorMessage ||
                                    errorMessageTrustTypeVote ? (
                                      <div
                                        className="mt-2 alert alert-danger border-0 mb-2"
                                        role="alert"
                                      >
                                        <strong>Error: </strong>
                                        {errorMessage ||
                                          errorMessageTrustTypeVote}
                                      </div>
                                    ) : null}
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <style jsx>{`
          .content {
            margin-left: 10px !important;
          }

          .title {
            font-size: 36px;
            font-weight: 300;
          }
        `}</style>
      </div>
    );
  }
}
export default enhance(ShowElectionComponent);
