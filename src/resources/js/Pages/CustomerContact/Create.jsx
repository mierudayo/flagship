import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import FormLabel from '@/Components/Form/FormLabel';
import RadioGroup from '@/Components/Form/RadioGroup';
import Input from '@/Components/Form/Input';
import Textarea from '@/Components/Form/Textarea';
import CustomSelect from '@/Components/Form/CustomSelect';
import CustomerLookup from '@/Components/CustomerLookup';
import Modal from '@/Components/Modal';

const Create = ({ userSelectOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    customer_id: '',
    name: '',
    name_kana: '',
    tel: '',
    mobile_number: '',
    email: '',
    position: '',
    role: '',
    is_active: true,
    note: '',
    in_charge_user_id: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('contacts.store'), {
      onSuccess: () => {
        reset();
      }
    });
  };

  function selectCustomer(customer) {
    setData('customer_id', customer.id);
    setCustomerName(customer.name);
    setIsModalOpen(false);
  }

  return (
    <>
      <h1 className="content-title">連絡先 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="customerContactCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('contacts.index')} />
        {processing && <span>Now Loading...</span>}
      </div>

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="取引先 呼び出し">
          <CustomerLookup
            handleClickSelect={customer => selectCustomer(customer)}
          />
        </Modal>}

      <form id="customerContactCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="所属取引先" isRequired={true} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
                    <Input
                      type="text"
                      value={data.customer_id}
                      className="u-max-w-64"
                      placeholder="ID"
                      readOnly={true}
                    />
                    <Input
                      type="text"
                      value={customerName}
                      className="u-max-w-240"
                      placeholder=" 取引先名"
                      readOnly={true}
                    />
                    <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
                      <ManageSearchIcon />
                    </button>
                  </div>
                  {errors.customer_id && (<div className="invalid-feedback">{errors.customer_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="name" label="担当者名" isRequired={true} />
                </th>
                <td className="td-cell">
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                  />
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
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
                  {errors.name_kana && (<div className="invalid-feedback">{errors.name_kana}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="tel" label="TEL" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="tel"
                    type="text"
                    value={data.tel}
                    onChange={e => setData('tel', e.target.value)}
                    error={errors.tel}
                  />
                  {errors.tel && (<div className="invalid-feedback">{errors.tel}</div>)}
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
                  />
                  {errors.mobile_number && (<div className="invalid-feedback">{errors.mobile_number}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="email" label="E-mail" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="email"
                    type="text"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                  />
                  {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="position" label="役職" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="position"
                    type="text"
                    value={data.position}
                    onChange={e => setData('position', e.target.value)}
                    error={errors.position}
                  />
                  {errors.position && (<div className="invalid-feedback">{errors.position}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="role" label="役割" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="role"
                    type="text"
                    value={data.role}
                    onChange={e => setData('role', e.target.value)}
                    error={errors.role}
                  />
                  {errors.role && (<div className="invalid-feedback">{errors.role}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="is_active-true" label="使用状況" isRequired={true} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
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
                  </div>
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="note" label="備考" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Textarea
                    id="note"
                    value={data.note}
                    onChange={e => setData('note', e.target.value)}
                    error={errors.note}
                  />
                  {errors.note && (<div className="invalid-feedback">{errors.note}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="担当ユーザー" isRequired={false} />
                </th>
                <td className="td-cell">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
}

Create.layout = page => <AppLayout children={page} />

export default Create
