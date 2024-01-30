import { useState } from 'react';

import { Link, useForm } from '@inertiajs/react';

import CancelButton from '@/Components/CancelButton';
import ContactLookup from '@/Components/ContactLookup';
import ContentInfoBar from '@/Components/ContentInfoBar';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import Modal from '@/Components/Modal';
import ProgressIndicator from '@/Components/ProgressIndicator';
import AppLayout from '@/Layouts/AppLayout';
import InquiryForm from '@/Pages/Inquiry/Partials/InquiryForm';

const Edit = ({ inquiry, productOptions, inquiryTypeOptions, inChargeUserOptions, inquiryStatusOptions, contactMethodOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    contactName: inquiry.customer_contact.name,
    customerName: inquiry.customer_contact.customer.name,
    contactEmail: inquiry.customer_contact.email ?? '',
    contactTel: inquiry.customer_contact.tel ?? '',
    contactMobile: inquiry.customer_contact.mobile_number ?? '',
  });

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    inquiry_date: inquiry.inquiry_date,
    customer_contact_id: inquiry.customer_contact_id,
    product_id: inquiry.product_id || '',
    product_detail: inquiry.product_detail || '',
    inquiry_type_id: inquiry.inquiry_type_id || '',
    contact_method: inquiry.contact_method,
    project_scale: inquiry.project_scale || '',
    status: inquiry.status,
    subject: inquiry.subject || '',
    message: inquiry.message,
    answer: inquiry.answer || '',
    feedback: inquiry.feedback || '',
    note: inquiry.note || '',
    in_charge_user_id: inquiry.in_charge_user_id,
  });

  function submit(e) {
    e.preventDefault();
    patch(route('inquiries.update', inquiry), {
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
      <h1 className="content-title">問い合わせ 編集</h1>

      <ContentInfoBar
        createdAt={inquiry.created_at}
        createdBy={inquiry.created_by.name}
        updatedAt={inquiry.updated_at}
        updatedBy={inquiry.updated_by?.name}
      />

      <div className="content-navbar">
        <button
          type="submit"
          form="inquiryForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('inquiries.index')} />
        {processing && <ProgressIndicator />}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('inquiries.destroy', inquiry)}
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

Edit.layout = page => <AppLayout title="問い合わせ 編集" children={page} />

export default Edit
