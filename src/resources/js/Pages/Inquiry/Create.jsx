import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import ContactLookup from '@/Components/ContactLookup';
import Modal from '@/Components/Modal';
import ProgressIndicator from '@/Components/ProgressIndicator';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import InquiryForm from '@/Pages/Inquiry/Partials/InquiryForm';

const Create = ({ productOptions, inquiryTypeOptions, inChargeUserOptions, inquiryStatusOptions, contactMethodOptions }) => {
  const { today } = usePage().props.date;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    contactName: '',
    customerName: '',
    contactEmail: '',
    contactTel: '',
    contactMobile: '',
  });

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    inquiry_date: today,
    customer_contact_id: '',
    product_id: '',
    product_detail: '',
    inquiry_type_id: '',
    contact_method: '',
    project_scale: '',
    status: 1,
    subject: '',
    message: '',
    answer: '',
    feedback: '',
    note: '',
    in_charge_user_id: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('inquiries.store'), {
      onSuccess: () => reset(),
    });
  };

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
      <h1 className="content-title">問い合わせ 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="inquiryForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('inquiries.index')} />
        {processing && <ProgressIndicator />}
      </div>

      <FormErrorAlert errors={errors} />

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="連絡先 呼び出し">
          <ContactLookup
            handleClickSelect={contact => selectContact(contact)}
          />
        </Modal>}

      <InquiryForm
        data={data}
        setData={setData}
        errors={errors}
        submit={submit}
        inChargeUserOptions={inChargeUserOptions}
        inquiryStatusOptions={inquiryStatusOptions}
        inquiryTypeOptions={inquiryTypeOptions}
        contactMethodOptions={contactMethodOptions}
        productOptions={productOptions}
        setIsModalOpen={setIsModalOpen}
        contactInfo={contactInfo}
      />
    </>
  );
}

Create.layout = page => <AppLayout title="問い合わせ 登録" children={page} />

export default Create
