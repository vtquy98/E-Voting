//todo: add 'temp state' to check, if state is created, prevent user go to there!
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import Link from 'next/link';

import {
  getElectionTemp,
  getElectionTempDataSelector,
  resetDataGetElectionTemp,
  finishElectionCreation,
  finishElectionCreationDataSelector,
  finishElectionCreationErrorSelector,
  resetDataGetFinishElectionCreation
} from '../stores/ElectionState';

import { getAllUsers, getAllUsersDataSelector } from '../stores/UserState';

import WizardFormSecondPage from './VotingCandidateForm';
import VotingDescriptionForm from './VotingDescriptionForm';
import WizardFormThirdPage from './VoterForm';

const ENV_DEPLOY = process.env.ENV_DEPLOY || 'ropsten';

const connectToRedux = connect(
  createStructuredSelector({
    // successMessage: createVotingDataSelector,
    electionTemp: getElectionTempDataSelector,
    users: getAllUsersDataSelector,
    finishCreationSuccessMessage: finishElectionCreationDataSelector,
    finishCreationErrorMessage: finishElectionCreationErrorSelector
  }),
  dispatch => ({
    getElectionTemp: id => dispatch(getElectionTemp(id)),
    getAllUsers: () => dispatch(getAllUsers()),

    resetData: () => {
      resetDataGetElectionTemp(dispatch);
      resetDataGetFinishElectionCreation(dispatch);
    },
    finishElectionCreation: ({ candidates, voters, electionId, ...values }) => {
      dispatch(
        finishElectionCreation({
          ...values,
          candidates,
          voters,
          electionId
        })
      );
    }
  })
);

const enhance = compose(connectToRedux);

class FinishCreateElectionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElectionTemp(electionId.id);
    this.props.getAllUsers();
  }
  componentWillUnmount() {
    this.props.resetData();
  }
  render() {
    const { page } = this.state;
    const {
      electionTemp,
      users = [],
      electionId,
      finishElectionCreation,
      finishCreationSuccessMessage,
      finishCreationErrorMessage
    } = this.props;

    const userData =
      users &&
      users.map(user => {
        return {
          value: user.id,
          label: user.fullName
        };
      });

    return (
      <React.Fragment>
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-body">
              <section className="card" id="vertical-tabs">
                <div className="card-header">
                  <h4 className="card-title">Finish election creation</h4>
                </div>
                <div className="card-content">
                  <h1 className="text-bold-400 text-center">
                    {electionTemp && electionTemp.name}
                  </h1>
                  <div className="card-body">
                    {finishCreationSuccessMessage ? (
                      <div>
                        <div className="d-flex justify-content-center">
                          <img
                            src="/static/assets/images/finish-success.svg"
                            alt="success"
                            className="height-250"
                          />
                        </div>
                        <h2 className="text-center mt-2">
                          {electionTemp && electionTemp.name} has been created
                          successfully!
                        </h2>

                        <div className="form-group text-center mt-2">
                          <a
                            className="btn mr-1 mb-1 btn-outline-info btn-lg"
                            href={`${
                              ENV_DEPLOY === 'development'
                                ? 'https://ropsten.etherscan.io/address/' +
                                  finishCreationSuccessMessage.electionAddress
                                : 'https://etherscan.io/address/' +
                                  finishCreationSuccessMessage.electionAddress
                            }`}
                            role="button"
                          >
                            <i className="fa fa-btc"></i> Explore on blockchain
                            network
                          </a>

                          <Link
                            href={`/show-election?id=${finishCreationSuccessMessage.id}`}
                          >
                            <a
                              className="btn mr-1 mb-1 btn-outline-success btn-lg"
                              role="button"
                            >
                              <i className="fa fa-eye"></i> View Election
                              network
                            </a>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="alert alert-icon-right alert-info alert-dismissible mb-2"
                          role="alert"
                        >
                          <span className="alert-icon mr-2">
                            <i className="fa fa-info"></i>
                          </span>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                          Complete some information to people know more about
                          the election.
                        </div>

                        <div className="wizard-container">
                          <div
                            className="card wizard-card"
                            data-color="rose"
                            id="wizardProfile"
                          >
                            <div className="tab-content">
                              <div className="row">
                                <div className="col-lg-12">
                                  {page === 1 && (
                                    <VotingDescriptionForm
                                      onSubmit={this.nextPage}
                                    />
                                  )}
                                  {page === 2 && (
                                    <WizardFormSecondPage
                                      previousPage={this.previousPage}
                                      options={userData}
                                      onSubmit={this.nextPage}
                                    />
                                  )}
                                  {page === 3 && (
                                    <WizardFormThirdPage
                                      previousPage={this.previousPage}
                                      options={userData}
                                      onSubmit={values =>
                                        finishElectionCreation({
                                          ...values,
                                          candidates: values.candidates.map(
                                            candidate => candidate.value
                                          ),
                                          voters: values.voters.map(
                                            voter => voter.value
                                          ),
                                          electionId: electionId.id
                                        })
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            {finishCreationErrorMessage && (
                              <div className="alert bg-danger  mb-2">
                                <button
                                  type="button"
                                  className="close"
                                ></button>
                                <strong>Oh snap!</strong>
                                {finishCreationErrorMessage}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

FinishCreateElectionComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default enhance(FinishCreateElectionComponent);
