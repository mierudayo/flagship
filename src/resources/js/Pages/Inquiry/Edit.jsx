import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ inquiry, customerContactOption, productOption, inquiryTypeOption, inChargeUserOption }) {
  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    customer_contact_id: inquiry.customer_contact_id || '',
    product_id: inquiry.product_id || '',
    inquiry_type_id: inquiry.inquiry_type_id || '',
    lead_source: inquiry.lead_source || '',
    status: inquiry.status || '',
    subject: inquiry.subject || '',
    message: inquiry.message || '',
    answer: inquiry.answer || '',
    result: inquiry.result || '',
    result_reason: inquiry.result_reason || '',
    in_charge_user_id: inquiry.in_charge_user_id || '',
    created_by_id: inquiry.created_by_id || '',
    updated_by_id: inquiry.updated_by_id || '',
    inquiry_date: inquiry.inquiry_date || '',
  });

  const resultOption = [
    { label: '成約', value: 1 },
    { label: '失注', value: 2 },
    { label: '見送り', value: 3 },
    { label: 'その他', value: 4 },
  ];

  const leadSourceOption = [
    { label: 'HP', value: 1 },
    { label: 'TEL', value: 2 },
    { label: 'メール', value: 3 },
    { label: '展示会', value: 4 },
  ];

  const statusOption = [
    { label: '対応中', value: 1 },
    { label: '返信待ち', value: 2 },
    { label: '保留', value: 3 },
    { label: 'クローズ', value: 4 },
  ];

  function submit(e) {
    e.preventDefault();
    patch(route('inquiries.update', inquiry), {
      onSuccess: () => reset(),
    });
  };

  function handleBeforeLeave() {
    if (isDirty) {
      return confirm('入力内容が破棄されますがよろしいですか？');
    }
    return true;
  };

  return (
    <AppLayout>
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
        <Link
          onBefore={handleBeforeLeave}
          href={route('inquiries.index')}
          className="btn btn-secondary"
        >
          キャンセル
        </Link>
        {processing && <span>Now Loading...</span>}
      </div>
      <form id="inquiryCreateForm" onSubmit={submit}>
        <div className="form-inner">


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
              {leadSourceOption.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.lead_source}</div>
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
              <option value=""></option>
              {statusOption.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.status}</div>
          </div>

          <div className="input-group">
            <label htmlFor="result" className="form-label">
              結果
            </label>
            <select
              name="result"
              id="result"
              value={data.result}
              onChange={e => setData('result', e.target.value)}
              className={`input-field u-w-128 ${errors.result ? 'is-invalid' : ''}`}
            >
              <option value=""></option>
              {resultOption.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.result}</div>
          </div>

          <div className="input-group">
            <label htmlFor="result_reason" className="form-label">
              結果理由
            </label>
            <textarea
              name="result_reason"
              id="result_reason"
              cols="30" rows="10"
              className={`input-field ${errors.result_reason ? 'is-invalid' : ''}`}
              onChange={e => setData('result_reason', e.target.value)}
              value={data.result_reason}
            />
            <div className="invalid-feedback">{errors.result_reason}</div>
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

        </div>
      </form>
    </AppLayout>
  );
}
