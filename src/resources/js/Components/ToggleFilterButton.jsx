
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function ToggleFilterButton({ isOpen, setIsOpen }) {
  const iconStyle = {
    fontSize: '1.5rem',
    marginRight: '4px',
    color: '#888'
  };

  return (
    <button
      className="btn btn-secondary with-icon u-mr-3"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="u-flex u-items-center">
        {isOpen ? (
          <ExpandLessOutlinedIcon style={iconStyle} />
        ) : (
          <FilterAltIcon style={iconStyle} />
        )}
        <span>
          {isOpen ? '詳細を閉じる' : '詳細条件を開く'}
        </span>
      </div>
    </button>
  );
}

