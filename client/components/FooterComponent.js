import React from 'react';

const FooterComponent = () => (
  <footer className="footer footer-static footer-light navbar-border">
    <p className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2">
      <span className="float-md-left d-block d-md-inline-block">
        Copyright &copy; 2018{' '}
        <a
          className="text-bold-800 grey darken-2"
          href="https://themeforest.net/user/pixinvent/portfolio?ref=pixinvent"
          target="_blank"
        >
          PIXINVENT{' '}
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
