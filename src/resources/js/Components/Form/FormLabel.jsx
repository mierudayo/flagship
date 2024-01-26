export default function FormLabel({ htmlFor, label, isRequired, justifyContent }) {
  const Tag = htmlFor ? 'label' : 'span';
  const style = { justifyContent };

  return (
    <Tag htmlFor={htmlFor} className="form-label" style={style}>
      {label}
      {isRequired && <span className="required-mark">*</span>}
    </Tag>
  );
};
