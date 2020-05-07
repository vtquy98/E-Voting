import Link from 'next/link';
import React from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  getElection,
  getElectionDataSelector,
  getVoteData,
  getVoteDataDataSelector
} from '../stores/ElectionState';
import {
  deleteUser,
  getAllUsers,
  getAllUsersDataSelector,
  getCurrentUserDataSelector
} from '../stores/UserState';
import VoteDataListComponent from './VoteDataListComponent';

const withVotingName = withState('votingName', 'setVotingName', '');
const connectToRedux = connect(
  createStructuredSelector({
    users: getAllUsersDataSelector,
    currentUser: getCurrentUserDataSelector,
    election: getElectionDataSelector,
    voteData: getVoteDataDataSelector
  }),
  dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: userId => dispatch(deleteUser(userId)),
    getElection: id => dispatch(getElection(id)),
    getVoteData: id => dispatch(getVoteData(id))
  })
);

const enhance = compose(
  withVotingName,
  connectToRedux
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    const { electionId, getElection, getVoteData } = this.props;
    getElection(electionId.id);
    getVoteData(electionId.id);
  }

  render() {
    const { electionId, election, voteData } = this.props;
    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">{election && election.name}</h1>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow border-none mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <Link href={`/election?id=${electionId.id}`}>
                  <a className="btn btn-primary btn-icon-split">
                    <span className="icon text-white-50">
                      <FaRegArrowAltCircleLeft />
                    </span>
                    <span className="text">Back</span>
                  </a>
                </Link>
              </div>
              <div className="card-body">
                {election && election.state !== 'ENDED' ? (
                  <div>
                    <h3 className="text-center">
                      Sorry, this is not time to see vote data!
                    </h3>

                    <div className="d-flex justify-content-center">
                      <img
                        src="/static/assets/images/error.svg"
                        alt="success"
                        className="mt-2"
                        width="50%"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <VoteDataListComponent voteData={voteData} />
                    <div class="row text-right">
                      <div class="col-sm-12">
                        <div class="dataTables_info">
                          Total{' '}
                          <span className="font-weight-bold">
                            {voteData && voteData.length}
                          </span>{' '}
                          {}
                          actions for this election
                        </div>
                      </div>
                    </div>
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

export default enhance(UserDashboardComponent);
