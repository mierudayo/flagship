import DropdownMenu from '../DropdownMenu';

import NewTabLink from '@/Components/NewTabLink';

export default function BillingAddressSection({ billingAddresses, detachBillingAddress }) {
  return (
    <div className="content-section">
      <div className="content-section-title">請求先</div>
      <div className="table-wrapper is-scrollable">
        <table className="table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
              <th className="th-cell col-fixed"></th>
              <th className="th-cell">No.</th>
              <th className="th-cell u-min-w-200">請求先</th>
              <th className="th-cell u-min-w-136">請求先担当者</th>
              <th className="th-cell u-min-w-320">住所</th>
              <th className="th-cell u-min-w-160">TEL</th>
              <th className="th-cell u-min-w-160">FAX</th>
              <th className="th-cell u-min-w-160">E-mail</th>
              <th className="th-cell u-w-120">備考</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {billingAddresses.map((billingAddress) => (
              <tr key={billingAddress.id} className="table-row is-hoverable">
                <td className="td-cell col-fixed">
                  <DropdownMenu
                    handleClickDetach={() =>
                      detachBillingAddress(billingAddress)
                    }
                  />
                </td>
                <td className="td-cell">
                  <NewTabLink
                    url={route('billing-addresses.show', billingAddress)}
                    displayText={billingAddress.id}
                  />
                </td>
                <td className="td-cell">
                  {billingAddress.name} <br />({billingAddress.name_kana})
                </td>
                <td className="td-cell">
                  {billingAddress.billing_contact_name}
                </td>
                <td className="td-cell">{billingAddress.address}</td>
                <td className="td-cell">{billingAddress.tel}</td>
                <td className="td-cell">{billingAddress.fax}</td>
                <td className="td-cell">{billingAddress.email}</td>
                <td className="td-cell u-ellipsis u-max-w-320">
                  {billingAddress.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
