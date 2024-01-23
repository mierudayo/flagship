import { Link } from '@inertiajs/react';;

import CustomSelect from '@/Components/Form/CustomSelect';
import FilterApplyButton from '@/Components/FilterApplyButton';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';

export default function ContactFilter({ submit, data, setData, errors, leadSourceOptions, resetSearchInputs }) {
  return (
    <>
      <div className="filter-form-body">
        <div className="u-mr-2">
          <FormLabel htmlFor="contact_id" label="No" />
          <Input
            id="contact_id"
            type="number"
            value={data.contact_id}
            onChange={e => setData('contact_id', e.target.value)}
            error={errors.contact_id}
            className="u-max-w-80"
          />
        </div>

        <div className="u-mr-2">
          <FormLabel htmlFor="customer_name" label="所属取引先名" />
          <Input
            id="customer_name"
            type="text"
            value={data.customer_name}
            onChange={e => setData('customer_name', e.target.value)}
            error={errors.customer_name}
            className="u-max-w-200"
          />
        </div>

        <div className="u-mr-2">
          <FormLabel htmlFor="phone" label="TEL/携帯" />
          <Input
            id="phone"
            type="text"
            value={data.phone}
            onChange={e => setData('phone', e.target.value)}
            error={errors.phone}
            className="u-max-w-160"
          />
        </div>

        <div className="u-mr-2">
          <FormLabel htmlFor="email" label="E-mail" />
          <Input
            id="email"
            type="text"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            error={errors.email}
            className="u-max-w-200"
          />
        </div>

        <div className="u-mr-2 u-w-200">
          <FormLabel label="リード獲得元" />
          <CustomSelect
            onChange={value => setData('lead_source_id', value)}
            options={leadSourceOptions}
            value={data.lead_source_id}
            valueKey="id"
            labelKey="name"
            isClearable={true}
            isSearchable={true}
            placeholder="..."
            error={errors.lead_source_id}
          />
        </div>

      </div>
      <div className="filter-form-footer">
        <FilterApplyButton handleClick={submit} style={{ marginRight: '16px' }} />
        <Link
          href={route('contacts.index')}
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
