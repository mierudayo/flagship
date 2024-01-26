import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import CustomerLookup from '@/Components/CustomerLookup';
import Modal from '@/Components/Modal';
import SalesOrderForm from '@/Pages/SalesOrder/Partials/SalesOrderForm';
import { parseNumber, calculatePrice, calculatePriceWithTax } from '@/Utils/priceCalculator';

const Create = ({ userOptions, productOptions, productCategoryOptions, paymentTermOptions, date, taxRate }) => {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [customerContacts, setCustomerContacts] = useState([]);
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [clickedRowIndex, setClickedRowIndex] = useState(null);
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
    customer_id: '',
    customer_name: '',
    customer_contact_id: '',
    billing_address_id: '',
    delivery_address_id: '',
    product_category_id: '',
    billing_type: '',
    cutoff_day: '',
    payment_month_offset: '',
    payment_day: '',
    payment_day_offset: '',
    payment_date: '',
    payment_status: '',
    order_date: date.today,
    shipping_date: '',
    shipping_status: '',
    delivery_date: '',
    delivery_status: '',
    delivery_memo: '',
    note: '',
    sales_in_charge_id: '',
    detail_rows: [defaultRowValues],
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
    const unitPrice      = fieldName === 'unit_price' ? parseNumber(value) : parseNumber(detailObject.unit_price);
    const quantity       = fieldName === 'quantity' ? parseNumber(value) : parseNumber(detailObject.quantity);
    const isTaxInclusive = fieldName === 'is_tax_inclusive' ? value : detailObject.is_tax_inclusive;
    const taxRate        = parseNumber(detailObject.tax_rate);

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
      <h1 className="content-title">受注 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="salesOrderForm"
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

Create.layout = page => <AppLayout title="受注 登録" children={page} />

export default Create
