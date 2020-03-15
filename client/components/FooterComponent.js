import React from 'react';

const FooterComponent = () => (
  <footer className="footer footer-static fixed-bottom footer-light navbar-border">
    <p className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
      <span className="float-md-left d-block d-md-inline-block">
        Copyright &copy; 2020{' '}
        <a
          className="text-bold-800 grey darken-2"
          href="fb.com/vtquy98"
          target="_blank"
          rel="noopener"
        >
          QUY VO
        </a>
        , All rights reserved.{' '}
      </span>
      <span className="float-md-right d-block d-md-inline-block d-none d-lg-block">
        Hand-crafted & Made with <i className="ft-heart pink"></i>
      </span>
    </p>
  </footer>
);

export default FooterComponent;
