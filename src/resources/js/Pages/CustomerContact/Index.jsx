import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import ContactsTable from './Partials/ContactsTable';

const Index = ({ customerContacts }) => {
  const params = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('contacts.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">連絡先 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('contacts.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="名前, ヨミガナで検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {customerContacts.total}件
        </div>
        <Pagination paginator={customerContacts} />
      </div>
      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}
      <ContactsTable contacts={customerContacts.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
