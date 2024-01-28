import { usePage } from '@inertiajs/react';

import LeadSourceCreateForm from './Partials/LeadSourceCreateForm';
import LeadSourceTable from './Partials/LeadSourceTable';

import Alert from '@/Components/Alert';
import AppLayout from '@/Layouts/AppLayout';

const Index = ({ leadSources }) => {
  const { flash } = usePage().props;

  return (
    <>
      <h1 className="content-title">リード獲得元 管理</h1>

      <LeadSourceCreateForm />

      <Alert type={flash.type} message={flash.message} />

      <LeadSourceTable leadSources={leadSources} />

    </>
  );
}

Index.layout = page => <AppLayout title="リード獲得元 一覧" children={page} />

export default Index
