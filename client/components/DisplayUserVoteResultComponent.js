import React from 'react';
import TableComponent from './TableComponent';

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

const mapResultToDataField = ({ result = [], election = [] }) =>
  result.map((rs, index) => ({
    index: index + 1,
    fullName: rs.userData.fullName,
    voteCount: (
      <div>
        {rs.voteCount} / {election.votedCount}
      </div>
    ),
    rate: (
      <div>
        <span className={displayTextColor(rs.percentage)}>
          {rs.percentage} %
        </span>

        <div className="progress progress-md mt-1 mb-0">
          <div
            className={`progress-bar ${displayProcessBarColor(rs.percentage)}`}
            role="progressbar"
            style={{
              width: `${rs.percentage}%`
            }}
            aria-valuenow={rs.percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    )
  }));

const DisplayUserVoteResultComponent = ({ result, election, t }) => {
  const COLUMNS = [
    {
      accessor: 'index',
      Header: '#',
      sortType: 'basic' //add sort to more field
    },
    {
      accessor: 'fullName',
      Header: t('result.candidate')
    },
    {
      accessor: 'voteCount',
      Header: t('result.votedCount')
    },
    {
      accessor: 'rate',
      Header: t('result.rate')
    }
  ];
  return (
    <React.Fragment>
      <div className="table-responsive">
        <TableComponent
          columns={COLUMNS}
          data={mapResultToDataField({
            result,
            election
          })}
        />
      </div>
    </React.Fragment>
  );
};
export default DisplayUserVoteResultComponent;
