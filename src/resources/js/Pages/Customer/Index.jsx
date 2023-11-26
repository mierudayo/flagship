import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import CustomerTable from './Partials/CustomerTable';

const Index = ({ customersPaginator, canAdmin }) => {
  const params = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('customers.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">取引先 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('customers.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="取引先名, ヨミガナで検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {customersPaginator.total}件
        </div>
        <Pagination paginator={customersPaginator} />
      </div>
      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}
      <CustomerTable customers={customersPaginator.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
