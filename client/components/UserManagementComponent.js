import React from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  deleteUser,
  getAllUsers,
  getAllUsersDataSelector,
  getCurrentUserDataSelector
} from '../stores/UserState';
import AddUserPopup from './AddUserPopup';
import AllUsersListComponent from './AllUsersListComponent';

import { FaPlus } from 'react-icons/fa';

const withVotingName = withState('votingName', 'setVotingName', '');
const connectToRedux = connect(
  createStructuredSelector({
    users: getAllUsersDataSelector,
    currentUser: getCurrentUserDataSelector
  }),
  dispatch => ({
    getAllUsers: () => dispatch(getAllUsers()),
    deleteUser: userId => dispatch(deleteUser(userId))
  })
);

const enhance = compose(
  withVotingName,
  connectToRedux
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { users = [], deleteUser } = this.props;
    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">Users Management</h1>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow border-none mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <Popup
                  trigger={
                    <a href="#" className="btn btn-primary btn-icon-split">
                      <span className="icon text-white-50">
                        <FaPlus />
                      </span>
                      <span className="text">Invite user</span>
                    </a>
                  }
                  modal
                >
                  {close => (
                    <div className="hi">
                      <AddUserPopup onClick={() => close()} />
                    </div>
                  )}
                </Popup>
              </div>
              <div className="card-body">
                <AllUsersListComponent
                  users={users}
                  deleteUserAction={deleteUser}
                />
                <div class="row text-right">
                  <div class="col-sm-12">
                    <div class="dataTables_info">
                      Total{' '}
                      <span className="font-weight-bold">{users.length}</span>{' '}
                      Users
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

export default enhance(UserDashboardComponent);
