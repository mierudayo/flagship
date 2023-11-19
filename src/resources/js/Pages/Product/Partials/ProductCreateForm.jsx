import { useForm } from '@inertiajs/react';


export default function ProductCreateForm({ categorySelectOptions }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    category_id: '',
    product_number: '',
    product_type: '',
    name: '',
    description: '',
    sales_price: '',
    purchase_price: '',
    display_order: '',
  });

  const productTypeOptions = [
    { label: '製品', value: 1 },
    { label: 'サービス', value: 2 },
  ];

  function submit(e) {
    e.preventDefault();
    post(route('products.store'), {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="form-inner u-mt-4">
        <div className="input-group">
          <label id="category_id" className="form-label">
            カテゴリ
            <span className="required-mark">*</span>
          </label>
          <select
            name="category_id"
            id="category_id"
            value={data.category_id}
            onChange={e => setData('category_id', e.target.value)}
            className={`input-field ${errors.category_id ? 'is-invalid' : ''}`}
          >
            <option value="">-- カテゴリを選択 --</option>
            {categorySelectOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.category_id}</div>
        </div>

        <div className="input-group">
          <label id="product_type" className="form-label">
            商品タイプ
            <span className="required-mark">*</span>
          </label>
          <select
            name="product_type"
            id="product_type"
            value={data.product_type}
            onChange={e => setData('product_type', e.target.value)}
            className={`input-field ${errors.product_type ? 'is-invalid' : ''}`}
          >
            <option value="">-- タイプを選択 --</option>
            {productTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">{errors.product_type}</div>
        </div>

        <div className="input-group">
          <label htmlFor="name" className="form-label">
            商品名
            <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            className={`input-field ${errors.name ? 'is-invalid' : ''}`}
            onChange={e => setData('name', e.target.value)}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="input-group">
          <label htmlFor="product_number" className="form-label">
            商品番号
          </label>
          <input
            type="text"
            id="product_number"
            name="product_number"
            value={data.product_number}
            className={`input-field ${errors.product_number ? 'is-invalid' : ''}`}
            onChange={e => setData('product_number', e.target.value)}
          />
          <div className="invalid-feedback">{errors.product_number}</div>
        </div>

        <div className="input-group">
          <label htmlFor="sales_price" className="form-label">
            販売単価
          </label>
          <input
            type="text"
            id="sales_price"
            name="sales_price"
            value={data.sales_price}
            className={`input-field ${errors.sales_price ? 'is-invalid' : ''}`}
            onChange={e => setData('sales_price', e.target.value)}
          />
          <div className="invalid-feedback">{errors.sales_price}</div>
        </div>

        <div className="input-group">
          <label htmlFor="purchase_price" className="form-label">
            仕入単価
          </label>
          <input
            type="text"
            id="purchase_price"
            name="purchase_price"
            value={data.purchase_price}
            className={`input-field ${errors.purchase_price ? 'is-invalid' : ''}`}
            onChange={e => setData('purchase_price', e.target.value)}
          />
          <div className="invalid-feedback">{errors.purchase_price}</div>
        </div>

        <div className="input-group">
          <label htmlFor="description" className="form-label">
            説明
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={data.description}
            className={`input-field ${errors.description ? 'is-invalid' : ''}`}
            onChange={e => setData('description', e.target.value)}
          />
          <div className="invalid-feedback">{errors.description}</div>
        </div>

        <div className="input-group">
          <label htmlFor="display_order" className="form-label">
            表示順
          </label>
          <input
            type="number"
            id="display_order"
            name="display_order"
            value={data.display_order}
            className={`input-field ${errors.display_order ? 'is-invalid' : ''}`}
            onChange={e => setData('display_order', e.target.value)}
            placeholder="数値を入力"
          />
          <div className="invalid-feedback">{errors.display_order}</div>
        </div>

        <button
          type="submit"
          className="btn btn-primary u-mt-3 u-mr-3"
          disabled={processing}
        >
          商品を追加
        </button>
      </div>
    </form>
  );
}
