import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import UserTable from './Partials/UserTable';

import ToggleFilterButton from '@/Components/ToggleFilterButton';
import UserFilter from './Partials/UserFilter';
import FilterForm from '@/Components/FilterForm';

const Index = ({ users, canAdmin }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(urlParams).length > 0) {
      setIsFilterOpen(true);
    }
  }, []);

  const { data, setData, get, errors } = useForm({
    keyword: urlParams.keyword || '',
    user_id: urlParams.user_id || '',
    employee_code: urlParams.employee_code || '',
    email: urlParams.email || '',
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

        <ToggleFilterButton
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />


        <div className="record-count">
          {users.total}件
        </div>
        <Pagination paginator={users} />
      </div>

      <FilterForm submit={submit} isFilterOpen={isFilterOpen}>
        <UserFilter
          submit={submit}
          data={data}
          setData={setData}
          errors={errors}
        />
      </FilterForm>

      <Alert type={flash.type} message={flash.message} />

      <UserTable users={users.data} canAdmin={canAdmin} />
    </>
  );
}

Index.layout = page => <AppLayout title="ユーザー 一覧" children={page} />

export default Index

