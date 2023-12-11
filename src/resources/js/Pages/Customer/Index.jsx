import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import MenuItem from '@mui/material/MenuItem';

import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import CustomSelect from '@/Components/Form/CustomSelect';
import DropdownMenu from '@/Components/DropdownMenu';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import CustomerTable from './Partials/CustomerTable';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import ToggleFilterButton from '@/Components/ToggleFilterButton';

const Index = ({ customers, inChargeUserOptions }) => {
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
    customer_id: urlParams.customer_id || '',
    address: urlParams.address || '',
    phone: urlParams.phone || '',
    in_charge_user_id: urlParams.in_charge_user_id || '',
  });

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      customer_id: '',
      address: '',
      phone: '',
      in_charge_user_id: '',
    })
  }

  function submit(e) {
    e.preventDefault();
    get(route('customers.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">取引先 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('customers.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <DropdownMenu
          buttonLabel="設定"
          buttonClassName="u-mr-3"
        >
          <Link href={route('billing-addresses.index')}>
            <MenuItem>
              請求先管理
            </MenuItem>
          </Link>
          <Link href={route('lead-sources.index')}>
            <MenuItem>
              リード獲得元管理
            </MenuItem>
          </Link>
        </DropdownMenu>

        <KeywordSearchForm
          placeholder="取引先名, ヨミガナで検索"
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
          {customers.total}件
        </div>
        <Pagination paginator={customers} />
      </div>

      <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
        <form onSubmit={submit}>
          <div className="filter-form-body">
            <div className="u-mr-2">
              <FormLabel htmlFor="customer_id" label="ID" />
              <Input
                id="customer_id"
                type="number"
                value={data.customer_id}
                onChange={e => setData('customer_id', e.target.value)}
                error={errors.customer_id}
                className="u-w-80"
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
              <FormLabel htmlFor="phone" label="連絡先" />
              <Input
                id="phone"
                type="text"
                value={data.phone}
                onChange={e => setData('phone', e.target.value)}
                error={errors.phone}
                className="u-w-200"
                placeholder="tel, fax"
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
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.in_charge_user_id}
              />
            </div>
          </div>
          <div className="filter-form-footer">
            <button
              className="btn btn-primary u-mr-3"
            >
              検索
            </button>
            <Link
              href={route('customers.index')}
              className="btn btn-secondary"
              preserveState={true}
              onSuccess={resetSearchInputs}
            >
              クリア
            </Link>
          </div>
        </form>
      </div>

      <Alert type="success" message={flash.message} />

      <CustomerTable customers={customers.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
