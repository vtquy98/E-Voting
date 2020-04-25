import React from 'react';
import AuthenPageLayout from '../layouts/AuthenPageLayout';
import UserLoginComponent from '../components/UserLoginComponent';

const UserLogin = rootProps => (
  <AuthenPageLayout {...rootProps}>
    <UserLoginComponent />
  </AuthenPageLayout>
);

export default UserLogin;
