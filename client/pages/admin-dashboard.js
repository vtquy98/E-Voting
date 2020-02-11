import React from 'react';
import AdminDashboardComponent from '../components/AdminDashboardComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const UserDashboardPage = rootProps => (
  <DashboardPageLayout {...rootProps} title="not config">
    <AdminDashboardComponent />
  </DashboardPageLayout>
);

export default AuthenHOC(UserDashboardPage);
