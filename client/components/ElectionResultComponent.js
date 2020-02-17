import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import ReactEcharts from 'echarts-for-react';

import {
  getElection,
  getElectionDataSelector,
  // getElectionErrorSelector,
  getElectionResult,
  getElectionResultDataSelector,
  getElectionResultErrorSelector
  // resetDataGetElectionResult
} from '../stores/ElectionState';
import { getCurrentUserDataSelector } from '../stores/UserState';

const connectToRedux = connect(
  createStructuredSelector({
    election: getElectionDataSelector,
    electionResult: getElectionResultDataSelector,
    errorMessage: getElectionResultErrorSelector,
    currentUser: getCurrentUserDataSelector
  }),
  dispatch => ({
    getElection: id => dispatch(getElection(id)),
    getElectionResult: id => dispatch(getElectionResult(id))
  })
);

const enhance = compose(connectToRedux);

const displayProcessBarColor = percentage =>
  percentage > 60
    ? 'bg-success'
    : percentage < 60 && percentage > 30
    ? 'bg-warning'
    : 'bg-danger';

const displayTextColor = percentage =>
  percentage > 60
    ? 'text-success'
    : percentage < 60 && percentage > 30
    ? 'text-warning'
    : 'text-danger';

const chartOption = electionResult => {
  return {
    title: {
      // text: 'Election Statistic chart',
      // subtext: '纯属虚构',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      padding: [10, 5],
      data: electionResult.map(result => {
        return result.userData.fullName;
      })
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ['pie', 'funnel']
        },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Statistic chart',
        type: 'pie',
        radius: [30, 120],
        // center: ['75%', '50%'],
        roseType: 'area',
        data: electionResult.map(result => {
          return { value: result.voteCount, name: result.userData.fullName };
        })
      }
    ]
  };
};

class ShowElectionComponent extends React.Component {
  componentDidMount() {
    const { electionId } = this.props;
    this.props.getElection(electionId.id);
    this.props.getElectionResult(electionId.id);
  }

  componentWillUnmount() {
    // this.props.resetData();
  }

  render() {
    const { election = [], electionResult = [] } = this.props;
    console.log('electionResult: ', electionResult);

    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          type="text/css"
          href="static/assets/css/pages/owl.carousel.min.css"
        />
        <div className="app-content content">
          <div className="content-wrapper">
            <div className="content-body">
              <div className="row">
                <div className="col-xl-7 col-lg-12 col-md-12">
                  <div className="card">
                    <div className="card-header border-0-bottom">
                      <h1 className="card-title text-center mb-2">
                        {election.electionOwner}
                      </h1>
                      <h1 className="text-center text-uppercase">
                        {election.name}
                      </h1>
                    </div>
                    <div className="card-content">
                      <div className="card-body">
                        <ReactEcharts
                          option={chartOption(electionResult)}
                          opts={{ renderer: 'svg' }}
                          theme={'light'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-12 col-md-12">
                  <div className="row">
                    <div className="col-xl-12 col-lg-6 col-md-12">
                      <div className="card">
                        <div className="card-header">
                          <h4 className="card-title">
                            Details of the votes of candidates
                          </h4>
                        </div>
                        <div className="card-content">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Full name</th>
                                <th>Votes count</th>
                                <th>Rate</th>
                              </tr>
                            </thead>
                            <tbody>
                              {electionResult
                                .sort((a, b) => b.percentage - a.percentage)
                                .map((candidate, index) => (
                                  <tr key="index">
                                    <td>{index + 1}</td>
                                    <td>{candidate.userData.fullName}</td>
                                    <td>{candidate.voteCount}</td>
                                    <td>
                                      <div className="insights px-2">
                                        <div>
                                          <span
                                            className={displayTextColor(
                                              candidate.percentage
                                            )}
                                          >
                                            {candidate.percentage} %
                                          </span>
                                        </div>
                                        <div className="progress progress-md mt-1 mb-0">
                                          <div
                                            className={`progress-bar ${displayProcessBarColor(
                                              candidate.percentage
                                            )}`}
                                            role="progressbar"
                                            style={{
                                              width: candidate.percentage
                                            }}
                                            aria-valuenow={candidate.percentage}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                          ></div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-6 col-md-12">
                      {/* <Countdown
                        date={Date.now() + election.votingTime * 60 * 1000}
                        renderer={renderer}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <style jsx>{`
            .content {
              margin-left: 10px !important;
            }

            .table td {
              vertical-align: middle;
            }
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}
export default enhance(ShowElectionComponent);
