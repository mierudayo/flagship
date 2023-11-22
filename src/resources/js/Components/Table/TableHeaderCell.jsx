export default function TableHeaderCell({ children, className }) {
  const combinedClassName = `th-cell ${className || ''}`;
  return <th className={combinedClassName}>{children}</th>;
};
