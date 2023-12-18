
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ContentInfoBar from '@/Components/ContentInfoBar';


const Show = ({ salesOrder }) => {
  return (
    <>

      <h1 className="content-title">受注 詳細</h1>

      {/* <ContentInfoBar
        createdAt={salesOrder.created_at}
        createdBy={salesOrder.created_by.name}
        updatedAt={salesOrder.updated_at}
        updatedBy={salesOrder.updated_by?.name}
      /> */}

      <div className="content-navbar">
        <Link
          // href={route('sales-orders.edit', salesOrder)}
          className="btn btn-secondary u-mr-3"
        >
          編集する
        </Link>
      </div>

      <div className="content-section">

        <div className="content-section-title">
          受注内容
        </div>

        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row">
                <th className="th-cell u-w-160">販売先</th>
                <td className="td-cell">{salesOrder.customer.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">販売先顧客</th>
                <td className="td-cell">{salesOrder.customer_contact.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">納品先</th>
                <td className="td-cell">
                  <div>{salesOrder.delivery_address.company_name}</div>
                  <div>{salesOrder.delivery_address.address}</div>
                  <div>{salesOrder.delivery_address.contact_name}</div>
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">受注日</th>
                <td className="td-cell">{salesOrder.order_date}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">出荷日</th>
                <td className="td-cell">
                  {salesOrder.shipping_date} {salesOrder.shipping_status}
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">納品日</th>
                <td className="td-cell">
                  {salesOrder.delivery_date} {salesOrder.delivery_status}
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">配送メモ</th>
                <td className="td-cell">{salesOrder.delivery_memo}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">商品カテゴリ</th>
                <td className="td-cell">{salesOrder.product_category.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">受注担当</th>
                <td className="td-cell">{salesOrder.sales_in_charge.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">請求条件</th>
                <td className="td-cell">
                  {/* TODO: 請求条件追加 */}
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">入金日</th>
                <td className="td-cell">
                  {salesOrder.payment_date} {salesOrder.status}
                </td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">備考</th>
                <td className="td-cell">{salesOrder.note}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>


      <div className="content-section">
        <div className="content-section-title">
          受注明細
        </div>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header is-sticky">
              <tr className="table-row">
                <th className="th-cell u-w-64 col-fixed">No.</th>
                <th className="th-cell u-w-120">商品名</th>
                <th className="th-cell u-w-120">仕様</th>
                <th className="th-cell u-min-w-160">仕入先</th>
                <th className="th-cell u-min-w-112">発注数量</th>
                <th className="th-cell u-min-w-112">販売数量</th>
                <th className="th-cell u-min-w-112">発注単価</th>
                <th className="th-cell u-min-w-112">販売単価</th>
                <th className="th-cell u-min-w-120">備考</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {salesOrder.sales_order_details.map(detail => (
                <tr key={detail.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">{detail.row_number}</td>
                  <td className="td-cell">{detail.product_name}</td>
                  <td className="td-cell">{detail.product_detail}</td>
                  <td className="td-cell">{detail.purchase_order_details[0].purchase_order.customer.name}</td>
                  <td className="td-cell">{detail.purchase_order_details[0].quantity}</td>
                  <td className="td-cell">{detail.quantity}</td>
                  <td className="td-cell">{detail.purchase_order_details[0].unit_price}</td>
                  <td className="td-cell">{detail.unit_price}</td>
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

Show.layout = page => <AppLayout children={page} />

export default Show
