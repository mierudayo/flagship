import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import PurchaseOrderTable from './Partials/PurchaseOrderTable';
import CustomSelect from '@/Components/Form/CustomSelect';
import DateRangePicker from '@/Components/DateRangePicker';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import ToggleFilterButton from '@/Components/ToggleFilterButton';
import FilterApplyButton from '@/Components/FilterApplyButton';

const Index = ({ purchaseOrders, userOptions, productCategoryOptions }) => {
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
    start_date: urlParams.start_date || '',
    end_date: urlParams.end_date || '',
    product_category_id: urlParams.product_category_id || '',
    product_name: urlParams.product_name || '',
    product_detail: urlParams.product_detail || '',
    customer_name: urlParams.customer_name || '',
    purchase_in_charge_id: urlParams.purchase_in_charge_id || '',
    ship_from: urlParams.ship_from || '',
  });

  function resetSearchInputs() {
    setData({
      ...data,
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
  }

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
          placeholder="発注No, 仕入先名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <DateRangePicker
          dateColumnLabel="発注日"
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
        <Pagination paginator={purchaseOrders} />
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
              <FormLabel htmlFor="customer_name" label="発注先名" />
              <Input
                id="customer_name"
                type="text"
                value={data.customer_name}
                onChange={e => setData('customer_name', e.target.value)}
                error={errors.customer_name}
              />
            </div>

            <div className="u-mr-2 u-w-168">
              <FormLabel label="発注担当" />
              <CustomSelect
                onChange={value => setData('purchase_in_charge_id', value)}
                options={userOptions}
                value={data.purchase_in_charge_id}
                valueKey="id"
                labelKey="name"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.purchase_in_charge_id}
              />
            </div>

            <div className="u-mr-2 u-w-200">
              <FormLabel htmlFor="ship_from" label="出荷元" />
              <Input
                id="ship_from"
                type="text"
                value={data.ship_from}
                onChange={e => setData('ship_from', e.target.value)}
                error={errors.ship_from}
                placeholder="住所/会社名"
              />
            </div>

          </div>
          <div className="filter-form-footer">
            <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
            <Link
              href={route('purchase-orders.index')}
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

      <PurchaseOrderTable purchaseOrders={purchaseOrders.data} />

    </>
  );
}

Index.layout = page => <AppLayout title="発注 一覧" children={page} />

export default Index
