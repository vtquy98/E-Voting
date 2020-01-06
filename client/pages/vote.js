import React from 'react';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import VoteComponent from '../components/VoteComponent';

const VotePage = ({ ...rootProps }) => (
  <EmptyPageLayout {...rootProps} title="not config">
    <VoteComponent />
  </EmptyPageLayout>
);

export default VotePage;
