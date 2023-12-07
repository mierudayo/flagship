import { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import InquiryTable from './Partials/InquiryTable';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import DateInput from '@/Components/Form/DateInput';

const Index = ({ inquiries }) => {
  const params = route().params;
  const { flash } = usePage().props;
  const [isOpen, setIsOpen] = useState(false);

  const { data, setData, get, errors, reset } = useForm({
    keyword: params.keyword || '',
    inquiry_id: params.inquiry_id || '',
    customer_info: params.customer_info || '',
    start_date: params.start_date || '',
    end_date: params.end_date || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('inquiries.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">問い合わせ 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('inquiries.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>
        <Link
          href={route('inquiry-types.index')}
          className="btn btn-secondary u-mr-3"
        >
          区分登録
        </Link>

        <KeywordSearchForm
          placeholder="件名、内容で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <button
          className="btn btn-secondary u-mr-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '詳細条件を閉じる' : '詳細条件を開く'}
        </button>

        <div className="record-count">
          {inquiries.total}件
        </div>
        <Pagination paginator={inquiries} />
      </div>

      <div className={`filter-section ${isOpen ? 'show' : ''}`}>
        <form onSubmit={submit}>
          <div className="filter-form-body">
            <div className="u-mr-2">
              <FormLabel htmlFor="inquiry_id" label="ID" />
              <Input
                id="inquiry_id"
                type="number"
                value={data.inquiry_id}
                onChange={e => setData('inquiry_id', e.target.value)}
                error={errors.inquiry_id}
                className="u-max-w-80"
              />
            </div>
            <div className="u-mr-2">
              <FormLabel htmlFor="start_date" label="問い合わせ日" />
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
            <div className="u-mr-2">
              <FormLabel htmlFor="customer_info" label="顧客情報" />
              <Input
                id="customer_info"
                type="text"
                value={data.customer_info}
                onChange={e => setData('customer_info', e.target.value)}
                error={errors.customer_info}
                className="u-max-w-200"
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
              href={route('inquiries.index')}
              className="btn btn-secondary"
              preserveState={true}
              onSuccess={() => {
                reset('keyword', 'inquiry_id', 'customer_info', 'start_date', 'end_date');
              }}
            >
              クリア
            </Link>
          </div>
        </form>
      </div>

      {flash.message && (
        <div className="alert alert-success">{flash.message}</div>
      )}

      <InquiryTable inquiries={inquiries.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
