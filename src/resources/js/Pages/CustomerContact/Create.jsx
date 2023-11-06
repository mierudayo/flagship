import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from "@inertiajs/react";

function TableInputRow({ labelName, inputName, data, errors, setData, isRequired = false }) {
  return (
    <tr className="table-row">
      <th className="th-cell u-w-200">
        <label htmlFor={inputName} className="form-label">
          {labelName}
          {isRequired && <span className="required-mark">必須</span>}
        </label>
      </th>
      <td className="td-cell">
        <input
          type="text"
          id={inputName}
          name={inputName}
          value={data[inputName]}
          className={`input-field ${errors[inputName] ? 'is-invalid' : ''}`}
          onChange={e => setData(inputName, e.target.value)}
        />
        {errors[inputName] && (<div className="invalid-feedback">{errors[inputName]}</div>)}
      </td>
    </tr>
  );
}

function RadioComponent({ labelName, inputName, options, isRequired, data, errors, setData }) {
  return (
    <tr className="table-row">
      <th className="th-cell u-w-200">
        <label className="form-label">
          {labelName}
          {isRequired && <span className="required-mark">必須</span>}
        </label>
      </th>
      <td className="td-cell u-flex">
        {options.map((option, index) => (
          <div key={index} className="radio-option u-mr-2">
            <input
              type="radio"
              id={`${inputName}-${option.value}`}
              name={inputName}
              value={option.value}
              checked={data[inputName] === option.value}
              onChange={e => setData(inputName, e.target.value === "true")}
              className={errors[inputName] ? 'is-invalid' : ''}
            />
            <label htmlFor={`${inputName}-${option.value}`}>{option.label}</label>
          </div>
        ))}
        {errors[inputName] && (<div className="invalid-feedback">{errors[inputName]}</div>)}
      </td>
    </tr>
  );
}


export default function Create({ userSelectOptions, customerSelectOptions }) {
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

  function handleBeforeLeave() {
    if (isDirty) {
      return confirm('入力内容が破棄されますがよろしいですか？');
    }
    return true;
  };

  return (
    <AppLayout>
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
        <Link
          onBefore={handleBeforeLeave}
          href={route('contacts.index')}
          className="btn btn-secondary"
        >
          キャンセル
        </Link>
        {processing && <span>Now Loading...</span>}
      </div>
      <form id="customerContactCreateForm" onSubmit={submit}>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <tbody className="tbody">
            <tr className="table-row">
                <th className="th-cell u-w-200">

                  <label htmlFor="customer_id" className="form-label">
                    所属取引先
                    <span className="required-mark">必須</span>
                  </label>
                </th>
                <td className="td-cell u-flex">
                  <select
                    name="customer_id"
                    id="customer_id"
                    value={data.customer_id}
                    onChange={e => setData('customer_id', e.target.value)}
                    className={`input-field ${errors.customer_id ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 所属する取引先を選択 --</option>
                    {customerSelectOptions.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.id}: {customer.name}
                      </option>
                    ))}
                  </select>
                  {errors.customer_id && (<div className="invalid-feedback">{errors.customer_id}</div>)}
                </td>
              </tr>
              <TableInputRow labelName="担当者名" inputName="name" data={data} errors={errors} setData={setData} isRequired={true} />
              <TableInputRow labelName="よみがな" inputName="name_kana" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="TEL" inputName="tel" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="携帯番号" inputName="mobile_number" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="E-mail" inputName="email" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="役職" inputName="position" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="役割" inputName="role" data={data} errors={errors} setData={setData} />
              <RadioComponent
                labelName="使用状況"
                inputName="is_active"
                options={[
                  { label: '使用中', value: true },
                  { label: '使用不可', value: false },
                ]}
                data={data}
                errors={errors}
                setData={setData}
              />
              <TableInputRow labelName="備考" inputName="note" data={data} errors={errors} setData={setData} />

              <tr className="table-row">
                <th className="th-cell u-w-200">
                  <label htmlFor="in_charge_user_id" className="form-label">
                    担当ユーザー
                  </label>
                </th>
                <td className="td-cell u-flex">
                  <select
                    name="in_charge_user_id"
                    id="in_charge_user_id"
                    value={data.in_charge_user_id}
                    onChange={e => setData('in_charge_user_id', e.target.value)}
                    className={`input-field ${errors.in_charge_user_id ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 担当ユーザーを選択 --</option>
                    {userSelectOptions.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.id}: {user.name}
                      </option>
                    ))}
                  </select>
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </form>
    </AppLayout>
  );
}
