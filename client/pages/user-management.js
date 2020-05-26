import React from 'react';
import UserManagementComponent from '../components/UserManagementComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const UserManagementPage = rootProps => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserManagementComponent />
  </DashboardPageLayout>
);

UserManagementPage.getInitialProps = async () => ({
  namespacesRequired: ['user-management']
});

export default AuthenHOC(UserManagementPage);
