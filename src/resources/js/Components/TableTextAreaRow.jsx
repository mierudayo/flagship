export default function TableTextAreaRow({
  labelName,
  inputName,
  data,
  errors,
  setData,
  isRequired = false,
  widthClass
}) {
  return (
    <tr className="table-row is-flexible">
      <th className={`th-cell ${widthClass}`}>
        <label htmlFor={inputName} className="form-label">
          {labelName}
          {isRequired && <span className="required-mark">*</span>}
        </label>
      </th>
      <td className="td-cell">
        <textarea
          id={inputName}
          name={inputName}
          value={data[inputName]}
          className={`textarea-field ${errors[inputName] ? 'is-invalid' : ''}`}
          onChange={e => setData(inputName, e.target.value)}
        />
        {errors[inputName] && (<div className="invalid-feedback">{errors[inputName]}</div>)}
      </td>
    </tr>
  );
}
