import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import CustomSelect from '@/Components/Form/CustomSelect';
import DateInput from '@/Components/Form/DateInput';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import OptionsList from '@/Components/OptionsList';
import Textarea from '@/Components/Form/Textarea';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import CustomerLookup from '@/Components/CustomerLookup';
import Modal from '@/Components/Modal';

const Create = ({ userOptions, productCategoryOptions, paymentTerms }) => {
  const { today } = usePage().props.date;
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerContacts, setCustomerContacts]   = useState([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    customer_id: '',
    customer_name: '',
    customer_contact_id: '',
    billing_address_id: '', // TODO: 仕様再検討（必須になるかも)
    delivery_address_id: '',
    product_category_id: '',
    billing_type: '',
    cutoff_day: '',
    payment_month_offset: '',
    payment_day: '',
    payment_day_offset: '',
    payment_date: '',
    payment_status: '',
    delivery_address: 'TEMP', // TODO: 後で修正
    order_date: today,
    shipping_date: '',
    shipping_status: '',
    delivery_date: '',
    delivery_status: '',
    delivery_memo: '',
    note: '',
    sales_in_charge_id: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('sales-orders.store'), {
      onSuccess: () => reset(),
    });
  };

  function selectCustomer(customer) {
    setData({
      ...data,
      'customer_id': customer.id,
      'customer_name': customer.name,
      'sales_in_charge_id': customer.in_charge_user_id || '',
    });
    setCustomerContacts(customer.contacts || []);
    setDeliveryAddresses(customer.delivery_addresses || [])
    setIsCustomerModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">受注 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="salesOrderCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('customers.index')} />
        {processing && <span>Now Loading...</span>}
      </div>

      <FormErrorAlert errors={errors} />

      {isCustomerModalOpen &&
        <Modal closeModal={() => setIsCustomerModalOpen(false)} title="販売先を選択">
          <CustomerLookup
            handleClickSelect={customer => selectCustomer(customer)}
          />
        </Modal>}

      <form id="salesOrderCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="所属取引先" isRequired={true} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
                    <Input
                      type="text"
                      value={data.customer_id}
                      className="u-max-w-64"
                      placeholder="ID"
                      readOnly={true}
                    />
                    <Input
                      type="text"
                      value={data.customer_name}
                      className="u-max-w-240"
                      placeholder="販売先"
                      readOnly={true}
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => setIsCustomerModalOpen(true)}>
                      <ManageSearchIcon />
                    </button>
                  </div>
                  {errors.customer_id && (<div className="invalid-feedback">{errors.customer_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="販売先担当者" isRequired={false} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('customer_contact_id', value)}
                    options={customerContacts}
                    value={data.customer_contact_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                  />
                  {errors.customer_contact_id && (<div className="invalid-feedback">{errors.customer_contact_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="納品先情報" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('delivery_address_id', value)}
                    options={deliveryAddresses}
                    value={data.delivery_address_id}
                    valueKey="id"
                    labelKey="address"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                  />
                  {errors.delivery_address_id && (<div className="invalid-feedback">{errors.delivery_address_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="order_date" label="受注日" isRequired={true} />
                </th>
                <td className="td-cell">
                  <DateInput
                    id="order_date"
                    value={data.order_date}
                    onChange={e => setData('order_date', e.target.value)}
                    error={errors.order_date}
                    max={today}
                  />
                  {errors.order_date && (<div className="invalid-feedback">{errors.order_date}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="shipping_date" label="出荷日" isRequired={false} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
                    <DateInput
                      id="shipping_date"
                      value={data.shipping_date}
                      onChange={e => setData('shipping_date', e.target.value)}
                      error={errors.shipping_date}
                      className="u-mr-2"
                    />
                    <select
                      name="shipping_status"
                      value={data.shipping_status}
                      onChange={e => setData('shipping_status', e.target.value)}
                      className={`form-select u-w-80 ${errors.shipping_status ? 'is-invalid' : ''}`}
                    >
                      <option></option>
                      <option>予定</option>
                      <option>確定</option>
                    </select>
                  </div>
                  {errors.shipping_date && (<div className="invalid-feedback">{errors.order_date}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="delivery_date" label="納品日" isRequired={false} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
                    <DateInput
                      id="delivery_date"
                      value={data.delivery_date}
                      onChange={e => setData('delivery_date', e.target.value)}
                      error={errors.delivery_date}
                      className="u-mr-2"
                    />
                    <select
                      name="delivery_status"
                      value={data.delivery_status}
                      onChange={e => setData('delivery_status', e.target.value)}
                      className={`form-select u-w-80 ${errors.delivery_status ? 'is-invalid' : ''}`}
                    >
                      <option></option>
                      <option>予定</option>
                      <option>確定</option>
                    </select>
                  </div>
                  {errors.delivery_date && (<div className="invalid-feedback">{errors.delivery_date}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="delivery_memo" label="配送メモ" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="delivery_memo"
                    type="text"
                    value={data.delivery_memo}
                    onChange={e => setData('delivery_memo', e.target.value)}
                  />
                  {errors.delivery_memo && (<div className="invalid-feedback">{errors.delivery_memo}</div>)}
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

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="商品カテゴリ" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('product_category_id', value)}
                    options={productCategoryOptions}
                    value={data.product_category_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                  />
                  {errors.product_category_id && (<div className="invalid-feedback">{errors.product_category_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="受注担当" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('sales_in_charge_id', value)}
                    options={userOptions}
                    value={data.sales_in_charge_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                  />
                  {errors.sales_in_charge_id && (<div className="invalid-feedback">{errors.sales_in_charge_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <label htmlFor="billing_type" className="form-label">
                    請求条件
                  </label>
                </th>
                <td className="td-cell">
                  <select
                    name="billing_type"
                    id="billing_type"
                    value={data.billing_type}
                    onChange={e => setData('billing_type', e.target.value)}
                    className={`form-select u-w-128 u-mr-3 ${errors.billing_type ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 請求方法 --</option>
                    <OptionsList options={paymentTerms.billingTypes} />
                  </select>
                  {data.billing_type == 1 && (
                    <>
                      <select
                        name="cutoff_day"
                        id="cutoff_day"
                        value={data.cutoff_day}
                        onChange={e => setData('cutoff_day', e.target.value)}
                        className={`form-select u-w-128 ${errors.cutoff_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 締め日 --</option>
                        <OptionsList options={paymentTerms.cutoffDays} />
                      </select>
                      <select
                        name="payment_month_offset"
                        id="payment_month_offset"
                        value={data.payment_month_offset}
                        onChange={e => setData('payment_month_offset', e.target.value)}
                        className={`form-select u-w-128 ${errors.payment_month_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払月 --</option>
                        <OptionsList options={paymentTerms.monthOffsets} />
                      </select>
                      <select
                        name="payment_day"
                        id="payment_day"
                        value={data.payment_day}
                        onChange={e => setData('payment_day', e.target.value)}
                        className={`form-select u-w-128 ${errors.payment_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払日 --</option>
                        <OptionsList options={paymentTerms.paymentDay} />
                      </select>
                    </>
                  )}
                  {data.billing_type == 2 && (
                    <>
                      <select
                        name="payment_day_offset"
                        id="payment_day_offset"
                        value={data.payment_day_offset}
                        onChange={e => setData('payment_day_offset', e.target.value)}
                        className={`form-select u-w-128 ${errors.payment_day_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 期限 --</option>
                        <OptionsList options={paymentTerms.dayOffsets} />
                      </select>
                    </>
                  )}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="payment_date" label="入金日" isRequired={false} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
                    <DateInput
                      id="payment_date"
                      value={data.payment_date}
                      onChange={e => setData('payment_date', e.target.value)}
                      error={errors.payment_date}
                      className="u-mr-2"
                    />
                    <select
                      name="payment_status"
                      value={data.payment_status}
                      onChange={e => setData('payment_status', e.target.value)}
                      className={`form-select u-w-80 ${errors.payment_status ? 'is-invalid' : ''}`}
                    >
                      <option></option>
                      <option>予定</option>
                      <option>確定</option>
                    </select>
                  </div>
                  {errors.payment_date && (<div className="invalid-feedback">{errors.order_date}</div>)}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </form >
    </>
  );
}

Create.layout = page => <AppLayout children={page} />

export default Create

