import ClickableRow from '@/Components/ClickableRow';

export default function CustomerTable({ customers }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-min-w-64 u-text-center col-fixed">No.</th>
            <th className="th-cell u-min-w-200">取引先名</th>
            <th className="th-cell u-min-w-160">TEL</th>
            <th className="th-cell u-min-w-160">FAX</th>
            <th className="th-cell u-min-w-280">住所</th>
            <th className="th-cell u-min-w-160">担当ユーザー</th>
            <th className="th-cell u-min-w-96 u-text-center">発注数</th>
            <th className="th-cell u-min-w-96 u-text-center">受注数</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {customers.map(customer => (
            <ClickableRow key={customer.id} url={route('customers.show', customer)}>
              <td className="td-cell u-text-center col-fixed">{customer.id}</td>
              <td className="td-cell">{customer.name}</td>
              <td className="td-cell">{customer.tel}</td>
              <td className="td-cell">{customer.fax}</td>
              <td className="td-cell">{customer.address}</td>
              <td className="td-cell">{customer.in_charge_user?.name}</td>
              <td className="td-cell u-text-center">{customer.purchase_orders_count}</td>
              <td className="td-cell u-text-center">{customer.sales_orders_count}</td>
            </ClickableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
