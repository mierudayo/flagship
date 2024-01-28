import { useState } from 'react';

import { Link, useForm, usePage } from "@inertiajs/react";

import ContactsForm from './Partials/ContactsForm';

import Alert from '@/Components/Alert';
import CancelButton from '@/Components/CancelButton';
import ContentInfoBar from '@/Components/ContentInfoBar';
import CustomerLookup from '@/Components/CustomerLookup';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import Modal from '@/Components/Modal';
import ProgressIndicator from '@/Components/ProgressIndicator';
import AppLayout from '@/Layouts/AppLayout';


const Edit = ({ contact, userOptions, leadSourceOptions }) => {
  const { flash } = usePage().props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState(contact.customer.name);

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    customer_id: contact.customer_id,
    lead_source_id: contact.lead_source_id || '',
    name: contact.name,
    name_kana: contact.name_kana || '',
    tel: contact.tel || '',
    mobile_number: contact.mobile_number || '',
    email: contact.email || '',
    position: contact.position || '',
    role: contact.role || '',
    is_active: contact.is_active,
    note: contact.note || '',
    in_charge_user_id: contact.in_charge_user_id || '',
  });

  function submit(e) {
    e.preventDefault();
    patch(route('contacts.update', contact), {
      onSuccess: () => {
        reset();
      }
    });
  }

  function selectCustomer(customer) {
    setData('customer_id', customer.id);
    setCustomerName(customer.name);
    setIsModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">連絡先 編集</h1>

      <ContentInfoBar
        createdAt={contact.created_at}
        createdBy={contact.created_by.name}
        updatedAt={contact.updated_at}
        updatedBy={contact.updated_by?.name}
      />

      <div className="content-navbar">
        <button
          type="submit"
          form="customerContactForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('contacts.index')} />
        {processing && <ProgressIndicator />}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('contacts.destroy', contact)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
      </div>

      <Alert type={flash.type} message={flash.message} />

      <FormErrorAlert errors={errors} />

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="取引先 呼び出し">
          <CustomerLookup
            handleClickSelect={customer => selectCustomer(customer)}
          />
        </Modal>}

      <ContactsForm
        userOptions={userOptions}
        leadSourceOptions={leadSourceOptions}
        setIsModalOpen={setIsModalOpen}
        customerName={customerName}
        data={data}
        setData={setData}
        errors={errors}
        submit={submit}
      />
    </>
  );
}

Edit.layout = page => <AppLayout title="連絡先 編集" children={page} />

export default Edit
