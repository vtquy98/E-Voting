import React from 'react';
import UserDashboardComponent from '../components/UserDashboardComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
// import AuthenHOC from '../components/HOC/AuthenHOC';

const UserDashboardPage = rootProps => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserDashboardComponent />
  </DashboardPageLayout>
);

export default UserDashboardPage;
