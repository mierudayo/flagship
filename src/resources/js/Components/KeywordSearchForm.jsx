import SearchIcon from '@mui/icons-material/Search';

export default function KeywordSearchForm({ placeholder, data, setData, errors, submit }) {
  return (
    <form onSubmit={submit}>
      <div className="keyword-search-box">
        <div className="search-icon-wrapper">
          <SearchIcon
            style={{ fontSize: '1.25rem', color: '#888' }}
          />
        </div>
        <input
          type="search"
          name="keyword"
          value={data.keyword}
          onChange={e => setData('keyword', e.target.value)}
          className={`input-field ${errors.keyword ? 'is-invalid' : ''}`}
          placeholder={placeholder}
        />
      </div>
      {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
    </form>
  );
}
