import ClickableRow from '@/Components/ClickableRow';
import NewTabLink from '@/Components/NewTabLink';
import EditIconButton from '@/Components/EditIconButton';
import { formatNumber, formatCurrency } from '@/Utils/priceCalculator';

const SalesOrderRows = ({ salesOrders }) => {
  const newSalesOrders = salesOrders.map(salesOrder => {
    return {
      ...salesOrder,
      poTotal: salesOrder.sales_order_details.flatMap(soDetail =>
                  soDetail.purchase_order_details.map(poDetail => parseFloat(poDetail.price))
                ).reduce((acc, crr) => acc + crr, 0),
      poTotalWithTax: salesOrder.sales_order_details.flatMap(soDetail =>
                  soDetail.purchase_order_details.map(poDetail => parseFloat(poDetail.price_with_tax))
                ).reduce((acc, crr) => acc + crr, 0),
    };
  });

  return (
    <>
    {newSalesOrders.map(salesOrder => (
      <ClickableRow key={salesOrder.id} url={route('sales-orders.show', salesOrder)} className="emphasized-row">
        <td className="td-cell col-fixed">
          <EditIconButton href={route('sales-orders.edit', salesOrder)} />
        </td>
        <td className="td-cell">{salesOrder.id}</td>
        <td className="td-cell">{salesOrder.delivery_date}</td>
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
                <div className="inner-td u-w-200">
                  <div>
                    {detail.product_name}
                  </div>
                  {detail.product_detail === null ? '' : (
                    <span className="u-text-sm u-text-gray">{detail.product_detail}</span>
                  )}
                </div>
                <div className="inner-td u-w-200">
                  {detail?.purchase_order_details[0]?.purchase_order.customer && (
                    <NewTabLink
                      url={route('customers.show', detail?.purchase_order_details[0]?.purchase_order.customer)}
                      displayText={detail?.purchase_order_details[0]?.purchase_order.customer.name}
                    />
                  )}
                </div>
                <div className="inner-td u-w-80">{detail?.purchase_order_details[0]?.purchase_order.purchase_in_charge.name}</div>
                <div className="inner-td u-w-104 u-text-right">{formatNumber(detail?.purchase_order_details[0]?.quantity)}</div>
                <div className="inner-td u-w-104 u-text-right">{formatNumber(detail.quantity)}</div>
                <div className="inner-td u-w-112 u-text-right">
                  {formatCurrency(detail?.purchase_order_details[0]?.unit_price)} <br />
                  <span className="u-text-sm">
                    {detail?.purchase_order_details[0]?.is_tax_inclusive === 1 ? '[内税]' : ''}
                  </span>
                </div>
                <div className="inner-td u-w-112 u-text-right">
                  {formatCurrency(detail.unit_price)} <br />
                  <span className="u-text-sm">
                    {detail.is_tax_inclusive === 1 ? '[内税]' : ''}
                  </span>
                </div>
                <div className="inner-td u-w-120 u-text-right">{formatCurrency(detail?.purchase_order_details[0]?.price)}</div>
                <div className="inner-td u-w-120 u-text-right">{formatCurrency(detail.price)}</div>
              </div>
            ))}
          </div>
        </td>
        <td className="td-cell u-text-right">
          {formatCurrency(salesOrder.total - salesOrder.poTotal)}
        </td>
      </ClickableRow>
    ))}
    </>
  );
};


export default function SalesOrderTable({ salesOrders }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table has-inner-table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed u-w-64"></th>
            <th className="th-cell u-w-64">No.</th>
            <th className="th-cell u-w-120 u-min-w-120">納期</th>
            <th className="th-cell u-min-w-224">販売先</th>
            <th className="th-cell u-w-80 u-min-w-80"> 受注担当</th>
            <th className="th-cell contains-table u-w-400">
              <div className="inner-thead">
                <div className="inner-tr">
                  <div className="inner-th u-w-200">
                    商品 <br/>
                    <span className="u-text-sm">(仕様)</span>
                  </div>
                  <div className="inner-th u-w-200">仕入先</div>
                  <div className="inner-th u-w-80">仕入担当</div>
                  <div className="inner-th u-w-104 u-text-right">仕入数</div>
                  <div className="inner-th u-w-104 u-text-right">販売数</div>
                  <div className="inner-th u-w-112 u-text-right">仕入単価</div>
                  <div className="inner-th u-w-112 u-text-right">販売単価</div>
                  <div className="inner-th u-w-120 u-text-right">仕入価格</div>
                  <div className="inner-th u-w-120 u-text-right">販売価格</div>
                </div>
              </div>
            </th>
            <th className="th-cell u-w-120 u-text-right">利益額</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <SalesOrderRows salesOrders={salesOrders} />
        </tbody>
      </table>
    </div>
  );
}
