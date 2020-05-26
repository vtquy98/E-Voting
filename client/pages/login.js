import React from 'react';
import UserLoginComponent from '../components/UserLoginComponent';
import AuthenPageLayout from '../layouts/AuthenPageLayout';

const UserLoginPage = rootProps => (
  <AuthenPageLayout {...rootProps}>
    <UserLoginComponent />
  </AuthenPageLayout>
);

UserLoginPage.getInitialProps = async () => ({
  namespacesRequired: ['authen']
});

export default UserLoginPage;
