import React from 'react';
import HomepageComponent from '../components/HomepageComponent';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
const BlogsPage = rootProps => (
  <EmptyPageLayout {...rootProps} title="not config">
    <HomepageComponent />
  </EmptyPageLayout>
);

export default BlogsPage;
