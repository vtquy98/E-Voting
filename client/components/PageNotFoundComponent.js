import React from 'react';
import Link from 'next/link';

const PageNotFoundComponent = () => (
  <div className="page-header error-page header-filter background-image">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1 className="title">404</h1>
          <h2 className="description">Page not found :(</h2>
          <h4 className="description">
            Ooooups! Looks like you got lost,{' '}
            <Link href="/">
              <a>back to home</a>
            </Link>
          </h4>
        </div>
      </div>
    </div>
    <style jsx>{`
      .background-image {
        background-image: url('/static/material/assets/img/clint-mckoy.jpg');
      }
    `}</style>
  </div>
);

export default PageNotFoundComponent;
