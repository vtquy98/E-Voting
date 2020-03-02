import React from 'react';
import UserEditInforComponent from '../../components/UserEditInforComponent';
import DashboardPageLayout from '../../layouts/DashboardPageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const UserEditInfoPage = ({ rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserEditInforComponent />
  </DashboardPageLayout>
);

export default AuthenHOC(UserEditInfoPage);
