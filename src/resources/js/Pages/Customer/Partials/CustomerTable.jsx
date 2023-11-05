export default function CustomerTable({ customers }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="th-cell col-fixed">ID</th>
            <th className="th-cell">取引先名</th>
            <th className="th-cell">連絡先一覧</th>
            <th className="th-cell">TEL</th>
            <th className="th-cell">住所</th>
            <th className="th-cell">担当ユーザー</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {customers.map(customer => (
            <tr key={customer.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">
                <a href={route('customers.edit', customer)} className="link">{customer.id}</a>
              </td>
              <td className="td-cell">
                <a href={route('customers.show', customer)} className="link">
                  {customer.name}
                </a>
              </td>
              <td className="td-cell">
                {customer.contacts.map(contact => (
                  <p key={contact.id}>{contact.name}</p>
                ))}
              </td>
              <td className="td-cell">{customer.tel_number}</td>
              <td className="td-cell">{customer.address}</td>
              <td className="td-cell">{customer.in_charge_user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
