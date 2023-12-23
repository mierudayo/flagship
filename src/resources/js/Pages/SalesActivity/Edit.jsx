import { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import CustomSelect from '@/Components/Form/CustomSelect';
import DateInput from '@/Components/Form/DateInput';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import Textarea from '@/Components/Form/Textarea';
import ContactLookup from '@/Components/ContactLookup';
import Modal from '@/Components/Modal';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';

const Edit = ({ salesActivity, inChargeUserOptions }) => {
  const { auth }  = usePage().props

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactName, setContactName] = useState(salesActivity.customer_contact.name);
  const [customerName, setCustomerName] = useState(salesActivity.customer_contact.customer.name);
  const [contactEmail, setContactEmail] = useState(salesActivity.customer_contact.email || '');
  const [contactTel, setContactTel] = useState(salesActivity.customer_contact.tel || '');
  const [contactMobile, setContactMobile] = useState(salesActivity.customer_contact.mobile_number || '');

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    contact_date: salesActivity.contact_date,
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
  };

  function selectContact(contact) {
    setData('customer_contact_id', contact.id);
    setContactName(contact.name);
    setCustomerName(contact.customer.name);
    setContactEmail(contact.email ?? '');
    setContactTel(contact.tel ?? '');
    setContactMobile(contact.mobile_number ?? '');
    setIsModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">営業履歴 編集</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="salesActivityEditForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('sales-activities.index')} />
        {processing && <span>Now Loading...</span>}
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

      <form id="salesActivityEditForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="contact_date" label="連絡日" isRequired={true} />
                </th>
                <td className="td-cell">
                  <DateInput
                    id="contact_date"
                    value={data.contact_date}
                    onChange={e => setData('contact_date', e.target.value)}
                    error={errors.contact_date}
                  />
                  <InvalidFeedback errors={errors} name="contact_date" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="営業担当" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('in_charge_user_id', value)}
                    options={inChargeUserOptions}
                    value={data.in_charge_user_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                    error={errors.in_charge_user_id}
                  />
                  <InvalidFeedback errors={errors} name="in_charge_user_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="顧客情報" isRequired={true} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
                    <Input
                      type="text"
                      value={data.customer_contact_id}
                      className="u-max-w-64 u-mr-1"
                      placeholder="ID"
                      readOnly={true}
                    />
                    <Input
                      type="text"
                      value={contactName}
                      className="u-max-w-240 u-mr-1"
                      placeholder="顧客名"
                      readOnly={true}
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
                      <ManageSearchIcon />
                    </button>
                  </div>
                  <div className="u-mt-2">
                    <Input
                      type="text"
                      value={customerName}
                      className="u-max-w-368"
                      placeholder="取引先名"
                      readOnly={true}
                    />
                  </div>
                  <div className="u-mt-2">
                    <Input
                      type="text"
                      value={contactEmail}
                      className="u-max-w-368"
                      placeholder="E-mail"
                      readOnly={true}
                    />
                  </div>
                  <div className="u-flex u-mt-2">
                    <Input
                      type="text"
                      value={contactTel}
                      className="u-max-w-176 u-mr-3"
                      placeholder="TEL"
                      readOnly={true}
                    />
                    <Input
                      type="text"
                      value={contactMobile}
                      className="u-max-w-176"
                      placeholder="携帯"
                      readOnly={true}
                    />
                  </div>
                  <InvalidFeedback errors={errors} name="customer_contact_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="proposal" label="提案内容" isRequired={true} />
                </th>
                <td className="td-cell">
                  <Textarea
                    id="proposal"
                    value={data.proposal}
                    onChange={e => setData('proposal', e.target.value)}
                    error={errors.proposal}
                    height="medium"
                  />
                  <InvalidFeedback errors={errors} name="proposal" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="feedback" label="フィードバック" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Textarea
                    id="feedback"
                    value={data.feedback}
                    onChange={e => setData('feedback', e.target.value)}
                    error={errors.feedback}
                    height="medium"
                  />
                  <InvalidFeedback errors={errors} name="feedback" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="note" label="備考" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Textarea
                    id="note"
                    value={data.note}
                    onChange={e => setData('note', e.target.value)}
                    error={errors.note}
                    height="medium"
                  />
                  <InvalidFeedback errors={errors} name="note" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Edit.layout = page => <AppLayout title="営業履歴 編集" children={page} />

export default Edit
