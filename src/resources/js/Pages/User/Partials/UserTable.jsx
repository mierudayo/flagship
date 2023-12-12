import { Link } from '@inertiajs/react';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function UserTable({ users, canAdmin }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-w-64 u-text-center col-fixed">編集</th>
            <th className="th-cell u-min-w-64 u-text-center">No.</th>
            <th className="th-cell u-min-w-80">社員番号</th>
            <th className="th-cell u-min-w-120">名前</th>
            <th className="th-cell u-min-w-120">権限</th>
            <th className="th-cell u-min-w-120">携帯番号</th>
            <th className="th-cell u-min-w-120">E-mail</th>
            <th className="th-cell u-min-w-144">入社日</th>
            <th className="th-cell u-min-w-144">退職日</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {users.map(user => (
            <tr key={user.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed u-text-center">
                {canAdmin && (
                  <Link href={route('users.edit', user)}>
                    <IconButton size="small" aria-label="edit">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Link>
                )}
              </td>
              <td className="td-cell u-text-center">{user.id}</td>
              <td className="td-cell">{user.employee_code}</td>
              <td className="td-cell">{user.name}</td>
              <td className="td-cell">{user.permission.display_name}</td>
              <td className="td-cell">{user.mobile_number}</td>
              <td className="td-cell">{user.email}</td>
              <td className="td-cell">{user.employment_date}</td>
              <td className="td-cell">{user.resignation_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
