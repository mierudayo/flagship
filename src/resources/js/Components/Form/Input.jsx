export default function Input({
  type = 'text',
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  className = '',
  readOnly = false
}) {

  const combinedClassName = `input-field ${error ? 'is-invalid' : ''} ${className}`.trim();

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      className={combinedClassName}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
}
