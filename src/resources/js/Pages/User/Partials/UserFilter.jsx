import { Link } from '@inertiajs/react';;

import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import FilterApplyButton from '@/Components/FilterApplyButton';


export default function UserFilter({ submit, data, setData, errors, resetSearchInputs }) {
  return (
    <>
      <div className="filter-form-body">
        <div className="u-mr-2">
          <FormLabel htmlFor="user_id" label="No." />
          <Input
            id="user_id"
            type="number"
            value={data.user_id}
            onChange={e => setData('user_id', e.target.value)}
            error={errors.user_id}
            className="u-w-88"
          />
        </div>

        <div className="u-mr-2">
          <FormLabel htmlFor="employee_code" label="社員番号" />
          <Input
            id="employee_code"
            type="text"
            value={data.employee_code}
            onChange={e => setData('employee_code', e.target.value)}
            error={errors.employee_code}
            className="u-w-112"
          />
        </div>

        <div className="u-mr-2">
          <FormLabel htmlFor="email" label="Email" />
          <Input
            id="email"
            type="text"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            error={errors.email}
            className="u-w-240"
          />
        </div>
      </div>
      <div className="filter-form-footer">
        <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
        <Link
          href={route('users.index')}
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
