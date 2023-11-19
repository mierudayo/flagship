import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import InquiryTypeCreateForm from './Partials/InquiryTypeCreateForm';
import InquiryTypeTable from './Partials/InquiryTypeTable';

const Index = ({ inquiryTypes }) => {
  const { flash } = usePage().props;

  return (
    <>
      <h1 className="content-title">問い合わせ区分 管理</h1>

      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}

      <InquiryTypeCreateForm />

      <InquiryTypeTable inquiryTypes={inquiryTypes} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
