import React from 'react';
import UserManagementComponent from '../components/UserManagementComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const UserDashboardPage = rootProps => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserManagementComponent />
  </DashboardPageLayout>
);

export default AuthenHOC(UserDashboardPage);
