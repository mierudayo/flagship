import { usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import InquiryTypeCreateForm from './Partials/InquiryTypeCreateForm';
import InquiryTypeTable from './Partials/InquiryTypeTable';

const Index = ({ inquiryTypes }) => {
  const { flash } = usePage().props;

  return (
    <>
      <h1 className="content-title">問い合わせ区分 管理</h1>

      <Alert type="success" message={flash.message} />

      <InquiryTypeCreateForm />

      <InquiryTypeTable inquiryTypes={inquiryTypes} />
    </>
  );
}

Index.layout = page => <AppLayout title="問い合わせ区分 一覧" children={page} />

export default Index
