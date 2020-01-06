import React from 'react';
import Link from 'next/link';
import Popup from 'reactjs-popup';

const VerticalBarComponent = () => (
  <div
    className="sidebar"
    data-active-color="rose"
    data-background-color="black"
  >
    {/* data-image="/static/assets/img/sidebar-1.jpg" */}
    <div className="logo">
      <a href="http://www.creative-tim.com" className="simple-text">
        Quy's Voting
      </a>
    </div>
    <div className="logo logo-mini">
      <a href="http://www.creative-tim.com" className=" simple-text">
        QV
      </a>
    </div>
    <div className="sidebar-wrapper">
      <div className="user">
        <div className="photo">
          <img src="/static/assets/img/faces/avatar.jpg" alt="as" />
        </div>
        <div className="info">
          <a
            data-toggle="collapse"
            href="dashboard.html#collapseExample"
            className="collapsed"
          >
            Thanh Quy Vo
            <b className="caret"></b>
          </a>
          <div className="collapse" id="collapseExample">
            <ul className="nav">
              <li>
                <a href="dashboard.html#">My Profile</a>
              </li>
              <li>
                <a href="dashboard.html#">Edit Profile</a>
              </li>
              <li>
                <a href="dashboard.html#">Settings</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul className="nav">
        <li className="active">
          <Link href="/user-dashboard">
            <a>
              <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
            </a>
          </Link>
        </li>
        <Popup
          trigger={
            <li>
              <a>
                <i className="material-icons">add</i>
                <p>Create new voting</p>
              </a>
            </li>
          }
          modal
        >
          {close => (
            <div>
              <div className="modal-body">
                <div class="form-group">
                  <div className="card-title">
                    <h3>Create Voting</h3>
                  </div>
                  <input
                    id="input-field"
                    type="text"
                    className="form-control"
                    placeholder="Name of the voting"
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success btn-link"
                  // onClick={actionDelete}
                >
                  Create
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-link"
                  onClick={() => close()}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Popup>
      </ul>
    </div>
  </div>
);

export default VerticalBarComponent;
