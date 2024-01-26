import { Link } from '@inertiajs/react';;

import CustomSelect from '@/Components/Form/CustomSelect';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import FilterApplyButton from '@/Components/FilterApplyButton';


export default function UserFilter({ submit, data, setData, errors, inChargeUserOptions, resetSearchInputs}) {
  return (
    <>
      <div className="filter-form-body">
        <div className="u-mr-2">
          <FormLabel htmlFor="customer_id" label="取引先No." />
          <Input
            id="customer_id"
            type="number"
            value={data.customer_id}
            onChange={e => setData('customer_id', e.target.value)}
            error={errors.customer_id}
            className="u-w-88"
          />
        </div>
        <div className="u-mr-2">
          <FormLabel htmlFor="address" label="住所" />
          <Input
            id="address"
            type="text"
            value={data.address}
            onChange={e => setData('address', e.target.value)}
            error={errors.address}
            className="u-w-240"
          />
        </div>
        <div className="u-mr-2">
          <FormLabel htmlFor="phone" label="TEL/FAX" />
          <Input
            id="phone"
            type="text"
            value={data.phone}
            onChange={e => setData('phone', e.target.value)}
            error={errors.phone}
            className="u-w-200"
          />
        </div>
        <div className="u-mr-2 u-w-200">
          <FormLabel label="自社担当ユーザー" />
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
        <div className="u-mr-2">
          <FormLabel htmlFor="delivery_address" label="配送先住所" />
          <Input
            id="delivery_address"
            type="text"
            value={data.delivery_address}
            onChange={e => setData('delivery_address', e.target.value)}
            error={errors.delivery_address}
            className="u-w-240"
          />
        </div>
      </div>
      <div className="filter-form-footer">
        <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
        <Link
          href={route('customers.index')}
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
