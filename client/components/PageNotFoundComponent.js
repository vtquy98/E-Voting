import React from 'react';
import Link from 'next/link';

const PageNotFoundComponent = () => (
  <div className="center-screen">
    <div className="container-fluid">
      <div className="text-center">
        <div className="error mx-auto" data-text="404">
          404
        </div>
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
        <p className="text-gray-500 mb-0">
          It looks like you found a glitch in the matrix...
        </p>
        <Link href="/">
          <a>&larr; Back to homepage</a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .center-screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;
      }
    `}</style>
  </div>
);

export default PageNotFoundComponent;
