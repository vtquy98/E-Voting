import { makeFetchAction, ACTIONS } from 'redux-api-call';
import { respondToSuccess } from '../middlewares/api-reaction';
import Router from 'next/router';
import { flow, join, map, path, get, has } from 'lodash/fp';
import { gql } from '../libs/graphql';
import { saveToken, removeToken } from '../libs/token-libs';
import nfetch from '../libs/nfetch';
import { EmitErrorToast, EmitToastSuccess } from '../libs/toast';
export const USER_LOGIN_API = 'UserLoginAPI';
export const GET_CURRENT_USER_API = 'GetCurrentUserAPI';
export const USER_LOGOUT = 'UserLogout';
export const USER_LOGOUT_API = 'UserLogoutAPI';
export const GET_ALL_USERS_API = 'GetAllUsersAPI';
export const ADD_USERS_API = 'AddUsersAPI';
export const DELETE_USER_API = 'DeleteUserAPI';
export const EDIT_USER_INFO_API = 'EditUserInfoAPI';
export const CHANGE_PASSWORD_API = 'ChangePasswordAPI';

const ChangePasswordAPI = makeFetchAction(
  CHANGE_PASSWORD_API,
  gql`
    mutation($currentPassword: String!, $newPassword: String!) {
      change_password(
        currentPassword: $currentPassword
        newPassword: $newPassword
      ) {
        id
      }
    }
  `
);

export const changePassword = ({ currentPassword, newPassword }) => {
  return respondToSuccess(
    ChangePasswordAPI.actionCreator({
      currentPassword,
      newPassword
    }),
    resp => {
      if (resp.errors) {
        console.log('Err: ', resp.errors);
        return;
      }
      EmitToastSuccess('Your password has been changed succesfully !');
      return;
    }
  );
};

export const changeUserPasswordErrorMessageSelector = flow(
  ChangePasswordAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const changeUserPasswordDataSelector = flow(
  ChangePasswordAPI.dataSelector,
  get('data.change_password')
);

export const resetDataChangeUserPassword = dispatch => {
  dispatch(ChangePasswordAPI.resetter(['data', 'error']));
};

const EditUserInfoAPI = makeFetchAction(
  EDIT_USER_INFO_API,
  gql`
    mutation(
      $birthDate: String!
      $profession: String!
      $department: String!
      $summaryDescription: String!
      $fullName: String!
      $avatar: String!
    ) {
      edit_user_info(
        birthDate: $birthDate
        profession: $profession
        department: $department
        summaryDescription: $summaryDescription
        fullName: $fullName
        avatar: $avatar
      ) {
        id
      }
    }
  `
);

export const editUserInfo = ({
  userId,
  birthDate,
  profession,
  department,
  summaryDescription,
  fullName,
  avatar
}) => {
  return respondToSuccess(
    EditUserInfoAPI.actionCreator({
      userId,
      birthDate,
      profession,
      department,
      summaryDescription,
      fullName,
      avatar
    }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        EmitErrorToast(resp.errors);
        return;
      }

      return;
    }
  );
};

export const editUserInfoDataSelector = flow(
  EditUserInfoAPI.dataSelector,
  get('data.edit_user_info')
);

export const editUserInfoErrorMessageSelector = flow(
  EditUserInfoAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataEditUserInfo = dispatch => {
  dispatch(EditUserInfoAPI.resetter(['data', 'error']));
};

const DeleteUserAPI = makeFetchAction(
  DELETE_USER_API,
  gql`
    mutation($userId: String!) {
      delete_user(userId: $userId) {
        id
        fullName
      }
    }
  `
);

export const deleteUser = userId => {
  return respondToSuccess(
    DeleteUserAPI.actionCreator({ userId }),
    (resp, headers, store) => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        EmitErrorToast(resp.errors);
        return;
      }
      EmitToastSuccess(`User was deleted!`);
      store.dispatch(getAllUsers());
      return;
    }
  );
};

export const deleteUserDataSelector = flow(
  DeleteUserAPI.dataSelector,
  get('data.delete_user')
);

export const deleteUserErrorMessageSelector = flow(
  DeleteUserAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

const AddUsersAPI = makeFetchAction(
  ADD_USERS_API,
  gql`
    mutation($listUserEmails: [String!]!) {
      add_users(listUserEmails: $listUserEmails) {
        id
      }
    }
  `
);

export const addUsers = listUserEmails => {
  return respondToSuccess(
    AddUsersAPI.actionCreator({ listUserEmails }),
    (resp, headers, store) => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        EmitErrorToast(resp.errors);
        return;
      }
      store.dispatch(getAllUsers());
      return;
    }
  );
};

export const addUsersDataSelector = flow(
  AddUsersAPI.dataSelector,
  get('data.add_users')
);

export const addUsersErrorMessageSelector = flow(
  AddUsersAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataAddUsers = dispatch => {
  dispatch(AddUsersAPI.resetter(['data', 'error']));
};

const GetAllUsersAPI = makeFetchAction(
  GET_ALL_USERS_API,
  gql`
    query {
      get_all_users {
        id
        fullName
        avatar
        email
      }
    }
  `
);

export const getAllUsers = () => {
  return respondToSuccess(GetAllUsersAPI.actionCreator(), resp => {
    if (resp.errors) {
      console.error('Err:', resp.errors);
      EmitErrorToast(resp.errors);
      return;
    }
    return;
  });
};

export const getAllUsersDataSelector = flow(
  GetAllUsersAPI.dataSelector,
  get('data.get_all_users')
);

export const resetDataGetAllUsers = dispatch => {
  dispatch(GetAllUsersAPI.resetter(['data', 'error']));
};

const UserLoginAPI = makeFetchAction(
  USER_LOGIN_API,
  gql`
    query($username: String!, $password: String!) {
      login_user(username: $username, password: $password) {
        id
        fullName
        token
        role
      }
    }
  `
);

export const userLogin = (username, password) => {
  return respondToSuccess(
    UserLoginAPI.actionCreator({ username, password }),
    resp => {
      if (resp.errors) {
        console.error('Err:', resp.errors);
        EmitErrorToast(resp.errors);

        return;
      }
      saveToken(resp.data.login_user.token);
      Router.push(
        resp.data.login_user.role === 'ADMIN'
          ? '/admin-dashboard'
          : '/user/dashboard'
      );

      EmitToastSuccess(`Welcome back,  ${resp.data.login_user.fullName}`);
      return;
    }
  );
};

export const userLoginErrorMessageSelector = flow(
  UserLoginAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

const GetCurrentUserAPI = makeFetchAction(
  GET_CURRENT_USER_API,
  gql`
    query {
      get_current_user {
        id
        fullName
        email
        googleId
        balance
        walletAddress
        role
        createdAt
        updatedAt
        avatar
        profession
        department
        summaryDescription
        birthDate
      }
    }
  `
);

export const verifyScopeAndRole = user => {
  if (!user) {
    return false;
  }

  return true; //check it
};

export const getCurrentUser = () =>
  respondToSuccess(GetCurrentUserAPI.actionCreator({}), resp => {
    if (resp.errors) {
      console.error(resp.errors);
      EmitErrorToast(resp.errors);
      return Router.replace({
        pathname: '/login'
      });
    }
    if (!verifyScopeAndRole(resp.data.get_current_user)) {
      return Router.replace({
        pathname: '/login'
      });
    }
  });

export const getCurrentUserDataSelector = flow(
  GetCurrentUserAPI.dataSelector,
  get('data.get_current_user')
);

const isUserLoggedIn = has('json.data.get_current_user');

export const doLogout = () => [
  {
    type: USER_LOGOUT
  },
  userLogout()
];

const UserLogoutAPI = makeFetchAction(
  USER_LOGOUT_API,
  nfetch({ endpoint: '/signout' })
);

export const userLogout = () => respondToSuccess(UserLogoutAPI.actionCreator());

export default {
  connectStatus(state = false, { type, payload }) {
    if (type === ACTIONS.COMPLETE && payload.name === GET_CURRENT_USER_API) {
      return isUserLoggedIn(payload);
    }

    if (type === ACTIONS.FAILURE && payload.name === GET_CURRENT_USER_API) {
      removeToken();
      Router.push('/login');

      return false;
    }

    if (type === USER_LOGOUT) {
      removeToken();
      Router.push('/login');
      return false;
    }

    return state;
  }
};
