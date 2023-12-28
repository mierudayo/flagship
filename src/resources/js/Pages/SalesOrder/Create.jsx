import { Fragment, useState, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
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

// TODO: 後でカスタムフックにする
const parseNumber = (value) => parseFloat(value) || 0;

const calculateSubtotal = (unitPrice, quantity, taxRate, isTaxInclusive) => {
  let subtotal = unitPrice * quantity;
  if (isTaxInclusive) {
    subtotal /= (1 + taxRate);
  }
  return subtotal;
};

const calculateTotal = (subtotal, taxRate) => {
  return subtotal * (1 + taxRate);
}

const formatCurrency = (value) => {
  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  });
  const number = parseNumber(value);
  return formatter.format(number);
};


const Create = ({ userOptions, productOptions, productCategoryOptions, paymentTermOptions }) => {
  const { today } = usePage().props.date;
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [customerContacts, setCustomerContacts] = useState([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [targetIndex, setTargetIndex] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState([{
    supplierContacts: [],
    supplierAddresses: [],
  }]);

  const defaultRowValues = {
    sales_order_detail: {
      product_id: '',
      product_name: '',
      product_detail: '',
      quantity: '',
      unit_price: '',
      tax_rate: 0.10,
      is_tax_inclusive: false,
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
      tax_rate: 0.10,
      is_tax_inclusive: false,
      note: '',
    }
  }

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
    detail_rows: [defaultRowValues],
  });


  const [salesSubtotals, setSalesSubtotals] = useState([]);
  const [salesTotals, setSalesTotals] = useState([]);
  const [purchaseSubtotals, setPurchaseSubtotals] = useState([]);
  const [purchaseTotals, setPurchaseTotals] = useState([]);
  const [grossProfits, setGrossProfits] = useState([]);

  const [totalSalesSubtotal, setTotalSalesSubtotal] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [totalPurchaseSubtotal, setTotalPurchaseSubtotal] = useState(0);
  const [totalPurchaseAmount, setTotalPurchaseAmount] = useState(0);
  const [totalGrossProfit, setTotalGrossProfit] = useState(0);

  const calculateForRow = (index) => {
    if (index >= 0 && index < data.detail_rows.length) {
      const salesDetail    = data.detail_rows[index].sales_order_detail;
      const purchaseDetail = data.detail_rows[index].purchase_order_detail;

      // Sales Order Calculations
      const salesUnitPrice = parseNumber(salesDetail.unit_price);
      const salesQuantity  = parseNumber(salesDetail.quantity);
      const salesTaxRate   = parseNumber(salesDetail.tax_rate);
      const salesSubtotal  = calculateSubtotal(salesUnitPrice, salesQuantity, salesTaxRate, salesDetail.is_tax_inclusive);
      const salesTotal     = calculateTotal(salesSubtotal, salesTaxRate);

      // Purchase Order Calculations
      const purchaseUnitPrice = parseNumber(purchaseDetail.unit_price);
      const purchaseQuantity  = parseNumber(purchaseDetail.quantity);
      const purchaseTaxRate   = parseNumber(purchaseDetail.tax_rate);
      const purchaseSubtotal  = calculateSubtotal(purchaseUnitPrice, purchaseQuantity, purchaseTaxRate, purchaseDetail.is_tax_inclusive);
      const purchaseTotal     = calculateTotal(purchaseSubtotal, purchaseTaxRate);

      // Gross Profit Calculation
      const grossProfit = salesSubtotal - purchaseSubtotal;

      return { salesSubtotal, salesTotal, purchaseSubtotal, purchaseTotal, grossProfit };
    }
    return { salesSubtotal: null, salesTotal: null, purchaseSubtotal: null, purchaseTotal: null, grossProfit: null };
  };

  useEffect(() => {
    if (data.detail_rows && data.detail_rows.length > 0) {
      const calculatedValues = data.detail_rows.map((_, index) =>
        calculateForRow(index)
      );
      setSalesSubtotals(calculatedValues.map(v => v.salesSubtotal));
      setSalesTotals(calculatedValues.map(v => v.salesTotal));
      setPurchaseSubtotals(calculatedValues.map(v => v.purchaseSubtotal));
      setPurchaseTotals(calculatedValues.map(v => v.purchaseTotal));
      setGrossProfits(calculatedValues.map(v => v.grossProfit));

    // 各配列の合計を計算
    const newTotalSalesSubtotal = calculatedValues.reduce((acc, cur) => acc + (cur.salesSubtotal || 0), 0);
    const newTotalSalesAmount   = calculatedValues.reduce((acc, cur) => acc + (cur.salesTotal || 0), 0);
    const newTotalPurchaseSubtotal = calculatedValues.reduce((acc, cur) => acc + (cur.purchaseSubtotal || 0), 0);
    const newTotalPurchaseAmount   = calculatedValues.reduce((acc, cur) => acc + (cur.purchaseTotal || 0), 0);
    const newTotalGrossProfit   = calculatedValues.reduce((acc, cur) => acc + (cur.grossProfit || 0), 0);

    // 合計を設定
    setTotalSalesSubtotal(newTotalSalesSubtotal);
    setTotalSalesAmount(newTotalSalesAmount);
    setTotalPurchaseSubtotal(newTotalPurchaseSubtotal);
    setTotalPurchaseAmount(newTotalPurchaseAmount);
    setTotalGrossProfit(newTotalGrossProfit);
    }
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
      'sales_in_charge_id': customer.in_charge_user_id || '',
      'billing_type': customer.sales_term?.billing_type ?? '',
      'cutoff_day': customer.sales_term?.cutoff_day ?? '',
      'payment_month_offset': customer.sales_term?.payment_month_offset ?? '',
      'payment_day': customer.sales_term?.payment_day ?? '',
      'payment_day_offset': customer.sales_term?.payment_day_offset ?? '',
    });
    setCustomerContacts(customer.contacts || []);
    setDeliveryAddresses(customer.delivery_addresses || [])
    setIsCustomerModalOpen(false);
  }

  function selectSupplier(supplier) {
    const updatedDetails = [...data.detail_rows];
    updatedDetails[targetIndex] = {
      ...updatedDetails[targetIndex],
      purchase_order: {
        ...updatedDetails[targetIndex].purchase_order,
        customer_id: supplier.id,
        customer_name: supplier.name,
        customer_contact_id: supplier.contact_id,
        delivery_address_id: supplier.delivery_address_id,
      }
    }
    setData('detail_rows', updatedDetails);

    updateSupplierOptions(targetIndex, {
      supplierContacts: supplier.contacts,
      supplierAddresses: supplier.delivery_addresses,
    });

    setIsSupplierModalOpen(false);
  }

  function updateSupplierOptions(targetIndex, updates) {
    setSupplierOptions(supplierOptions.map((row, index) => {
      if (index === targetIndex) {
        return {
          ...row,
          ...updates,
        };
      }
      return row;
    }));
  }

  const addDefaultSupplierOptions = () => {
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

  function removeSalesOrderDetail(indexToRemove) {
    setData('detail_rows', data.detail_rows.filter((_, index) => index !== indexToRemove));
  }

  function updateSalesOrderDetail(index, key, value) {
    const updatedDetails = [...data.detail_rows];
    updatedDetails[index] = {
      ...updatedDetails[index],
      sales_order_detail: {
        ...updatedDetails[index].sales_order_detail,
        [key]: value,
      }
    }
    setData('detail_rows', updatedDetails);
  }

  function updatePurchaseOrderDetail(index, key, value) {
    const updatedDetails = [...data.detail_rows];
    updatedDetails[index] = {
      ...updatedDetails[index],
      purchase_order_detail: {
        ...updatedDetails[index].purchase_order_detail,
        [key]: value,
      }
    }
    setData('detail_rows', updatedDetails);
  }

  function updatePurchaseOrder(index, key, value) {
    const updatedDetails = [...data.detail_rows];
    updatedDetails[index] = {
      ...updatedDetails[index],
      purchase_order: {
        ...updatedDetails[index].purchase_order,
        [key]: value,
      }
    }
    setData('detail_rows', updatedDetails);
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

      {isSupplierModalOpen &&
        <Modal closeModal={() => setIsSupplierModalOpen(false)} title="仕入先を選択">
          <CustomerLookup
            handleClickSelect={supplier => selectSupplier(supplier)}
          />
        </Modal>}

      <form id="salesOrderCreateForm" onSubmit={submit}>
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
                      max={today}
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
                    <FormLabel label="販売先顧客" isRequired={false} />
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
                      error={errors.customer_contact_id}
                    />
                    <InvalidFeedback errors={errors} name="customer_contact_id" />
                  </td>
                </tr>

                <tr className="table-row is-flexible">
                  <th className="th-cell">
                    <FormLabel label="納品先" isRequired={true} />
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
            <button type="button" className="btn btn-secondary u-mr-3" onClick={addDetailRow}>+ 行を追加</button>
            <div className="u-flex u-ml-auto">
              <div className='u-flex u-mr-4'>
                <span>発注額</span>
                <span>
                  {totalPurchaseSubtotal !== undefined
                    ? formatCurrency(totalPurchaseSubtotal)
                    : "..."}
                    (
                    {totalPurchaseAmount !== undefined
                    ? formatCurrency(totalPurchaseAmount)
                    : "..."}
                    )
                </span>
              </div>
              <div className='u-flex u-mr-4'>
                <span>受注額</span>
                <span>
                  {totalSalesSubtotal !== undefined
                    ? formatCurrency(totalSalesSubtotal)
                    : "..."}
                    (
                    {totalSalesAmount !== undefined
                    ? formatCurrency(totalSalesAmount)
                    : "..."}
                    )
                </span>
              </div>
              <div className='u-flex'>
                <span>利益</span>
                <span>
                  {totalGrossProfit !== undefined
                    ? formatCurrency(totalGrossProfit)
                    : "..."}
                </span>
              </div>
            </div>
          </div>
          <div className="table-wrapper is-scrollable">
            <table className="table">
              <thead className="table-header is-sticky">
                <tr className="table-row">
                  <th className="th-cell col-fixed" rowSpan={2}>

                  </th>
                  <th className="th-cell u-w-64" rowSpan={2}>
                    <FormLabel label="No." isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-320">
                    <FormLabel label="商品" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="商品名" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="商品詳細" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-160">
                    <FormLabel label="販売数量" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-160">
                    <FormLabel label="販売単価" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-112" rowSpan={2}>
                    <FormLabel label="税率" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-104" rowSpan={2}>
                    <FormLabel label="税種別" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-104">
                    <FormLabel label="受注額" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-120" rowSpan={2}>
                    <FormLabel label="利益" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-400" rowSpan={2}>
                    <FormLabel label="備考" isRequired={false} />
                  </th>
                </tr>
                <tr className="table-row">
                  <th className="th-cell" colSpan={2}><FormLabel label="仕入先" isRequired={false} /></th>
                  <th className="th-cell"><FormLabel label="発注担当" isRequired={false} /></th>
                  <th className="th-cell"><FormLabel label="仕入数量" isRequired={false} /></th>
                  <th className="th-cell"><FormLabel label="仕入単価" isRequired={false} /></th>
                  <th className="th-cell"><FormLabel label="発注額" isRequired={false} /></th>
                </tr>
              </thead>
              <tbody className="tbody">
                {data.detail_rows.map((detail, index) => (
                  <Fragment key={index}>
                    <tr className="table-row">
                      <td className="td-cell col-fixed u-w-80" rowSpan={2}>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => removeSalesOrderDetail(index)}
                        >
                          削除
                        </button>
                      </td>

                      <td className="td-cell" rowSpan={2}>{index + 1}</td>

                      <td className="td-cell">
                        <CustomSelect
                          onChange={value => updateSalesOrderDetail(index, 'product_id', value)}
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
                          onChange={e => updateSalesOrderDetail(index, 'product_name', e.target.value)}
                          error={errors[`detail_rows.${index}.sales_order_detail.product_name`]}
                          placeholder="商品名"
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.product_name`} />
                      </td>

                      <td className="td-cell">
                        <Input
                          type="text"
                          value={detail.sales_order_detail.product_detail}
                          onChange={e => updateSalesOrderDetail(index, 'product_detail', e.target.value)}
                          error={errors[`detail_rows.${index}.sales_order_detail.product_detail`]}
                          placeholder="商品詳細"
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.product_detail`} />
                      </td>

                      <td className="td-cell">
                        <Input
                          type="number"
                          value={detail.sales_order_detail.quantity}
                          onChange={e => updateSalesOrderDetail(index, 'quantity', e.target.value)}
                          error={errors[`detail_rows.${index}.sales_order_detail.quantity`]}
                          placeholder="販売数量"
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.quantity`} />
                      </td>

                      <td className="td-cell">
                        <Input
                          type="number"
                          value={detail.sales_order_detail.unit_price}
                          onChange={e => updateSalesOrderDetail(index, 'unit_price', e.target.value)}
                          error={errors[`detail_rows.${index}.sales_order_detail.unit_price`]}
                          placeholder="販売単価"
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.unit_price`} />
                      </td>

                      <td className="td-cell">
                        <select
                          value={detail.sales_order_detail.tax_rate}
                          onChange={e => updateSalesOrderDetail(index, 'tax_rate', e.target.value)}
                          className={`form-select ${errors[`detail_rows.${index}.sales_order_detail.tax_rate`] ? 'is-invalid' : ''}`}
                        >
                          <OptionsList
                            options={[
                              { value: 0.1, label: '10%' },
                              { value: 0.8, label: '8%' },
                            ]}
                          />
                        </select>
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.tax_rate`} />
                      </td>

                      <td className="td-cell">
                        <select
                          value={detail.sales_order_detail.is_tax_inclusive}
                          onChange={e => updateSalesOrderDetail(index, 'is_tax_inclusive', e.target.value === 'true')}
                          className={`form-select ${errors[`detail_rows.${index}.sales_order_detail.is_tax_inclusive`] ? 'is-invalid' : ''}`}
                        >
                          <OptionsList
                            options={[
                              { value: false, label: '外税' },
                              { value: true, label: '内税' },
                            ]}
                          />
                        </select>
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.is_tax_inclusive`} />
                      </td>

                      <td className="td-cell">
                        {salesSubtotals[index] !== undefined
                          ? formatCurrency(salesSubtotals[index])
                          : "..."}
                          <br/>
                          (
                          {salesTotals[index] !== undefined
                          ? formatCurrency(salesTotals[index])
                          : "..."}
                          )
                      </td>

                      <td className="td-cell" rowSpan={2}>
                        {grossProfits[index] !== undefined
                          ? formatCurrency(grossProfits[index])
                          : "..."}
                      </td>

                      <td className="td-cell">
                        <Input
                          type="text"
                          value={detail.sales_order_detail.note}
                          onChange={e => updateSalesOrderDetail(index, 'note', e.target.value)}
                          error={errors[`detail_rows.${index}.sales_order_detail.note`]}
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.sales_order_detail.note`} />
                      </td>
                    </tr>

                    {/* 仕入 明細行 */}
                    <tr className="table-row">
                      <td className="td-cell" colSpan={2}>
                        <div className="u-flex">
                          <Input
                            type="text"
                            value={detail.purchase_order.customer_id}
                            className="u-max-w-64"
                            placeholder="ID"
                            readOnly={true}
                          />
                          <Input
                            type="text"
                            value={detail.purchase_order.customer_name}
                            className="u-max-w-240"
                            placeholder="仕入先"
                            readOnly={true}
                          />
                          <button type="button" className="btn btn-secondary" onClick={() => {
                            setIsSupplierModalOpen(true);
                            setTargetIndex(index);
                          }}>
                            <ManageSearchIcon />
                          </button>
                        </div>
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order.customer_id`} />
                        <CustomSelect
                          onChange={value => updatePurchaseOrder(index, 'customer_contact_id', value)}
                          options={supplierOptions[index].supplierContacts}
                          value={detail.purchase_order.customer_contact_id}
                          valueKey="id"
                          labelKey="name"
                          isClearable={true}
                          isSearchable={true}
                          placeholder="仕入先顧客..."
                          error={errors[`detail_rows.${index}.purchase_order.customer_contact_id`]}
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order.customer_contact_id`} />
                        <CustomSelect
                          onChange={value => updatePurchaseOrder(index, 'delivery_address_id', value)}
                          options={supplierOptions[index].supplierAddresses}
                          value={detail.purchase_order.delivery_address_id}
                          valueKey="id"
                          labelKey="address"
                          isClearable={true}
                          isSearchable={true}
                          placeholder="出荷元..."
                          error={errors[`detail_rows.${index}.purchase_order.delivery_address_id`]}
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order.delivery_address_id`} />
                      </td>
                      <td className="td-cell">
                        <CustomSelect
                          onChange={value => updatePurchaseOrder(index, 'purchase_in_charge_id', value)}
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
                          onChange={e => updatePurchaseOrderDetail(index, 'quantity', e.target.value)}
                          error={errors[`detail_rows.${index}.purchase_order_detail.quantity`]}
                          placeholder="仕入数量"
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.quantity`} />
                      </td>
                      <td className="td-cell">
                        <Input
                          type="number"
                          value={detail.purchase_order_detail.unit_price}
                          onChange={e => updatePurchaseOrderDetail(index, 'unit_price', e.target.value)}
                          error={errors[`detail_rows.${index}.purchase_order_detail.unit_price`]}
                          placeholder="仕入単価"
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.unit_price`} />
                      </td>
                      <td className="td-cell">
                        <select
                          value={detail.purchase_order_detail.tax_rate}
                          onChange={e => updatePurchaseOrderDetail(index, 'tax_rate', e.target.value)}
                          className={`form-select ${errors[`detail_rows.${index}.purchase_order_detail.tax_rate`] ? 'is-invalid' : ''}`}
                        >
                          <OptionsList
                            options={[
                              { value: 0.1, label: '10%' },
                              { value: 0.8, label: '8%' },
                            ]}
                          />
                        </select>
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.tax_rate`} />
                      </td>
                      <td className="td-cell">
                        <select
                          value={detail.purchase_order_detail.is_tax_inclusive}
                          onChange={e => updatePurchaseOrderDetail(index, 'is_tax_inclusive', e.target.value)}
                          className={`form-select ${errors[`detail_rows.${index}.purchase_order_detail.is_tax_inclusive`] ? 'is-invalid' : ''}`}
                        >
                          <OptionsList
                            options={[
                              { value: false, label: '外税' },
                              { value: true, label: '内税' },
                            ]}
                          />
                        </select>
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.is_tax_inclusive`} />
                      </td>

                      <td className="td-cell">
                        {purchaseSubtotals[index] !== undefined
                          ? formatCurrency(purchaseSubtotals[index])
                          : "..."}
                          <br/>
                          (
                          {purchaseTotals[index] !== undefined
                          ? formatCurrency(purchaseTotals[index])
                          : "..."}
                          )
                      </td>

                      <td className="td-cell">
                        <Input
                          type="text"
                          value={detail.purchase_order_detail.note}
                          onChange={e => updatePurchaseOrderDetail(index, 'note', e.target.value)}
                          error={errors[`detail_rows.${index}.purchase_order_detail.note`]}
                        />
                        <InvalidFeedback errors={errors} name={`detail_rows.${index}.purchase_order_detail.note`} />
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

Create.layout = page => <AppLayout title="受注 登録" children={page} />

export default Create
