import NewTabLink from '@/Components/NewTabLink';

export default function ContactSection({ contacts }) {
  return (
    <div className="content-section">
    <div className="content-section-title">
      連絡先
    </div>
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
          <th className="th-cell col-fixed u-w-104">No.</th>
            <th className="th-cell u-min-w-160">役割</th>
            <th className="th-cell u-min-w-160">
              名前 <br/>
              <span className="u-text-sm">(よみがな)</span>
            </th>
            <th className="th-cell u-min-w-160">TEL</th>
            <th className="th-cell u-min-w-160">携帯</th>
            <th className="th-cell u-min-w-160">E-mail</th>
            <th className="th-cell u-min-w-160">役職</th>
            <th className="th-cell u-min-w-120">担当ユーザー</th>
            <th className="th-cell u-min-w-120">リード獲得元</th>
            <th className="th-cell u-text-center u-min-w-80">使用状況</th>
            <th className="th-cell u-w-120">備考</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {contacts.map(contact => (
            <tr key={contact.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">
                <NewTabLink
                  url={route('contacts.show', contact)}
                  displayText={contact.id}
                />
              </td>
              <td className="td-cell">{contact.role}</td>
              <td className="td-cell">
                {contact.name} <br/>
                {contact.name_kana === null ? null : (<span className="u-text-sm">({contact.name_kana})</span>) }
              </td>
              <td className="td-cell">{contact.tel}</td>
              <td className="td-cell">{contact.mobile_number}</td>
              <td className="td-cell">{contact.email}</td>
              <td className="td-cell">{contact.position}</td>
              <td className="td-cell">{contact.in_charge_user?.name}</td>
              <td className="td-cell">
                {contact.lead_source && (
                  <span className="chip">
                    {contact.lead_source?.name}
                  </span>
                )}
              </td>
              <td className="td-cell u-text-center">{contact.is_active_label}</td>
              <td className="td-cell u-ellipsis u-max-w-320">{contact.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}
