import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Link, usePage } from "@inertiajs/react";
import Modal from "../../Components/Modal";
import ContactForm from "./Partials/ContactForm";
import AddressForm from "./Partials/AddressForm";

export default function Show({ customer, userSelectOptions }) {
  const { flash } = usePage().props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const {
    name,
    name_kana,
    shortcut,
    postal_code,
    address,
    tel,
    fax,
    note,
    created_at,
    updated_at,
    in_charge_user,
    contacts,
    created_by,
    updated_by,
    logistics_addresses,
  } = customer;

  return (
    <AppLayout>
      <h1 className="content-title">取引先 詳細</h1>
      <div className="content-navbar">
        <Link
          href={route('customers.edit', customer)}
          className="btn btn-secondary u-mr-3"
        >
          編集する
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +連絡先を追加
        </button>
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="btn btn-secondary">
          +出荷元/納品先を追加
        </button>
      </div>

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="連絡先登録">
          <ContactForm customer={customer} userSelectOptions={userSelectOptions} closeModal={() => setIsModalOpen(false)} />
        </Modal>}

      {isAddressModalOpen &&
        <Modal closeModal={() => setIsAddressModalOpen(false)} title="納品先登録">
          <AddressForm customer={customer} closeModal={() => setIsAddressModalOpen(false)} />
        </Modal>}

      <div className="content-section">

        <div className="u-flex">
          <div className="u-mr-4">基本情報</div>
          <span className="u-mr-3">登録: {created_at} {created_by.name}</span>
          {updated_by && (<span>更新: {updated_at} {updated_by.name}</span>)}
        </div>

        {flash.message && (
          <div class="alert alert-success">{flash.message}</div>
        )}

        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row">
                <th className="th-cell u-w-200">取引先名</th>
                <td className="td-cell">{name}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">よみがな</th>
                <td className="td-cell">{name_kana}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">ショートカット名</th>
                <td className="td-cell">{shortcut}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">住所</th>
                <td className="td-cell">{postal_code} {address}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">TEL</th>
                <td className="td-cell">{tel}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">FAX</th>
                <td className="td-cell">{fax}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">備考</th>
                <td className="td-cell">{note}</td>
              </tr>

              <tr className="table-row">
                <th className="th-cell">担当ユーザー</th>
                <td className="td-cell">{in_charge_user?.name}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div>連絡先一覧</div>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="th-cell col-fixed">ID</th>
                <th className="th-cell">役割</th>
                <th className="th-cell">名前</th>
                <th className="th-cell">よみがな</th>
                <th className="th-cell">TEL</th>
                <th className="th-cell">携帯</th>
                <th className="th-cell">E-mail</th>
                <th className="th-cell">役職</th>
                <th className="th-cell">使用状況</th>
                <th className="th-cell">備考</th>
                <th className="th-cell">担当ユーザー</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {contacts.map(contact => (
                <tr key={contact.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">{contact.id}</td>
                  <td className="td-cell">{contact.role}</td>
                  <td className="td-cell">{contact.name}</td>
                  <td className="td-cell">{contact.name_kana}</td>
                  <td className="td-cell">{contact.tel}</td>
                  <td className="td-cell">{contact.mobile_number}</td>
                  <td className="td-cell">{contact.email}</td>
                  <td className="td-cell">{contact.position}</td>
                  <td className="td-cell">{contact.is_active}</td>
                  <td className="td-cell">{contact.note}</td>
                  <td className="td-cell">{contact.in_charge_user?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div>出荷元/納品先 管理</div>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header">
              <tr className="table-row">
                <th className="th-cell col-fixed">ID</th>
                <th className="th-cell">区分</th>
                <th className="th-cell">住所</th>
                <th className="th-cell">会社名</th>
                <th className="th-cell">担当者名</th>
                <th className="th-cell">TEL</th>
                <th className="th-cell">備考</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {logistics_addresses.map(logistics => (
                <tr key={logistics.id} className="table-row is-hoverable">
                  <td className="td-cell col-fixed">{logistics.id}</td>
                  <td className="td-cell">
                    {logistics.address_type === 1
                      ? "出荷元"
                      : logistics.address_type === 2
                        ? "納品先"
                        : logistics.address_type === 3
                          ? "兼用"
                          : ""}
                  </td>
                  <td className="td-cell">{logistics.postal_code} {logistics.address}</td>
                  <td className="td-cell">{logistics.company_name}</td>
                  <td className="td-cell">{logistics.contact_name}</td>
                  <td className="td-cell">{logistics.tel}</td>
                  <td className="td-cell">{logistics.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </AppLayout>
  );
}
