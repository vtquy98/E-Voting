import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCurrentUserDataSelector } from '../stores/UserState';
import ChangePasswordPopupComponent from './ChangePasswordPopupComponent';
import Popup from 'reactjs-popup';

import { FaLock, FaPen } from 'react-icons/fa';

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
        <React.Fragment>
          <h1 className="h3 mb-4 text-gray-800">Your Infomrmation</h1>
          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow border-none mb-4">
                <div className="card-header py-3 d-flex">
                  <Link href="/user/edit-info">
                    <a className="btn btn-primary btn-icon-split mr-2">
                      <span className="icon text-white-50">
                        <FaPen />
                      </span>
                      <span className="text">Edit info</span>
                    </a>
                  </Link>
                  <Popup
                    trigger={
                      <a
                        type="button"
                        className="btn btn-secondary btn-icon-split text-white"
                      >
                        <span className="icon text-white-50">
                          <FaLock />
                        </span>
                        <span className="text">Change pasword</span>
                      </a>
                    }
                    modal
                  >
                    {close => (
                      <div className="hi">
                        <ChangePasswordPopupComponent onClick={() => close()} />
                      </div>
                    )}
                  </Popup>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-4 d-flex align-items-center justify-content-center">
                      <div className="">
                        <img
                          src={currentUser.avatar}
                          alt="avt"
                          width="200"
                          className="rounded-circle mb-4"
                        />
                      </div>
                    </div>

                    <div className="col-sm">
                      <h2 className="text-center font-weight-bold text-primary mb-4">
                        {currentUser.fullName}
                      </h2>
                      <div className="card-text mt-2">
                        <dl className="row">
                          <dt className="col-sm-3">Email: </dt>
                          <dd className="col-sm-9">{currentUser.email}</dd>
                        </dl>
                        <dl className="row">
                          <dt className="col-sm-3">Date of birth: </dt>
                          <dd className="col-sm-9">{currentUser.birthDate}</dd>
                        </dl>
                        <dl className="row">
                          <dt className="col-sm-3">Profession: </dt>
                          <dd className="col-sm-9">{currentUser.profession}</dd>
                        </dl>
                        <dl className="row">
                          <dt className="col-sm-3">Department: </dt>
                          <dd className="col-sm-9">{currentUser.department}</dd>
                        </dl>
                        <dl className="row">
                          <dt className="col-sm-3">Your description: </dt>
                          <dd className="col-sm-9">
                            {currentUser.summaryDescription}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default connectToRedux(UserInforComponent);
