import AppLayout from '@/Layouts/AppLayout';
import { useForm } from "@inertiajs/react";
import Select from 'react-select'
import CancelButton from '../../Components/CancelButton';
import TableInputRow from '../../Components/TableInputRow';
import TableRow from '../../Components/Table/TableRow';
import TableHeaderCell from '../../Components/Table/TableHeaderCell';
import TableDataCell from '../../Components/Table/TableDataCell';
import FormLabel from '../../Components/Form/FormLabel';

const Edit = ({ user, permissionSelectOptions }) => {
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

  const permissionOptions = permissionSelectOptions.map(permission => ({ ...permission, value: permission.id, label: permission.display_name }));

  function submit(e) {
    e.preventDefault();
    patch(route('users.update', user));
  };

  return (
    <>
      <h1 className="content-title">ユーザー 編集</h1>
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
        {processing && <span>Now Loading...</span>}
      </div>
      <form id="userCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <TableInputRow labelName="社員番号" inputName="employee_code" data={data} errors={errors} setData={setData} isRequired={true} widthClass="u-w-200" />

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="権限" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Select
                    value={permissionOptions.find(obj => obj.id === data.permission_id)}
                    onChange={obj => setData('permission_id', obj?.id)}
                    options={permissionOptions}
                    isClearable={true}
                    isSearchable={true}
                    placeholder="権限を選択..."
                    noOptionsMessage={() => "該当する選択肢がありません"}
                  />
                  {errors.permission_id && (<div className="invalid-feedback">{errors.permission_id}</div>)}
                </TableDataCell>
              </TableRow>

              <TableInputRow labelName="名前" inputName="name" data={data} errors={errors} setData={setData} isRequired={true} />

              <TableInputRow labelName="読み仮名" inputName="name_kana" data={data} errors={errors} setData={setData} />

              <TableInputRow type="email" labelName="E-mail" inputName="email" data={data} errors={errors} setData={setData} isRequired={true} />

              <TableInputRow labelName="携帯番号" inputName="mobile_number" data={data} errors={errors} setData={setData} />

              <TableInputRow type="date" labelName="入社日" inputName="employment_date" data={data} errors={errors} setData={setData} />

              <TableInputRow type="date" labelName="退職日" inputName="resignation_date" data={data} errors={errors} setData={setData} />
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Edit.layout = page => <AppLayout children={page} />

export default Edit
