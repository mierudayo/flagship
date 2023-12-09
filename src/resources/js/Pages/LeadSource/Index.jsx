import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import LeadSourceCreateForm from './Partials/LeadSourceCreateForm';
import LeadSourceTable from './Partials/LeadSourceTable';

const Index = ({ leadSources }) => {
  const { flash } = usePage().props;

  return (
    <>
      <h1 className="content-title">顧客獲得元 管理</h1>

      <LeadSourceCreateForm />

      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}

      <LeadSourceTable leadSources={leadSources} />

    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
