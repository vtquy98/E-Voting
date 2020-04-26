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
    Header: 'Full name'
  },
  {
    accessor: 'department',
    Header: 'Department'
  },
  {
    accessor: 'email',
    Header: 'Email'
  },
  {
    accessor: 'actions',
    Header: 'Actions'
  }
];

const mapUsersToDataField = ({ users = [], deleteUserAction }) =>
  users.map((user, index) => ({
    index: index + 1,
    email: user.email,
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
    department: user.department,

    actions: (
      <a
        className="btn btn-danger btn-circle btn-sm text-white"
        onClick={e => {
          e.preventDefault();
          deleteUserAction(user.id);
        }}
      >
        <i className="fas fa-trash"></i>
      </a>
    )
  }));

class AllUsersListComponent extends React.Component {
  render() {
    const { users, deleteUserAction } = this.props;
    return (
      <div className="table-responsive">
        <TableComponent
          columns={COLUMNS}
          data={mapUsersToDataField({
            users,
            deleteUserAction
          })}
        />
      </div>
    );
  }
}

export default AllUsersListComponent;
