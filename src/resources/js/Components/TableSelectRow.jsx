import OptionsList from './OptionsList';

export default function TableSelectRow({ label, name, data, errors, setData, options, isRequired = false }) {
  return (
    <tr className="table-row is-flexible">
      <th className="th-cell">
      <label htmlFor={name} className="form-label">
        {label}
        {isRequired && <span className="required-mark">*</span>}
      </label>
      </th>
      <td className="td-cell">
      <select
        name={name}
        id={name}
        value={data[name]}
        onChange={e => setData(name, e.target.value)}
        className={`input-field ${errors[name] ? 'is-invalid' : ''}`}
      >
        <option value=""></option>
        <OptionsList options={options} />
      </select>
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
      </td>
    </tr>
  );
}
