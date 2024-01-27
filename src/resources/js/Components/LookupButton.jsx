import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export default function LookupButton({ style, onClick }) {
  style = {
    ...style,
    padding: '4px 12px',
  }

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={onClick}
      style={style}
    >
      <ManageSearchIcon />
    </button>
  );
}
