export default function KeywordSearchForm({ placeholder, data, setData, errors, submit }) {
  return (
    <form onSubmit={submit}>
      <div className="keyword-search-box">
        <input
          type="search"
          name="keyword"
          value={data.keyword}
          onChange={e => setData('keyword', e.target.value)}
          className={`input-field ${errors.keyword ? 'is-invalid' : ''}`}
          placeholder={placeholder}
        />
        <button className="btn btn-secondary">検索</button>
      </div>
      {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
    </form>
  );
}
