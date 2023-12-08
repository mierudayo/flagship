import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import BillingAddressTable from './Partials/BillingAddressTable';


const Index = ({ billingAddresses }) => {
  const params = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
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
        <Link
          // href={route('')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

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
      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}
      <BillingAddressTable billingAddresses={billingAddresses.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
