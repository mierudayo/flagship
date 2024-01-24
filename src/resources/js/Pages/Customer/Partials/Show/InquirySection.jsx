import NewTabLink from '@/Components/NewTabLink';

export default function InquirySection({ contacts }) {
  return (
    <div className="content-section">
      <div className="content-section-title">問い合わせ</div>
      <div className="table-wrapper is-scrollable">
        <table className="table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
            <th className="th-cell col-fixed u-w-104">No.</th>
              <th className="th-cell u-min-w-136">問い合わせ日</th>
              <th className="th-cell u-min-w-160">対応者</th>
              <th className="th-cell u-min-w-120">ステータス</th>
              <th className="th-cell u-min-w-240">顧客情報</th>
              <th className="th-cell u-min-w-240" colSpan={2}>
                商品情報
              </th>
              <th className="th-cell u-min-w-120">区分</th>
              <th className="th-cell">件名</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {contacts.map((contact) =>
              contact.inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">
                    <NewTabLink
                      url={route('inquiries.edit', inquiry)}
                      displayText={inquiry.id}
                    />
                  </td>
                  <td className="td-cell">{inquiry.inquiry_date}</td>
                  <td className="td-cell">{inquiry.in_charge_user.name}</td>
                  <td className="td-cell">
                    <span className={`inquiry-status status-${inquiry.status}`}>
                      {inquiry.status_label}
                    </span>
                  </td>
                  <td className="td-cell">{contact.name}</td>
                  <td className="td-cell">{inquiry.product?.name}</td>
                  <td className="td-cell">{inquiry.product?.category.name}</td>
                  <td className="td-cell">
                    <span
                      className={`custom-label ${inquiry.inquiry_type.custom_label}`}
                    >
                      {inquiry.inquiry_type.name}
                    </span>
                  </td>
                  <td className="td-cell u-ellipsis u-max-w-200">
                    {inquiry.subject}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
