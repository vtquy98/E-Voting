import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCurrentUserDataSelector } from '../stores/UserState';

const connectToRedux = connect(
  createStructuredSelector({
    currentUser: getCurrentUserDataSelector
  })
);

class UserDashboardComponent extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-header row">
            <div className="content-header-left col-md-6 col-12 mb-1">
              <h3 className="content-header-title">
                {currentUser.fullName} Dashboard
              </h3>
            </div>
          </div>
          <div className="content-body">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Upcoming Election</h4>
              </div>
              <div className="card-content">
                <div className="card-body">
                  <div className="card-text">
                    <section className="cd-horizontal-timeline loaded">
                      <div className="events-content">
                        <ol>
                          <li className="selected" data-date="16/01/2015">
                            <h2>Upcoming election title</h2>
                            <h3 className="text-muted mb-1">
                              <em>January 16th, 2015</em>
                            </h3>
                            <p className="lead">
                              This will be appeared in next version :)
                            </p>
                          </li>
                        </ol>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connectToRedux(UserDashboardComponent);
