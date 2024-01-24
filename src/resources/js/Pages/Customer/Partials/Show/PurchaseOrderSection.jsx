import NewTabLink from '@/Components/NewTabLink';
import { parseNumber, formatCurrency } from '@/Utils/priceCalculator';

export default function PurchaseOrderSection({ purchaseOrders }) {
  return (
    <div className="content-section">
      <div className="content-section-title">発注</div>
      <div className="table-wrapper is-scrollable">
        <table className="table has-inner-table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
              <th className="th-cell col-fixed u-w-104">No.</th>
              <th className="th-cell u-w-136 u-min-w-136">出荷日</th>
              <th className="th-cell u-w-136 u-min-w-160">支払状況</th>
              <th className="th-cell u-w-136 u-min-w-160">支払条件</th>
              <th className="th-cell u-w-200 u-min-w-200">商品カテゴリ</th>
              <th className="th-cell u-w-104 u-min-w-104">発注担当</th>
              <th className="th-cell contains-table u-w-400">
                <div className="inner-thead">
                  <div className="inner-tr">
                    <div className="inner-th u-w-200">商品</div>
                    <div className="inner-th u-w-104 u-text-right">
                      発注数量
                    </div>
                    <div className="inner-th u-w-112 u-text-right">
                      発注単価
                    </div>
                    <div className="inner-th u-w-120 u-text-right">
                      発注価格
                    </div>
                  </div>
                </div>
              </th>
              <th className="th-cell u-min-w-120 u-text-right">発注金額</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {purchaseOrders.map((purchaseOrder) => (
              <tr key={purchaseOrder.id} className="table-row emphasized-row">
                <td className="td-cell col-fixed">
                  <NewTabLink
                    url={route('purchase-orders.show', purchaseOrder)}
                    displayText={purchaseOrder.id}
                  />
                </td>
                <td className="td-cell">{purchaseOrder.shipping_date}</td>
                <td className="td-cell">
                  {purchaseOrder.payment_date} {purchaseOrder.payment_status}
                </td>
                <td className="td-cell">
                  {/* <TermDetails purchaseOrder={purchaseOrder} /> */}
                </td>
                <td className="td-cell">
                  {purchaseOrder.product_category.name}
                </td>
                <td className="td-cell">
                  {purchaseOrder.purchase_in_charge.name}
                </td>
                <td className="td-cell contains-table">
                  <div className="inner-tbody">
                    {purchaseOrder.purchase_order_details.map((detail) => (
                      <div key={detail.id} className="inner-tr">
                        <div className="inner-td u-w-200">
                          {detail.product_name}
                        </div>
                        <div className="inner-td u-w-104 u-text-right">
                          {parseNumber(detail.quantity)}
                        </div>
                        <div className="inner-td u-w-112 u-text-right">
                          {formatCurrency(detail.unit_price)} <br />
                          <span className="u-text-sm">
                            {detail.is_tax_inclusive === 1 ? "[内税]" : ""}
                          </span>
                        </div>
                        <div className="inner-td u-w-120 u-text-right">
                          {formatCurrency(detail.price)}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="td-cell u-text-right">
                  {formatCurrency(purchaseOrder.total)} <br />
                  <span className="u-text-sm">
                    ({formatCurrency(purchaseOrder.total_with_tax)})
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
