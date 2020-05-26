import React from 'react';
import TableComponent from './TableComponent';
import Link from 'next/link';
import { withTranslation } from '../i18n';

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
      <div>
        <Link href={`/edit-info?id=${user.id}`}>
          <a className="btn btn-warning btn-circle btn-sm text-white m-1">
            <i className="fas fa-pen"></i>
          </a>
        </Link>
        <a
          className="btn btn-danger btn-circle btn-sm text-white m-1"
          onClick={e => {
            e.preventDefault();
            deleteUserAction(user.id);
          }}
        >
          <i className="fas fa-trash"></i>
        </a>
      </div>
    )
  }));

class AllUsersListComponent extends React.Component {
  render() {
    const { users, deleteUserAction, t } = this.props;

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
      },
      {
        accessor: 'email',
        Header: 'Email'
      },
      {
        accessor: 'actions',
        Header: t('userTable.actions')
      }
    ];
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

export default withTranslation('table')(AllUsersListComponent);
