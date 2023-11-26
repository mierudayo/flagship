import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import CustomSelect from '@/Components/Form/CustomSelect';
import DateInput from '@/Components/Form/DateInput';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import Textarea from '@/Components/Form/Textarea';
import ContactLookup from '@/Components/ContactLookup';
import Modal from '@/Components/Modal';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';

const Edit = ({ inquiry, productOption, inquiryTypeOption, inChargeUserOption, inquiryStatus, inquiryLeadSource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactName, setContactName] = useState(inquiry.customer_contact.name);

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    inquiry_date: inquiry.inquiry_date,
    customer_contact_id: inquiry.customer_contact_id,
    product_id: inquiry.product_id || '',
    product_detail: inquiry.product_detail || '',
    inquiry_type_id: inquiry.inquiry_type_id || '',
    lead_source: inquiry.lead_source,
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
  };

  function selectContact(contact) {
    setData('customer_contact_id', contact.id);
    setContactName(contact.name);
    setIsModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">問い合わせ 編集</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="inquiryCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('inquiries.index')} />
        {processing && <span>Now Loading...</span>}
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
                  {errors.inquiry_date && (<div className="invalid-feedback">{errors.inquiry_date}</div>)}
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
                      className="u-max-w-64"
                      placeholder="ID"
                      readOnly={true}
                    />
                    <Input
                      type="text"
                      value={contactName}
                      className="u-max-w-240"
                      placeholder="連絡先名"
                      readOnly={true}
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
                      <ManageSearchIcon />
                    </button>
                  </div>
                  {errors.customer_contact_id && (<div className="invalid-feedback">{errors.customer_contact_id}</div>)}
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
                  {errors.subject && (<div className="invalid-feedback">{errors.subject}</div>)}
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
                  {errors.message && (<div className="invalid-feedback">{errors.message}</div>)}
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
                  {errors.answer && (<div className="invalid-feedback">{errors.answer}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="リード獲得元" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('lead_source', value)}
                    options={inquiryLeadSource}
                    value={data.lead_source}
                    valueKey="value"
                    labelKey="label"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="リード獲得元を選択..."
                  />
                  {errors.lead_source && (<div className="invalid-feedback">{errors.lead_source}</div>)}
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
                  {errors.project_scale && (<div className="invalid-feedback">{errors.project_scale}</div>)}
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
                  {errors.status && (<div className="invalid-feedback">{errors.status}</div>)}
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
                  {errors.feedback && (<div className="invalid-feedback">{errors.feedback}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="対応者" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('in_charge_user_id', value)}
                    options={inChargeUserOption}
                    value={data.in_charge_user_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="対応者を選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="問い合わせ区分" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('inquiry_type_id', value)}
                    options={inquiryTypeOption}
                    value={data.inquiry_type_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="問い合わせ区分を選択..."
                  />
                  {errors.inquiry_type_id && (<div className="invalid-feedback">{errors.inquiry_type_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="対象商品" isRequired={false} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('product_id', value)}
                    options={productOption}
                    value={data.product_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="対象商品を選択..."
                  />
                  {errors.product_id && (<div className="invalid-feedback">{errors.product_id}</div>)}
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
                  {errors.product_detail && (<div className="invalid-feedback">{errors.product_detail}</div>)}
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
                  {errors.note && (<div className="invalid-feedback">{errors.note}</div>)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Edit.layout = page => <AppLayout children={page} />

export default Edit
