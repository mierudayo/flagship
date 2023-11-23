export default function Input({ type = 'text', id, name, value, onChange, error }) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      className={`input-field ${error ? 'is-invalid' : ''}`}
      onChange={onChange}
    />
  );
}
