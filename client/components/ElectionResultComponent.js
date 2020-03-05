import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import ReactEcharts from 'echarts-for-react';
import Link from 'next/link';

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
    // legend: {
    //   left: 'center',
    //   top: 'bottom',
    //   padding: [0, 10],
    //   data: electionResult.map(result => {
    //     return result.userData.fullName;
    //   })
    // },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     magicType: {
    //       show: true,
    //       type: ['pie', 'funnel']
    //     },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
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

// const chartOption2 = electionResult => {
//   return {
//     xAxis: {
//       type: 'candidates',
//       data: electionResult.map(result => result.userData.fullName)
//     },
//     yAxis: {
//       type: 'value'
//     },
//     series: [
//       {
//         data: electionResult.map(result => {
//           return result.voteCount;
//         }),
//         type: 'bar'
//       }
//     ]
//   };
// };

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
                {election.state !== 'ENDED' ? (
                  <div className="col-lg-12 card">
                    <div className="card-header">
                      <h4 className="card-title">{election.name}</h4>
                    </div>
                    <div className="card-content">
                      <div className="card-body">
                        <div className="card-text">
                          <h1 className="text-center">
                            Sorry, this election has being happening. So, just
                            keep calm! <i className="fa fa-smile-o"></i>
                          </h1>

                          <div className="text-center">
                            <Link href="/">
                              <a
                                type="button"
                                className="btn btn-outline-secondary btn-min-width mr-1 mb-1"
                              >
                                <i className="fa fa-home"></i> Go to home
                              </a>
                            </Link>
                          </div>
                          <div className="d-flex justify-content-center">
                            <img
                              src="/static/assets/images/loading.svg"
                              alt="success"
                              className="height-300 mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <div className="col-xl-6 col-lg-12 col-md-12">
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
                    <div className="col-xl-6 col-lg-12 col-md-12">
                      <div className="row">
                        <div className="col-xl-12 col-lg-6 col-md-12">
                          <div className="card">
                            <div className="card-header">
                              <h4 className="card-title">
                                Details of the votes of candidates
                              </h4>
                            </div>
                            <div className="card-content table-responsive">
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
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{candidate.userData.fullName}</td>
                                        <td className="text-center">
                                          {candidate.voteCount} /{' '}
                                          {election.votedCount}
                                        </td>
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
                                                aria-valuenow={
                                                  candidate.percentage
                                                }
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
                      </div>
                    </div>
                  </React.Fragment>
                )}
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
