import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import ContentInfoBar from '@/Components/ContentInfoBar';
import CancelButton from '@/Components/CancelButton';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import ProgressIndicator from '@/Components/ProgressIndicator';
import BillingAddressForm from './Partials/BillingAddressForm';


const Edit = ({ billingAddress }) => {
  const { flash } = usePage().props;

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    name: billingAddress.name,
    name_kana: billingAddress.name_kana || '',
    shortcut: billingAddress.shortcut || '',
    billing_contact_name: billingAddress.billing_contact_name || '',
    postal_code: billingAddress.postal_code || '',
    address: billingAddress.address || '',
    email: billingAddress.email || '',
    tel: billingAddress.tel || '',
    fax: billingAddress.fax || '',
    invoice_delivery_method: billingAddress.invoice_delivery_method || '',
    note: billingAddress.note || '',
  });

  function submit(e) {
    e.preventDefault();
    patch(route('billing-addresses.update', billingAddress), {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <>
      <h1 className="content-title">請求先 編集</h1>

      <ContentInfoBar
        createdAt={billingAddress.created_at}
        updatedAt={billingAddress.updated_at}
      />

      <div className="content-navbar">
        <button
          type="submit"
          form="billingAddressForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('billing-addresses.index')} />
        {processing && <ProgressIndicator />}
      </div>

      <Alert type={flash.type} message={flash.message} />

      <FormErrorAlert errors={errors} />

      <BillingAddressForm
        data={data}
        setData={setData}
        errors={errors}
        submit={submit}
      />

    </>
  );
}

Edit.layout = page => <AppLayout title="請求先 編集" children={page} />

export default Edit
