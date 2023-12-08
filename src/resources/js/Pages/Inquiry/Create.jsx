import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
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

const Create = ({ productOptions, inquiryTypeOptions, inChargeUserOptions, inquiryStatus, inquiryLeadSources }) => {
  const { today } = usePage().props.date;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTel, setContactTel] = useState('');
  const [contactMobile, setContactMobile] = useState('');

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    inquiry_date: today,
    customer_contact_id: '',
    product_id: '',
    product_detail: '',
    inquiry_type_id: '',
    lead_source: '',
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
    setContactName(contact.name);
    setCustomerName(contact.customer.name);
    setContactEmail(contact.email ?? '');
    setContactTel(contact.tel ?? '');
    setContactMobile(contact.mobile_number ?? '');
    setIsModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">問い合わせ 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="inquiryCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('inquiries.index')} />
        {processing && <span>Now Loading...</span>}
      </div>

      <FormErrorAlert errors={errors} />

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="連絡先 呼び出し">
          <ContactLookup
            handleClickSelect={contact => selectContact(contact)}
          />
        </Modal>}

      <form id="inquiryCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="inquiry_date" label="問い合わせ日" isRequired={true} />
                </th>
                <td className="td-cell">
                  <DateInput
                    id="inquiry_date"
                    value={data.inquiry_date}
                    onChange={e => setData('inquiry_date', e.target.value)}
                    error={errors.inquiry_date}
                  />
                  <InvalidFeedback errors={errors} name="inquiry_date" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="連絡先" isRequired={true} />
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
                      placeholder="連絡先名"
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
                  <FormLabel htmlFor="subject" label="件名" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="subject"
                    type="text"
                    value={data.subject}
                    onChange={e => setData('subject', e.target.value)}
                    error={errors.subject}
                  />
                  <InvalidFeedback errors={errors} name="subject" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="message" label="問い合わせ内容" isRequired={true} />
                </th>
                <td className="td-cell">
                  <Textarea
                    id="message"
                    value={data.message}
                    onChange={e => setData('message', e.target.value)}
                    error={errors.message}
                  />
                  <InvalidFeedback errors={errors} name="message" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="answer" label="回答内容" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Textarea
                    id="answer"
                    value={data.answer}
                    onChange={e => setData('answer', e.target.value)}
                    error={errors.answer}
                  />
                  <InvalidFeedback errors={errors} name="answer" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="リード獲得元" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('lead_source', value)}
                    options={inquiryLeadSources}
                    value={data.lead_source}
                    valueKey="value"
                    labelKey="label"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="リード獲得元を選択..."
                  />
                  <InvalidFeedback errors={errors} name="lead_source" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="project_scale" label="案件規模" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="project_scale"
                    type="number"
                    value={data.project_scale}
                    onChange={e => setData('project_scale', e.target.value)}
                    error={errors.project_scale}
                    placeholder="1 ~ 10,000までの数値を入力"
                  />
                  <InvalidFeedback errors={errors} name="project_scale" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="ステータス" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('status', value)}
                    options={inquiryStatus}
                    value={data.status}
                    valueKey="value"
                    labelKey="label"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="ステータスを選択..."
                  />
                  <InvalidFeedback errors={errors} name="status" />
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
                  />
                  <InvalidFeedback errors={errors} name="feedback" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="対応者" isRequired={true} />
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
                    placeholder="対応者を選択..."
                  />
                  <InvalidFeedback errors={errors} name="in_charge_user_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="問い合わせ区分" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('inquiry_type_id', value)}
                    options={inquiryTypeOptions}
                    value={data.inquiry_type_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="問い合わせ区分を選択..."
                  />
                  <InvalidFeedback errors={errors} name="inquiry_type_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="対象商品" isRequired={false} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('product_id', value)}
                    options={productOptions}
                    value={data.product_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="対象商品を選択..."
                  />
                  <InvalidFeedback errors={errors} name="product_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="product_detail" label="商品詳細" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="product_detail"
                    type="text"
                    value={data.product_detail}
                    onChange={e => setData('product_detail', e.target.value)}
                    error={errors.product_detail}
                  />
                  <InvalidFeedback errors={errors} name="product_detail" />
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

Create.layout = page => <AppLayout children={page} />

export default Create
