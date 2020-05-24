import React from 'react';
import AuthenPageLayout from '../layouts/AuthenPageLayout';
import UserResetPasswordComponent from '../components/UserResetPasswordComponent';

const UserResetPasswordPage = ({ initialValues }, rootProps) => (
  <AuthenPageLayout {...rootProps}>
    <UserResetPasswordComponent initialValues={initialValues} />
  </AuthenPageLayout>
);

UserResetPasswordPage.getInitialProps = ctx => {
  const {
    query: { token }
  } = ctx;
  return {
    initialValues: { token }
  };
};

UserResetPasswordPage.getInitialProps = async () => ({
  namespacesRequired: ['authen', 'common']
});

export default UserResetPasswordPage;
