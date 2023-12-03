import { useState } from 'react';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import SalesOrderTable from "./Partials/SalesOrderTable";
import CustomerLookup from '@/Components/CustomerLookup';
import Modal from '@/Components/Modal';


const Index = ({ salesOrdersPaginator }) => {
  const params = route().params;
  const { flash } = usePage().props;
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('sales-orders.index'), {
      preserveState: true,
    });
  };

  function selectCustomer(customer) {
    router.get(route('customers.sales-orders.create', customer));
  }

  return (
    <>
      <h1 className="content-title">受注 一覧</h1>

      {isCustomerModalOpen &&
        <Modal closeModal={() => setIsCustomerModalOpen(false)} title="販売先を選択してください">
          <CustomerLookup
            handleClickSelect={customer => selectCustomer(customer)}
          />
        </Modal>}

      <div className="content-navbar">
        <button
          type="button"
          className="btn btn-primary u-mr-3"
          onClick={() => setIsCustomerModalOpen(true)}
        >
          新規登録
        </button>
        {/* <Link
          // href={route('sales-orders.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link> */}

        <KeywordSearchForm
          placeholder="受注ID, 取引先名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {salesOrdersPaginator.total}件
        </div>
        <Pagination paginator={salesOrdersPaginator} />
      </div>
      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}

      <SalesOrderTable salesOrders={salesOrdersPaginator.data} />

    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
