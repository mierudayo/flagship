export default function RadioGroup({ id, options, value, onChange, error }) {
  return (
    <>
      {options.map(option => (
        <div key={option.value} className="radio-option">
          <input
            type="radio"
            id={`${id}-${option.value}`}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className={`input-field ${error ? 'is-invalid' : ''}`}
          />
          <label htmlFor={`${id}-${option.value}`}>{option.label}</label>
        </div>
      ))}
    </>
  );
}
