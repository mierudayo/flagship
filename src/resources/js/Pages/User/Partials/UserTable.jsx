import ClickableRow from '@/Components/ClickableRow';

export default function UserTable({ users }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-min-w-64 u-text-center col-fixed">No.</th>
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
            <ClickableRow key={user.id} url={route('users.edit', user)}>
              <td className="td-cell u-text-center col-fixed">{user.id}</td>
              <td className="td-cell">{user.employee_code}</td>
              <td className="td-cell">{user.name}</td>
              <td className="td-cell">{user.permission.display_name}</td>
              <td className="td-cell">{user.mobile_number}</td>
              <td className="td-cell">{user.email}</td>
              <td className="td-cell">{user.employment_date}</td>
              <td className="td-cell">{user.resignation_date}</td>
            </ClickableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
