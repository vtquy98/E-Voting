import React from 'react';

import EmptyPageLayout from '../layouts/EmptyPageLayout';
import UserLoginComponent from '../components/UserLoginComponent';

const UserLoginPage = rootProps => (
  <EmptyPageLayout>
    <UserLoginComponent {...rootProps} />
  </EmptyPageLayout>
);

UserLoginPage.getInitialProps = () => ({
  namespacesRequired: ['login']
});

export default UserLoginPage;
