import { forwardRef } from 'react'

const Input = forwardRef((
  {
    type = 'text',
    id,
    name,
    value,
    onChange,
    error,
    placeholder,
    className = '',
    readOnly = false
  },
  ref
) => {
  const combinedClassName = `input-field ${error ? 'is-invalid' : ''} ${className}`.trim();

  return (
    <input
      ref={ref}
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
});

export default Input;
