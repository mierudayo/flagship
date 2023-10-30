import { Link } from '@inertiajs/react'

export default function Pagination({ paginator }) {
  const {
    first_page_url,
    last_page_url,
    next_page_url,
    prev_page_url,
    current_page,
    last_page
  } = paginator;

  return (
    <div className="pagination">
      <Link
        href={first_page_url}
        preserveState
        className="pagination-link"
        aria-disabled={current_page === 1}
      >
        &laquo;
      </Link>

      <Link
        href={prev_page_url}
        preserveState
        className="pagination-link"
        aria-disabled={!prev_page_url}
      >
        &lt;
      </Link>

      <span className="current-page">
        {current_page} / {last_page}
      </span>

      <Link
        href={next_page_url}
        preserveState
        className="pagination-link"
        aria-disabled={!next_page_url}
      >
        &gt;
      </Link>

      <Link
        href={last_page_url}
        preserveState
        className="pagination-link"
        aria-disabled={current_page === last_page}
      >
        &raquo;
      </Link>
    </div>
  );
}
