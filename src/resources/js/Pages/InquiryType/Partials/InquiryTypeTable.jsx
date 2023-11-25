export default function InquiryTypeTable({ inquiryTypes }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed">ID</th>
            <th className="th-cell">表示順</th>
            <th className="th-cell">区分名</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {inquiryTypes.map(type => (
            <tr key={type.id} className="table-row is-hoverable">
              <td className="td-cell u-w-80">{type.id}</td>
              <td className="td-cell u-w-80">{type.display_order}</td>
              <td className="td-cell">
                <span className={`custom-label ${type.custom_label}`}>
                  {type.name}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
