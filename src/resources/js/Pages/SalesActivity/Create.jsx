import { useState } from 'react';

import { useForm, usePage } from '@inertiajs/react';

import SalesActivityForm from './Partials/SalesActivityForm';

import CancelButton from '@/Components/CancelButton';
import ContactLookup from '@/Components/ContactLookup';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import Modal from '@/Components/Modal';
import ProgressIndicator from '@/Components/ProgressIndicator';
import AppLayout from '@/Layouts/AppLayout';


const Create = ({ inChargeUserOptions }) => {
  const { today } = usePage().props.date;
  const { auth }  = usePage().props

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    contactName: '',
    customerName: '',
    contactEmail: '',
    contactTel: '',
    contactMobile: '',
  });

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    contact_date: today,
    customer_contact_id: '',
    proposal: '',
    feedback: '',
    note: '',
    in_charge_user_id: auth.user.id,
  });

  function submit(e) {
    e.preventDefault();
    post(route('sales-activities.store'), {
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
      <h1 className="content-title">営業履歴 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="salesActivityForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('sales-activities.index')} />
        {processing && <ProgressIndicator />}
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
        contactInfo={contactInfo}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

Create.layout = page => <AppLayout title="営業履歴 登録" children={page} />

export default Create
