import { Link } from '@inertiajs/react';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function SalesActivityTable({ salesActivities }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-w-64 u-text-center col-fixed">編集</th>
            <th className="th-cell u-min-w-64 u-text-center">No.</th>
            <th className="th-cell u-min-w-160">連絡日</th>
            <th className="th-cell u-min-w-120">営業担当 (from)</th>
            <th className="th-cell u-min-w-200">連絡先 <br />(to)</th>
            <th className="th-cell u-min-w-240">提案</th>
            <th className="th-cell u-min-w-240">反応</th>
            <th className="th-cell u-min-w-240">備考</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {salesActivities.map(salesActivity => (
            <tr key={salesActivity.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed u-text-center">
                <Link >
                  <IconButton size="small" aria-label="edit">
                    <EditIcon color="primary" />
                  </IconButton>
                </Link>
              </td>
              <td className="td-cell u-text-center">{salesActivity.id}</td>
              <td className="td-cell">{salesActivity.contact_date}</td>
              <td className="td-cell">{salesActivity.in_charge_user.name}</td>
              <td className="td-cell">
                {salesActivity.customer_contact.name} <br />
                {salesActivity.customer_contact.customer.name}
              </td>
              <td className="td-cell">{salesActivity.proposal}</td>
              <td className="td-cell">{salesActivity.feedback}</td>
              <td className="td-cell">{salesActivity.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
