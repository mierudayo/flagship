export default function FilterForm({ submit, isFilterOpen = false, children }) {
  const filterClass = `filter-section ${isFilterOpen ? 'show' : ''}`;

  return (
    <form onSubmit={submit}>
      <div className={filterClass}>
        {children}
      </div>
    </form>
  );
}
