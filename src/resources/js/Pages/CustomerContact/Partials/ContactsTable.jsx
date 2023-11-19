import { Link } from '@inertiajs/react';

export default function CustomerTable({ contacts }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="th-cell col-fixed"></th>
            <th className="th-cell">ID</th>
            <th className="th-cell">連絡先名</th>
            <th className="th-cell">所属先</th>
            <th className="th-cell">TEL</th>
            <th className="th-cell">携帯</th>
            <th className="th-cell">E-mail</th>
            <th className="th-cell">担当ユーザー</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {contacts.map(contact => (
            <tr key={contact.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">
                <Link href={route('contacts.edit', contact)} className="link">
                  編集
                </Link>
              </td>
              <td className="td-cell">{contact.id}</td>
              <td className="td-cell">
                <Link href={route('contacts.show', contact)} className="link">
                  {contact.name}
                </Link>
              </td>
              <td className="td-cell">{contact.customer.name}</td>
              <td className="td-cell">{contact.tel}</td>
              <td className="td-cell">{contact.mobile_number}</td>
              <td className="td-cell">{contact.email}</td>
              <td className="td-cell">{contact.in_charge_user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
