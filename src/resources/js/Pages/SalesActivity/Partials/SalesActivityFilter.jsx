import { Link } from '@inertiajs/react';;

import CustomSelect from '@/Components/Form/CustomSelect';
import FilterApplyButton from '@/Components/FilterApplyButton';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';

export default function UserFilter({ submit, data, setData, errors, inChargeUserOptions }) {

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      start_date: '',
      end_date: '',
      in_charge_user_id: '',
    })
  }

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
