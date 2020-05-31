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
export const USER_FORGOT_PASSWORD_API = 'UserForgotPasswordAPI';
export const CHECK_TOKEN_RESET_USER_PASSWORD_API =
  'CheckTokenResetUserPasswordAPI';
export const USER_RESET_PASSWORD_API = 'UserResetPasswordAPI';
export const GET_USER_PROFILE_API = 'GetUserProfileAPI';
export const REFRESH_TOKEN_API = 'RefreshTokenAPI';

export const RefreshTokenAPI = makeFetchAction(
  REFRESH_TOKEN_API,
  nfetch({
    endpoint: '/refresh-token'
  })
);

export const refreshToken = () =>
  respondToSuccess(RefreshTokenAPI.actionCreator(), resp => {
    if (resp.error) {
      return;
    }

    if (resp.success) {
      saveToken(resp.token);
    }
  });

const GetUserProfileAPI = makeFetchAction(
  GET_USER_PROFILE_API,
  gql`
    query($id: String!) {
      get_user_profile(id: $id) {
        email
        fullName
        avatar
        profession
        department
        birthDate
        summaryDescription
        id
      }
    }
  `
);

export const getUserProfile = id => {
  return respondToSuccess(
    GetUserProfileAPI.actionCreator({
      id
    }),
    resp => {
      if (resp.errors) {
        console.error('Err: ', resp.errors);
        return;
      }
      return;
    }
  );
};

export const getUserProfileDataSelector = flow(
  GetUserProfileAPI.dataSelector,
  get('data.get_user_profile')
);

export const getUserProfileErrorSelector = flow(
  GetUserProfileAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const resetDataGetUserProfile = dispatch => {
  dispatch(GetUserProfileAPI.resetter(['data', 'error']));
};

const CheckTokenResetUserPasswordAPI = makeFetchAction(
  CHECK_TOKEN_RESET_USER_PASSWORD_API,
  gql`
    query($token: String!) {
      check_token_reset_password(token: $token) {
        email
      }
    }
  `
);

export const checkTokenResetUserPassword = token => {
  return respondToSuccess(
    CheckTokenResetUserPasswordAPI.actionCreator({
      token
    }),
    resp => {
      if (resp.errors) {
        console.error('Err: ', resp.errors);
        return;
      }
      return;
    }
  );
};

export const checkTokenResetUserPasswordErrorMessageSelector = flow(
  CheckTokenResetUserPasswordAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

const UserResetPasswordAPI = makeFetchAction(
  USER_RESET_PASSWORD_API,
  gql`
    mutation($token: String!, $newPassword: String!) {
      user_reset_password(token: $token, newPassword: $newPassword) {
        email
      }
    }
  `
);

export const userResetPassword = (token, newPassword) => {
  return respondToSuccess(
    UserResetPasswordAPI.actionCreator({
      token,
      newPassword
    }),
    resp => {
      if (resp.errors) {
        console.error('Err: ', resp.errors);
        return;
      }
      EmitToastSuccess('Your password has been resetted!');
      Router.push('/login');
      return;
    }
  );
};

export const userResetPasswordSuccessMessageSelector = flow(
  UserResetPasswordAPI.dataSelector,
  get('data.user_reset_password')
);

export const userResetPasswordErrorMessageSelector = flow(
  UserResetPasswordAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

const UserForgotPasswordAPI = makeFetchAction(
  USER_FORGOT_PASSWORD_API,
  gql`
    mutation($email: String!) {
      user_forgot_password(email: $email) {
        email
      }
    }
  `
);

export const userForgotPassword = email => {
  return respondToSuccess(
    UserForgotPasswordAPI.actionCreator({
      email
    }),
    resp => {
      if (resp.errors) {
        console.error('Err: ', resp.errors);
        return;
      }

      EmitToastSuccess('Check your email for reset password instruction!');
      Router.push('/login');
      return;
    }
  );
};

export const userForgotPasswordErrorMessageSelector = flow(
  UserForgotPasswordAPI.dataSelector,
  path('errors'),
  map('message'),
  join(' | ')
);

export const userForgotPasswordSuccessMessageSelector = flow(
  UserForgotPasswordAPI.dataSelector,
  path('data.user_forgot_password')
);

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
      $id: String!
    ) {
      edit_user_info(
        birthDate: $birthDate
        profession: $profession
        department: $department
        summaryDescription: $summaryDescription
        fullName: $fullName
        avatar: $avatar
        id: $id
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
  avatar,
  id
}) => {
  return respondToSuccess(
    EditUserInfoAPI.actionCreator({
      userId,
      birthDate,
      profession,
      department,
      summaryDescription,
      fullName,
      avatar,
      id
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
        department
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

export const userLogout = () =>
  respondToSuccess(UserLogoutAPI.actionCreator(), resp => console.log(resp));

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
