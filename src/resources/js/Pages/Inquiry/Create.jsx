import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import CancelButton from '../../Components/CancelButton';
import OptionsList from '../../Components/OptionsList';

const Create = ({ customerContactOption, productOption, inquiryTypeOption, inChargeUserOption, inquiryStatus, inquiryLeadSource }) => {
  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    inquiry_date: '',
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
      <form id="inquiryCreateForm" onSubmit={submit}>
        <div className="form-inner">
          <div className="input-group">

            <label htmlFor="inquiry_date" className="form-label">
              問い合わせ日
              <span className="required-mark">必須</span>
            </label>
            <input
              type="date"
              id="inquiry_date"
              name="inquiry_date"
              value={data.inquiry_date}
              className={`input-field ${errors.inquiry_date ? 'is-invalid' : ''} u-w-160`}
              onChange={e => setData('inquiry_date', e.target.value)}
            />
            <div className="invalid-feedback">{errors.inquiry_date}</div>
          </div>

          <div className="input-group">
            <label htmlFor="customer_contact_id" className="form-label">
              顧客
              <span className="required-mark">必須</span>
            </label>
            <select
              name="customer_contact_id"
              id="customer_contact_id"
              value={data.customer_contact_id}
              onChange={e => setData('customer_contact_id', e.target.value)}
              className={`input-field u-w-128 ${errors.customer_contact_id ? 'is-invalid' : ''}`}
            >
              <option value=""></option>
              {customerContactOption.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.customer_contact_id}</div>
          </div>

          <div className="input-group">
            <label htmlFor="subject" className="form-label">
              件名
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={data.subject}
              className={`input-field ${errors.subject ? 'is-invalid' : ''}`}
              onChange={e => setData('subject', e.target.value)}
            />
            <div className="invalid-feedback">{errors.subject}</div>
          </div>

          <div className="input-group">
            <label htmlFor="message" className="form-label">
              問い合わせ内容
              <span className="required-mark">必須</span>
            </label>
            <textarea
              name="message"
              id="message"
              cols="30" rows="10"
              className={`input-field ${errors.message ? 'is-invalid' : ''}`}
              onChange={e => setData('message', e.target.value)}
              value={data.message}
            />
            <div className="invalid-feedback">{errors.message}</div>
          </div>

          <div className="input-group">
            <label htmlFor="answer" className="form-label">
              回答内容
            </label>
            <textarea
              name="answer"
              id="answer"
              cols="30" rows="10"
              className={`input-field ${errors.answer ? 'is-invalid' : ''}`}
              onChange={e => setData('answer', e.target.value)}
              value={data.answer}
            />
            <div className="invalid-feedback">{errors.answer}</div>
          </div>

          <div className="input-group">
            <label htmlFor="lead_source" className="form-label">
              リード獲得元
              <span className="required-mark">必須</span>
            </label>
            <select
              name="lead_source"
              id="lead_source"
              value={data.lead_source}
              onChange={e => setData('lead_source', e.target.value)}
              className={`input-field u-w-128 ${errors.lead_source ? 'is-invalid' : ''}`}
            >
              <option value=""></option>
              <OptionsList options={inquiryLeadSource} />
            </select>
            <div className="invalid-feedback">{errors.lead_source}</div>
          </div>

          <div className="input-group">
            <label htmlFor="project_scale" className="form-label">
              案件規模
            </label>
            <input
              type="number"
              id="project_scale"
              name="project_scale"
              value={data.project_scale}
              className={`input-field ${errors.project_scale ? 'is-invalid' : ''}`}
              onChange={e => setData('project_scale', e.target.value)}
              placeholder="1 ~ 10,000までの数値を入力"
            />
            <div className="invalid-feedback">{errors.project_scale}</div>
          </div>

          <div className="input-group">
            <label htmlFor="status" className="form-label">
              ステータス
              <span className="required-mark">必須</span>
            </label>
            <select
              name="status"
              id="status"
              value={data.status}
              onChange={e => setData('status', e.target.value)}
              className={`input-field u-w-128 ${errors.status ? 'is-invalid' : ''}`}
            >
              <OptionsList options={inquiryStatus} />
            </select>
            <div className="invalid-feedback">{errors.status}</div>
          </div>

          <div className="input-group">
            <label htmlFor="feedback" className="form-label">
              フィードバック
            </label>
            <textarea
              name="feedback"
              id="feedback"
              cols="30" rows="10"
              className={`input-field ${errors.feedback ? 'is-invalid' : ''}`}
              onChange={e => setData('feedback', e.target.value)}
              value={data.feedback}
            />
            <div className="invalid-feedback">{errors.feedback}</div>
          </div>

          <div className="input-group">
            <label htmlFor="in_charge_user_id" className="form-label">
              担当ユーザー
              <span className="required-mark">必須</span>
            </label>
            <select
              name="in_charge_user_id"
              id="in_charge_user_id"
              value={data.in_charge_user_id}
              onChange={e => setData('in_charge_user_id', e.target.value)}
              className={`input-field u-w-128 ${errors.in_charge_user_id ? 'is-invalid' : ''}`}
            >
              <option value=""></option>
              {inChargeUserOption.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.in_charge_user_id}</div>
          </div>


          <div className="input-group">
            <label htmlFor="inquiry_type_id" className="form-label">
              問い合わせ区分
              <span className="required-mark">必須</span>
            </label>
            <select
              name="inquiry_type_id"
              id="inquiry_type_id"
              value={data.inquiry_type_id}
              onChange={e => setData('inquiry_type_id', e.target.value)}
              className={`input-field u-w-128 ${errors.inquiry_type_id ? 'is-invalid' : ''}`}
            >
              <option value=""></option>
              {inquiryTypeOption.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.inquiry_type_id}</div>
          </div>

          <div className="input-group">
            <label htmlFor="product_id" className="form-label">
              対象商品
            </label>
            <select
              name="product_id"
              id="product_id"
              value={data.product_id}
              onChange={e => setData('product_id', e.target.value)}
              className={`input-field u-w-128 ${errors.product_id ? 'is-invalid' : ''}`}
            >
              <option value=""></option>
              {productOption.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.product_id}</div>
          </div>

          <div className="input-group">
            <label htmlFor="product_detail" className="form-label">
              商品詳細
            </label>
            <input
              type="text"
              id="product_detail"
              name="product_detail"
              value={data.product_detail}
              className={`input-field ${errors.product_detail ? 'is-invalid' : ''}`}
              onChange={e => setData('product_detail', e.target.value)}
            />
            <div className="invalid-feedback">{errors.product_detail}</div>
          </div>

          <div className="input-group">
            <label htmlFor="note" className="form-label">
              備考
            </label>
            <textarea
              name="note"
              id="note"
              cols="30" rows="10"
              className={`input-field ${errors.note ? 'is-invalid' : ''}`}
              onChange={e => setData('note', e.target.value)}
              value={data.note}
            />
            <div className="invalid-feedback">{errors.note}</div>
          </div>

        </div>
      </form>
    </>
  );
}

Create.layout = page => <AppLayout children={page} />

export default Create
