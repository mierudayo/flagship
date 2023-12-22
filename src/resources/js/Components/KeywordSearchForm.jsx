import SearchInput from './Form/SearchInput';

export default function KeywordSearchForm({ placeholder, data, setData, errors, submit}) {
  return (
    <form onSubmit={submit} className="u-mr-3">
      <SearchInput
        type="search"
        name="keyword"
        value={data.keyword}
        onChange={e => setData('keyword', e.target.value)}
        className={`input-field ${errors.keyword ? 'is-invalid' : ''}`}
        placeholder={placeholder}
      />
      {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
    </form>
  );
}
