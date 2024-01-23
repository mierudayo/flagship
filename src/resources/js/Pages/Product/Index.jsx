import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import ProductTable from './Partials/ProductTable';

import ToggleFilterButton from '@/Components/ToggleFilterButton';
import FilterForm from '@/Components/FilterForm';
import ProductFilter from './Partials/ProductFilter';
import PageSizeSelector from '@/Components/PageSizeSelector';

const Index = ({ products, categoryOptions }) => {
  const urlParams = route().params;

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(urlParams).length > 0) {
      setIsFilterOpen(true);
    }
  }, []);

  const { data, setData, get, errors } = useForm({
    page_size: urlParams.page_size || 100,
    keyword: urlParams.keyword || '',
    product_number: urlParams.product_number || '',
    category_id: urlParams.category_id || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('products.index'), {
      preserveState: true,
    });
  };

  const [prevPageSize, setPrevPageSize] = useState(data.page_size);

  if (data.page_size !== prevPageSize) {
    get(route('products.index'), {
      preserveState: true,
    });
    setPrevPageSize(data.page_size);
  }

  function resetSearchInputs() {
    setData({
      ...data,
      page_size: 100,
      keyword: '',
      product_number: '',
      category_id: '',
    })

    setPrevPageSize(100);
  }

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

        <ToggleFilterButton
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        <div className="record-count">
          {products.total}件
        </div>

        <PageSizeSelector
          pageSize={data.page_size}
          onChange={e => setData('page_size', e.target.value)}
        />

        <Pagination paginator={products} />
      </div>

      <FilterForm submit={submit} isFilterOpen={isFilterOpen}>
        <ProductFilter
          submit={submit}
          data={data}
          setData={setData}
          errors={errors}
          categoryOptions={categoryOptions}
          resetSearchInputs={resetSearchInputs}
        />
      </FilterForm>

      <ProductTable products={products.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="商品 一覧" children={page} />

export default Index
