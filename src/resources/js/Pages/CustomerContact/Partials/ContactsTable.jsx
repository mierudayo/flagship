import { Link } from '@inertiajs/react';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';

export default function CustomerTable({ contacts }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-w-64 u-text-center col-fixed">操作</th>
            <th className="th-cell u-min-w-64 u-text-center">No.</th>
            <th className="th-cell u-min-w-160">名前</th>
            <th className="th-cell u-min-w-200">所属取引先</th>
            <th className="th-cell u-min-w-160">TEL</th>
            <th className="th-cell u-min-w-160">携帯</th>
            <th className="th-cell u-min-w-160">E-mail</th>
            <th className="th-cell u-min-w-160">担当ユーザー</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {contacts.map(contact => (
            <tr key={contact.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed u-text-center">
              <div className="u-flex">
                  <Link href={route('contacts.show', contact)} className="u-mr-2">
                    <IconButton size="small" aria-label="show">
                      <PageviewIcon color="primary" />
                    </IconButton>
                  </Link>
                  <Link href={route('contacts.edit', contact)}>
                    <IconButton size="small" aria-label="edit">
                      <EditIcon color="primary" />
                    </IconButton>
                  </Link>
                </div>
              </td>
              <td className="td-cell u-text-center">{contact.id}</td>
              <td className="td-cell">
                <Link href={route('contacts.show', contact)} className="link">
                  {contact.name}
                </Link>
              </td>
              <td className="td-cell">{contact.customer.name}</td>
              <td className="td-cell">{contact.tel}</td>
              <td className="td-cell">{contact.mobile_number}</td>
              <td className="td-cell">{contact.email}</td>
              <td className="td-cell">{contact.in_charge_user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
