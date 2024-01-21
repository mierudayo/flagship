import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import ContactsTable from './Partials/ContactsTable';

import CustomSelect from '@/Components/Form/CustomSelect';
import Input from '@/Components/Form/Input';
import FormLabel from '@/Components/Form/FormLabel';
import ToggleFilterButton from '@/Components/ToggleFilterButton';
import FilterApplyButton from '@/Components/FilterApplyButton';

const Index = ({ customerContacts, leadSourceOptions }) => {
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
    contact_id: urlParams.contact_id || '',
    customer_name: urlParams.customer_name || '',
    phone: urlParams.phone || '',
    email: urlParams.email || '',
    lead_source_id: urlParams.lead_source_id || '',
  });

  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      contact_id: '',
      customer_name: '',
      phone: '',
      email: '',
      lead_source_id: '',
    })
  }

  function submit(e) {
    e.preventDefault();
    get(route('contacts.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">連絡先 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('contacts.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="名前, ヨミガナで検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <ToggleFilterButton isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />

        <div className="record-count">
          {customerContacts.total}件
        </div>
        <Pagination paginator={customerContacts} />
      </div>

      <form onSubmit={submit}>
        <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
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
              <FormLabel htmlFor="customer_info" label="所属取引先名" />
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
        </div>
      </form>

      <Alert type={flash.type} message={flash.message} />

      <ContactsTable contacts={customerContacts.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="連絡先 一覧" children={page} />

export default Index
