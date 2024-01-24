import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import ContentInfoBar from '@/Components/ContentInfoBar';
import EditLinkButton from '@/Components/EditLinkButton';

const Show = ({ billingAddress }) => {
  const { flash } = usePage().props;

  return (
    <>
      <h1 className="content-title">請求先 詳細</h1>

      <ContentInfoBar
        createdAt={billingAddress.created_at}
        updatedAt={billingAddress.updated_at}
      />

      <div className="content-navbar">
        {/* <EditLinkButton href={route('billing-addresses.edit', billingAddress)} style={{ marginRight: '16px' }} /> */}
      </div>

      <Alert type={flash.type} message={flash.message} />

      <div className="content-section">

        <div className="content-section-title">
          基本情報
        </div>

        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row">
                <th className="th-cell u-w-200">請求先名</th>
                <td className="td-cell">{billingAddress.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">よみがな</th>
                <td className="td-cell">{billingAddress.name_kana}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">ショートカット名</th>
                <td className="td-cell">{billingAddress.shortcut}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">担当者名</th>
                <td className="td-cell">{billingAddress.billing_contact_name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">郵便番号</th>
                <td className="td-cell">{billingAddress.postal_code}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">住所</th>
                <td className="td-cell">{billingAddress.address}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">TEL</th>
                <td className="td-cell">{billingAddress.tel}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">FAX</th>
                <td className="td-cell">{billingAddress.fax}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">E-mail</th>
                <td className="td-cell">{billingAddress.email}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">請求方法</th>
                <td className="td-cell">{billingAddress.invoice_delivery_method}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">備考</th>
                <td className="td-cell">{billingAddress.note}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

Show.layout = page => <AppLayout title="請求先 詳細" children={page} />

export default Show
