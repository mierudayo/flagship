import { Link, useForm, usePage } from '@inertiajs/react';

import MenuItem from '@mui/material/MenuItem';

import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import DropdownMenu from '@/Components/DropdownMenu';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import CustomerTable from './Partials/CustomerTable';

const Index = ({ customers }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: urlParams.keyword || '',
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

        <DropdownMenu
          buttonLabel="設定"
          buttonClassName="u-mr-3"
        >
          <Link href={route('billing-addresses.index')}>
            <MenuItem>
              請求先管理
            </MenuItem>
          </Link>
          <Link href={route('lead-sources.index')}>
            <MenuItem>
              リード獲得元管理
            </MenuItem>
          </Link>
        </DropdownMenu>

        <KeywordSearchForm
          placeholder="取引先名, ヨミガナで検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {customers.total}件
        </div>
        <Pagination paginator={customers} />
      </div>

      <Alert type="success" message={flash.message} />

      <CustomerTable customers={customers.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
