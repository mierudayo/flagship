import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import UserTable from './Partials/UserTable';

import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import ToggleFilterButton from '@/Components/ToggleFilterButton';

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

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      user_id: '',
      employee_code: '',
      email: '',
    })
  }

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

      <form onSubmit={submit}>
        <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
          <div className="filter-form-body">
            <div className="u-mr-2">
              <FormLabel htmlFor="user_id" label="No." />
              <Input
                id="user_id"
                type="number"
                value={data.user_id}
                onChange={e => setData('user_id', e.target.value)}
                error={errors.user_id}
                className="u-w-88"
              />
            </div>

            <div className="u-mr-2">
              <FormLabel htmlFor="employee_code" label="社員番号" />
              <Input
                id="employee_code"
                type="text"
                value={data.employee_code}
                onChange={e => setData('employee_code', e.target.value)}
                error={errors.employee_code}
                className="u-w-112"
              />
            </div>

            <div className="u-mr-2">
              <FormLabel htmlFor="email" label="Email" />
              <Input
                id="email"
                type="text"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
                error={errors.email}
                className="u-w-240"
              />
            </div>
          </div>
          <div className="filter-form-footer">
            <button className="btn btn-primary u-mr-3">
              検索
            </button>
            <Link
              href={route('users.index')}
              className="btn btn-secondary"
              preserveState={true}
              onSuccess={resetSearchInputs}
            >
              クリア
            </Link>
          </div>
        </div>
      </form>

      <Alert type="success" message={flash.message} />

      <UserTable users={users.data} canAdmin={canAdmin} />
    </>
  );
}

Index.layout = page => <AppLayout title="ユーザー 一覧" children={page} />

export default Index

