import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import PurchaseOrderTable from './Partials/PurchaseOrderTable';
import DateRangePicker from '@/Components/DateRangePicker';
import ToggleFilterButton from '@/Components/ToggleFilterButton';
import { formatCurrency } from '@/Utils/priceCalculator';
import FilterForm from '@/Components/FilterForm';
import PurchaseOrderFilter from './Partials/PurchaseOrderFilter';
import PageSizeSelector from '@/Components/PageSizeSelector';

const Index = ({ purchaseOrders, userOptions, productCategoryOptions, totals }) => {
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
    start_date: urlParams.start_date || '',
    end_date: urlParams.end_date || '',
    product_category_id: urlParams.product_category_id || '',
    product_name: urlParams.product_name || '',
    product_detail: urlParams.product_detail || '',
    customer_name: urlParams.customer_name || '',
    purchase_in_charge_id: urlParams.purchase_in_charge_id || '',
    ship_from: urlParams.ship_from || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('purchase-orders.index'), {
      preserveState: true,
    });
  }

  const [prevPageSize, setPrevPageSize] = useState(data.page_size);

  if (data.page_size !== prevPageSize) {
    get(route('purchase-orders.index'), {
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
      purchase_in_charge_id: '',
      ship_from: '',
      start_date: '',
      end_date: '',
    })

    setPrevPageSize(100);
  }

  return (
    <>
      <div className="u-flex-wrap">
        <h1 className="content-title u-mr-4">発注 一覧</h1>

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
        </div>
      </div>


      <div className="content-navbar">
        <Link
          href={route('purchase-orders.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="発注No, 仕入先名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <DateRangePicker
          dateColumnLabel="出荷日"
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
          {purchaseOrders.total}件
        </div>

        <PageSizeSelector
          pageSize={data.page_size}
          onChange={e => setData('page_size', e.target.value)}
        />

        <Pagination paginator={purchaseOrders} />
      </div>

      <FilterForm submit={submit} isFilterOpen={isFilterOpen}>
        <PurchaseOrderFilter
          submit={submit}
          data={data}
          setData={setData}
          errors={errors}
          userOptions={userOptions}
          productCategoryOptions={productCategoryOptions}
          resetSearchInputs={resetSearchInputs}
        />
      </FilterForm>

      <Alert type={flash.type} message={flash.message} />

      <PurchaseOrderTable purchaseOrders={purchaseOrders.data} />

    </>
  );
}

Index.layout = page => <AppLayout title="発注 一覧" children={page} />

export default Index
