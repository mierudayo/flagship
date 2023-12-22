import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function NewTabLink({ url, displayText }) {
  const iconStyle = {
    verticalAlign: 'middle',
    display: 'inline',
    fontSize: '16px',
    color: 'gray'
  };

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="u-inline">
      <span className="link u-pr-1">
        {displayText}
      </span>
      <OpenInNewIcon style={iconStyle} />
    </a>
  );
};
