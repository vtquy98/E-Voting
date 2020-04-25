import ReactEcharts from 'echarts-for-react';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {
  getElection,
  getElectionDataSelector,
  getElectionResult,
  getElectionResultDataSelector,
  getElectionResultErrorSelector
} from '../stores/ElectionState';
import { getCurrentUserDataSelector } from '../stores/UserState';
import DisplayUserVoteResultComponent from './DisplayUserVoteResultComponent';

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

const chartDonutOption = electionResult => {
  return {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [
      {
        name: 'Statistic chart',
        type: 'pie',
        radius: [30, 120],
        roseType: 'area',
        data: electionResult.map(result => {
          return { value: result.voteCount, name: result.userData.fullName };
        })
      }
    ]
  };
};

const chartBarOption = electionResult => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: electionResult.map(result => result.userData.fullName)
    },
    yAxis: {
      type: 'value',
      name: 'voted count'
    },
    series: [
      {
        data: electionResult.map(result => result.voteCount),
        type: 'bar'
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
    const { election = [], electionResult = [], currentUser } = this.props;
    return (
      <React.Fragment>
        <div className="row">
          {election.state !== 'ENDED' ? (
            <div className="col-lg-12">
              <div className="d-flex justify-content-center">
                <img
                  src="/static/assets/images/loading.svg"
                  alt="success"
                  className="mt-2"
                  width={360}
                />
              </div>
              <h2 className="text-center">
                Sorry, this election has being happening. So, just keep calm!{' '}
                <i className="fa fa-smile-o"></i>
              </h2>
              <div className="text-center">
                <Link
                  href={
                    currentUser && currentUser.role === 'ADMIN'
                      ? '/admin-dashboard'
                      : '/user/dashboard'
                  }
                >
                  <a
                    type="button"
                    className="btn btn-outline-secondary btn-min-width mr-1 mb-1"
                  >
                    <i className="fa fa-home"></i> Go to home
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-5">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card shadow border-none mb-4">
                        <div className="card-header py-3 text-center">
                          <h6 className="m-0 font-weight-bold text-primary ">
                            {election.electionOwner}
                          </h6>
                          <h3 className="mt-2 mb-0 font-weight-bold text-primary ">
                            {election.name}
                          </h3>
                        </div>
                        <div className="card-body">
                          <ReactEcharts
                            option={chartDonutOption(electionResult)}
                            opts={{ renderer: 'svg' }}
                            theme={'light'}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="card shadow border-none mb-4">
                        <div className="card-body">
                          <ReactEcharts
                            option={chartBarOption(electionResult)}
                            style={{ height: '400px', width: '100%' }}
                            opts={{ renderer: 'svg' }}
                            className="react_for_echarts"
                            theme={'light'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="card shadow border-none mb-4 table-responsive">
                    <div className="card-body">
                      <DisplayUserVoteResultComponent
                        result={electionResult}
                        election={election}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default enhance(ShowElectionComponent);
