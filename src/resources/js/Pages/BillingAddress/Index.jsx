import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import BillingAddressTable from './Partials/BillingAddressTable';

const Index = ({ billingAddresses }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: urlParams.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('billing-addresses.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">請求先 一覧</h1>
      <div className="content-navbar">

        <KeywordSearchForm
          placeholder="請求先名, ヨミガナで検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {billingAddresses.total}件
        </div>
        <Pagination paginator={billingAddresses} />
      </div>

      <Alert type={flash.type} message={flash.message} />

      <BillingAddressTable billingAddresses={billingAddresses.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="請求先一覧" children={page} />

export default Index
