// SelectionComponent

import React from 'react';
import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  changePassword,
  changeUserPasswordDataSelector,
  changeUserPasswordErrorMessageSelector,
  getAllUsers,
  getAllUsersDataSelector,
  resetDataChangeUserPassword
} from '../stores/UserState';
import SelectionComponent from './SelectionComponent';
const withListUser = withState('listUser', 'setListUser', []);

const connectToRedux = connect(
  createStructuredSelector({
    successMessage: changeUserPasswordDataSelector,
    errorMessage: changeUserPasswordErrorMessageSelector,
    users: getAllUsersDataSelector
  }),
  dispatch => ({
    changePassword: ({ currentPassword, newPassword }) => {
      currentPassword &&
        newPassword &&
        dispatch(changePassword({ currentPassword, newPassword }));
    },
    resetData: () => {
      resetDataChangeUserPassword(dispatch);
    },
    getAllUsers: () => dispatch(getAllUsers())
  })
);

const enhance = compose(
  withListUser,
  connectToRedux
);

class AddCandidateOrUserPopupComponent extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  render() {
    const {
      onClick,
      t,
      listUser,
      setListUser,
      users = [],
      listUserExist = [],
      action,
      electionId,
      title
    } = this.props;

    const userData =
      users.length &&
      users
        .filter(u => listUserExist.findIndex(lu => lu.id === u.id) === -1)
        .map(user => {
          return {
            value: user.id,
            label: user.fullName
          };
        });

    return (
      <div className="card shadow border-none">
        <div className="card-header py-3 text-center">
          <h6 className="m-0 font-weight-bold text-primary ">
            <i className="fa fa-plus-circle"></i>
            {title}
          </h6>
        </div>
        <div className="card-content">
          <div className="card-body">
            <div className="mb-2">{t('addCandidateAndVoter.chooseUsers')}</div>
            <SelectionComponent
              value={listUser}
              options={userData}
              isMulti
              onChange={e => setListUser(e)}
            />
            <div className="mt-2 text-center">
              <button
                type="button"
                className="btn btn-warning"
                onClick={onClick}
              >
                <i className="ft-x"></i> {t('addCandidateAndVoter.btnCancel')}
              </button>
              <button
                className="btn btn-primary ml-1"
                disabled={!listUser.length}
                onClick={() => {
                  onClick();
                  action({
                    electionId,
                    listUser:
                      listUser.length === undefined
                        ? [listUser['value']]
                        : listUser.map(user => user.value)
                  });
                }}
              >
                <i className="ft-unlock"></i> {t('addCandidateAndVoter.btnAdd')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default enhance(AddCandidateOrUserPopupComponent);
