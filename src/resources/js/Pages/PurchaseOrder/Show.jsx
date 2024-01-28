import TermDetails from './Partials/TermDetails';

import ContentInfoBar from '@/Components/ContentInfoBar';
import AppLayout from '@/Layouts/AppLayout';
import { parseNumber, formatCurrency } from '@/Utils/priceCalculator';

const Show = ({ purchaseOrder }) => {

  return (
    <>

      <h1 className="content-title">発注 詳細</h1>

      <ContentInfoBar
        createdAt={purchaseOrder.created_at}
        createdBy={purchaseOrder.created_by.name}
        updatedAt={purchaseOrder.updated_at}
        updatedBy={purchaseOrder.updated_by?.name}
      />

      <div className="content-navbar">
        {/* Buttons */}
      </div>

      <div className="content-section">

        <div className="content-section-title">
          発注内容
        </div>

        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row">
                <th className="th-cell u-w-144">発注日</th>
                <td className="td-cell">{purchaseOrder.purchase_date}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">発注先</th>
                <td className="td-cell">{purchaseOrder.customer.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">発注先顧客</th>
                <td className="td-cell">{purchaseOrder.customer_contact?.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">出荷元</th>
                <td className="td-cell">
                  <div>{purchaseOrder.ship_from_address}</div>
                  <div>{purchaseOrder.ship_from_company}</div>
                  <div>{purchaseOrder.ship_from_contact}</div>
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">商品カテゴリ</th>
                <td className="td-cell">{purchaseOrder.product_category.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">請求条件</th>
                <td className="td-cell">
                  <TermDetails purchaseOrder={purchaseOrder} />
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">出荷日</th>
                <td className="td-cell">
                  {purchaseOrder.shipping_date}
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">支払日</th>
                <td className="td-cell">
                  {purchaseOrder.payment_date} {purchaseOrder.status}
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">発注担当</th>
                <td className="td-cell">{purchaseOrder.purchase_in_charge.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">備考</th>
                <td className="td-cell">{purchaseOrder.note}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>


      <div className="content-section">
        <div className="content-section-header">
          <div className="content-section-title">発注明細</div>
          <div className="u-flex u-ml-auto">
            <div className="u-flex u-mr-4 u-items-center">
              <span className="u-min-w-64">
                <span className="indicator-dot dot-pink"></span>
                発注額
              </span>
              <span>
                {formatCurrency(purchaseOrder.total)}
              </span>
              <span className="u-text-sm">
                ({formatCurrency(purchaseOrder.total_with_tax)})
              </span>
            </div>
          </div>
        </div>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header is-sticky">
              <tr className="table-row">
                <th className="th-cell u-w-64 col-fixed">No.</th>
                <th className="th-cell u-min-w-200">商品</th>
                <th className="th-cell u-min-w-240">商品名</th>
                <th className="th-cell u-min-w-104">発注数量</th>
                <th className="th-cell u-min-w-104">発注単価</th>
                <th className="th-cell u-min-w-112">発注額</th>
                <th className="th-cell u-min-w-320">備考</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {purchaseOrder.purchase_order_details.map(detail => (
                <tr key={detail.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">{detail.row_number}</td>
                  <td className="td-cell">{detail.product?.name}</td>
                  <td className="td-cell">{detail.product_name} <br />{detail.product_detail}</td>
                  <td className="td-cell">{parseNumber(detail.quantity)}</td>
                  <td className="td-cell">{parseNumber(detail.unit_price)}</td>
                  <td className="td-cell">
                    {formatCurrency(detail.price)} <br />
                    <span className="u-text-sm">
                      ({formatCurrency(detail.price_with_tax)})
                    </span>
                  </td>
                  <td className="td-cell">{detail.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

Show.layout = page => <AppLayout title="発注 詳細" children={page} />

export default Show
