import React from 'react';
import AdminDashboardComponent from '../components/AdminDashboardComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const UserDashboardPage = rootProps => (
  <DashboardPageLayout {...rootProps}>
    <AdminDashboardComponent />
  </DashboardPageLayout>
);

UserDashboardPage.getInitialProps = async () => ({
  namespacesRequired: ['admin-dashboard', 'table']
});

export default AuthenHOC(UserDashboardPage);
