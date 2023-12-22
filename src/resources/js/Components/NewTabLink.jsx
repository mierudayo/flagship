import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function NewTabLink({ url, displayText }) {
  const iconStyle = {
    verticalAlign: 'middle',
    display: 'inline',
    fontSize: '16px',
    color: 'gray'
  };

  const handleClick = (event) => {
    event.stopPropagation();
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="u-inline" onClick={handleClick}>
      <span className="link u-pr-1">
        {displayText}
      </span>
      <OpenInNewIcon style={iconStyle} />
    </a>
  );
};
