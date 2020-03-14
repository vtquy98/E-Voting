import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCurrentUserDataSelector } from '../stores/UserState';
import ChangePasswordPopupComponent from './ChangePasswordPopupComponent';
import Popup from 'reactjs-popup';

const connectToRedux = connect(
  createStructuredSelector({
    currentUser: getCurrentUserDataSelector
  })
);

class UserInforComponent extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <React.Fragment>
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-header row">
              <div className="content-header-left col-md-6 col-12 mb-1">
                <h3 className="content-header-title">Your Infomrmation</h3>
              </div>
            </div>
            <div className="content-body">
              <div className="card">
                <div className="card-content">
                  <div className="card-header">
                    <div className="heading-elements">
                      <Link href="/user/edit-info">
                        <a
                          type="button"
                          className="btn btn-sm bg-blue-grey white"
                        >
                          <i className="fa fa-cog white"></i> Edit info
                        </a>
                      </Link>

                      <Popup
                        trigger={
                          <a
                            type="button"
                            className="btn btn-sm bg-blue-grey white ml-1"
                          >
                            <i className="ft-lock"></i> Change pasword
                          </a>
                        }
                        modal
                      >
                        {close => (
                          <div className="hi">
                            <ChangePasswordPopupComponent
                              onClick={() => close()}
                            />
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                  <div className="card-body">
                    <section className="cd-horizontal-timeline loaded">
                      <div className="events-content">
                        <li className="selected">
                          <div className="row">
                            <div className="col-lg-2 text-center mb-2">
                              <img
                                src={currentUser.avatar}
                                alt="avt"
                                width="150"
                                className="rounded-circle"
                              />
                            </div>
                            <div className="col-lg-10 text-center">
                              <h2>{currentUser.fullName}</h2>
                              <h3 className="text-muted mb-1">
                                <em>Date join: {currentUser.createdAt}</em>
                              </h3>
                            </div>
                          </div>

                          <div className="card-text mt-2">
                            <dl className="row">
                              <dt className="col-sm-3">Email: </dt>
                              <dd className="col-sm-9">{currentUser.email}</dd>
                            </dl>
                            <dl className="row">
                              <dt className="col-sm-3">Date of birth: </dt>
                              <dd className="col-sm-9">
                                {currentUser.birthDate}
                              </dd>
                            </dl>
                            <dl className="row">
                              <dt className="col-sm-3">Profession: </dt>
                              <dd className="col-sm-9">
                                {currentUser.profession}
                              </dd>
                            </dl>
                            <dl className="row">
                              <dt className="col-sm-3">Department: </dt>
                              <dd className="col-sm-9">
                                {currentUser.department}
                              </dd>
                            </dl>

                            <dl className="row">
                              <dt className="col-sm-3">Your description: </dt>
                              <dd className="col-sm-9">
                                {currentUser.summaryDescription}
                              </dd>
                            </dl>
                          </div>
                        </li>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connectToRedux(UserInforComponent);
