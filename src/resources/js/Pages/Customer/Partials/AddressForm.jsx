import { useForm } from "@inertiajs/react";

function TableInputRow({ labelName, inputName, data, errors, setData, isRequired = false }) {
  return (
    <tr className="table-row">
      <th className="th-cell u-w-200">
        <label htmlFor={inputName} className="form-label">
          {labelName}
          {isRequired && <span className="required-mark">*</span>}
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
          {isRequired && <span className="required-mark">*</span>}
        </label>
      </th>
      <td className="td-cell u-flex">
        {Object.entries(options).map(([value, typeLabel]) => (
          <div key={value} className="radio-option u-mr-2">
            <input
              type="radio"
              id={`${inputName}-${value}`}
              name={inputName}
              value={value}
              checked={data[inputName] == value}
              onChange={e => setData(inputName, e.target.value)}
              className={errors[inputName] ? 'is-invalid' : ''}
            />
            <label htmlFor={`${inputName}-${value}`}>{typeLabel}</label>
          </div>
        ))}
        {errors[inputName] && (<div className="invalid-feedback">{errors[inputName]}</div>)}
      </td>
    </tr>
  );
}



export default function AddressForm({ customer, deliveryAddressTypes, closeModal }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    address_type: 1,
    post_code: '',
    address: '',
    company_name: '',
    contact_name: '',
    tel: '',
    note: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('customers.delivery-addresses.add', customer), {
      onSuccess: () => {
        reset();
        closeModal();
      }
    });
  };

  return (
    <>
      <form id="deliveryAddressCreateForm" onSubmit={submit}>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <tbody className="tbody">
            <RadioComponent
                labelName="区分"
                inputName="address_type"
                options={deliveryAddressTypes}
                isRequired={true}
                data={data}
                errors={errors}
                setData={setData}
              />
              <TableInputRow labelName="郵便番号" inputName="post_code" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="住所" inputName="address" data={data} errors={errors} setData={setData} isRequired={true} />
              <TableInputRow labelName="会社名" inputName="company_name" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="担当者名" inputName="contact_name" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="TEL" inputName="tel" data={data} errors={errors} setData={setData} />
              <TableInputRow labelName="備考" inputName="note" data={data} errors={errors} setData={setData} />

            </tbody>
          </table>
        </div>
      </form>
      <button
        type="submit"
        form="deliveryAddressCreateForm"
        className="btn btn-primary u-mt-3"
        disabled={processing}
      >
        登録する
      </button>
    </>
  );
}

