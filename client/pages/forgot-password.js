import React from 'react';
import AuthenPageLayout from '../layouts/AuthenPageLayout';
import UserForgotPasswordComponent from '../components/UserForgotPasswordComponent';

const UserForgotPasswordPage = rootProps => (
  <AuthenPageLayout {...rootProps}>
    <UserForgotPasswordComponent />
  </AuthenPageLayout>
);

export default UserForgotPasswordPage;
