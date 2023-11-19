export default function TableGenericSelectRow({ label, name, data, setData, errors, options, isRequired = false }) {
  return (
    <tr className="table-row is-flexible">
      <th className="th-cell">
        <label htmlFor={name} className="form-label">
          {label}
          {isRequired && <span className="required-mark">必須</span>}
        </label>
      </th>
      <td className="td-cell u-flex">
        <select
          name={name}
          id={name}
          value={data[name]}
          onChange={e => setData(name, e.target.value)}
          className={`input-field ${errors[name] ? 'is-invalid' : ''}`}
        >
          <option value="">-- {label}を選択 --</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors[name] && (<div className="invalid-feedback">{errors[name]}</div>)}
      </td>
    </tr>
  );
}

