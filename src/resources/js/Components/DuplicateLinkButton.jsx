import { Link } from '@inertiajs/react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function DuplicateLinkButton({ href, style }) {
  const buttonStyle = {
    minWidth: '88px',
    height: '32px',
    ...style,
  };

  const iconStyle = {
    fontSize: '1.2rem',
    marginRight: '4px',
    color: '#888'
  };

  return (
    <Link href={href}>
      <button
        className="btn btn-secondary"
        style={buttonStyle}
      >
        <div className="u-flex u-items-center">
          <ContentCopyIcon style={iconStyle} />
          <span>
            複製
          </span>
        </div>
      </button>
    </Link>
  );
}
