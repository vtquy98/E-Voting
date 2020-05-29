import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { withTranslation } from '../i18n';
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
  withTranslation('voting'),
  withForm
);

class VotingComponent extends React.Component {
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
      election = [],
      t
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
      <React.Fragment>
        <div className="row">
          {election.state !== 'STARTED' ? (
            <div className="col-lg-12">
              <div className="card shadow border-none mb-4">
                <div className="card-header py-3 text-center">
                  <h6 className="m-0 font-weight-bold text-primary ">
                    {election.electionOwner}
                  </h6>
                  <h3 className="mt-2 mb-0 font-weight-bold text-primary ">
                    {election.name}
                  </h3>
                </div>
                <div className="card-body">
                  <h3 className="text-center">{t('errorTime')}</h3>

                  <div className="text-center">
                    {election.state === 'ENDED' && (
                      <Link href={`/result?id=${election.id}`}>
                        <a
                          type="button"
                          className="btn btn-outline-info btn-min-width mr-1 mb-1"
                        >
                          <i className="fa fa-heart"></i> {t('resultBtn')}
                        </a>
                      </Link>
                    )}

                    <Link href="/user/dashboard">
                      <a
                        type="button"
                        className="btn btn-outline-secondary btn-min-width mr-1 mb-1"
                      >
                        <i className="fa fa-home"></i> {t('dashboardBtn')}
                      </a>
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center">
                    <img
                      src="/static/assets/images/party.svg"
                      alt="success"
                      className="mt-2"
                      width="50%"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <div className="col-lg-4">
                <div className="card shadow border-none mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      {t('caution.title')}
                    </h6>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      {t('caution.textHelper')}
                      {election.votingType === 'SELECT_TO_TRUST'
                        ? ` ${t('caution.type.selectToTrust')}. ${t(
                            'caution.textHelper_trust'
                          )}`
                        : election.votingType === 'SELECT_TO_VOTE'
                        ? ` ${t('caution.type.selectToVote')} . ${t(
                            'caution.textHepler_at_least'
                          )} ${election.atLeastVote} ${t(
                            'caution.candidates'
                          )} ${t('caution.textHepler_at_least_1')} ${
                            election.mostVote
                          } ${t('caution.candidates')} ${t(
                            'caution.textHepler_at_least_2'
                          )}.`
                        : ` ${t('caution.type.selectToRemove')} . ${t(
                            'caution.textHepler_at_least'
                          )} ${election.atLeastVote} ${t(
                            'caution.candidates'
                          )} ${t('caution.textHepler_at_least_1')} ${
                            election.mostVote
                          } ${t('caution.candidates')} ${t(
                            'caution.textHelper_remove'
                          )}.`}
                    </p>
                    <p>{t('caution.blockchain_caution')}</p>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card shadow border-none mb-4">
                  <div className="card-content">
                    <div className="card-body">
                      {successMessage || successMessageTrustTypeVote ? (
                        <div>
                          <h1 className="title font-weight-bold text-primary text-center mt-2 mb-2">
                            {t('successMsg')}
                          </h1>
                          <div className="d-flex justify-content-center">
                            <img
                              src="/static/assets/images/vote-success.svg"
                              alt="success"
                              width="50%"
                            />
                          </div>
                          <div className="text-center mt-2">
                            <Link href={`/user/dashboard`}>
                              <a
                                type="button"
                                className="btn btn-outline-primary btn-min-width mr-1 mb-1"
                              >
                                <i className="fa fa-home"></i> {t('homeBtn')}
                              </a>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h1 className="title font-weight-bold text-primary text-center mt-2 mb-2">
                            {t('title')}
                          </h1>
                          <div className="col-lg-12 col-md-6 col-sm-12">
                            <form onSubmit={handleSubmit(submit)}>
                              {election.votingType === 'SELECT_TO_TRUST' ? (
                                <Field
                                  name="voterChoice"
                                  component={RenderTrustField}
                                  t={t}
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
                                    {t('submitBtn')}
                                  </button>
                                  <button
                                    type="button"
                                    disabled={pristine || submitting}
                                    onClick={reset}
                                    className="btn mr-1 mb-1 btn-danger btn-lg"
                                  >
                                    <i className="fa fa-times"></i> {t('reset')}
                                  </button>
                                </div>
                                {errorMessage || errorMessageTrustTypeVote ? (
                                  <div
                                    className="mt-2 alert alert-danger border-0 mb-2"
                                    role="alert"
                                  >
                                    <strong>Error: </strong>
                                    {errorMessage || errorMessageTrustTypeVote}
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
        <style jsx>{`
          .content {
            margin-left: 10px !important;
          }

          .title {
            font-size: 36px;
            font-weight: 300;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

VotingComponent.getInitialProps = async () => ({
  namespacesRequired: ['voting']
});

export default enhance(VotingComponent);
