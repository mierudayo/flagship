import ClickableRow from '@/Components/ClickableRow';

export default function ContactsTable({ contacts }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-min-w-64 u-text-center col-fixed">No.</th>
            <th className="th-cell u-min-w-160">名前</th>
            <th className="th-cell u-min-w-200">所属取引先</th>
            <th className="th-cell u-min-w-160">TEL</th>
            <th className="th-cell u-min-w-160">携帯</th>
            <th className="th-cell u-min-w-160">E-mail</th>
            <th className="th-cell u-min-w-160">担当ユーザー</th>
            <th className="th-cell u-min-w-104 u-text-center">問い合せ件数</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {contacts.map(contact => (
            <ClickableRow key={contact.id} url={route('contacts.show', contact)}>
              <td className="td-cell u-text-center col-fixed">{contact.id}</td>
              <td className="td-cell">{contact.name}</td>
              <td className="td-cell">{contact.customer.name}</td>
              <td className="td-cell">{contact.tel}</td>
              <td className="td-cell">{contact.mobile_number}</td>
              <td className="td-cell">{contact.email}</td>
              <td className="td-cell">{contact.in_charge_user?.name}</td>
              <td className="td-cell u-text-center">{contact.inquiries_count}</td>
            </ClickableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
