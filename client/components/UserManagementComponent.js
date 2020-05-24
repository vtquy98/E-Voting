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
import { withTranslation } from '../i18n';
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
  withTranslation('user-management'),
  connectToRedux
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }
  render() {
    const { users = [], deleteUser, t } = this.props;
    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">{t('title')}</h1>
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
                      <span className="text">{t('inviteBtn')}</span>
                    </a>
                  }
                  modal
                >
                  {close => (
                    <div className="hi">
                      <AddUserPopup onClick={() => close()} t={t} />
                    </div>
                  )}
                </Popup>
              </div>
              <div className="card-body">
                <AllUsersListComponent
                  users={users}
                  deleteUserAction={deleteUser}
                  t={t}
                />
                <div class="row text-right">
                  <div class="col-sm-12">
                    <div class="dataTables_info">
                      {t('total')}{' '}
                      <span className="font-weight-bold">{users.length}</span>{' '}
                      {t('users')}
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
