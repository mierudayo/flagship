import { Link } from '@inertiajs/react';

import FilterApplyButton from '@/Components/FilterApplyButton';
import CustomSelect from '@/Components/Form/CustomSelect';
import FormLabel from '@/Components/Form/FormLabel';

export default function SalesActivityFilter({ submit, data, setData, errors, inChargeUserOptions, resetSearchInputs }) {
  return (
    <>
      <div className="filter-form-body">
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

      </div>
      <div className="filter-form-footer">
        <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
        <Link
          href={route('sales-activities.index')}
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
