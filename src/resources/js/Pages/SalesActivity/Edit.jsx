import { useState } from 'react';

import { Link, useForm, usePage } from '@inertiajs/react';

import SalesActivityForm from './Partials/SalesActivityForm';

import CancelButton from '@/Components/CancelButton';
import ContactLookup from '@/Components/ContactLookup';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import Modal from '@/Components/Modal';
import ProgressIndicator from '@/Components/ProgressIndicator';
import AppLayout from '@/Layouts/AppLayout';


const Edit = ({ salesActivity, inChargeUserOptions, salesActivityStatusOptions }) => {
  const { auth } = usePage().props

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    contactName: salesActivity.customer_contact.name,
    customerName: salesActivity.customer_contact.customer.name,
    contactEmail: salesActivity.customer_contact.email || '',
    contactTel: salesActivity.customer_contact.tel || '',
    contactMobile: salesActivity.customer_contact.mobile_number || '',
  });

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    contact_date: salesActivity.contact_date,
    status: salesActivity.status,
    customer_contact_id: salesActivity.customer_contact_id,
    proposal: salesActivity.proposal,
    feedback: salesActivity.feedback || '',
    note: salesActivity.note || '',
    in_charge_user_id: auth.user.id,
  });

  function submit(e) {
    e.preventDefault();
    patch(route('sales-activities.update', salesActivity), {
      onSuccess: () => reset(),
    });
  }

  function selectContact(contact) {
    setData('customer_contact_id', contact.id);
    setContactInfo({
      contactName: contact.name,
      customerName: contact.customer.name,
      contactEmail: contact.email ?? '',
      contactTel: contact.tel ?? '',
      contactMobile: contact.mobile_number ?? ''
    });
    setIsModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">営業履歴 編集</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="salesActivityForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('sales-activities.index')} />
        {processing && <ProgressIndicator />}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('sales-activities.destroy', salesActivity)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
      </div>

      <FormErrorAlert errors={errors} />

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="連絡先 呼び出し">
          <ContactLookup
            handleClickSelect={contact => selectContact(contact)}
          />
        </Modal>}

      <SalesActivityForm
        data={data}
        setData={setData}
        errors={errors}
        submit={submit}
        inChargeUserOptions={inChargeUserOptions}
        salesActivityStatusOptions={salesActivityStatusOptions}
        contactInfo={contactInfo}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

Edit.layout = page => <AppLayout title="営業履歴 編集" children={page} />

export default Edit
