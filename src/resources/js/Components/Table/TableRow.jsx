export default function TableRow({ children, className }) {
  const combinedClassName = `table-row ${className || ''}`;
  return <tr className={combinedClassName}>{children}</tr>;
};
