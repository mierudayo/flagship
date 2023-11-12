export default function InquiryTable({ inquiries }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header">
          <tr className="table-row">
            <th className="th-cell col-fixed">ID</th>
            <th className="th-cell">対応者</th>
            <th className="th-cell">問い合せ区分</th>
            <th className="th-cell">ステータス</th>
            <th className="th-cell">結果</th>
            <th className="th-cell" colSpan={2}>商品情報</th>
            <th className="th-cell" colSpan={2}>顧客情報</th>
            <th className="th-cell">件名</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {inquiries.map(inquiry => (
            <tr key={inquiry.id} className="table-row is-hoverable">
              <td className="td-cell">{inquiry.id}</td>
              <td className="td-cell">{inquiry.in_charge_user.name}</td>
              <td className="td-cell">{inquiry.inquiry_type.name}</td>
              <td className="td-cell">{inquiry.status}</td>
              <td className="td-cell">{inquiry.result}</td>
              <td className="td-cell">{inquiry.product?.name}</td>
              <td className="td-cell">{inquiry.product?.category.name}</td>
              <td className="td-cell">{inquiry.customer_contact.name}</td>
              <td className="td-cell">{inquiry.customer_contact.customer.name}</td>
              <td className="td-cell">{inquiry.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
