import { Link } from '@inertiajs/react';

import CustomSelect from '@/Components/Form/CustomSelect';
import FilterApplyButton from '@/Components/FilterApplyButton';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';

export default function SalesOrderFilter({ submit, data, setData, errors, userOptions, purchaseInChargeOptions, productCategoryOptions, resetSearchInputs }) {
  return (
    <>
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
            searchKey="name_kana"
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

        <div className="u-mr-2 u-w-200">
          <FormLabel htmlFor="supplier_name" label="仕入先名" />
          <Input
            id="supplier_name"
            type="text"
            value={data.supplier_name}
            onChange={e => setData('supplier_name', e.target.value)}
            error={errors.supplier_name}
          />
        </div>

        <div className="u-mr-2 u-w-168">
          <FormLabel label="仕入担当" />
          <CustomSelect
            onChange={value => setData('purchase_in_charge_id', value)}
            options={purchaseInChargeOptions}
            value={data.purchase_in_charge_id}
            valueKey="id"
            labelKey="name"
            searchKey="name_kana"
            isClearable={true}
            isSearchable={true}
            placeholder="..."
            error={errors.purchase_in_charge_id}
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
    </>
  );
}
