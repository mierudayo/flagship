import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import PurchaseOrderTable from "./Partials/PurchaseOrderTable";

const Index = ({ purchaseOrders }) => {
  const params = route().params;
  const { flash } = usePage().props;

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('purchase-orders.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">発注 一覧</h1>

      <div className="content-navbar">
        <Link
          href={route('purchase-orders.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="発注ID, 仕入先名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {purchaseOrders.total}件
        </div>
        <Pagination paginator={purchaseOrders} />
      </div>

      <Alert type="success" message={flash.message} />

      <PurchaseOrderTable purchaseOrders={purchaseOrders.data} />

    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
