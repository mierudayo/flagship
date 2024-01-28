import { forwardRef } from 'react';

import SearchIcon from '@mui/icons-material/Search';

const SearchInput = forwardRef(({ name, value, placeholder, onChange, hasError }, ref) => {
  return (
    <div className="search-input-wrapper">
      <div className="search-icon-wrapper">
        <SearchIcon style={{ fontSize: '1.25rem', color: '#888' }} />
      </div>
      <input
        type="search"
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        className={`input-field ${hasError ? 'is-invalid' : ''}`}
        placeholder={placeholder}
      />
    </div>
  );
});

export default SearchInput;
