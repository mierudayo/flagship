import { useForm } from '@inertiajs/react';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'

export default function LeadSourceCreateForm() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    display_order: '',
  });


  function submit(e) {
    e.preventDefault();
    post(route('lead-sources.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={submit}>
      <div className="form-inner u-my-2">
        <div className="input-group">
          <FormLabel htmlFor="name" label="獲得元名" isRequired={true} />
          <Input
            id="name"
            type="text"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            error={errors.name}
            className="u-w-240"
          />
          <InvalidFeedback errors={errors} name="name" />
        </div>

        <div className="input-group">
          <FormLabel htmlFor="display_order" label="表示順" isRequired={false} />
          <Input
            id="display_order"
            type="number"
            value={data.display_order}
            onChange={e => setData('display_order', e.target.value)}
            error={errors.display_order}
            className="u-w-240"
            placeholder="数値を入力"
          />
          <InvalidFeedback errors={errors} name="display_order" />
        </div>

        <button
          type="submit"
          className="btn btn-primary u-mt-3 u-mr-3"
          disabled={processing}
        >
          追加する
        </button>
      </div>
    </form>
  );
}
