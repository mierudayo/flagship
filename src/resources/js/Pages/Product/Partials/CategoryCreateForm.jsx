import { useForm } from '@inertiajs/react';

import InvalidFeedback from '@/Components/Form/InvalidFeedback'

export default function CategoryCreateForm({ groupOptions }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    group_id: '',
    name: '',
    display_order: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('product-categories.store'), {
      onSuccess: () => {
        reset();
      }
    });
  }

  return (
    <form onSubmit={submit}>
      <div className="form-inner u-mt-4">
        <div className="input-group">
          <label htmlFor="group_id" className="form-label">
            カテゴリグループ
            <span className="required-mark">*</span>
          </label>
          <select
            name="group_id"
            id="group_id"
            value={data.group_id}
            onChange={e => setData('group_id', e.target.value)}
            className={`input-field ${errors.group_id ? 'is-invalid' : ''}`}
          >
            <option value="">-- カテゴリグループを選択 --</option>
            {groupOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <InvalidFeedback errors={errors} name="group_id" />
        </div>
        <div className="input-group">
          <label htmlFor="name" className="form-label">
            カテゴリ名
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
          カテゴリを追加
        </button>
      </div>
    </form>
  );
}
