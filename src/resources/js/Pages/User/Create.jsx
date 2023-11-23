import { useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from '@inertiajs/react';
import CustomSelect from '../../Components/Form/CustomSelect';
import CancelButton from '../../Components/CancelButton';
import TableRow from '../../Components/Table/TableRow';
import TableHeaderCell from '../../Components/Table/TableHeaderCell';
import TableDataCell from '../../Components/Table/TableDataCell';
import FormLabel from '../../Components/Form/FormLabel';
import Input from '../../Components/Form/Input';

const Create = ({ permissionSelectOptions }) => {
  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    permission_id: '',
    employee_code: '',
    name: '',
    name_kana: '',
    email: '',
    password: '',
    password_confirmation: '',
    mobile_number: '',
    employment_date: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  function submit(e) {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <>
      <h1 className="content-title">ユーザー 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="userCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('users.index')} />
        {processing && <span>Now Loading...</span>}
      </div>
      <form id="userCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <TableRow className="is-flexible">
                <TableHeaderCell className="u-w-200">
                  <FormLabel htmlFor="employee_code" label="社員番号" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="employee_code"
                    type="text"
                    value={data.employee_code}
                    onChange={e => setData('employee_code', e.target.value)}
                  />
                  {errors.employee_code && (<div className="invalid-feedback">{errors.employee_code}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="権限" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('permission_id', value)}
                    options={permissionSelectOptions}
                    value={data.permission_id}
                    valueKey="id"
                    labelKey="display_name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="権限を選択..."
                  />
                  {errors.permission_id && (<div className="invalid-feedback">{errors.permission_id}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="name" label="名前" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="name"
                    type="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="name_kana" label="読み仮名" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="name_kana"
                    type="text"
                    value={data.name_kana}
                    onChange={e => setData('name_kana', e.target.value)}
                  />
                  {errors.name_kana && (<div className="invalid-feedback">{errors.name_kana}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="email" label="E-mail" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="password" label="Password" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="password"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="password_confirmation" label="Password確認" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                  />
                  {errors.password_confirmation && (<div className="invalid-feedback">{errors.password_confirmation}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="mobile_number" label="携帯番号" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="mobile_number"
                    type="text"
                    value={data.mobile_number}
                    onChange={e => setData('mobile_number', e.target.value)}
                  />
                  {errors.mobile_number && (<div className="invalid-feedback">{errors.mobile_number}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="employment_date" label="入社日" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="employment_date"
                    type="date"
                    value={data.employment_date}
                    onChange={e => setData('employment_date', e.target.value)}
                  />
                  {errors.employment_date && (<div className="invalid-feedback">{errors.employment_date}</div>)}
                </TableDataCell>
              </TableRow>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Create.layout = page => <AppLayout children={page} />

export default Create
