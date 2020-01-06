import React from 'react';
import TestPageComponent from '../components/TestPageComponent';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const UserDashboardPage = rootProps => (
  <EmptyPageLayout {...rootProps} title="not config">
    <TestPageComponent />
  </EmptyPageLayout>
);

export default UserDashboardPage;
