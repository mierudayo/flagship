import TermDetails from '@/Pages/Customer/Partials/TermDetails';

export default function CustomerSection({ customer }) {
  return (
    <div className="content-section">
      <div className="content-section-title">基本情報</div>

      <div className="table-wrapper">
        <table className="table">
          <tbody className="tbody">
            <tr className="table-row">
              <th className="th-cell u-w-200">取引先名</th>
              <td className="td-cell">{customer.name}</td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">よみがな</th>
              <td className="td-cell">{customer.name_kana}</td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">ショートカット名</th>
              <td className="td-cell">{customer.shortcut}</td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">住所</th>
              <td className="td-cell">
                {customer.postal_code} {customer.address}
              </td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">TEL</th>
              <td className="td-cell">{customer.tel}</td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">FAX</th>
              <td className="td-cell">{customer.fax}</td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">支払条件</th>
              <td className="td-cell">
                <TermDetails term={customer.purchase_term} />
              </td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">請求条件</th>
              <td className="td-cell">
                <TermDetails term={customer.sales_term} />
              </td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">担当ユーザー</th>
              <td className="td-cell">{customer.in_charge_user?.name}</td>
            </tr>

            <tr className="table-row">
              <th className="th-cell">備考</th>
              <td className="td-cell">{customer.note}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
