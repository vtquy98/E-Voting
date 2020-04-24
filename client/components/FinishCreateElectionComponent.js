import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import Link from 'next/link';
import { toast } from 'react-toastify';

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
      toast(`Finishing create election ...`, {
        autoClose: false,
        toastId: electionId
      });
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
      electionTemp = [],
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
        <h1 class="h3 mb-2 text-gray-800">Finish election creation</h1>
        <p class="mb-4">
          Complete some information to people know more about the election.
        </p>

        <div class="row">
          <div class="col-sm">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                  {electionTemp && electionTemp.name}
                </h6>
              </div>
              <div class="card-body">
                {electionTemp.state === 'CREATED' ? (
                  <div className="col-lg-12">
                    <h3 className="text-center">
                      The election look like created successfully yet
                    </h3>
                    <div className="text-center">
                      <Link href={`/election?id=${electionTemp.id}`}>
                        <a
                          type="button"
                          className="btn btn-outline-info btn-min-width mr-1 mb-1"
                        >
                          <i className="fa fa-heart"></i> View Election
                        </a>
                      </Link>
                    </div>
                    <div className="d-flex justify-content-center">
                      <img
                        src="/static/assets/images/error.svg"
                        alt="success"
                        width="60%"
                        className="mt-2"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    {finishCreationSuccessMessage ? (
                      <div>
                        <div className="d-flex justify-content-center">
                          <img
                            src="/static/assets/images/finish-success.svg"
                            alt="success"
                            width="50%"
                          />
                        </div>
                        <h3 className="text-center mt-2">
                          {electionTemp && electionTemp.name} has been created
                          successfully!
                        </h3>

                        <div className="form-group text-center mt-2">
                          <a
                            className="btn mr-1 mb-1 btn-outline-info btn-lg"
                            href={`${
                              ENV_DEPLOY === 'ropsten'
                                ? 'https://ropsten.etherscan.io/address/' +
                                  finishCreationSuccessMessage.electionAddress
                                : 'https://etherscan.io/address/' +
                                  finishCreationSuccessMessage.electionAddress
                            }`}
                            rel="noopener noreferrer"
                            target="_blank"
                            role="button"
                          >
                            <i class="fas fa-cubes"></i> Explore on blockchain
                            network
                          </a>

                          <Link
                            href={`/election?id=${finishCreationSuccessMessage.id}`}
                          >
                            <a
                              className="btn mr-1 mb-1 btn-outline-success btn-lg"
                              role="button"
                            >
                              <i className="fa fa-eye"></i> View Election
                            </a>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div>
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
                                      candidates:
                                        values.candidates.length === undefined
                                          ? [values.candidates['value']]
                                          : values.candidates.map(
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
                          <div className="alert bg-danger mb-2 mt-2">
                            <button type="button" className="close"></button>
                            <strong>Oh snap! </strong>
                            {finishCreationErrorMessage}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
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
