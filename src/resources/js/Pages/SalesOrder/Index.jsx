import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import SalesOrderTable from "./Partials/SalesOrderTable";

const Index = ({ salesOrders }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: urlParams.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('sales-orders.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">受注 一覧</h1>

      <div className="content-navbar">
        <Link
          href={route('sales-orders.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="受注ID, 取引先名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {salesOrders.total}件
        </div>
        <Pagination paginator={salesOrders} />
      </div>

      <Alert type="success" message={flash.message} />

      <SalesOrderTable salesOrders={salesOrders.data} />

    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
