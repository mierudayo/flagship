import { Fragment } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import SyncIcon from '@mui/icons-material/Sync';
import IconButton from '@mui/material/IconButton';

import CustomSelect from '@/Components/Form/CustomSelect';
import DateInput from '@/Components/Form/DateInput';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import Textarea from '@/Components/Form/Textarea';
import LookupButton from '@/Components/LookupButton';
import OptionsList from '@/Components/OptionsList';
import DropdownMenuInRow from '@/Pages/SalesOrder/Partials/DropdownMenuInRow';
import PaymentSelectGroup from '@/Pages/SalesOrder/Partials/PaymentSelectGroup';
import { calculatePriceWithTax, formatCurrency } from '@/Utils/priceCalculator';

export default function SalesOrderForm({
  submit, data, setData, errors,
  setIsCustomerModalOpen, setIsSupplierModalOpen, setClickedRowIndex,
  addDetailRow, removeDetailRow, copyDetailRowToLast,
  updateDetailRow,
  fetchCustomer,
  date,
  totals,
  customerContacts, billingAddresses, deliveryAddresses,
  userOptions, productOptions, productCategoryOptions, paymentTermOptions,
  supplierOptions,
}) {
  return (
    <form id="salesOrderForm" onSubmit={submit}>
      <div className="content-section">
        <div className="content-section-header">
          <div className="content-section-title">受注内容</div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-144">
                  <FormLabel htmlFor="order_date" label="受注日" isRequired={true} />
                </th>
                <td className="td-cell">
                  <DateInput
                    id="order_date"
                    value={data.order_date}
                    onChange={e => setData('order_date', e.target.value)}
                    error={errors.order_date}
                    max={date.today}
                  />
                  <InvalidFeedback errors={errors} name="order_date" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="販売先" isRequired={true} />
                </th>
                <td className="td-cell">
                  <div className="u-flex u-items-center">
                    <Input
                      type="text"
                      value={data.customer_id}
                      className="u-max-w-64 u-mr-1"
                      placeholder="No"
                      readOnly={true}
                      error={errors.customer_id}
                    />
                    <Input
                      type="text"
                      value={data.customer_name}
                      className="u-max-w-240 u-mr-1"
                      placeholder="販売先"
                      readOnly={true}
                      error={errors.customer_id}
                    />
                    <LookupButton onClick={() => setIsCustomerModalOpen(true)} />

                    {data.customer_id && (
                      <Fragment>
                        <a
                          href={route('customers.edit', data.customer_id)}
                          target="_blank" rel="noopener noreferrer"
                          className="u-ml-1"
                        >
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                        </a>

                        <IconButton onClick={() => fetchCustomer()}>
                          <SyncIcon />
                        </IconButton>
                      </Fragment>
                    )}
                  </div>
                  <InvalidFeedback errors={errors} name="customer_id" />
                  <div className="u-max-w-360 u-mt-2">
                    <CustomSelect
                      onChange={value => setData('customer_contact_id', value)}
                      options={customerContacts}
                      value={data.customer_contact_id}
                      valueKey="id"
                      labelKey="name"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="..."
                      error={errors.customer_contact_id}
                    />
                    <InvalidFeedback errors={errors} name="customer_contact_id" />
                  </div>
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="billing_type" label="請求条件" isRequired={true} />
                </th>
                <td className="td-cell">
                  <PaymentSelectGroup
                    data={data}
                    setData={setData}
                    errors={errors}
                    paymentTermOptions={paymentTermOptions}
                  />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="請求先" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('billing_address_id', value)}
                    options={billingAddresses}
                    value={data.billing_address_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                    error={errors.billing_address_id}
                  />
                  <InvalidFeedback errors={errors} name="billing_address_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="納品先" isRequired={false} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('delivery_address_id', value)}
                    options={deliveryAddresses}
                    value={data.delivery_address_id}
                    valueKey="id"
                    labelKey="address"
                    subTextKey="company_name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                    error={errors.delivery_address_id}
                  />
                  <InvalidFeedback errors={errors} name="delivery_address_id" />
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
                  <InvalidFeedback errors={errors} name="shipping_date" />
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
                  <InvalidFeedback errors={errors} name="delivery_date" />
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
                  <InvalidFeedback errors={errors} name="delivery_memo" />
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
                    error={errors.product_category_id}
                  />
                  <InvalidFeedback errors={errors} name="product_category_id" />
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
                    searchKey="name_kana"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="..."
                    error={errors.sales_in_charge_id}
                  />
                  <InvalidFeedback errors={errors} name="sales_in_charge_id" />
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
      </div>

      <div className="content-section">
        <div className="content-section-header">
          <div className="content-section-title">受注明細</div>
          <div className="u-mr-4 u-min-w-96">※同時受発注</div>
          <button type="button" className="btn btn-secondary u-mr-3" onClick={addDetailRow}>+ 行を追加</button>
          <div className="u-flex u-ml-auto">
            <div className="u-flex u-mr-4 u-items-center">
              <span className="u-min-w-64">
                <span className="indicator-dot dot-pink"></span>
                発注額
              </span>
              <span>
                {formatCurrency(totals.purchase)}
              </span>
              <span className="u-text-sm">
                ({formatCurrency(totals.purchase_with_tax)})
              </span>
            </div>
            <div className="u-flex u-mr-4 u-items-center">
              <span className="u-min-w-64">
                <span className="indicator-dot dot-blue"></span>
                受注額
              </span>
              <span>
                {formatCurrency(totals.sales)}
              </span>
              <span className="u-text-sm">
                ({formatCurrency(totals.sales_with_tax)})
              </span>
            </div>
            <div className="u-flex u-items-center">
              <span className="u-min-w-48">
                <span className="indicator-dot dot-green"></span>
                利益
              </span>
              <span>
                {formatCurrency(totals.profit)}
              </span>
            </div>
          </div>
        </div>
        <InvalidFeedback errors={errors} name="detail_rows" />
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <thead className="table-header is-sticky">
              <tr className="table-row">
                <th className="th-cell col-fixed">

                </th>
                <th className="th-cell u-w-64">
                  <FormLabel label="No." isRequired={false} />
                </th>
                <th className="th-cell u-min-w-320">
                  <FormLabel label="商品名" isRequired={true} />
                </th>
                <th className="th-cell u-min-w-320">
                  <FormLabel label="発注先" isRequired={true} />
                </th>
                <th className="th-cell u-min-w-200">
                  <FormLabel label="発注担当" isRequired={true} />
                </th>
                <th className="th-cell u-min-w-160">
                  <FormLabel label="発注数量" isRequired={true} />
                </th>
                <th className="th-cell u-min-w-160">
                  <FormLabel label="販売数量" isRequired={true} />
                </th>
                <th className="th-cell u-min-w-160">
                  <FormLabel label="発注単価" isRequired={true} />
                </th>
                <th className="th-cell u-min-w-160">
                  <FormLabel label="販売単価" isRequired={true} />
                </th>
                <th className="th-cell u-text-right u-min-w-104">
                  <FormLabel label="発注額" isRequired={false} justifyContent="flex-end" />
                </th>
                <th className="th-cell u-text-right u-min-w-104">
                  <FormLabel label="受注額" isRequired={false} justifyContent="flex-end" />
                </th>
                <th className="th-cell u-text-right u-min-w-120">
                  <FormLabel label="利益" isRequired={false} justifyContent="flex-end" />
                </th>
                <th className="th-cell u-min-w-400">
                  <FormLabel label="備考" isRequired={false} />
                </th>
              </tr>
            </thead>
            <tbody className="tbody">
              {data.detail_rows.map((detail, index) => (
                <tr key={index} className="table-row">
                  <td className="td-cell col-fixed u-w-80">
                    <DropdownMenuInRow
                      handleClickCopy={() => copyDetailRowToLast(index)}
                      handleClickRemove={() => removeDetailRow(index)}
                    />
                  </td>

                  <td className="td-cell">{index + 1}</td>

                  <td className="td-cell">
                    <CustomSelect
                      onChange={value => updateDetailRow(index, 'sales_order_detail', 'product_id', value)}
                      options={productOptions}
                      value={detail.sales_order_detail.product_id}
                      valueKey="id"
                      labelKey="name"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="商品..."
                      error={errors[`detail_rows.${index}.sales_order_detail.product_id`]}
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.product_id`} />
                    <Input
                      type="text"
                      value={detail.sales_order_detail.product_name}
                      onChange={e => updateDetailRow(index, 'sales_order_detail', 'product_name', e.target.value)}
                      error={errors[`detail_rows.${index}.sales_order_detail.product_name`]}
                      placeholder="商品名"
                      className="u-my-1"
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.product_name`} />
                    <Input
                      type="text"
                      value={detail.sales_order_detail.product_detail}
                      onChange={e => updateDetailRow(index, 'sales_order_detail', 'product_detail', e.target.value)}
                      error={errors[`detail_rows.${index}.sales_order_detail.product_detail`]}
                      placeholder="仕様"
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.product_detail`} />
                  </td>

                  <td className="td-cell">
                    <div className="u-flex u-mb-1">
                      <Input
                        type="text"
                        value={detail.purchase_order.customer_id}
                        className="u-max-w-64 u-mr-1"
                        placeholder="No"
                        readOnly={true}
                        error={errors[`detail_rows.${index}.purchase_order.customer_id`]}
                      />
                      <Input
                        type="text"
                        value={detail.purchase_order.customer_name}
                        className="u-max-w-240 u-mr-1"
                        placeholder="発注先"
                        readOnly={true}
                        error={errors[`detail_rows.${index}.purchase_order.customer_id`]}
                      />
                      <LookupButton
                        onClick={() => {
                          setIsSupplierModalOpen(true);
                          setClickedRowIndex(index);
                        }}
                      />
                    </div>
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order.customer_id`} />
                    <CustomSelect
                      onChange={value => updateDetailRow(index, 'purchase_order', 'customer_contact_id', value)}
                      options={supplierOptions[index]?.supplierContacts}
                      value={detail.purchase_order.customer_contact_id}
                      valueKey="id"
                      labelKey="name"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="発注先顧客..."
                      error={errors[`detail_rows.${index}.purchase_order.customer_contact_id`]}
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order.customer_contact_id`} />
                    <CustomSelect
                      onChange={value => updateDetailRow(index, 'purchase_order', 'delivery_address_id', value)}
                      options={supplierOptions[index]?.supplierAddresses}
                      value={detail.purchase_order.delivery_address_id}
                      valueKey="id"
                      labelKey="address"
                      subTextKey="company_name"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="出荷元..."
                      error={errors[`detail_rows.${index}.purchase_order.delivery_address_id`]}
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order.delivery_address_id`} />
                  </td>

                  <td className="td-cell">
                    <CustomSelect
                      onChange={value => updateDetailRow(index, 'purchase_order', 'purchase_in_charge_id', value)}
                      options={userOptions}
                      value={detail.purchase_order.purchase_in_charge_id}
                      valueKey="id"
                      labelKey="name"
                      searchKey="name_kana"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="発注担当..."
                      error={errors[`detail_rows.${index}.purchase_order.purchase_in_charge_id`]}
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order.purchase_in_charge_id`} />
                  </td>

                  <td className="td-cell">
                    <Input
                      type="number"
                      value={detail.purchase_order_detail.quantity}
                      onChange={e => updateDetailRow(index, 'purchase_order_detail', 'quantity', e.target.value)}
                      error={errors[`detail_rows.${index}.purchase_order_detail.quantity`]}
                      placeholder=""
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.quantity`} />
                  </td>

                  <td className="td-cell">
                    <Input
                      type="number"
                      value={detail.sales_order_detail.quantity}
                      onChange={e => updateDetailRow(index, 'sales_order_detail', 'quantity', e.target.value)}
                      error={errors[`detail_rows.${index}.sales_order_detail.quantity`]}
                      placeholder=""
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.quantity`} />
                  </td>

                  <td className="td-cell">
                    <div className="u-flex">
                      <Input
                        type="number"
                        value={detail.purchase_order_detail.unit_price}
                        onChange={e => updateDetailRow(index, 'purchase_order_detail', 'unit_price', e.target.value)}
                        error={errors[`detail_rows.${index}.purchase_order_detail.unit_price`]}
                        placeholder="¥"
                        className="u-w-120 u-mr-1"
                      />
                      <select
                        value={detail.purchase_order_detail.is_tax_inclusive}
                        onChange={e => updateDetailRow(index, 'purchase_order_detail', 'is_tax_inclusive', e.target.value === 'true')}
                        className={`form-select u-w-72 ${errors[`detail_rows.${index}.purchase_order_detail.is_tax_inclusive`] ? 'is-invalid' : ''}`}
                      >
                        <OptionsList
                          options={[
                            { value: false, label: '外税' },
                            { value: true, label: '内税' },
                          ]}
                        />
                      </select>
                    </div>
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.is_tax_inclusive`} />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.unit_price`} />
                  </td>

                  <td className="td-cell">
                    <div className="u-flex">
                      <Input
                        type="number"
                        value={detail.sales_order_detail.unit_price}
                        onChange={e => updateDetailRow(index, 'sales_order_detail', 'unit_price', e.target.value)}
                        error={errors[`detail_rows.${index}.sales_order_detail.unit_price`]}
                        placeholder="¥"
                        className="u-w-120 u-mr-1"
                      />
                      <select
                        value={detail.sales_order_detail.is_tax_inclusive}
                        onChange={e => updateDetailRow(index, 'sales_order_detail', 'is_tax_inclusive', e.target.value === 'true')}
                        className={`form-select u-w-72 ${errors[`detail_rows.${index}.sales_order_detail.is_tax_inclusive`] ? 'is-invalid' : ''}`}
                      >
                        <OptionsList
                          options={[
                            { value: false, label: '外税' },
                            { value: true, label: '内税' },
                          ]}
                        />
                      </select>
                    </div>
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.unit_price`} />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.is_tax_inclusive`} />
                  </td>

                  <td className="td-cell u-text-right u-bg-lightgray">
                    {formatCurrency(detail.purchase_order_detail.price)}
                    <br />
                    <span className="u-text-sm">
                      ({formatCurrency(calculatePriceWithTax(detail.purchase_order_detail.price, detail.purchase_order_detail.tax_rate))})
                    </span>
                  </td>

                  <td className="td-cell u-text-right u-bg-lightgray">
                    {formatCurrency(detail.sales_order_detail.price)}
                    <br />
                    <span className="u-text-sm">
                      ({formatCurrency(calculatePriceWithTax(detail.sales_order_detail.price, detail.sales_order_detail.tax_rate))})
                    </span>
                  </td>

                  <td className="td-cell u-text-right u-bg-lightgray">
                    {formatCurrency((detail.sales_order_detail.price - detail.purchase_order_detail.price))}
                  </td>

                  <td className="td-cell">
                    <Input
                      type="text"
                      value={detail.sales_order_detail.note}
                      onChange={e => updateDetailRow(index, 'sales_order_detail', 'note', e.target.value)}
                      error={errors[`detail_rows.${index}.sales_order_detail.note`]}
                      placeholder="受注メモ"
                      className="u-mb-2"
                    />
                    <Input
                      type="text"
                      value={detail.purchase_order_detail.note}
                      onChange={e => updateDetailRow(index, 'purchase_order_detail', 'note', e.target.value)}
                      error={errors[`detail_rows.${index}.purchase_order_detail.note`]}
                      placeholder="発注メモ"
                    />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.note`} />
                    <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.note`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </form >
  );
}
