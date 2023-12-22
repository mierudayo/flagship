import { Link } from '@inertiajs/react';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function InquiryTable({ inquiries }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-w-64 u-text-center col-fixed">編集</th>
            <th className="th-cell u-min-w-64 u-text-center">No.</th>
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
            <tr key={inquiry.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed u-text-center">
                <Link href={route('inquiries.edit', inquiry)}>
                  <IconButton size="small" aria-label="edit">
                    <EditIcon color="primary" />
                  </IconButton>
                </Link>
              </td>
              <td className="td-cell u-text-center">{inquiry.id}</td>
              <td className="td-cell">{inquiry.inquiry_date}</td>
              <td className="td-cell">{inquiry.in_charge_user.name}</td>
              <td className="td-cell">
                <span className={`inquiry-status status-${inquiry.status}`}>
                  {inquiry.status_label}
                </span>
              </td>
              <td className="td-cell">{inquiry.customer_contact.name}</td>
              <td className="td-cell">{inquiry.customer_contact.customer.name}</td>
              <td className="td-cell">{inquiry.product?.name}</td>
              <td className="td-cell">{inquiry.product?.category.name}</td>
              <td className="td-cell">
                <span className={`custom-label ${inquiry.inquiry_type.custom_label}`}>
                  {inquiry.inquiry_type.name}
                </span>
              </td>
              <td className="td-cell u-ellipsis u-max-w-200">{inquiry.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
