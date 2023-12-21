import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import CustomSelect from '@/Components/Form/CustomSelect';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import SalesActivityTable from './Partials/SalesActivityTable';
import FormLabel from '@/Components/Form/FormLabel';
import DateInput from '@/Components/Form/DateInput';
import ToggleFilterButton from '@/Components/ToggleFilterButton';

const Index = ({ salesActivities, inChargeUserOptions }) => {
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
    in_charge_user_id: urlParams.in_charge_user_id || '',
  });

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      start_date: '',
      end_date: '',
      in_charge_user_id: '',
    })
  }

  function submit(e) {
    e.preventDefault();
    get(route('sales-activities.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">営業履歴 一覧</h1>
      <div className="content-navbar">
        <Link
          // href={route('sales-activities.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="顧客名・取引先名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <ToggleFilterButton isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />

        <div className="record-count">
          {salesActivities.total}件
        </div>
        <Pagination paginator={salesActivities} />
      </div>

      <form onSubmit={submit}>
        <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
          <div className="filter-form-body">
          <div className="u-mr-2">
              <FormLabel htmlFor="start_date" label="期間" />
              <div className="u-flex">
                <DateInput
                  id="start_date"
                  value={data.start_date}
                  onChange={e => setData('start_date', e.target.value)}
                  error={errors.start_date}
                />
                <span className="u-mx-1">~</span>
                <DateInput
                  id="end_date"
                  value={data.end_date}
                  onChange={e => setData('end_date', e.target.value)}
                  error={errors.end_date}
                />
              </div>
            </div>

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
            <button className="btn btn-primary u-mr-3">
              検索
            </button>
            <Link
              href={route('sales-activities.index')}
              className="btn btn-secondary"
              preserveState={true}
              onSuccess={resetSearchInputs}
            >
              クリア
            </Link>
          </div>
        </div>
      </form>

      <Alert type="success" message={flash.message} />

      <SalesActivityTable salesActivities={salesActivities.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="営業履歴 一覧" children={page} />

export default Index
