import React from 'react';

import EmptyPageLayout from '../layouts/EmptyPageLayout';
import TestPageComponent from '../components/TestPageComponent';
import UserLoginComponent from '../components/UserLoginComponent';
const UserLogin = rootProps => (
  <EmptyPageLayout>
    <UserLoginComponent />
  </EmptyPageLayout>
);

export default UserLogin;
