import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import CustomerLookup from '@/Components/CustomerLookup';
import Modal from '@/Components/Modal';
import ProgressIndicator from '@/Components/ProgressIndicator';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import ContactsForm from './Partials/ContactsForm';

const Create = ({ userOptions, leadSourceOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    customer_id: '',
    lead_source_id: '',
    name: '',
    name_kana: '',
    tel: '',
    mobile_number: '',
    email: '',
    position: '',
    role: '',
    is_active: true,
    note: '',
    in_charge_user_id: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('contacts.store'), {
      onSuccess: () => {
        reset();
      }
    });
  };

  function selectCustomer(customer) {
    setData('customer_id', customer.id);
    setCustomerName(customer.name);
    setIsModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">連絡先 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="customerContactForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('contacts.index')} />
        {processing && <ProgressIndicator />}
      </div>

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

Create.layout = page => <AppLayout title="連絡先 登録" children={page} />

export default Create
