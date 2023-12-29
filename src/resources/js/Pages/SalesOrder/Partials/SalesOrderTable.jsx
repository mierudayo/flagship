import ClickableRow from '@/Components/ClickableRow';

export default function SalesOrderTable({ salesOrders }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed">No.</th>
            <th className="th-cell u-min-w-136">納期</th>
            <th className="th-cell u-min-w-160">商品カテゴリ</th>
            <th className="th-cell u-min-w-240">販売先</th>
            <th className="th-cell u-min-w-120">販売担当</th>
            <th className="th-cell u-min-w-120">合計金額</th>
            <th className="th-cell u-min-w-280">明細</th>
            <th className="th-cell">備考</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {salesOrders.map(salesOrder => (
            <ClickableRow key={salesOrder.id} url={route('sales-orders.show', salesOrder)}>
              <td className="td-cell col-fixed">{salesOrder.id}</td>
              <td className="td-cell">{salesOrder.delivery_date}</td>
              <td className="td-cell">{salesOrder.product_category.name}</td>
              <td className="td-cell">{salesOrder.customer.name}</td>
              <td className="td-cell">{salesOrder.sales_in_charge.name}</td>
              <td className="td-cell">
                {salesOrder.display_total} <br />
                ({salesOrder.display_total_with_tax})
              </td>
              <td className="td-cell">
                {salesOrder.sales_order_details.map(detail => (
                  <div key={detail.id}>{detail.row_number} : {detail.product_name} {detail.display_price}円</div>
                ))}
              </td>
              <td className="td-cell u-ellipsis u-max-w-200">{salesOrder.note}</td>
            </ClickableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
