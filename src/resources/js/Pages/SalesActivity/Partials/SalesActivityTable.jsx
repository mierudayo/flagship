import ClickableRow from '@/Components/ClickableRow';
import NewTabLink from '@/Components/NewTabLink';

export default function SalesActivityTable({ salesActivities }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-min-w-64 u-text-center col-fixed">No.</th>
            <th className="th-cell u-min-w-160">連絡日</th>
            <th className="th-cell u-min-w-120">ステータス</th>
            <th className="th-cell u-min-w-120">営業担当 (from)</th>
            <th className="th-cell u-min-w-200">連絡先 <br />(to)</th>
            <th className="th-cell u-min-w-240">提案</th>
            <th className="th-cell u-min-w-240">反応</th>
            <th className="th-cell u-min-w-240">備考</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {salesActivities.map(salesActivity => (
            <ClickableRow key={salesActivity.id} url={route('sales-activities.edit', salesActivity)}>
              <td className="td-cell u-text-center col-fixed">{salesActivity.id}</td>
              <td className="td-cell">{salesActivity.contact_date}</td>
              <td className="td-cell">
                <span className={`sales-activity-status status-${salesActivity.status}`}>
                  {salesActivity.status_label}
                </span>
              </td>
              <td className="td-cell">{salesActivity.in_charge_user.name}</td>
              <td className="td-cell">
                {salesActivity.customer_contact.name} <br />
                <NewTabLink
                  url={route('customers.show', salesActivity.customer_contact.customer)}
                  displayText={salesActivity.customer_contact.customer.name}
                />
              </td>
              <td className="td-cell">{salesActivity.proposal}</td>
              <td className="td-cell">{salesActivity.feedback}</td>
              <td className="td-cell">{salesActivity.note}</td>
            </ClickableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
