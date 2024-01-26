import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import ProgressIndicator from '@/Components/ProgressIndicator';
import CustomerForm from './Partials/CustomerForm';

const Create = ({ userOptions, leadSourceOptions, paymentTermOptions, addressTypeOptions }) => {
  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    name: '',
    name_kana: '',
    shortcut: '',
    postal_code: '',
    address: '',
    tel: '',
    fax: '',
    purchase_term: null,
    sales_term: null,
    in_charge_user_id: '',
    note: '',
    contacts: [],
    delivery_addresses: [],
  });

  function submit(e) {
    e.preventDefault();
    post(route('customers.store'), {
      onSuccess: () => reset(),
    });
  };

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
      <h1 className="content-title">取引先 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="customerForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('customers.index')} />
        {processing && <ProgressIndicator />}
      </div>

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

Create.layout = page => <AppLayout title="取引先 登録" children={page} />

export default Create

