import { Link } from '@inertiajs/react';

export default function CancelButton({ isDirty, route }) {

  function handleBeforeLeave() {
    if (isDirty) {
      return confirm('入力内容が破棄されますがよろしいですか？');
    }
    return true;
  };

  return (
    <Link
      onBefore={handleBeforeLeave}
      href={route}
      className="btn btn-secondary"
    >
      キャンセル
    </Link>
  );
}
