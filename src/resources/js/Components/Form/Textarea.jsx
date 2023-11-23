export default function Textarea({ id, name, value, onChange, error }) {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      className={`textarea-field ${error ? 'is-invalid' : ''}`}
      onChange={onChange}
    />
  );
}
