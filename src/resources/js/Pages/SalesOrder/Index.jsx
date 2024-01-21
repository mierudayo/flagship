import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import SalesOrderTable from "./Partials/SalesOrderTable";

import CustomSelect from '@/Components/Form/CustomSelect';
import DateRangePicker from '@/Components/DateRangePicker';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import ToggleFilterButton from '@/Components/ToggleFilterButton';
import { formatCurrency } from '@/Utils/priceCalculator';
import FilterApplyButton from '@/Components/FilterApplyButton';

const Index = ({ salesOrders, userOptions, productCategoryOptions, totals }) => {
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
    product_category_id: urlParams.product_category_id || '',
    product_name: urlParams.product_name || '',
    product_detail: urlParams.product_detail || '',
    customer_name: urlParams.customer_name || '',
    sales_in_charge_id: urlParams.sales_in_charge_id || '',
    consignee: urlParams.consignee || '',
    start_date: urlParams.start_date || '',
    end_date: urlParams.end_date || '',
  });

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      product_category_id: '',
      product_name: '',
      product_detail: '',
      customer_name: '',
      sales_in_charge_id: '',
      consignee: '',
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
        <Pagination paginator={salesOrders} />
      </div>

      <form onSubmit={submit}>
        <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
          <div className="filter-form-body">
            <div className="u-mr-2 u-w-240">
              <FormLabel label="商品カテゴリ" />
              <CustomSelect
                onChange={value => setData('product_category_id', value)}
                options={productCategoryOptions}
                value={data.product_category_id}
                valueKey="id"
                labelKey="name"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.product_category_id}
              />
            </div>

            <div className="u-mr-2 u-w-200">
              <FormLabel htmlFor="product_name" label="商品名" />
              <Input
                id="product_name"
                type="text"
                value={data.product_name}
                onChange={e => setData('product_name', e.target.value)}
                error={errors.product_name}
              />
            </div>

            <div className="u-mr-2 u-w-200">
              <FormLabel htmlFor="product_detail" label="仕様" />
              <Input
                id="product_detail"
                type="text"
                value={data.product_detail}
                onChange={e => setData('product_detail', e.target.value)}
                error={errors.product_detail}
              />
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

            <div className="u-mr-2 u-w-200">
              <FormLabel htmlFor="consignee" label="納品先" />
              <Input
                id="consignee"
                type="text"
                value={data.consignee}
                onChange={e => setData('consignee', e.target.value)}
                error={errors.consignee}
                placeholder="住所/会社名"
              />
            </div>

          </div>
          <div className="filter-form-footer">
            <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
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

      <Alert type={flash.type} message={flash.message} />

      <SalesOrderTable salesOrders={salesOrders.data} />

    </>
  );
}

Index.layout = page => <AppLayout title="受注 一覧" children={page} />

export default Index
