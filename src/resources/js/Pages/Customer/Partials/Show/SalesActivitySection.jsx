import NewTabLink from '@/Components/NewTabLink';

export default function SalesActivitySection({ contacts }) {
  return (
    <div className="content-section">
      <div className="content-section-title">営業履歴</div>
      <div className="table-wrapper is-scrollable">
        <table className="table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
            <th className="th-cell col-fixed u-w-104">No.</th>
              <th className="th-cell u-min-w-136">連絡日</th>
              <th className="th-cell u-min-w-120">営業担当</th>
              <th className="th-cell u-min-w-120">連絡先</th>
              <th className="th-cell u-min-w-400">提案内容</th>
              <th className="th-cell u-min-w-400">反応</th>
              <th className="th-cell u-min-w-400">備考</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {contacts.map((contact) =>
              contact.sales_activities.map((activity) => (
                <tr key={activity.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">
                    <NewTabLink
                      url={route('sales-activities.edit', activity)}
                      displayText={activity.id}
                    />
                  </td>
                  <td className="td-cell">{activity.contact_date}</td>
                  <td className="td-cell">{activity.in_charge_user.name}</td>
                  <td className="td-cell">{contact.name}</td>
                  <td className="td-cell">{activity.proposal}</td>
                  <td className="td-cell">{activity.feedback}</td>
                  <td className="td-cell">{activity.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
