import { Link } from '@inertiajs/react';

import CustomSelect from '@/Components/Form/CustomSelect';
import FilterApplyButton from '@/Components/FilterApplyButton';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';

export default function ProductFilter({ submit, data, setData, errors, categoryOptions, resetSearchInputs }) {
  return (
    <>
      <div className="filter-form-body">

        <div className="u-mr-2 u-min-w-96">
          <FormLabel htmlFor="product_number" label="商品番号" />
          <Input
            id="product_number"
            type="text"
            value={data.product_number}
            onChange={e => setData('product_number', e.target.value)}
            error={errors.product_number}
          />
        </div>

        <div className="u-mr-2 u-min-w-200">
          <FormLabel label="カテゴリ" />
          <CustomSelect
            onChange={value => setData('category_id', value)}
            options={categoryOptions}
            value={data.category_id}
            valueKey="id"
            labelKey="name"
            isClearable={true}
            isSearchable={true}
            placeholder="..."
            error={errors.category_id}
          />
        </div>

      </div>
      <div className="filter-form-footer">
        <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
        <Link
          href={route('products.index')}
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
