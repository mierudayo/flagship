import { useForm } from '@inertiajs/react';

import InvalidFeedback from '@/Components/Form/InvalidFeedback'


export default function CategoryGroupCreateForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    display_order: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('product-category-groups.store'), {
      onSuccess: () => {
        reset();
      }
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="form-inner">
        <div className="input-group">
          <label htmlFor="name" className="form-label">
            カテゴリグループ名
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
          <InvalidFeedback errors={errors} name="name" />
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
          <InvalidFeedback errors={errors} name="display_order" />
        </div>
        <button
          type="submit"
          className="btn btn-primary u-mt-3 u-mr-3"
          disabled={processing}
        >
          グループを追加
        </button>
      </div>
    </form>
  );
}
