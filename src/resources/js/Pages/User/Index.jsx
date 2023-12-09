import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import UserTable from './Partials/UserTable';

const Index = ({ users, canAdmin }) => {
  const params = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('users.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">ユーザー 一覧</h1>
      <div className="content-navbar">
        {canAdmin && (
          <Link
            href={route('users.create')}
            className="btn btn-primary u-mr-3"
          >
            新規登録
          </Link>
        )}

        <KeywordSearchForm
          placeholder="名前, ヨミガナで検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {users.total}件
        </div>
        <Pagination paginator={users} />
      </div>

      <Alert type="success" message={flash.message} />

      <UserTable users={users.data} canAdmin={canAdmin} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index

