export default function DateInput({
  id,
  name,
  value,
  onChange,
  error,
  className = '',
  readOnly = false,
  min = '1900-01-01',
  max = '2200-12-31',
  maxWidth = '160px',
}) {
  const combinedClassName = `input-field ${error ? 'is-invalid' : ''} ${className}`.trim();
  const style = { maxWidth };

  return (
    <input
      type="date"
      id={id}
      name={name}
      value={value}
      className={combinedClassName}
      onChange={onChange}
      readOnly={readOnly}
      min={min}
      max={max}
      style={style}
    />
  );
}
