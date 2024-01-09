import { router } from '@inertiajs/react'

export default function ClickableRow({ url, children, className = '' }) {
  const handleClick = () => {
    router.get(url);
  };

  return (
    <tr onClick={handleClick} className={`table-row is-clickable ${className}`}>
      {children}
    </tr>
  );
}

