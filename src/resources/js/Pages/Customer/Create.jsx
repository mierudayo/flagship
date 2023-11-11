import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Create({ userSelectOptions }) {
  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    name: '',
    name_kana: '',
    shortcut: '',
    postal_code: '',
    address: '',
    tel: '',
    fax: '',
    note: '',
    in_charge_user_id: '',
    purchase_billing_type: '',
    purchase_cutoff_day: '',
    purchase_payment_month_offset: '',
    purchase_payment_day: '',
    purchase_payment_day_offset: '',
    sales_billing_type: '',
    sales_cutoff_day: '',
    sales_payment_month_offset: '',
    sales_payment_day: '',
    sales_payment_day_offset: '',
  });

  const billingTypeOption = [
    { label: '締め請求', value: 1 },
    { label: '都度請求', value: 2 },
  ];
  const cutoffDayOption = [
    { label: '10日締め', value: 10 },
    { label: '15日締め', value: 15 },
    { label: '20日締め', value: 20 },
    { label: '25日締め', value: 25 },
    { label: '月末締め', value: 99 },
  ];
  const paymentMonthOffsetOption = [
    { label: '当月', value: 0 },
    { label: '翌月', value: 1 },
    { label: '翌々月', value: 2 },
  ];
  const paymentDayOption = [
    { label: '10日', value: 10 },
    { label: '15日', value: 15 },
    { label: '20日', value: 20 },
    { label: '25日', value: 25 },
    { label: '末日', value: 99 },
  ];
  const paymentDayOffsetOption = [
    { label: '前払い', value: 0 },
    { label: '3営業日以内', value: 3 },
    { label: '7営業日以内', value: 7 },
  ];

  function submit(e) {
    e.preventDefault();
    post(route('customers.store'), {
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
      <h1 className="content-title">取引先 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="customerCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <Link
          onBefore={handleBeforeLeave}
          href={route('customers.index')}
          className="btn btn-secondary"
        >
          キャンセル
        </Link>
        {processing && <span>Now Loading...</span>}
      </div>
      <form id="customerCreateForm" onSubmit={submit}>
        <div className="form-inner">

          <div className="input-group">
            <label htmlFor="name" className="form-label">
              取引先名
              <span className="required-mark">必須</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              className={`input-field ${errors.name ? 'is-invalid' : ''}`}
              onChange={e => setData('name', e.target.value)}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>

          <div className="input-group">
            <label htmlFor="name_kana" className="form-label">
              読み仮名
            </label>
            <input
              type="text"
              id="name_kana"
              name="name_kana"
              value={data.name_kana}
              className={`input-field ${errors.name_kana ? 'is-invalid' : ''}`}
              onChange={e => setData('name_kana', e.target.value)}
            />
            <div className="invalid-feedback">{errors.name_kana}</div>
          </div>

          <div className="input-group">
            <label htmlFor="shortcut" className="form-label">
              ショートカット名
            </label>
            <input
              type="text"
              id="shortcut"
              name="shortcut"
              value={data.shortcut}
              className={`input-field ${errors.shortcut ? 'is-invalid' : ''}`}
              onChange={e => setData('shortcut', e.target.value)}
            />
            <div className="invalid-feedback">{errors.shortcut}</div>
          </div>

          <div className="input-group">
            <label htmlFor="postal_code" className="form-label">
              〒
            </label>
            <input
              type="text"
              id="postal_code"
              name="postal_code"
              value={data.postal_code}
              className={`input-field ${errors.postal_code ? 'is-invalid' : ''}`}
              onChange={e => setData('postal_code', e.target.value)}
            />
            <div className="invalid-feedback">{errors.postal_code}</div>
          </div>

          <div className="input-group">
            <label htmlFor="address" className="form-label">
              住所
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={data.address}
              className={`input-field ${errors.address ? 'is-invalid' : ''}`}
              onChange={e => setData('address', e.target.value)}
            />
            <div className="invalid-feedback">{errors.address}</div>
          </div>

          <div className="input-group">
            <label htmlFor="tel" className="form-label">
              TEL
            </label>
            <input
              type="text"
              id="tel"
              name="tel"
              value={data.tel}
              className={`input-field ${errors.tel ? 'is-invalid' : ''}`}
              onChange={e => setData('tel', e.target.value)}
            />
            <div className="invalid-feedback">{errors.tel}</div>
          </div>

          <div className="input-group">
            <label htmlFor="fax" className="form-label">
              FAX
            </label>
            <input
              type="text"
              id="fax"
              name="fax"
              value={data.fax}
              className={`input-field ${errors.fax ? 'is-invalid' : ''}`}
              onChange={e => setData('fax', e.target.value)}
            />
            <div className="invalid-feedback">{errors.fax}</div>
          </div>

          <div className="input-group">
            <label htmlFor="note" className="form-label">
              備考
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={data.note}
              className={`input-field ${errors.note ? 'is-invalid' : ''}`}
              onChange={e => setData('note', e.target.value)}
            />
            <div className="invalid-feedback">{errors.note}</div>
          </div>

          <div className="input-group">
            <label htmlFor="in_charge_user_id" className="form-label">
              担当ユーザー
            </label>
            <select
              name="in_charge_user_id"
              id="in_charge_user_id"
              value={data.in_charge_user_id}
              onChange={e => setData('in_charge_user_id', e.target.value)}
              className={`input-field ${errors.in_charge_user_id ? 'is-invalid' : ''}`}
            >
              <option value="">-- 担当ユーザーを選択 --</option>
              {userSelectOptions.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.id}: {user.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.in_charge_user_id}</div>
          </div>


        </div>
        <div className="form-inner">
          <div className="input-group">
            <span className="form-label">
              取引条件（仕入）
            </span>
            <div className="u-flex">
              <select
                name="purchase_billing_type"
                id="purchase_billing_type"
                value={data.purchase_billing_type}
                onChange={e => setData('purchase_billing_type', e.target.value)}
                className={`input-field u-w-128 u-mr-3 ${errors.purchase_billing_type ? 'is-invalid' : ''}`}
              >
                <option value="">-- 請求方法 --</option>
                {billingTypeOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {data.purchase_billing_type == 1 && (
                <>
                  <select
                    name="purchase_cutoff_day"
                    id="purchase_cutoff_day"
                    value={data.purchase_cutoff_day}
                    onChange={e => setData('purchase_cutoff_day', e.target.value)}
                    className={`input-field u-w-128 ${errors.purchase_cutoff_day ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 締め日 --</option>
                    {cutoffDayOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    name="purchase_payment_month_offset"
                    id="purchase_payment_month_offset"
                    value={data.purchase_payment_month_offset}
                    onChange={e => setData('purchase_payment_month_offset', e.target.value)}
                    className={`input-field u-w-128 ${errors.purchase_payment_month_offset ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 支払月 --</option>
                    {paymentMonthOffsetOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    name="purchase_payment_day"
                    id="purchase_payment_day"
                    value={data.purchase_payment_day}
                    onChange={e => setData('purchase_payment_day', e.target.value)}
                    className={`input-field u-w-128 ${errors.purchase_payment_day ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 支払日 --</option>
                    {paymentDayOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {data.purchase_billing_type == 2 && (
                <>
                  <select
                    name="purchase_payment_day_offset"
                    id="purchase_payment_day_offset"
                    value={data.purchase_payment_day_offset}
                    onChange={e => setData('purchase_payment_day_offset', e.target.value)}
                    className={`input-field u-w-128 ${errors.purchase_payment_day_offset ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 期限 --</option>
                    {paymentDayOffsetOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>

          <div className="input-group">
            <span className="form-label">
              取引条件（販売）
            </span>
            <div className="u-flex">
              <select
                name="sales_billing_type"
                id="sales_billing_type"
                value={data.sales_billing_type}
                onChange={e => setData('sales_billing_type', e.target.value)}
                className={`input-field u-w-128 u-mr-3 ${errors.sales_billing_type ? 'is-invalid' : ''}`}
              >
                <option value="">-- 請求方法 --</option>
                {billingTypeOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {data.sales_billing_type == 1 && (
                <>
                  <select
                    name="sales_cutoff_day"
                    id="sales_cutoff_day"
                    value={data.sales_cutoff_day}
                    onChange={e => setData('sales_cutoff_day', e.target.value)}
                    className={`input-field u-w-128 ${errors.sales_cutoff_day ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 締め日 --</option>
                    {cutoffDayOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    name="sales_payment_month_offset"
                    id="sales_payment_month_offset"
                    value={data.sales_payment_month_offset}
                    onChange={e => setData('sales_payment_month_offset', e.target.value)}
                    className={`input-field u-w-128 ${errors.sales_payment_month_offset ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 支払月 --</option>
                    {paymentMonthOffsetOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    name="sales_payment_day"
                    id="sales_payment_day"
                    value={data.sales_payment_day}
                    onChange={e => setData('sales_payment_day', e.target.value)}
                    className={`input-field u-w-128 ${errors.sales_payment_day ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 支払日 --</option>
                    {paymentDayOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {data.sales_billing_type == 2 && (
                <>
                  <select
                    name="sales_payment_day_offset"
                    id="sales_payment_day_offset"
                    value={data.sales_payment_day_offset}
                    onChange={e => setData('sales_payment_day_offset', e.target.value)}
                    className={`input-field u-w-128 ${errors.sales_payment_day_offset ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 期限 --</option>
                    {paymentDayOffsetOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </AppLayout>
  );
}

