import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import InquiryTable from './Partials/InquiryTable';

export default function Index({ inquiriesPaginator }) {
  const params = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('inquiries.index'), {
      preserveState: true,
    });
  };

  return (
    <AppLayout>
      <h1 className="content-title">問い合わせ 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('inquiries.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>
        <Link
          href={route('inquiry-types.index')}
          className="btn btn-secondary u-mr-3"
        >
          区分登録
        </Link>
        <form onSubmit={submit}>
          <div className="u-flex u-mr-3">
            <input
              type="search"
              name="keyword"
              value={data.keyword}
              onChange={(e) => setData('keyword', e.target.value)}
              className={`input-field ${errors.keyword ? 'is-invalid' : ''}`}
              placeholder="件名, 問い合わせ内容で検索"
            />
            <button className="btn btn-secondary">検索</button>
          </div>
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </form>
        <div className="record-count u-mr-3">
          {inquiriesPaginator.total}件
        </div>
        <Pagination paginator={inquiriesPaginator} />
      </div>
      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}
      <InquiryTable inquiries={inquiriesPaginator.data} />
    </AppLayout>
  );
}
