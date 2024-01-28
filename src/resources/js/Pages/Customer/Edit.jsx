import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import ContentInfoBar from '@/Components/ContentInfoBar';
import CancelButton from '@/Components/CancelButton';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import ProgressIndicator from '@/Components/ProgressIndicator';
import { convertNullToEmptyString } from '@/Utils/arrayHelpers';
import CustomerForm from './Partials/CustomerForm';

const Edit = ({ customer, userOptions, leadSourceOptions, paymentTermOptions, addressTypeOptions }) => {
  const { flash } = usePage().props;

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    name: customer.name,
    name_kana: customer.name_kana || '',
    shortcut: customer.shortcut || '',
    postal_code: customer.postal_code || '',
    address: customer.address || '',
    tel: customer.tel || '',
    fax: customer.fax || '',

    purchase_term: customer.purchase_term ?? null,
    sales_term: customer.sales_term ?? null,

    in_charge_user_id: customer.in_charge_user_id || '',
    note: customer.note || '',

    contacts: convertNullToEmptyString(customer.contacts),
    delivery_addresses: convertNullToEmptyString(customer.delivery_addresses),
  });

  function submit(e) {
    e.preventDefault();
    patch(route('customers.update', customer), {
      onSuccess: () => reset(),
    });
  }

  function addContact() {
    setData('contacts', [
      ...data.contacts,
      {
        name: '',
        name_kana: '',
        tel: '',
        mobile_number: '',
        email: '',
        position: '',
        role: '',
        is_active: true,
        in_charge_user_id: '',
        lead_source_id: '',
        note: '',
      }
    ])
  }

  function removeContact(indexToRemove) {
    setData('contacts', data.contacts.filter((_, index) => index !== indexToRemove));
  }

  function updateContact(index, key, value) {
    const updatedContacts = [...data.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [key]: value
    };
    setData('contacts', updatedContacts);
  }

  function addDeliveryAddress() {
    setData('delivery_addresses', [
      ...data.delivery_addresses,
      {
        address_type: 1,
        postal_code: '',
        address: '',
        company_name: '',
        contact_name: '',
        tel: '',
        note: '',
      }
    ])
  }

  function removeDeliveryAddress(indexToRemove) {
    setData('delivery_addresses', data.delivery_addresses.filter((_, index) => index !== indexToRemove));
  }

  function updateDeliveryAddress(index, key, value) {
    const updatedDeliveryAddresses = [...data.delivery_addresses];
    updatedDeliveryAddresses[index] = {
      ...updatedDeliveryAddresses[index],
      [key]: value
    }
    setData('delivery_addresses', updatedDeliveryAddresses);
  }

  function copyCustomerToAddress() {
    setData('delivery_addresses', [
      ...data.delivery_addresses,
      {
        address_type: 1,
        postal_code: data.postal_code || '',
        address: data.address || '',
        company_name: data.name || '',
        tel: data.tel || '',
      }
    ]);
  }

  return (
    <>
      <h1 className="content-title">取引先 編集</h1>

      <ContentInfoBar
        createdAt={customer.created_at}
        createdBy={customer.created_by.name}
        updatedAt={customer.updated_at}
        updatedBy={customer.updated_by?.name}
      />

      <div className="content-navbar">
        <button
          type="submit"
          form="customerForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('customers.index')} />
        {processing && <ProgressIndicator />}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('customers.destroy', customer)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
      </div>

      <Alert type={flash.type} message={flash.message} />

      <FormErrorAlert errors={errors} />

      <CustomerForm
        userOptions={userOptions}
        leadSourceOptions={leadSourceOptions}
        paymentTermOptions={paymentTermOptions}
        addressTypeOptions={addressTypeOptions}
        data={data}
        setData={setData}
        errors={errors}
        submit={submit}
        addContact={addContact}
        removeContact={removeContact}
        updateContact={updateContact}
        addDeliveryAddress={addDeliveryAddress}
        removeDeliveryAddress={removeDeliveryAddress}
        updateDeliveryAddress={updateDeliveryAddress}
        copyCustomerToAddress={copyCustomerToAddress}
      />
    </>
  );
}

Edit.layout = page => <AppLayout title="取引先 編集" children={page} />

export default Edit
