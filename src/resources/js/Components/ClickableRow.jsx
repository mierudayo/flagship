import { router } from '@inertiajs/react'

export default function ClickableRow({ url, children }) {
  const handleClick = () => {
    router.get(url);
  };

  return (
    <tr onClick={handleClick} className="table-row is-clickable">
      {children}
    </tr>
  );
}
