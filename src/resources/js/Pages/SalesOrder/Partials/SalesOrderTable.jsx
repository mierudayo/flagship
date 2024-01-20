import ClickableRow from '@/Components/ClickableRow';
import NewTabLink from '@/Components/NewTabLink';
import { parseNumber, formatCurrency } from '@/Utils/priceCalculator';

export default function SalesOrderTable({ salesOrders }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table has-inner-table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed u-w-64">No.</th>
            <th className="th-cell u-w-136 u-min-w-136">納期</th>
            <th className="th-cell u-w-200 u-min-w-200">商品カテゴリ</th>
            <th className="th-cell u-min-w-240">販売先</th>
            <th className="th-cell u-w-104 u-min-w-104"> 受注担当</th>
            <th className="th-cell contains-table u-w-400">
              <div className="inner-thead">
                <div className="inner-tr">
                  <div className="inner-th u-w-200">商品</div>
                  <div className="inner-th u-w-104 u-text-right">販売数量</div>
                  <div className="inner-th u-w-112 u-text-right">販売単価</div>
                  <div className="inner-th u-w-120 u-text-right">販売価格</div>
                </div>
              </div>
            </th>
            <th className="th-cell u-w-120 u-text-right">受注金額</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {salesOrders.map(salesOrder => (
            <ClickableRow key={salesOrder.id} url={route('sales-orders.show', salesOrder)} className="emphasized-row">
              <td className="td-cell col-fixed">{salesOrder.id}</td>
              <td className="td-cell">{salesOrder.delivery_date}</td>
              <td className="td-cell">{salesOrder.product_category.name}</td>
              <td className="td-cell">
                <NewTabLink
                  url={route('customers.show', salesOrder.customer)}
                  displayText={salesOrder.customer.name}
                />
              </td>
              <td className="td-cell">{salesOrder.sales_in_charge.name}</td>
              <td className="td-cell contains-table">
                <div className="inner-tbody">
                  {salesOrder.sales_order_details.map(detail => (
                    <div key={detail.id} className="inner-tr">
                      <div className="inner-td u-w-200">{detail.product_name}</div>
                      <div className="inner-td u-w-104 u-text-right">{parseNumber(detail.quantity)}</div>
                      <div className="inner-td u-w-112 u-text-right">
                        {formatCurrency(detail.unit_price)} <br />
                        <span className="u-text-sm">
                          {detail.is_tax_inclusive === 1 ? '[内税]' : ''}
                        </span>
                      </div>
                      <div className="inner-td u-w-120 u-text-right">{formatCurrency(detail.price)}</div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="td-cell u-text-right">
                {formatCurrency(salesOrder.total)} <br />
                <span className="u-text-sm">
                  ({formatCurrency(salesOrder.total_with_tax)})
                </span>
              </td>
            </ClickableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}
