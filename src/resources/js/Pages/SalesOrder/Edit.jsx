import { useState, useEffect } from 'react';

import { Link, useForm } from '@inertiajs/react';

import CancelButton from '@/Components/CancelButton';
import CustomerLookup from '@/Components/CustomerLookup';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import Modal from '@/Components/Modal';
import ProgressIndicator from '@/Components/ProgressIndicator';
import AppLayout from '@/Layouts/AppLayout';
import SalesOrderForm from '@/Pages/SalesOrder/Partials/SalesOrderForm';
import { parseNumber, calculatePrice, calculatePriceWithTax } from '@/Utils/priceCalculator';

const Edit = ({ returnToUrl, salesOrder, userOptions, productOptions, productCategoryOptions, paymentTermOptions, date, taxRate }) => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState(salesOrder.customer.billing_addresses || []);
  const [customerContacts, setCustomerContacts] = useState(salesOrder.customer.contacts || []);
  const [deliveryAddresses, setDeliveryAddresses] = useState(salesOrder.customer.delivery_addresses || []);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
  const [supplierOptions, setSupplierOptions] = useState(salesOrder.sales_order_details.map(soDetail => {
    return {
      supplierContacts: soDetail.purchase_order_details[0]?.purchase_order?.customer.contacts || [],
      supplierAddresses: soDetail.purchase_order_details[0]?.purchase_order?.customer.delivery_addresses || [],
    }
  }));

  const defaultRows = salesOrder.sales_order_details.map(soDetail => {
    const purchaseOrder = soDetail.purchase_order_details[0]?.purchase_order;
    const poDetail = soDetail.purchase_order_details[0];

    return {
      sales_order_detail: {
        id: soDetail.id,
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
        id: purchaseOrder?.id,
        customer_id: purchaseOrder?.customer_id ?? '',
        customer_name: purchaseOrder?.customer.name ?? '',
        customer_contact_id: purchaseOrder?.customer_contact_id ?? '',
        billing_address_id: purchaseOrder?.billing_address_id ?? '',
        delivery_address_id: purchaseOrder?.delivery_address_id ?? '',
        purchase_in_charge_id: purchaseOrder?.purchase_in_charge_id ?? '',
      },
      purchase_order_detail: {
        id: poDetail?.id,
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

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    return_to_url: returnToUrl,
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
    payment_date: salesOrder.payment_date || '',
    payment_status: salesOrder.payment_status || '',
    order_date: salesOrder.order_date || date.today,
    shipping_date: salesOrder.shipping_date || '',
    shipping_status: salesOrder.shipping_status || '',
    delivery_date: salesOrder.delivery_date || '',
    delivery_status: salesOrder.delivery_status || '',
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
    patch(route('sales-orders.update', salesOrder), {
      onSuccess: () => reset(),
    });
  }

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

    if (rowToCopy.sales_order_detail) delete rowToCopy.sales_order_detail.id;
    if (rowToCopy.purchase_order) delete rowToCopy.purchase_order.id;
    if (rowToCopy.purchase_order_detail) delete rowToCopy.purchase_order_detail.id;

    setData('detail_rows', [...data.detail_rows, rowToCopy]);

    const supplierOptionToCopy = supplierOptions[indexToCopy];
    setSupplierOptions([...supplierOptions, supplierOptionToCopy]);
  }

  return (
    <>
      <h1 className="content-title">受注 編集</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="salesOrderForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('sales-orders.index')} />
        {processing && <ProgressIndicator />}
        <Link
          onBefore={() => confirm('紐付いている発注データも削除されます。本当に削除しますか？')}
          href={route('sales-orders.destroy', salesOrder)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
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

      <SalesOrderForm
        submit={submit}
        data={data}
        setData={setData}
        errors={errors}
        addDetailRow={addDetailRow}
        removeDetailRow={removeDetailRow}
        copyDetailRowToLast={copyDetailRowToLast}
        updateDetailRow={updateDetailRow}
        fetchCustomer={fetchCustomer}
        setIsSupplierModalOpen={setIsSupplierModalOpen}
        setIsCustomerModalOpen={setIsCustomerModalOpen}
        setClickedRowIndex={setClickedRowIndex}
        date={date}
        totals={totals}
        customerContacts={customerContacts}
        billingAddresses={billingAddresses}
        deliveryAddresses={deliveryAddresses}
        userOptions={userOptions}
        productOptions={productOptions}
        productCategoryOptions={productCategoryOptions}
        paymentTermOptions={paymentTermOptions}
        supplierOptions={supplierOptions}
      />
    </>
  );
}

Edit.layout = page => <AppLayout title="受注 編集" children={page} />

export default Edit
