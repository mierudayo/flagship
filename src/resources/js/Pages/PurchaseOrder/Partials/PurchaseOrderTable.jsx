export default function PurchaseOrderTable({ purchaseOrders }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed">ID</th>
            <th className="th-cell u-min-w-160">商品カテゴリ</th>
            <th className="th-cell u-min-w-240">仕入先</th>
            <th className="th-cell u-min-w-120">仕入担当</th>
            <th className="th-cell u-min-w-120">合計金額</th>
            <th className="th-cell u-min-w-280">明細</th>
            <th className="th-cell">備考</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {purchaseOrders.map(purchaseOrder => (
            <tr key={purchaseOrder.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">{purchaseOrder.id}</td>
              <td className="td-cell">{purchaseOrder.product_category.name}</td>
              <td className="td-cell">{purchaseOrder.customer_name}</td>
              <td className="td-cell">{purchaseOrder.purchase_in_charge.name}</td>
              <td className="td-cell">
                {purchaseOrder.display_subtotal_amount} <br />
                ({purchaseOrder.display_total_amount})
              </td>
              <td className="td-cell">
                {purchaseOrder.purchase_order_details.map(detail => (
                  <div key={detail.id}>{detail.row_number} {detail.product_name} | {detail.display_subtotal}円</div>
                ))}
              </td>
              <td className="td-cell u-ellipsis u-max-w-200">{purchaseOrder.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
