import React from 'react';
import UserInforComponent from '../../components/UserInforComponent';
import DashboardPageLayout from '../../layouts/DashboardPageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const UserDashboardPage = ({ rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserInforComponent />
  </DashboardPageLayout>
);

export default AuthenHOC(UserDashboardPage);
