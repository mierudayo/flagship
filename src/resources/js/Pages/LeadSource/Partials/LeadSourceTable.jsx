export default function LeadSourceTable({ leadSources }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed">No</th>
            <th className="th-cell">表示順</th>
            <th className="th-cell">獲得元名</th>
            <th className="th-cell">獲得顧客数</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {leadSources.map(leadSource => (
            <tr key={leadSource.id} className="table-row is-hoverable">
              <td className="td-cell u-w-80">{leadSource.id}</td>
              <td className="td-cell u-w-96">{leadSource.display_order}</td>
              <td className="td-cell u-w-320">{leadSource.name}</td>
              <td className="td-cell">{leadSource.customer_contacts_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
