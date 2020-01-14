import React from 'react';
import UserDashboardComponent from '../components/UserDashboardComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
// import AuthenHOC from '../components/HOC/AuthenHOC';

const UserDashboardPage = rootProps => (
  <EmptyPageLayout {...rootProps} title="not config">
    <UserDashboardComponent />
  </EmptyPageLayout>
);

export default UserDashboardPage;
