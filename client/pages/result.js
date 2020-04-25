import React from 'react';
import ElectionResultComponent from '../components/ElectionResultComponent';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import AuthenHOC from '../components/HOC/AuthenHOC';

const ElectionResultPage = ({ electionId, ...rootProps }) => (
  <EmptyPageLayout {...rootProps} title="not config">
    <ElectionResultComponent electionId={electionId} />
  </EmptyPageLayout>
);

ElectionResultPage.getInitialProps = ctx => {
  const {
    query: { id }
  } = ctx;
  return {
    electionId: { id }
  };
};

export default AuthenHOC(ElectionResultPage);
