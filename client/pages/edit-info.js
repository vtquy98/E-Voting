import React from 'react';
import EditUserInforComponent from '../components/EditUserInforComponent';
import DashboardPageLayout from '../layouts/DashboardPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const EditUserInfoPage = ({ userData, ...rootProps }) => (
  <DashboardPageLayout {...rootProps} title="not config">
    <EditUserInforComponent userData={userData} />
  </DashboardPageLayout>
);

EditUserInfoPage.getInitialProps = ctx => {
  const {
    query: { id }
  } = ctx;
  return {
    userData: { id }
  };
};

export default AuthenHOC(EditUserInfoPage);
