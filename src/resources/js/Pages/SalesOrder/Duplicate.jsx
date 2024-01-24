import { Fragment, useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppLayout from '@/Layouts/AppLayout';
import IconButton from '@mui/material/IconButton';
import SyncIcon from '@mui/icons-material/Sync';
import EditIcon from '@mui/icons-material/Edit';

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
import PaymentSelectGroup from './Partials/PaymentSelectGroup';
import { parseNumber, calculatePrice, calculatePriceWithTax, formatCurrency } from '@/Utils/priceCalculator';
import DropdownMenuInRow from './Partials/DropdownMenuInRow';

const Duplicate = ({ salesOrder, userOptions, productOptions, productCategoryOptions, paymentTermOptions, date, taxRate }) => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState(salesOrder.customer.billing_addresses || []);
  const [customerContacts, setCustomerContacts] = useState(salesOrder.customer.contacts || []);
  const [deliveryAddresses, setDeliveryAddresses] = useState(salesOrder.customer.delivery_addresses || []);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState(salesOrder.sales_order_details.map(soDetail => {
    return {
      supplierContacts: soDetail.purchase_order_details[0]?.purchase_order.customer.contacts || [],
      supplierAddresses: soDetail.purchase_order_details[0]?.purchase_order.customer.delivery_addresses || [],
    }
  }));

  const defaultRows = salesOrder.sales_order_details.map(soDetail => {
    const purchaseOrder = soDetail.purchase_order_details[0]?.purchase_order;
    const poDetail = soDetail.purchase_order_details[0];

    return {
      sales_order_detail: {
        product_id: soDetail.product_id || '',
        product_name: soDetail.product_name || '',
        product_detail: soDetail.product_detail || '',
        quantity: parseNumber(soDetail.quantity),
        unit_price: parseNumber(soDetail.unit_price),
        tax_rate: parseFloat(taxRate.rate),
        is_tax_inclusive: soDetail.is_tax_inclusive === 1,
        price: parseNumber(soDetail.price),
        note: soDetail.note || '',
      },
      purchase_order: {
        customer_id: purchaseOrder?.customer_id ?? '',
        customer_name: purchaseOrder?.customer.name ?? '',
        customer_contact_id: purchaseOrder?.customer_contact_id ?? '',
        billing_address_id: purchaseOrder?.billing_address_id ?? '',
        delivery_address_id: purchaseOrder?.delivery_address_id ?? '',
        purchase_in_charge_id: purchaseOrder?.purchase_in_charge_id ?? '',
      },
      purchase_order_detail: {
        quantity: parseNumber(poDetail?.quantity),
        unit_price: parseNumber(poDetail?.unit_price),
        tax_rate: parseFloat(taxRate.rate),
        is_tax_inclusive: poDetail?.is_tax_inclusive === 1,
        price: parseNumber(poDetail?.price),
        note: poDetail?.note ?? '',
      }
    };
  });

  const defaultRowValues = {
    sales_order_detail: {
      product_id: '',
      product_name: '',
      product_detail: '',
      quantity: '',
      unit_price: '',
      tax_rate: parseFloat(taxRate.rate),
      is_tax_inclusive: false,
      price: 0,
      note: '',
    },
    purchase_order: {
      customer_id: '',
      customer_name: '',
      customer_contact_id: '',
      billing_address_id: '',
      delivery_address_id: '',
      purchase_in_charge_id: '',
    },
    purchase_order_detail: {
      quantity: '',
      unit_price: '',
      tax_rate: parseFloat(taxRate.rate),
      is_tax_inclusive: false,
      price: 0,
      note: '',
    }
  }

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    customer_id: salesOrder.customer_id,
    customer_name: salesOrder.customer.name,
    customer_contact_id: salesOrder.customer_contact_id || '',
    billing_address_id: salesOrder.billing_address_id || '',
    delivery_address_id: salesOrder.delivery_address_id || '',
    product_category_id: salesOrder.product_category_id || '',
    billing_type: salesOrder.billing_type || '',
    cutoff_day: salesOrder.cutoff_day || '',
    payment_month_offset: salesOrder.payment_month_offset ?? '',
    payment_day: salesOrder.payment_day || '',
    payment_day_offset: salesOrder.payment_day_offset ?? '',
    payment_date: '',
    payment_status: salesOrder.payment_status || '',
    order_date: date.today,
    shipping_date: '',
    shipping_status: '',
    delivery_date: '',
    delivery_status: '',
    delivery_memo: salesOrder.delivery_memo || '',
    note: salesOrder.note || '',
    sales_in_charge_id: salesOrder.sales_in_charge_id || '',
    detail_rows: defaultRows,
  });

  const [totals, setTotals] = useState({
    sales: 0,
    sales_with_tax: 0,
    purchase: 0,
    purchase_with_tax: 0,
    profit: 0,
  });

  useEffect(() => {
    const salesTotal = data.detail_rows.map(row => {
      return row.sales_order_detail.price;
    }).reduce((acc, crr) => acc + crr, 0);

    const salesTotalWithTax = data.detail_rows.map(row => {
      return calculatePriceWithTax(row.sales_order_detail.price, row.sales_order_detail.tax_rate);
    }).reduce((acc, crr) => acc + crr, 0);

    const purchaseTotal = data.detail_rows.map(row => {
      return row.purchase_order_detail.price;
    }).reduce((acc, crr) => acc + crr, 0);

    const purchaseTotalWithTax = data.detail_rows.map(row => {
      return calculatePriceWithTax(row.purchase_order_detail.price, row.purchase_order_detail.tax_rate);
    }).reduce((acc, crr) => acc + crr, 0);

    setTotals({
      ...totals,
      sales: salesTotal,
      sales_with_tax: salesTotalWithTax,
      purchase: purchaseTotal,
      purchase_with_tax: purchaseTotalWithTax,
      profit: (salesTotal - purchaseTotal),
    })

  }, [data.detail_rows]);

  function submit(e) {
    e.preventDefault();
    post(route('sales-orders.store'), {
      onSuccess: () => reset(),
    });
  };

  async function fetchCustomer() {
    const response = await fetch(`/api/customers/${data.customer_id}`);
    const customerJson = await response.json();
    selectCustomer(customerJson);
  }

  function selectCustomer(customer) {
    setData({
      ...data,
      'customer_id': customer.id,
      'customer_name': customer.name,
      'billing_address_id': customer.billing_addresses[0]?.id || '',
      'sales_in_charge_id': customer.in_charge_user_id || '',
      'billing_type': customer.sales_term?.billing_type ?? '',
      'cutoff_day': customer.sales_term?.cutoff_day ?? '',
      'payment_month_offset': customer.sales_term?.payment_month_offset ?? '',
      'payment_day': customer.sales_term?.payment_day ?? '',
      'payment_day_offset': customer.sales_term?.payment_day_offset ?? '',
    });
    setBillingAddresses(customer.billing_addresses || []);
    setCustomerContacts(customer.contacts || []);
    setDeliveryAddresses(customer.delivery_addresses || [])
    setIsCustomerModalOpen(false);
  }

  function selectSupplier(supplier) {
    const updatedDetails = [...data.detail_rows];
    updatedDetails[clickedRowIndex] = {
      ...updatedDetails[clickedRowIndex],
      purchase_order: {
        ...updatedDetails[clickedRowIndex].purchase_order,
        customer_id: supplier.id,
        customer_name: supplier.name,
        customer_contact_id: supplier.contact_id,
        delivery_address_id: supplier.delivery_address_id,
      }
    }
    setData('detail_rows', updatedDetails);

    updateSupplierOptions(clickedRowIndex, {
      supplierContacts: supplier.contacts,
      supplierAddresses: supplier.delivery_addresses,
    });

    setIsSupplierModalOpen(false);
  }

  function updateSupplierOptions(clickedRowIndex, updates) {
    setSupplierOptions(supplierOptions.map((row, index) => {
      if (index === clickedRowIndex) {
        return {
          ...row,
          ...updates,
        };
      }
      return row;
    }));
  }

  function addDefaultSupplierOptions() {
    const newRow = {
      supplierContacts: [],
      supplierAddresses: [],
    };
    setSupplierOptions([...supplierOptions, newRow]);
  }

  function addDetailRow() {
    setData('detail_rows', [
      ...data.detail_rows,
      defaultRowValues,
    ]);
    addDefaultSupplierOptions();
  }

  function updateDetailRow(index, objectKey, fieldName, value) {
    const updatedDetails = [...data.detail_rows];
    const detailObject = updatedDetails[index][objectKey];

    let updatedDetailObject = {
      ...detailObject,
      [fieldName]: value,
    };

    if (shouldRecalculatePrice(fieldName, detailObject)) {
      updatedDetailObject = {
        ...updatedDetailObject,
        price: recalculatePrice(detailObject, fieldName, value),
      };
    }

    updatedDetails[index] = {
      ...updatedDetails[index],
      [objectKey]: updatedDetailObject,
    }

    setData('detail_rows', updatedDetails);
  }

  function shouldRecalculatePrice(fieldName, detailObject) {
    const recalculatingFields = ['unit_price', 'quantity', 'is_tax_inclusive'];
    return ('price' in detailObject) && recalculatingFields.includes(fieldName);
  }

  function recalculatePrice(detailObject, fieldName, value) {
    const unitPrice = fieldName === 'unit_price' ? parseNumber(value) : parseNumber(detailObject.unit_price);
    const quantity = fieldName === 'quantity' ? parseNumber(value) : parseNumber(detailObject.quantity);
    const isTaxInclusive = fieldName === 'is_tax_inclusive' ? value : detailObject.is_tax_inclusive;
    const taxRate = parseNumber(detailObject.tax_rate);

    return calculatePrice(unitPrice, quantity, taxRate, isTaxInclusive);
  }


  function removeDetailRow(indexToRemove) {
    setData('detail_rows', data.detail_rows.filter((_, index) => index !== indexToRemove));
    setSupplierOptions(supplierOptions.filter((_, index) => index !== indexToRemove));
  }

  function copyDetailRowToLast(indexToCopy) {
    const rowToCopy = JSON.parse(JSON.stringify(data.detail_rows[indexToCopy]));
    setData('detail_rows', [...data.detail_rows, rowToCopy]);

    const supplierOptionToCopy = supplierOptions[indexToCopy];
    setSupplierOptions([...supplierOptions, supplierOptionToCopy]);
  }

  return (
    <>
      <h1 className="content-title">受注 複製登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="salesOrderDuplicateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('sales-orders.index')} />
        {processing && <span>Now Loading...</span>}
      </div>

      <FormErrorAlert errors={errors} />

      {isCustomerModalOpen &&
        <Modal closeModal={() => setIsCustomerModalOpen(false)} title="販売先を選択">
          <CustomerLookup
            handleClickSelect={customer => selectCustomer(customer)}
          />
        </Modal>}

      {isSupplierModalOpen &&
        <Modal closeModal={() => setIsSupplierModalOpen(false)} title="発注先を選択">
          <CustomerLookup
            handleClickSelect={supplier => selectSupplier(supplier)}
          />
        </Modal>}

      <form id="salesOrderDuplicateForm" onSubmit={submit}>
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
                        className="u-max-w-64"
                        placeholder="No"
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

                      {data.customer_id && (
                        <a
                          href={route('customers.edit', data.customer_id)}
                          target="_blank" rel="noopener noreferrer"
                          className="u-ml-1"
                        >
                          <IconButton onClick={() => fetchCustomer()}>
                            <EditIcon />
                          </IconButton>
                        </a>
                      )}

                      {data.customer_id && (
                        <IconButton onClick={() => fetchCustomer()}>
                          <SyncIcon />
                        </IconButton>
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
                  <th className="th-cell u-min-w-240">
                    <FormLabel label="商品" isRequired={false} />
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
                  <th className="th-cell u-min-w-104">
                    <FormLabel label="発注額" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-104">
                    <FormLabel label="受注額" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-120">
                    <FormLabel label="利益" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-400">
                    <FormLabel label="備考" isRequired={false} />
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {data.detail_rows.map((detail, index) => (
                  <Fragment key={index}>
                    <tr className="table-row">
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
                      </td>

                      <td className="td-cell">
                        <Input
                          type="text"
                          value={detail.sales_order_detail.product_name}
                          onChange={e => updateDetailRow(index, 'sales_order_detail', 'product_name', e.target.value)}
                          error={errors[`detail_rows.${index}.sales_order_detail.product_name`]}
                          placeholder="商品名"
                          className="u-mb-1"
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
                            className="u-max-w-64"
                            placeholder="No"
                            readOnly={true}
                          />
                          <Input
                            type="text"
                            value={detail.purchase_order.customer_name}
                            className="u-max-w-240"
                            placeholder="発注先"
                            readOnly={true}
                          />
                          <button type="button" className="btn btn-secondary" onClick={() => {
                            setIsSupplierModalOpen(true);
                            setClickedRowIndex(index);
                          }}>
                            <ManageSearchIcon />
                          </button>
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

                      <td className="td-cell">
                        {formatCurrency(detail.purchase_order_detail.price)}
                        <br />
                        <span className="u-text-sm">
                          ({formatCurrency(calculatePriceWithTax(detail.purchase_order_detail.price, detail.purchase_order_detail.tax_rate))})
                        </span>
                      </td>

                      <td className="td-cell">
                        {formatCurrency(detail.sales_order_detail.price)}
                        <br />
                        <span className="u-text-sm">
                          ({formatCurrency(calculatePriceWithTax(detail.sales_order_detail.price, detail.sales_order_detail.tax_rate))})
                        </span>
                      </td>

                      <td className="td-cell">
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
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </form >
    </>
  );
}

Duplicate.layout = page => <AppLayout title="受注 複製登録" children={page} />

export default Duplicate
