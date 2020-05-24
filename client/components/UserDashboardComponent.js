import Link from 'next/link';
import React from 'react';
import { FaPlay, FaRegTrashAlt } from 'react-icons/fa';
import {
  FcCalendar,
  FcClock,
  FcEngineering,
  FcOrganization,
  FcRules,
  FcTodoList
} from 'react-icons/fc';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  getUserUpComingElection,
  getUserUpComingElectionDataSelector,
  reportParticipatedElection
} from '../stores/ElectionState';
import { getCurrentUserDataSelector } from '../stores/UserState';
import { withTranslation } from '../i18n';

const connectToRedux = connect(
  createStructuredSelector({
    currentUser: getCurrentUserDataSelector,
    upComingElection: getUserUpComingElectionDataSelector
  }),
  dispatch => ({
    getUserUpComingElection: () => dispatch(getUserUpComingElection()),
    reportParticipatedElection: electionId =>
      dispatch(reportParticipatedElection(electionId))
  })
);

class UserDashboardComponent extends React.Component {
  componentDidMount() {
    this.props.getUserUpComingElection();
  }

  render() {
    const {
      currentUser,
      upComingElection = [],
      reportParticipatedElection,
      t
    } = this.props;
    return (
      <React.Fragment>
        <h1 className="h3 mb-4 text-gray-800">
          {currentUser.fullName} Dashboard
        </h1>
        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow border-none mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  {t('dashboard.upComming')}
                </h6>
              </div>
              <div className="card-body">
                {!upComingElection.length ? (
                  <div className="text-center">
                    <h3>{t('dashboard.noUpComming')}</h3>

                    <h4 className="text-muted mb-1 mt-2">
                      {t('dashboard.textHelper')}
                    </h4>

                    <div className="d-flex justify-content-center">
                      <img
                        src="/static/assets/images/empty.svg"
                        alt="success"
                        className="mt-2"
                        width="50%"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <ol>
                      {upComingElection.map((election, index) => (
                        <div key={index}>
                          <div className="card border-left-primary h-100 py-2 mb-4">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-lg-12 mb-2">
                                  <h2 className="text-center">
                                    <Link href={`/voting?id=${election.id}`}>
                                      <a> {election.name}</a>
                                    </Link>
                                  </h2>
                                </div>
                                <div className="col-sm-1 text-center h3 ">
                                  <FcRules />
                                </div>
                                <div className="col-sm-4">
                                  <div>
                                    <p>
                                      <FcOrganization />{' '}
                                      {t('electionDetail.electionOwner')}:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.electionOwner}
                                      </span>
                                    </p>
                                    <p>
                                      {' '}
                                      <FcCalendar />{' '}
                                      {t('electionDetail.takePlaceOn')}:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.dateTakePlace}
                                      </span>
                                    </p>

                                    <p>
                                      <FcClock />{' '}
                                      {t('electionDetail.votingTime')}:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.votingTime}{' '}
                                        {t('electionDetail.timeCount')}
                                      </span>
                                    </p>
                                    <p>
                                      <FcEngineering />{' '}
                                      {t('electionDetail.votingType')}:
                                      <span className="text-muted font-weight-bold">
                                        {' '}
                                        {election.votingType ===
                                        'SELECT_TO_VOTE'
                                          ? t(
                                              'electionDetail.type.selectToVote'
                                            )
                                          : election.votingType ===
                                            'SELECT_TO_REMOVE'
                                          ? t(
                                              'electionDetail.type.selectToRemove'
                                            )
                                          : t(
                                              'electionDetail.type.selectToTrust'
                                            )}
                                      </span>
                                    </p>

                                    {election.votingType !==
                                      'SELECT_TO_TRUST' && (
                                      <div>
                                        <p>
                                          <FcTodoList />{' '}
                                          {t(
                                            'electionDetail.role.atLeastChoose'
                                          )}
                                          :
                                          <span className="text-muted font-weight-bold">
                                            {' '}
                                            {election.atLeastVote}
                                          </span>
                                        </p>
                                        <p>
                                          <FcTodoList />{' '}
                                          {t('electionDetail.role.mostChoose')}:
                                          <span className="text-muted font-weight-bold">
                                            {' '}
                                            {election.mostVote}
                                          </span>
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="col-sm">
                                  <div className="col-lg-12">
                                    <div
                                      id="project-info"
                                      className="card-body row d-flex justify-content-center"
                                    >
                                      <div className="project-info-count col-lg-4 col-md-12">
                                        <Link
                                          href={`/voting?id=${election.id}`}
                                        >
                                          <a>
                                            <div className="project-info-icon">
                                              <h2>
                                                <FaPlay />
                                              </h2>
                                            </div>
                                            <div className="project-info-text pt-1">
                                              <h5>
                                                {t('electionDetail.voteNow')}
                                              </h5>
                                            </div>
                                          </a>
                                        </Link>
                                      </div>
                                      <div className="project-info-count col-lg-4 col-md-12">
                                        <a
                                          href="#"
                                          onClick={e => {
                                            e.preventDefault();
                                            reportParticipatedElection({
                                              electionId: election.id
                                            });
                                          }}
                                        >
                                          <div className="project-info-icon">
                                            <h2>
                                              <FaRegTrashAlt />
                                            </h2>
                                          </div>
                                          <div className="project-info-text pt-1">
                                            <h5>
                                              {t('electionDetail.cancel')}
                                            </h5>
                                          </div>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .scroll-example {
            padding: 0.5rem;
            position: relative;
            border: none;
            overflow: auto;
          }

          #project-info {
            overflow: hidden;
          }
          #project-info .project-info-count {
            text-align: center;
            vertical-align: top;
          }
          #project-info .project-info-count .project-info-icon {
            border: 3px solid #ececec;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            padding: 37px 0;
            position: relative;
            width: 110px;
            height: 110px;
          }
          #project-info .project-info-count .project-info-text {
            display: block;
            margin-top: 20px;
            left: 0;
            position: relative;
            top: 0;
            width: 99.8%;
          }
          #project-info .project-info-count .project-info-sub-icon {
            position: relative;
            border-radius: 65px;
            border: 1px solid #adadad;
            background: #fff;
            bottom: -5px;
            left: 34px;
            width: 40px;
            height: 40px;
          }
          #project-info .project-info-count .project-info-sub-icon span {
            font-size: 1.2rem;
            top: 10px;
            position: relative;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default connectToRedux(
  withTranslation('user-dashboard')(UserDashboardComponent)
);
