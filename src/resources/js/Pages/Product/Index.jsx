import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import ProductTable from './Partials/ProductTable';
import CustomSelect from '@/Components/Form/CustomSelect';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import ToggleFilterButton from '@/Components/ToggleFilterButton';

const Index = ({ products, categoryOptions }) => {
  const urlParams = route().params;

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(urlParams).length > 0) {
      setIsFilterOpen(true);
    }
  }, []);

  const { data, setData, get, errors } = useForm({
    keyword: urlParams.keyword || '',
    product_number: urlParams.product_number || '',
    category_id: urlParams.category_id || '',
  });


  function resetSearchInputs() {
    setData({
      ...data,
      keyword: '',
      product_number: '',
      category_id: '',
    })
  }

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

        <ToggleFilterButton
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />

        <div className="record-count">
          {products.total}件
        </div>
        <Pagination paginator={products} />
      </div>

      <form onSubmit={submit}>
        <div className={`filter-section ${isFilterOpen ? 'show' : ''}`}>
          <div className="filter-form-body">

            <div className="u-mr-2 u-min-w-96">
              <FormLabel htmlFor="product_number" label="商品番号" />
              <Input
                id="product_number"
                type="text"
                value={data.product_number}
                onChange={e => setData('product_number', e.target.value)}
                error={errors.product_number}
              />
            </div>

            <div className="u-mr-2 u-min-w-200">
              <FormLabel htmlFor="category_id" label="カテゴリ" />
              <CustomSelect
                onChange={value => setData('category_id', value)}
                options={categoryOptions}
                value={data.category_id}
                valueKey="id"
                labelKey="name"
                isClearable={true}
                isSearchable={true}
                placeholder="..."
                error={errors.category_id}
              />
            </div>

          </div>
          <div className="filter-form-footer">
            <button className="btn btn-primary u-mr-3">
              検索
            </button>
            <Link
              href={route('products.index')}
              className="btn btn-secondary"
              preserveState={true}
              onSuccess={resetSearchInputs}
            >
              クリア
            </Link>
          </div>
        </div>
      </form>

      <ProductTable products={products.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="商品 一覧" children={page} />

export default Index
