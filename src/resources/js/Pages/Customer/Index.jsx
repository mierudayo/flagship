import AppLayout from '@/Layouts/AppLayout';
import CustomerTable from './Partials/CustomerTable';
import { Link, useForm, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

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
        <form onSubmit={submit}>
          <div className="u-flex u-mr-3">
            <input
              type="search"
              name="keyword"
              value={data.keyword}
              onChange={(e) => setData('keyword', e.target.value)}
              className={`input-field ${errors.keyword ? 'is-invalid' : ''}`}
              placeholder="名前, ヨミガナで検索"
            />
            <button className="btn btn-secondary">検索</button>
          </div>
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </form>
        <div className="record-count u-mr-3">
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
