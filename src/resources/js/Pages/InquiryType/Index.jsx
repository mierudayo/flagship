import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import InquiryTypeCreateForm from './Partials/InquiryTypeCreateForm';
import InquiryTypeTable from './Partials/InquiryTypeTable';

export default function Index({ inquiryTypes }) {
  const { flash } = usePage().props;

  return (
    <AppLayout>
      <h1 className="content-title">問い合わせ区分 管理</h1>

      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}

      <InquiryTypeCreateForm />

      <InquiryTypeTable inquiryTypes={inquiryTypes} />
    </AppLayout>
  );
}
