import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import ProductTable from './Partials/ProductTable';

const Index = ({ productsPaginator }) => {
  const params = route().params;

  const { data, setData, get, errors } = useForm({
    keyword: params.keyword || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('products.index'), {
      preserveState: true,
    });
  };

  return (
    <>
      <h1 className="content-title">商品一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('products.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <KeywordSearchForm
          placeholder="商品名で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <div className="record-count">
          {productsPaginator.total}件
        </div>
        <Pagination paginator={productsPaginator} />
      </div>
      <ProductTable products={productsPaginator.data} />
    </>
  );
}

Index.layout = page => <AppLayout children={page} />

export default Index
