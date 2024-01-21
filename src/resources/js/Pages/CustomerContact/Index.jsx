import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import ContactsTable from './Partials/ContactsTable';

import ToggleFilterButton from '@/Components/ToggleFilterButton';

import FilterForm from '@/Components/FilterForm';
import ContactFilter from './Partials/ContactFilter';

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

      <FilterForm submit={submit} isFilterOpen={isFilterOpen}>
        <ContactFilter
          submit={submit}
          data={data}
          setData={setData}
          errors={errors}
          leadSourceOptions={leadSourceOptions}
        />
      </FilterForm>

      <Alert type={flash.type} message={flash.message} />

      <ContactsTable contacts={customerContacts.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="連絡先 一覧" children={page} />

export default Index
