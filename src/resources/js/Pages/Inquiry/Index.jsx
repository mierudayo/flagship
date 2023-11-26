import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import InquiryTable from './Partials/InquiryTable';

const Index = ({ inquiriesPaginator }) => {
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
    <>
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

        <KeywordSearchForm
          placeholder="件名、内容で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {inquiriesPaginator.total}件
        </div>
        <Pagination paginator={inquiriesPaginator} />
      </div>
      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}
      <InquiryTable inquiries={inquiriesPaginator.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
