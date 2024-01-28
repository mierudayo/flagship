import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import ContentInfoBar from '@/Components/ContentInfoBar';
import CancelButton from '@/Components/CancelButton';
import CustomSelect from '@/Components/Form/CustomSelect';
import FormLabel from '@/Components/Form/FormLabel';
import DateInput from '@/Components/Form/DateInput';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import ProgressIndicator from '@/Components/ProgressIndicator';

const Edit = ({ user, permissionOptions }) => {
  const { data, setData, patch, processing, errors, isDirty } = useForm({
    permission_id: user.permission_id,
    employee_code: user.employee_code,
    name: user.name,
    name_kana: user.name_kana || '',
    email: user.email,
    mobile_number: user.mobile_number || '',
    employment_date: user.employment_date || '',
    resignation_date: user.resignation_date || '',
  });

  function submit(e) {
    e.preventDefault();
    patch(route('users.update', user));
  }

  return (
    <>
      <h1 className="content-title">ユーザー 編集</h1>

      <ContentInfoBar
        createdAt={user.created_at}
        updatedAt={user.updated_at}
      />

      <div className="content-navbar">
        <button
          type="submit"
          form="userCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('users.index')} />
        {processing && <ProgressIndicator />}
      </div>

      <FormErrorAlert errors={errors} />

      <form id="userCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="employee_code" label="社員番号" isRequired={true} />
                </th>
                <td className="td-cell">
                  <Input
                    id="employee_code"
                    type="text"
                    value={data.employee_code}
                    onChange={e => setData('employee_code', e.target.value)}
                    error={errors.employee_code}
                    className="u-w-160"
                  />
                  <InvalidFeedback errors={errors} name="employee_code" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="権限" isRequired={true} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('permission_id', value)}
                    options={permissionOptions}
                    value={data.permission_id}
                    valueKey="id"
                    labelKey="display_name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="権限を選択..."
                    error={errors.permission_id}
                  />
                  <InvalidFeedback errors={errors} name="permission_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="name" label="名前" isRequired={true} />
                </th>
                <td className="td-cell">
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                  />
                  <InvalidFeedback errors={errors} name="name" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="name_kana" label="よみがな" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="name_kana"
                    type="text"
                    value={data.name_kana}
                    onChange={e => setData('name_kana', e.target.value)}
                    error={errors.name_kana}
                  />
                  <InvalidFeedback errors={errors} name="name_kana" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="email" label="E-mail" isRequired={true} />
                </th>
                <td className="td-cell">
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                  />
                  <InvalidFeedback errors={errors} name="email" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="mobile_number" label="携帯番号" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="mobile_number"
                    type="text"
                    value={data.mobile_number}
                    onChange={e => setData('mobile_number', e.target.value)}
                    error={errors.mobile_number}
                    className="u-w-160"
                  />
                  <InvalidFeedback errors={errors} name="mobile_number" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="employment_date" label="入社日" isRequired={false} />
                </th>
                <td className="td-cell">
                  <DateInput
                    id="employment_date"
                    value={data.employment_date}
                    onChange={e => setData('employment_date', e.target.value)}
                    error={errors.employment_date}
                  />
                  <InvalidFeedback errors={errors} name="employment_date" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="resignation_date" label="退職日" isRequired={false} />
                </th>
                <td className="td-cell">
                  <DateInput
                    id="resignation_date"
                    value={data.resignation_date}
                    onChange={e => setData('resignation_date', e.target.value)}
                    error={errors.resignation_date}
                  />
                  <InvalidFeedback errors={errors} name="resignation_date" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Edit.layout = page => <AppLayout title="ユーザー 編集" children={page} />

export default Edit
