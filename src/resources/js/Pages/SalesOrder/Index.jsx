import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import SalesOrderTable from "./Partials/SalesOrderTable";

import CustomSelect from '@/Components/Form/CustomSelect';
import DateInput from '@/Components/Form/DateInput';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import ToggleFilterButton from '@/Components/ToggleFilterButton';

const Index = ({ salesOrders, userOptions }) => {
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
    customer_name: urlParams.customer_name || '',
    sales_in_charge_id: urlParams.sales_in_charge_id || '',
    start_date: urlParams.start_date || '',
    end_date: urlParams.end_date || '',
  });

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      customer_name: '',
      sales_in_charge_id: '',
      start_date: '',
      end_date: '',
    })
  }

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


        <ToggleFilterButton
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        <div className="record-count">
          {salesOrders.total}件
        </div>
        <Pagination paginator={salesOrders} />
      </div>

      <form onSubmit={submit}>
        <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
          <div className="filter-form-body">
            <div className="u-mr-2">
              <FormLabel htmlFor="start_date" label="納品日" />
              <div className="u-flex">
                <DateInput
                  id="start_date"
                  value={data.start_date}
                  onChange={e => setData('start_date', e.target.value)}
                  error={errors.start_date}
                />
                <span className="u-mx-1">~</span>
                <DateInput
                  id="end_date"
                  value={data.end_date}
                  onChange={e => setData('end_date', e.target.value)}
                  error={errors.end_date}
                />
              </div>
            </div>

            <div className="u-mr-2 u-w-200">
              <FormLabel htmlFor="customer_name" label="販売先名" />
              <Input
                id="customer_name"
                type="text"
                value={data.customer_name}
                onChange={e => setData('customer_name', e.target.value)}
                error={errors.customer_name}
              />
            </div>

            <div className="u-mr-2 u-w-168">
              <FormLabel label="受注担当" />
              <CustomSelect
                onChange={value => setData('sales_in_charge_id', value)}
                options={userOptions}
                value={data.sales_in_charge_id}
                valueKey="id"
                labelKey="name"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.sales_in_charge_id}
              />
            </div>
          </div>
          <div className="filter-form-footer">
            <button className="btn btn-primary u-mr-3">
              検索
            </button>
            <Link
              href={route('sales-orders.index')}
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

      <SalesOrderTable salesOrders={salesOrders.data} />

    </>
  );
}

Index.layout = page => <AppLayout title="受注 一覧" children={page} />

export default Index
