import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import CustomSelect from '../../Components/Form/CustomSelect';
import CancelButton from '../../Components/CancelButton';
import OptionsList from '../../Components/OptionsList';
import TableRow from '../../Components/Table/TableRow';
import TableHeaderCell from '../../Components/Table/TableHeaderCell';
import TableDataCell from '../../Components/Table/TableDataCell';
import FormLabel from '../../Components/Form/FormLabel';
import Input from '../../Components/Form/Input';
import Textarea from '../../Components/Form/Textarea';

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
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <TableRow className="is-flexible">
                <TableHeaderCell className="u-w-160">
                  <FormLabel htmlFor="name" label="取引先名" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="name_kana" label="読み仮名" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="name_kana"
                    type="text"
                    value={data.name_kana}
                    onChange={e => setData('name_kana', e.target.value)}
                  />
                  {errors.name_kana && (<div className="invalid-feedback">{errors.name_kana}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="shortcut" label="ショートカット名" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="shortcut"
                    type="text"
                    value={data.shortcut}
                    onChange={e => setData('shortcut', e.target.value)}
                  />
                  {errors.shortcut && (<div className="invalid-feedback">{errors.shortcut}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="postal_code" label="〒" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="postal_code"
                    type="text"
                    value={data.postal_code}
                    onChange={e => setData('postal_code', e.target.value)}
                  />
                  {errors.postal_code && (<div className="invalid-feedback">{errors.postal_code}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="address" label="住所" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="address"
                    type="text"
                    value={data.address}
                    onChange={e => setData('address', e.target.value)}
                  />
                  {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="tel" label="TEL" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="tel"
                    type="text"
                    value={data.tel}
                    onChange={e => setData('tel', e.target.value)}
                  />
                  {errors.tel && (<div className="invalid-feedback">{errors.tel}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="fax" label="FAX" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="fax"
                    type="text"
                    value={data.fax}
                    onChange={e => setData('fax', e.target.value)}
                  />
                  {errors.fax && (<div className="invalid-feedback">{errors.fax}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="note" label="備考" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Textarea
                    id="note"
                    value={data.note}
                    onChange={e => setData('note', e.target.value)}
                  />
                  {errors.note && (<div className="invalid-feedback">{errors.note}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="担当ユーザー" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('in_charge_user_id', value)}
                    options={userSelectOptions}
                    value={data.in_charge_user_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="担当ユーザーを選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </TableDataCell>
              </TableRow>

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

