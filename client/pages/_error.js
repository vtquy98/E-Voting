import React from 'react';
import EmptyPageLayout from '../layouts/EmptyPageLayout';
import PageNotFoundComponent from '../components/PageNotFoundComponent';

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }
  render() {
    return (
      <React.Fragment>
        {this.props.statusCode === 404 && (
          <EmptyPageLayout>
            <PageNotFoundComponent />
          </EmptyPageLayout>
        )}
      </React.Fragment>
    );
  }
}

ErrorPage.getInitialProps = async () => ({
  namespacesRequired: []
});

export default ErrorPage;
