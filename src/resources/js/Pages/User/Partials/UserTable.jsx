export default function UserTable({ users }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="th-cell col-fixed">ID</th>
            <th className="th-cell">社員番号</th>
            <th className="th-cell">名前</th>
            <th className="th-cell">携帯番号</th>
            <th className="th-cell">E-mail</th>
            <th className="th-cell">入社日</th>
            <th className="th-cell">退職日</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {users.map(user => (
            <tr key={user.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">
                <a href={route('users.edit', user)}>
                  {user.id}
                </a>
              </td>
              <td className="td-cell">{user.employee_code}</td>
              <td className="td-cell">{user.name}</td>
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
