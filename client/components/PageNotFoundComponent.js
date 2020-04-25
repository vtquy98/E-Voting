import React from 'react';
import Link from 'next/link';

const PageNotFoundComponent = () => (
  <React.Fragment>
    <div className="text-center">
      <div className="error mx-auto" data-text="404">
        404
      </div>
      <p className="lead text-gray-800 mb-5">Page Not Found</p>
      <h4 className="text-gray-500 mb-0">
        It looks like you found a glitch in the matrix...
      </h4>
      <Link href={'/user/dashboard'}>
        <a className="navbar-brand">&larr; Back to Dashboard</a>
      </Link>
    </div>
  </React.Fragment>
);

export default PageNotFoundComponent;
