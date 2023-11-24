export default function Textarea({ id, name, value, onChange, error, placeholder, readOnly }) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      className={`textarea-field ${error ? 'is-invalid' : ''}`}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  );
}
