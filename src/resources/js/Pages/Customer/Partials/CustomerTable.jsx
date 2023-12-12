import { Link } from '@inertiajs/react';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function CustomerTable({ customers }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-w-64 u-text-center col-fixed">編集</th>
            <th className="th-cell u-min-w-64 u-text-center">No.</th>
            <th className="th-cell u-min-w-200">取引先名</th>
            <th className="th-cell u-min-w-160">TEL</th>
            <th className="th-cell u-min-w-160">FAX</th>
            <th className="th-cell u-min-w-280">住所</th>
            <th className="th-cell u-min-w-160">担当ユーザー</th>
            <th className="th-cell">備考</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {customers.map(customer => (
            <tr key={customer.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed u-text-center">
                <Link href={route('customers.edit', customer)}>
                  <IconButton size="small" aria-label="edit">
                    <EditIcon color="primary" />
                  </IconButton>
                </Link>
              </td>
              <td className="td-cell u-text-center">
                {customer.id}
              </td>
              <td className="td-cell">
                <Link href={route('customers.show', customer)} className="link">
                  {customer.name}
                </Link>
              </td>
              <td className="td-cell">{customer.tel}</td>
              <td className="td-cell">{customer.fax}</td>
              <td className="td-cell">{customer.address}</td>
              <td className="td-cell">{customer.in_charge_user?.name}</td>
              <td className="td-cell u-ellipsis u-max-w-280">{customer.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
