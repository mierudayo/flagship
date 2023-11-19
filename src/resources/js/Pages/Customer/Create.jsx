import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import CancelButton from '../../Components/CancelButton';
import OptionsList from '../../Components/OptionsList';
import TableInputRow from '../../Components/TableInputRow';
import TableGenericSelectRow from '../../Components/TableGenericSelectRow';
import TableTextAreaRow from '../../Components/TableTextAreaRow';

const Create = ({ userSelectOptions, paymentTerms }) => {
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

  function submit(e) {
    e.preventDefault();
    post(route('customers.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
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
        <CancelButton isDirty={isDirty} route={route('customers.index')} />
        {processing && <span>Now Loading...</span>}
      </div>
      <form id="customerCreateForm" onSubmit={submit}>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <tbody className="tbody">
              <TableInputRow type="text" labelName="取引先名" inputName="name" data={data} errors={errors} setData={setData} isRequired={true} widthClass="u-w-200" />
              <TableInputRow type="text" labelName="読み仮名" inputName="name_kana" data={data} errors={errors} setData={setData} />
              <TableInputRow type="text" labelName="ショートカット名" inputName="shortcut" data={data} errors={errors} setData={setData} />
              <TableInputRow type="text" labelName="〒" inputName="postal_code" data={data} errors={errors} setData={setData} />
              <TableInputRow type="text" labelName="住所" inputName="address" data={data} errors={errors} setData={setData} />
              <TableInputRow type="text" labelName="TEL" inputName="tel" data={data} errors={errors} setData={setData} />
              <TableInputRow type="text" labelName="FAX" inputName="fax" data={data} errors={errors} setData={setData} />
              <TableTextAreaRow
                labelName="備考"
                inputName="note"
                data={data}
                errors={errors}
                setData={setData}
                isRequired={false}
              />

              <TableGenericSelectRow
                label="担当ユーザー"
                name="in_charge_user_id"
                data={data}
                setData={setData}
                errors={errors}
                options={userSelectOptions}
                isRequired={false}
              />

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <label htmlFor="purchase_billing_type" className="form-label">
                    支払条件
                  </label>
                </th>
                <td className="td-cell">
                  <select
                    name="purchase_billing_type"
                    id="purchase_billing_type"
                    value={data.purchase_billing_type}
                    onChange={e => setData('purchase_billing_type', e.target.value)}
                    className={`input-field u-w-128 u-mr-3 ${errors.purchase_billing_type ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 請求方法 --</option>
                    <OptionsList options={paymentTerms.billingTypes} />
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
                        <OptionsList options={paymentTerms.cutoffDays} />
                      </select>
                      <select
                        name="purchase_payment_month_offset"
                        id="purchase_payment_month_offset"
                        value={data.purchase_payment_month_offset}
                        onChange={e => setData('purchase_payment_month_offset', e.target.value)}
                        className={`input-field u-w-128 ${errors.purchase_payment_month_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払月 --</option>
                        <OptionsList options={paymentTerms.monthOffsets} />
                      </select>
                      <select
                        name="purchase_payment_day"
                        id="purchase_payment_day"
                        value={data.purchase_payment_day}
                        onChange={e => setData('purchase_payment_day', e.target.value)}
                        className={`input-field u-w-128 ${errors.purchase_payment_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払日 --</option>
                        <OptionsList options={paymentTerms.paymentDay} />
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
                        <OptionsList options={paymentTerms.dayOffsets} />
                      </select>
                    </>
                  )}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <label htmlFor="sales_billing_type" className="form-label">
                    請求条件
                  </label>
                </th>
                <td className="td-cell">
                  <select
                    name="sales_billing_type"
                    id="sales_billing_type"
                    value={data.sales_billing_type}
                    onChange={e => setData('sales_billing_type', e.target.value)}
                    className={`input-field u-w-128 u-mr-3 ${errors.sales_billing_type ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 請求方法 --</option>
                    <OptionsList options={paymentTerms.billingTypes} />
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
                        <OptionsList options={paymentTerms.cutoffDays} />
                      </select>
                      <select
                        name="sales_payment_month_offset"
                        id="sales_payment_month_offset"
                        value={data.sales_payment_month_offset}
                        onChange={e => setData('sales_payment_month_offset', e.target.value)}
                        className={`input-field u-w-128 ${errors.sales_payment_month_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払月 --</option>
                        <OptionsList options={paymentTerms.monthOffsets} />
                      </select>
                      <select
                        name="sales_payment_day"
                        id="sales_payment_day"
                        value={data.sales_payment_day}
                        onChange={e => setData('sales_payment_day', e.target.value)}
                        className={`input-field u-w-128 ${errors.sales_payment_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払日 --</option>
                        <OptionsList options={paymentTerms.paymentDay} />
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
                        <OptionsList options={paymentTerms.dayOffsets} />
                      </select>
                    </>
                  )}
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

