export default function FormLabel({ htmlFor, label, isRequired }) {
  const Tag = htmlFor ? 'label' : 'span';

  return (
    <Tag htmlFor={htmlFor} className="form-label">
      {label}
      {isRequired && <span className="required-mark">*</span>}
    </Tag>
  );
};
