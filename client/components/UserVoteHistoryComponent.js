import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  getVoteHistory,
  getVoteHistoryDataSelector
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
    voteHistory: getVoteHistoryDataSelector
  }),
  dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: userId => dispatch(deleteUser(userId)),
    getVoteHistory: () => dispatch(getVoteHistory())
  })
);

const enhance = compose(
  withVotingName,
  connectToRedux
);

class UserVoteHistoryComponent extends React.Component {
  componentDidMount() {
    this.props.getVoteHistory();
  }

  render() {
    const { voteHistory = [] } = this.props;
    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">Votes History</h1>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow border-none mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    {console.log(voteHistory)}
                    {voteHistory &&
                      voteHistory.map((vote, index) => {
                        return (
                          <div key={index}>
                            <Link href={`/result?id=${vote.electionId}`}>
                              <a className="h5">{vote.electionName}</a>
                            </Link>
                            <VoteDataListComponent voteData={vote.voteData} />
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div class="row text-right">
                  <div class="col-sm-12">
                    <div class="dataTables_info">
                      Total{' '}
                      <span className="font-weight-bold">
                        {voteHistory && voteHistory.length}
                      </span>{' '}
                      Elections that you participated.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default enhance(UserVoteHistoryComponent);
