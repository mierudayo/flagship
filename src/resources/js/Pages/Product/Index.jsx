import Pagination from '@/Components/Pagination';
import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
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
        <form onSubmit={submit}>
          <div className="u-flex u-mr-3">
            <input
              type="search"
              name="keyword"
              value={data.keyword}
              onChange={(e) => setData('keyword', e.target.value)}
              className={`input-field ${errors.keyword ? 'is-invalid' : ''}`}
              placeholder="商品名で検索"
            />
            <button className="btn btn-secondary">検索</button>
          </div>
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </form>
        <div className="record-count u-mr-3">
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
