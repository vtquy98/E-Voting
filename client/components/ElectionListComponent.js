import Link from 'next/link';
import React from 'react';
import TableComponent from './TableComponent';
import { withTranslation } from '../i18n';

const mapElectionsToDataField = ({ elections = [], t }) =>
  elections.map((election, index) => ({
    index: index + 1,
    name: (
      <Link
        href={
          election.state === 'DRAFT'
            ? `/finish-create?id=${election.id}`
            : `/election?id=${election.id}`
        }
      >
        <a>{election.name}</a>
      </Link>
    ),
    candidates: election.totalCandidateCount,
    voters: election.tocalVoterCount,
    status:
      election.state === 'CREATED' ? (
        <span className="badge badge-default badge-warning">
          {t('election.currentStatus.created')}
        </span>
      ) : election.state === 'STARTED' ? (
        <span className="badge badge-default badge-success">
          {t('election.currentStatus.started')}
        </span>
      ) : election.state === 'DRAFT' ? (
        <span className="badge badge-default badge-secondary">
          {t('election.currentStatus.draft')}
        </span>
      ) : (
        <span className="badge badge-default badge-danger">
          {t('election.currentStatus.ended')}
        </span>
      )
  }));

class ElectionListComponent extends React.Component {
  render() {
    const { elections, t } = this.props;

    const COLUMNS = [
      {
        accessor: 'index',
        Header: '#'
      },
      {
        accessor: 'name',
        Header: t('election.name'),
        sortType: 'basic' //add sort to more field
      },
      {
        accessor: 'candidates',
        Header: t('election.candidates')
      },
      {
        accessor: 'voters',
        Header: t('election.voters')
      },
      {
        accessor: 'status',
        Header: t('election.status')
      }
    ];

    return (
      <div className="card shadow border-none mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            {t('election.lastElection')}
          </h6>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <TableComponent
              columns={COLUMNS}
              data={mapElectionsToDataField({
                elections,
                t
              })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('table')(ElectionListComponent);
