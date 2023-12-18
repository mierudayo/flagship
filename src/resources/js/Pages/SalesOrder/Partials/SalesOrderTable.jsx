import { Link } from '@inertiajs/react';

import IconButton from '@mui/material/IconButton';
import PageviewIcon from '@mui/icons-material/Pageview';

export default function SalesOrderTable({ salesOrders }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed">操作</th>
            <th className="th-cell">ID</th>
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
            <tr key={salesOrder.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">
                <Link href={route('sales-orders.show', salesOrder)}>
                  <IconButton size="small" aria-label="show">
                    <PageviewIcon color="primary" />
                  </IconButton>
                </Link>
              </td>
              <td className="td-cell">{salesOrder.id}</td>
              <td className="td-cell">{salesOrder.delivery_date}</td>
              <td className="td-cell">{salesOrder.product_category.name}</td>
              <td className="td-cell">{salesOrder.customer.name}</td>
              <td className="td-cell">{salesOrder.sales_in_charge.name}</td>
              <td className="td-cell">
                {salesOrder.display_subtotal_amount} <br />
                ({salesOrder.display_total_amount})
              </td>
              <td className="td-cell">
                {salesOrder.sales_order_details.map(detail => (
                  <div key={detail.id}>{detail.id} : {detail.product_name} {detail.subtotal}円</div>
                ))}
              </td>
              <td className="td-cell u-ellipsis u-max-w-200">{salesOrder.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
