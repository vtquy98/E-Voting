import React from 'react';
import UserEditProfileComponent from '../../components/UserEditProfileComponent';
import DashboardPageLayout from '../../layouts/DashboardPageLayout';
import AuthenHOC from '../../components/HOC/AuthenHOC';

const UserEditProfilePage = ({ ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <UserEditProfileComponent />
  </DashboardPageLayout>
);

UserEditProfilePage.getInitialProps = async () => ({
  namespacesRequired: ['profile']
});

export default AuthenHOC(UserEditProfilePage);
