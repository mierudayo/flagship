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
import InvalidFeedback from '@/Components/Form/InvalidFeedback'

const Create = ({ userOptions, productOptions, productCategoryOptions, paymentTermOptions }) => {
  const { today } = usePage().props.date;
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerContacts, setCustomerContacts] = useState([]);
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
    ship_from_address: 'TEMP', // TODO: 後で修正
    purchase_date: today,
    note: '',
    purchase_in_charge_id: '',
    purchase_order_details: [],
  });

  function submit(e) {
    e.preventDefault();
    post(route('purchase-orders.store'), {
      onSuccess: () => reset(),
    });
  };

  function selectCustomer(customer) {
    setData({
      ...data,
      'customer_id': customer.id,
      'customer_name': customer.name,
      'purchase_in_charge_id': customer.in_charge_user_id || '',
    });
    setCustomerContacts(customer.contacts || []);
    setDeliveryAddresses(customer.delivery_addresses || [])
    setIsCustomerModalOpen(false);
  }

  function addDetail() {
    setData('purchase_order_details', [
      ...data.purchase_order_details,
      {
        product_id: '',
        product_name: '',
        product_detail: '',
        quantity: '',
        unit_price: '',
        tax_rate: 0.10,
        is_tax_inclusive: false,
        subtotal: '',
        total: '',
        note: '',
      }
    ])
  }

  function removeSalesOrderDetail(indexToRemove) {
    setData('purchase_order_details', data.purchase_order_details.filter((_, index) => index !== indexToRemove));
  }

  function updateDetail(index, key, value) {
    const updatedDetails = [...data.purchase_order_details];
    updatedDetails[index] = {
      ...updatedDetails[index],
      [key]: value
    }
    setData('purchase_order_details', updatedDetails);
  }

  return (
    <>
      <h1 className="content-title">発注 登録</h1>
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
                  <FormLabel label="発注先" isRequired={true} />
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
                      placeholder="発注先"
                      readOnly={true}
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => setIsCustomerModalOpen(true)}>
                      <ManageSearchIcon />
                    </button>
                  </div>
                  <InvalidFeedback errors={errors} name="customer_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="発注先担当者" isRequired={false} />
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
                  <InvalidFeedback errors={errors} name="customer_contact_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="出荷元情報" isRequired={true} />
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
                  <InvalidFeedback errors={errors} name="delivery_address_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="purchase_date" label="発注日" isRequired={true} />
                </th>
                <td className="td-cell">
                  <DateInput
                    id="purchase_date"
                    value={data.purchase_date}
                    onChange={e => setData('purchase_date', e.target.value)}
                    error={errors.purchase_date}
                    max={today}
                  />
                  <InvalidFeedback errors={errors} name="purchase_date" />
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
                  <InvalidFeedback errors={errors} name="product_category_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="発注担当" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('purchase_in_charge_id', value)}
                    options={userOptions}
                    value={data.purchase_in_charge_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                  />
                  <InvalidFeedback errors={errors} name="purchase_in_charge_id" />
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
                    <OptionsList options={paymentTermOptions.billingTypes} />
                  </select>
                  <InvalidFeedback errors={errors} name="billing_type" />
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
                        <OptionsList options={paymentTermOptions.cutoffDays} />
                      </select>
                      <InvalidFeedback errors={errors} name="cutoffDays" />
                      <select
                        name="payment_month_offset"
                        id="payment_month_offset"
                        value={data.payment_month_offset}
                        onChange={e => setData('payment_month_offset', e.target.value)}
                        className={`form-select u-w-128 ${errors.payment_month_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払月 --</option>
                        <OptionsList options={paymentTermOptions.monthOffsets} />
                      </select>
                      <InvalidFeedback errors={errors} name="payment_month_offset" />
                      <select
                        name="payment_day"
                        id="payment_day"
                        value={data.payment_day}
                        onChange={e => setData('payment_day', e.target.value)}
                        className={`form-select u-w-128 ${errors.payment_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払日 --</option>
                        <OptionsList options={paymentTermOptions.paymentDay} />
                      </select>
                      <InvalidFeedback errors={errors} name="payment_day" />
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
                        <OptionsList options={paymentTermOptions} />
                      </select>
                      <InvalidFeedback errors={errors} name="payment_day_offset" />
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
                  <InvalidFeedback errors={errors} name="payment_date" />
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="content-section u-mt-4">
          <div>受注明細 登録</div>
          <div className="table-wrapper is-scrollable">
            <table className="table">
              <thead className="table-header is-sticky">
                <tr className="table-row">
                  <th className="th-cell col-fixed">

                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="商品" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="商品名" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="商品詳細" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-160">
                    <FormLabel label="数量" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-160">
                    <FormLabel label="単価" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-112">
                    <FormLabel label="税率" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-104">
                    <FormLabel label="税種別" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-400">
                    <FormLabel label="備考" isRequired={false} />
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {data.purchase_order_details.map((detail, index) => (
                  <tr key={index} className="table-row">
                    <td className="td-cell col-fixed u-w-80">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => removeSalesOrderDetail(index)}
                      >
                        削除
                      </button>
                    </td>

                    <td className="td-cell">
                      <select
                        value={detail.product_id}
                        onChange={e => updateDetail(index, 'product_id', e.target.value)}
                        className={`form-select ${errors[`purchase_order_details.${index}.product_id`] ? 'is-invalid' : ''}`}
                      >
                        <option value=""></option>
                        <OptionsList
                          options={productOptions.map(obj => ({ value: obj.id, label: obj.name }))}
                        />
                      </select>
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.product_id`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={detail.product_name}
                        onChange={e => updateDetail(index, 'product_name', e.target.value)}
                        error={errors[`purchase_order_details.${index}.product_name`]}
                      />
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.product_name`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={detail.product_detail}
                        onChange={e => updateDetail(index, 'product_detail', e.target.value)}
                        error={errors[`purchase_order_details.${index}.product_detail`]}
                      />
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.product_detail`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="number"
                        value={detail.quantity}
                        onChange={e => updateDetail(index, 'quantity', e.target.value)}
                        error={errors[`purchase_order_details.${index}.quantity`]}
                      />
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.quantity`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="number"
                        value={detail.unit_price}
                        onChange={e => updateDetail(index, 'unit_price', e.target.value)}
                        error={errors[`purchase_order_details.${index}.unit_price`]}
                      />
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.unit_price`} />
                    </td>

                    <td className="td-cell">
                      <select
                        value={detail.tax_rate}
                        onChange={e => updateDetail(index, 'tax_rate', e.target.value)}
                        className={`form-select ${errors[`purchase_order_details.${index}.tax_rate`] ? 'is-invalid' : ''}`}
                      >
                        <OptionsList
                          options={[
                            { value: 0.1, label: '10%' },
                            { value: 0.8, label: '8%' },
                          ]}
                        />
                      </select>
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.tax_rate`} />
                    </td>

                    <td className="td-cell">
                      <select
                        value={detail.is_tax_inclusive}
                        onChange={e => updateDetail(index, 'is_tax_inclusive', e.target.value === 'true')}
                        className={`form-select ${errors[`purchase_order_details.${index}.is_tax_inclusive`] ? 'is-invalid' : ''}`}
                      >
                        <OptionsList
                          options={[
                            { value: false, label: '外税' },
                            { value: true, label: '内税' },
                          ]}
                        />
                      </select>
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.is_tax_inclusive`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={detail.note}
                        onChange={e => updateDetail(index, 'note', e.target.value)}
                        error={errors[`purchase_order_details.${index}.note`]}
                      />
                      <InvalidFeedback errors={errors} name={`purchase_order_details.${index}.note`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="btn btn-secondary u-mt-3" onClick={addDetail}>+ 行を追加</button>
        </div>
      </form >
    </>
  );
}

Create.layout = page => <AppLayout children={page} />

export default Create

