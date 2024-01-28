import { useState, useEffect } from 'react';

import { Link, useForm, usePage } from '@inertiajs/react';

import SalesOrderFilter from './Partials/SalesOrderFilter';
import SalesOrderTable from './Partials/SalesOrderTable';

import Alert from '@/Components/Alert';
import DateRangePicker from '@/Components/DateRangePicker';
import FilterForm from '@/Components/FilterForm';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import PageSizeSelector from '@/Components/PageSizeSelector';
import Pagination from '@/Components/Pagination';
import ToggleFilterButton from '@/Components/ToggleFilterButton';
import AppLayout from '@/Layouts/AppLayout';
import { formatCurrency } from '@/Utils/priceCalculator';

const Index = ({ salesOrders, userOptions, purchaseInChargeOptions, productCategoryOptions, totals }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(urlParams).length > 0) {
      setIsFilterOpen(true);
    }
  }, []);

  const { data, setData, get, errors } = useForm({
    page_size: urlParams.page_size || 100,
    keyword: urlParams.keyword || '',
    product_category_id: urlParams.product_category_id || '',
    product_name: urlParams.product_name || '',
    product_detail: urlParams.product_detail || '',
    customer_name: urlParams.customer_name || '',
    sales_in_charge_id: urlParams.sales_in_charge_id || '',
    consignee: urlParams.consignee || '',
    supplier_name: urlParams.supplier_name || '',
    start_date: urlParams.start_date || '',
    end_date: urlParams.end_date || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('sales-orders.index'), {
      preserveState: true,
    });
  }

  const [prevPageSize, setPrevPageSize] = useState(data.page_size);

  if (data.page_size !== prevPageSize) {
    get(route('sales-orders.index'), {
      preserveState: true,
    });
    setPrevPageSize(data.page_size);
  }

  function resetSearchInputs() {
    setData({
      ...data,
      page_size: 100,
      keyword: '',
      product_category_id: '',
      product_name: '',
      product_detail: '',
      customer_name: '',
      sales_in_charge_id: '',
      consignee: '',
      supplier_name: '',
      purchase_in_charge_id: '',
      start_date: '',
      end_date: '',
    })

    setPrevPageSize(100);
  }

  return (
    <>
      <div className="u-flex-wrap">
        <h1 className="content-title u-mr-4">受注 一覧</h1>

        <div className="u-flex-wrap">
          <div className="u-flex u-mr-4 u-items-center">
            <span className="u-min-w-64">
              <span className="indicator-dot dot-pink"></span>
              発注額
            </span>
            <span>
              {formatCurrency(totals.poTotal)}
            </span>
            <span className="u-text-sm">
              ({formatCurrency(totals.poTotalWithTax)})
            </span>
          </div>
          <div className="u-flex u-mr-4 u-items-center">
            <span className="u-min-w-64">
              <span className="indicator-dot dot-blue"></span>
              受注額
            </span>
            <span>
              {formatCurrency(totals.soTotal)}
            </span>
            <span className="u-text-sm">
              ({formatCurrency(totals.soTotalWithTax)})
            </span>
          </div>
          <div className="u-flex u-items-center">
            <span className="u-min-w-48">
              <span className="indicator-dot dot-green"></span>
              利益
            </span>
            <span>
              {formatCurrency(totals.profit)}
            </span>
          </div>
        </div>
      </div>

      <div className="content-navbar">
        <Link
          href={route('sales-orders.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="受注No, 販売先名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <DateRangePicker
          dateColumnLabel="納品日"
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

        <PageSizeSelector
          pageSize={data.page_size}
          onChange={e => setData('page_size', e.target.value)}
        />

        <Pagination paginator={salesOrders} />
      </div>

      <FilterForm submit={submit} isFilterOpen={isFilterOpen}>
        <SalesOrderFilter
          submit={submit}
          data={data}
          setData={setData}
          errors={errors}
          userOptions={userOptions}
          purchaseInChargeOptions={purchaseInChargeOptions}
          productCategoryOptions={productCategoryOptions}
          resetSearchInputs={resetSearchInputs}
        />
      </FilterForm>

      <Alert type={flash.type} message={flash.message} />

      <SalesOrderTable salesOrders={salesOrders.data} />

    </>
  );
}

Index.layout = page => <AppLayout title="受注 一覧" children={page} />

export default Index
