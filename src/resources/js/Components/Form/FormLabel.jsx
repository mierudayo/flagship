export default function FormLabel({ htmlFor, label, isRequired }) {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {label}
      {isRequired && <span className="required-mark">*</span>}
    </label>
  );
};
