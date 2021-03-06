import React from 'react';
import { FaEye } from 'react-icons/fa';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import TableComponent from './TableComponent';
import { withTranslation } from '../i18n';
const ENV_DEPLOY = process.env.ENV_DEPLOY || 'ropsten';

const mapVoteDataToDataField = ({ voteData = [] }) =>
  voteData.map((data, index) => ({
    index: index + 1,
    voter: (
      <div>
        <img
          src={data.voterData.avatar}
          className="rounded-circle mr-2"
          width="40px"
          alt={data.voterData.fullName}
        />
        {data.voterData.fullName}
      </div>
    ),
    candidate: (
      <div>
        <img
          src={data.candidateData.avatar}
          className="rounded-circle mr-2"
          width="40px"
          alt={data.candidateData.fullName}
        />
        {data.candidateData.fullName}
      </div>
    ),

    isVoted: data.isVoted ? (
      <FcCheckmark size="2em" />
    ) : (
      <FcCancel size="2em" />
    ),
    viewMore: (
      <a
        className="btn mr-1 mb-1 btn-info"
        rel="noopener noreferrer"
        target="_blank"
        href={`${
          ENV_DEPLOY === 'ropsten'
            ? 'https://ropsten.etherscan.io/tx/' + data.transactionHash
            : 'https://etherscan.io/tx/' + data.transactionHash
        }`}
        role="button"
      >
        <FaEye />
      </a>
    )
  }));

class VoteDataListComponent extends React.Component {
  render() {
    const { voteData, t } = this.props;
    const COLUMNS = [
      {
        accessor: 'index',
        Header: '#',
        sortType: 'basic' //add sort to more field
      },
      {
        accessor: 'voter',
        Header: t('election.voters')
      },
      {
        accessor: 'isVoted',
        Header: ''
      },
      {
        accessor: 'candidate',
        Header: t('election.candidates')
      },
      {
        accessor: 'viewMore',
        Header: t('election.exploreBtn')
      }
    ];
    return (
      <div className="table-responsive">
        <TableComponent
          columns={COLUMNS}
          data={mapVoteDataToDataField({
            voteData
          })}
        />
      </div>
    );
  }
}

export default withTranslation('table')(VoteDataListComponent);
