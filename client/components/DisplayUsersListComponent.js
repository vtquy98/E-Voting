import React from 'react';
import TableComponent from './TableComponent';
import { withTranslation } from '../i18n';

const mapUsersToDataField = ({ users = [] }) =>
  users.map((user, index) => ({
    index: index + 1,
    avatar: (
      <div>
        <img
          src={user.avatar}
          className="rounded-circle"
          width="40px"
          alt={user.fullName}
        />
      </div>
    ),
    fullName: user.fullName,
    department: user.department
  }));

const DisplayUsersListComponent = ({ users, t }) => {
  const COLUMNS = [
    {
      accessor: 'index',
      Header: '#',
      sortType: 'basic' //add sort to more field
    },
    {
      accessor: 'avatar',
      Header: t('userTable.avatar')
    },
    {
      accessor: 'fullName',
      Header: t('userTable.fullName')
    },
    {
      accessor: 'department',
      Header: t('userTable.department')
    }
  ];

  return (
    <React.Fragment>
      <div className="table-responsive">
        <TableComponent
          columns={COLUMNS}
          data={mapUsersToDataField({
            users
          })}
        />
      </div>
    </React.Fragment>
  );
};
export default withTranslation('table')(DisplayUsersListComponent);
