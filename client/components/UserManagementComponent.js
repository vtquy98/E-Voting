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
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-header row">
              <div className="content-header-left col-md-12 col-12 mb-1">
                <h3 className="content-header-title">User management</h3>
              </div>
            </div>

            <div className="content-body">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">List of Users </h4>
                      <Popup
                        trigger={
                          <a className="mt-2 badge badge-pill badge-success label-square text-white">
                            <i className="icon-add ft-plus"></i> Add New
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
                    <div className="card-content">
                      <div className="card-body card-dashboard">
                        <p className="card-text">
                          List user is on system. You can <code>invite</code>{' '}
                          any new people by click the button above. Remind that
                          you just only add <code>candidate</code> or{' '}
                          <code>voter</code> if they's account exist on sytem.
                        </p>

                        <div className="col-md-6 ml-auto">
                          <fieldset className="form-group position-relative has-icon-left">
                            <input
                              type="text"
                              className="form-control"
                              id="iconLeft4"
                              placeholder="Searching for name, email..."
                            />
                            <div className="form-control-position">
                              <i className="ft-search primary"></i>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                      <div className="table-responsive">
                        <table className="table table-xl mb-0">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Avatar</th>
                              <th>Full name</th>
                              <th>Email</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users &&
                              users.map((user, index) => (
                                <tr key={index}>
                                  <th scope="row">{index + 1}</th>
                                  <td className="w-25">
                                    <img
                                      src={user.avatar}
                                      className="img-fluid img-thumbnail"
                                      alt="Sheep"
                                    />
                                  </td>
                                  <td>{user.fullName}</td>
                                  <td>{user.email}</td>
                                  <td>
                                    <a
                                      className="badge badge-pill badge-danger label-square text-white"
                                      onClick={e => {
                                        e.preventDefault();
                                        deleteUser(user.id);
                                      }}
                                    >
                                      <i className="font-medium-2 icon-close ft-droplet"></i>
                                    </a>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
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
