import React from 'react';
import IndexComponent from '../components/IndexComponent';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
const BlogsPage = rootProps => (
  <EmptyPageLayout {...rootProps} title="not config">
    <IndexComponent />
  </EmptyPageLayout>
);

export default BlogsPage;
