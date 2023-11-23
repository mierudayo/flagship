import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm, usePage } from "@inertiajs/react";
import CancelButton from '../../Components/CancelButton';
import TableRow from '../../Components/Table/TableRow';
import TableHeaderCell from '../../Components/Table/TableHeaderCell';
import TableDataCell from '../../Components/Table/TableDataCell';
import FormLabel from '../../Components/Form/FormLabel';
import RadioGroup from '../../Components/Form/RadioGroup';
import Input from '../../Components/Form/Input';
import Textarea from '../../Components/Form/Textarea';
import CustomSelect from '../../Components/Form/CustomSelect';

const Edit = ({ contact, userSelectOptions, customerSelectOptions }) => {
  const { flash } = usePage().props;

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    customer_id: contact.customer_id,
    name: contact.name,
    name_kana: contact.name_kana || '',
    tel: contact.tel || '',
    mobile_number: contact.mobile_number || '',
    email: contact.email || '',
    position: contact.position || '',
    role: contact.role || '',
    is_active: contact.is_active === 1,
    note: contact.note || '',
    in_charge_user_id: contact.in_charge_user_id || '',
  });

  function submit(e) {
    e.preventDefault();
    patch(route('contacts.update', contact), {
      onSuccess: () => {
        reset();
      }
    });
  };

  return (
    <>
      <h1 className="content-title">連絡先 編集</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="customerContactUpdateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('contacts.index')} />
        {processing && <span>Now Loading...</span>}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('contacts.destroy', contact)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
      </div>

      {flash.message && (
        <div className="alert alert-danger">{flash.message}</div>
      )}

      <form id="customerContactUpdateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
          <tbody className="tbody">
              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="所属取引先" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('customer_id', value)}
                    options={customerSelectOptions}
                    value={data.customer_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="所属取引先を選択..."
                  />
                  {errors.customer_id && (<div className="invalid-feedback">{errors.customer_id}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell className="u-w-160">
                  <FormLabel htmlFor="name" label="担当者名" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="name_kana" label="よみがな" isRequired={false} />
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
                  <FormLabel htmlFor="tel" label="TEL" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="tel"
                    type="text"
                    value={data.tel}
                    onChange={e => setData('tel', e.target.value)}
                  />
                  {errors.tel && (<div className="invalid-feedback">{errors.tel}</div>)}
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
                  <FormLabel htmlFor="email" label="E-mail" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="email"
                    type="text"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="position" label="役職" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="position"
                    type="text"
                    value={data.position}
                    onChange={e => setData('position', e.target.value)}
                  />
                  {errors.position && (<div className="invalid-feedback">{errors.position}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="role" label="役割" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="role"
                    type="text"
                    value={data.role}
                    onChange={e => setData('role', e.target.value)}
                  />
                  {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="is_active-true" label="使用状況" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell className="u-flex">
                  <RadioGroup
                    id="is_active"
                    options={[
                      { value: true, label: '使用中' },
                      { value: false, label: '使用不可' },
                    ]}
                    value={data.is_active}
                    onChange={e => setData('is_active', e.target.value === 'true')}
                    error={errors.is_active}
                  />
                  {errors.is_active && (<div className="invalid-feedback">{errors.is_active}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="note" label="備考" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Textarea
                    id="note"
                    value={data.note}
                    onChange={e => setData('note', e.target.value)}
                  />
                  {errors.note && (<div className="invalid-feedback">{errors.note}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel label="担当ユーザー" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <CustomSelect
                    onChange={value => setData('in_charge_user_id', value)}
                    options={userSelectOptions}
                    value={data.in_charge_user_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="担当ユーザーを選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </TableDataCell>
              </TableRow>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Edit.layout = page => <AppLayout children={page} />

export default Edit
