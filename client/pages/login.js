import React from 'react';
import AuthenPageLayout from '../layouts/AuthenPageLayout';
import UserLoginComponent from '../components/UserLoginComponent';
import { withTranslation } from '../i18n';

const UserLoginPage = rootProps => (
  <AuthenPageLayout {...rootProps}>
    {console.log(rootProps.t('login.title'))}
    <UserLoginComponent />
  </AuthenPageLayout>
);

UserLoginPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'login']
});

export default withTranslation('login')(UserLoginPage);
