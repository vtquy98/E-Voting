import React from 'react';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';
import VotingComponent from '../components/VotingComponent';

const VotingPage = ({ code, ...rootProps }) => (
  <EmptyPageLayout {...rootProps} title="not config">
    <VotingComponent code={code} />
  </EmptyPageLayout>
);

VotingPage.getInitialProps = ctx => {
  const {
    query: { code }
  } = ctx;
  return {
    code: { code }
  };
};

export default AuthenHOC(VotingPage);
