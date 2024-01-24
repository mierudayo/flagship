export default function DeliveryAddressSection({ deliveryAddresses }) {
  return (
    <div className="content-section">
      <div className="content-section-title">配送情報</div>
      <div className="table-wrapper is-scrollable">
        <table className="table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
              <th className="th-cell u-min-w-120 col-fixed">区分</th>
              <th className="th-cell u-min-w-240">住所</th>
              <th className="th-cell u-min-w-200">会社名</th>
              <th className="th-cell u-min-w-160">担当者名</th>
              <th className="th-cell u-min-w-160">TEL</th>
              <th className="th-cell">備考</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {deliveryAddresses.map((delivery) => (
              <tr key={delivery.id} className="table-row is-hoverable">
                <td className="td-cell col-fixed">
                  {delivery.address_type_label}
                </td>
                <td className="td-cell">
                  {delivery.postal_code} {delivery.address}
                </td>
                <td className="td-cell">{delivery.company_name}</td>
                <td className="td-cell">{delivery.contact_name}</td>
                <td className="td-cell">{delivery.tel}</td>
                <td className="td-cell u-ellipsis u-max-w-320">
                  {delivery.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
