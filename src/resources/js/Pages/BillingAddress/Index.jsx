import { useState } from 'react';

import { useForm, usePage } from '@inertiajs/react';

import BillingAddressTable from './Partials/BillingAddressTable';

import Alert from '@/Components/Alert';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import PageSizeSelector from '@/Components/PageSizeSelector';
import Pagination from '@/Components/Pagination';
import AppLayout from '@/Layouts/AppLayout';

const Index = ({ billingAddresses }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    page_size: urlParams.page_size || 100,
    keyword: urlParams.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('billing-addresses.index'), {
      preserveState: true,
    });
  }

  const [prevPageSize, setPrevPageSize] = useState(data.page_size);

  if (data.page_size !== prevPageSize) {
    get(route('billing-addresses.index'), {
      preserveState: true,
    });
    setPrevPageSize(data.page_size);
  }

  return (
    <>
      <h1 className="content-title">請求先 一覧</h1>
      <div className="content-navbar">

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

        <PageSizeSelector
          pageSize={data.page_size}
          onChange={e => setData('page_size', e.target.value)}
        />

        <Pagination paginator={billingAddresses} />
      </div>

      <Alert type={flash.type} message={flash.message} />

      <BillingAddressTable billingAddresses={billingAddresses.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="請求先一覧" children={page} />

export default Index
