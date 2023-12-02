import { Link } from '@inertiajs/react';

export default function BillingAddressTable({ billingAddresses }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed">ID</th>
            <th className="th-cell u-min-w-120">請求方法</th>
            <th className="th-cell u-min-w-160">請求先名</th>
            <th className="th-cell u-min-w-136">請求先担当者</th>
            <th className="th-cell u-min-w-320">住所</th>
            <th className="th-cell u-min-w-160">TEL</th>
            <th className="th-cell u-min-w-120">E-mail</th>
            <th className="th-cell u-min-w-240">備考</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {billingAddresses.map(billingAddress => (
            <tr key={billingAddress.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">{billingAddress.id}</td>
              <td className="td-cell">{billingAddress.invoice_delivery_method}</td>
              <td className="td-cell">{billingAddress.name}</td>
              <td className="td-cell">{billingAddress.billing_contact_name}</td>
              <td className="td-cell">{billingAddress.postal_code} {billingAddress.address}</td>
              <td className="td-cell">{billingAddress.tel}</td>
              <td className="td-cell">{billingAddress.email}</td>
              <td className="td-cell">{billingAddress.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
