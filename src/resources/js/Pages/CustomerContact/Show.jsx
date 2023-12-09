import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import ContentInfoBar from '@/Components/ContentInfoBar';

const Show = ({ contact }) => {
  const { flash } = usePage().props;

  return (
    <>
      <h1 className="content-title">連絡先 詳細</h1>

      <ContentInfoBar
        createdAt={contact.created_at}
        createdBy={contact.created_by.name}
        updatedAt={contact.updated_at}
        updatedBy={contact.updated_by?.name}
      />

      <div className="content-navbar">
        <Link
          href={route('contacts.edit', contact)}
          className="btn btn-secondary u-mr-3"
        >
          編集する
        </Link>
      </div>

      <Alert type="success" message={flash.message} />

      <div className="content-section">

        <div className="content-section-title">
          基本情報
        </div>

        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row">
                <th className="th-cell u-w-200">取引先名</th>
                <td className="td-cell">{contact.customer.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell u-w-200">担当者名</th>
                <td className="td-cell">{contact.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">よみがな</th>
                <td className="td-cell">{contact.name_kana}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">TEL</th>
                <td className="td-cell">{contact.tel}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">携帯番号</th>
                <td className="td-cell">{contact.mobile_number}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">E-mail</th>
                <td className="td-cell">{contact.email}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">役職</th>
                <td className="td-cell">{contact.position}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">役割</th>
                <td className="td-cell">{contact.role}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">使用状況</th>
                <td className="td-cell">{contact.is_active_label}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">備考</th>
                <td className="td-cell">{contact.note}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">担当ユーザー</th>
                <td className="td-cell">{contact.in_charge_user?.name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">獲得元</th>
                <td className="td-cell">{contact.lead_source?.name}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

Show.layout = page => <AppLayout children={page} />

export default Show
