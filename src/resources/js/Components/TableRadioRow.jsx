export default function TableRadioRow({ labelName, inputName, options, isRequired, data, errors, setData, widthClass }) {
  return (
    <tr className="table-row">
      <th className={`th-cell ${widthClass}`}>
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
