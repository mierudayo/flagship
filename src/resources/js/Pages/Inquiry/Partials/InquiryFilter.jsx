import { Link } from '@inertiajs/react';

import CustomSelect from '@/Components/Form/CustomSelect';
import FilterApplyButton from '@/Components/FilterApplyButton';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';

export default function InquiryFilter({ submit, data, setData, errors, productOptions, inChargeUserOptions, inquiryTypeOptions, inquiryStatusOptions, resetSearchInputs }) {

  return (
    <>
      <div className="filter-form-body">
        <div className="u-mr-2">
          <FormLabel htmlFor="inquiry_id" label="No" />
          <Input
            id="inquiry_id"
            type="number"
            value={data.inquiry_id}
            onChange={e => setData('inquiry_id', e.target.value)}
            error={errors.inquiry_id}
            className="u-max-w-80"
          />
        </div>

        <div className="u-mr-2">
          <FormLabel htmlFor="customer_info" label="顧客情報" />
          <Input
            id="customer_info"
            type="text"
            value={data.customer_info}
            onChange={e => setData('customer_info', e.target.value)}
            error={errors.customer_info}
            className="u-max-w-200"
          />
        </div>

        <div className="u-mr-2 u-min-w-200">
          <FormLabel label="対象商品" />
          <CustomSelect
            onChange={value => setData('product_id', value)}
            options={productOptions}
            value={data.product_id}
            valueKey="id"
            labelKey="name"
            isClearable={true}
            isSearchable={true}
            placeholder="..."
            error={errors.product_id}
          />
        </div>

        <div className="u-mr-2 u-min-w-200">
          <FormLabel label="担当者" />
          <CustomSelect
            onChange={value => setData('in_charge_user_id', value)}
            options={inChargeUserOptions}
            value={data.in_charge_user_id}
            valueKey="id"
            labelKey="name"
            searchKey="name_kana"
            isClearable={true}
            isSearchable={true}
            placeholder="..."
            error={errors.in_charge_user_id}
          />
        </div>

        <div className="u-mr-2 u-min-w-160">
          <FormLabel label="ステータス" />
          <CustomSelect
            onChange={value => setData('status', value)}
            options={inquiryStatusOptions}
            value={data.status}
            valueKey="value"
            labelKey="label"
            isClearable={true}
            isSearchable={true}
            placeholder="..."
            error={errors.status}
          />
        </div>

        <div className="u-mr-2 u-min-w-160">
          <FormLabel label="区分" />
          <CustomSelect
            onChange={value => setData('inquiry_type_id', value)}
            options={inquiryTypeOptions}
            value={data.inquiry_type_id}
            valueKey="id"
            labelKey="name"
            isClearable={true}
            isSearchable={true}
            placeholder="..."
            error={errors.inquiry_type_id}
          />
        </div>
      </div>
      <div className="filter-form-footer">
        <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
        <Link
          href={route('inquiries.index')}
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
