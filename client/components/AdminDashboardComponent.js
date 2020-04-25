import React from 'react';
import SmallCardComponent from './SmallCardComponent';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';
import ElectionListComponent from './ElectionListComponent';

import {
  getAllElection,
  getAllElectionDataDataSelector
} from '../stores/ElectionState';
import {
  getAllUsers,
  getAllUsersDataSelector,
  getCurrentUserDataSelector
} from '../stores/UserState';
import DashboardInstructionComponent from './DashboardInstructionComponent';

const connectToRedux = connect(
  createStructuredSelector({
    elections: getAllElectionDataDataSelector,
    currentUser: getCurrentUserDataSelector,
    users: getAllUsersDataSelector
  }),
  dispatch => ({
    getAllElection: () => dispatch(getAllElection()),
    getAllUsers: () => dispatch(getAllUsers())
  })
);

const withVotingName = withState('votingName', 'setVotingName', '');
const enhance = compose(
  withVotingName,
  connectToRedux
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    this.props.getAllElection();
    this.props.getAllUsers();
  }

  render() {
    const { currentUser, elections = [], users = [] } = this.props;
    console.log(elections);

    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">Admin Dashboard</h1>
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <SmallCardComponent
              title="On going election"
              content={
                elections.filter(election => election.state === 'STARTED')
                  .length
              }
              classIcon="fas fa-vote-yea"
              cardType="success"
            />
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <SmallCardComponent
              title="Total Elections"
              content={elections.length}
              classIcon="fas fa-clipboard"
              cardType="info"
            />
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <SmallCardComponent
              title="Total Users"
              content={users.length}
              classIcon="fas fa-users"
              cardType="primary"
            />
          </div>

          <div className="col-xl-3 col-md-6 mb-4">
            <SmallCardComponent
              title="Ether balance"
              content={currentUser.balance}
              classIcon="fab fa-ethereum"
              cardType="warning"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <ElectionListComponent elections={elections} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <DashboardInstructionComponent />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default enhance(UserDashboardComponent);
