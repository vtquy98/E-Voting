import React from 'react';
import NormalLayout from '../layouts/NormalLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';
import CreateVotingComponent from '../components/CreateVotingComponent';

const CreateVotingPage = ({ code, ...rootProps }) => (
  <NormalLayout {...rootProps} title="not config">
    <CreateVotingComponent code={code} />
  </NormalLayout>
);

CreateVotingPage.getInitialProps = ctx => {
  const {
    query: { code }
  } = ctx;
  return {
    code: { code }
  };
};

export default AuthenHOC(CreateVotingPage);
