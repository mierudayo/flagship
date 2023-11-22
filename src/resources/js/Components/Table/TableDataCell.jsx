export default function TableDataCell({ children, className }) {
  const combinedClassName = `td-cell ${className || ''}`;
  return <td className={combinedClassName}>{children}</td>;
};
