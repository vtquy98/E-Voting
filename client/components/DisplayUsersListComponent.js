import React from 'react';
import TableComponent from './TableComponent';

const COLUMNS = [
  {
    accessor: 'index',
    Header: '#',
    sortType: 'basic' //add sort to more field
  },
  {
    accessor: 'avatar',
    Header: 'Avatar'
  },
  {
    accessor: 'fullName',
    Header: 'Full Name'
  },
  {
    accessor: 'department',
    Header: 'Department'
  }
];

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

const DisplayUsersListComponent = ({ users }) => {
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
export default DisplayUsersListComponent;
