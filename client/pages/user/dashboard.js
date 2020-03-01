import React from 'react';
import UserDashboardComponent from '../../components/UserDashboardComponent';
import DashboardPageLayout from '../../layouts/DashboardPageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const UserDashboardPage = ({ rootProps, currentUser }) => (
  <DashboardPageLayout
    {...rootProps}
    role={currentUser.role}
    title="not config"
  >
    <UserDashboardComponent />
  </DashboardPageLayout>
);

export default AuthenHOC(UserDashboardPage);
