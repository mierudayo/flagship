import ClickableRow from '@/Components/ClickableRow';
import NewTabLink from '@/Components/NewTabLink';

export default function InquiryTable({ inquiries }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-min-w-64 u-text-center col-fixed">No.</th>
            <th className="th-cell u-min-w-136">問い合わせ日</th>
            <th className="th-cell u-min-w-160">対応者</th>
            <th className="th-cell u-min-w-120">ステータス</th>
            <th className="th-cell u-min-w-320" colSpan={2}>顧客情報</th>
            <th className="th-cell u-min-w-240" colSpan={2}>商品情報</th>
            <th className="th-cell u-min-w-120">区分</th>
            <th className="th-cell">件名</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {inquiries.map(inquiry => (
            <ClickableRow key={inquiry.id} url={route('inquiries.edit', inquiry)}>
              <td className="td-cell u-text-center col-fixed">{inquiry.id}</td>
              <td className="td-cell">{inquiry.inquiry_date}</td>
              <td className="td-cell">{inquiry.in_charge_user.name}</td>
              <td className="td-cell">
                <span className={`inquiry-status status-${inquiry.status}`}>
                  {inquiry.status_label}
                </span>
              </td>
              <td className="td-cell">{inquiry.customer_contact.name}</td>
              <td className="td-cell">
                <NewTabLink
                  url={route('customers.show', inquiry.customer_contact.customer)}
                  displayText={inquiry.customer_contact.customer.name}
                />
              </td>
              <td className="td-cell">{inquiry.product?.name}</td>
              <td className="td-cell">{inquiry.product?.category.name}</td>
              <td className="td-cell">
                <span className={`custom-label ${inquiry.inquiry_type.custom_label}`}>
                  {inquiry.inquiry_type.name}
                </span>
              </td>
              <td className="td-cell u-ellipsis u-max-w-200">{inquiry.subject}</td>
            </ClickableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
