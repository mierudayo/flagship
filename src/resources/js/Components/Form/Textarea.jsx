export default function Textarea({ id, name, value, onChange, error, placeholder, readOnly, height = 'minimum' }) {

  const heightClass = height;

  return (
    <textarea
      id={id}
      name={name}
      value={value}
      className={`textarea-field ${heightClass} ${error ? 'is-invalid' : ''}`}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
}
