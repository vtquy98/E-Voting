import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, withState } from 'recompose';
import Link from 'next/link';
import { userLogin, userLoginErrorMessageSelector } from '../stores/UserState';

const withUsernameState = withState('username', 'setUsername', '');
const withPasswordState = withState('password', 'setPassword', '');

const connectToRedux = connect(
  createStructuredSelector({
    errorMessage: userLoginErrorMessageSelector
  }),
  dispatch => ({
    doLogin: (username, password) =>
      username && password && dispatch(userLogin(username, password))
  })
);

const enhance = compose(
  withUsernameState,
  withPasswordState,
  connectToRedux
);

const UserRegisterComponent = () => (
  <div className="cd-section " id="contactus">
    <div className="contactus-1 section-image register-background-image">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h2 className="title">Share your post</h2>
            <h5 className="description">
              You need more information? Check what other persons are saying
              about our product. They are very happy with their purchase.
            </h5>
            <div className="info info-horizontal">
              <div className="icon icon-primary">
                <i className="material-icons">pin_drop</i>
              </div>
              <div className="description">
                <h4 className="info-title">Find us at the office</h4>
                <p>
                  {' '}
                  Bld Mihail Kogalniceanu, nr. 8,
                  <br /> 7652 Bucharest,
                  <br /> Romania
                </p>
              </div>
            </div>
            <div className="info info-horizontal">
              <div className="icon icon-primary">
                <i className="material-icons">phone</i>
              </div>
              <div className="description">
                <h4 className="info-title">Give us a ring</h4>
                <p>
                  {' '}
                  Michael Jordan
                  <br /> +40 762 321 762
                  <br /> Mon - Fri, 8:00-22:00
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-5 ml-auto">
            <div className="card card-contact">
              <form id="contact-form" method="post">
                <div className="card-header card-header-raised card-header-primary text-center">
                  <h4 className="card-title">Register</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group label-floating is-empty">
                        <label className="bmd-label-floating">First name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <span className="material-input"></span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group label-floating is-empty">
                        <label className="bmd-label-floating">Last name</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <span className="material-input"></span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group label-floating is-empty">
                    <label className="bmd-label-floating">Email address</label>
                    <input type="email" name="email" className="form-control" />
                    <span className="material-input"></span>
                  </div>
                  <div className="form-group label-floating is-empty">
                    <label for="exampleMessage1" className="bmd-label-floating">
                      Your Message
                    </label>

                    <span className="material-input"></span>
                  </div>
                </div>
                <div className="card-footer justify-content-between">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                      />{' '}
                      I'm not a robot
                      <span className="form-check-sign">
                        <span className="check"></span>
                      </span>
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary pull-right">
                    Send Message
                  </button>
                </div>
                <div className="card-description text-center">or </div>
                <div className="card-footer justify-content-center">
                  <Link href="/login">
                    <a className="btn btn-primary pull-right">Login here</a>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>
      {`
         .register-background-image {
           background-image: url('/static/material/assets/img/examples/city.jpg');
           background-size: cover;
           background-position: top center;

       `}
    </style>
  </div>
);

export default enhance(UserRegisterComponent);
