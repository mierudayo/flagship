import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function Alert({ type, message }) {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleOutlineIcon />;
      case 'danger':
        return <ErrorOutlineIcon />;
      default:
        return null;
    }
  };

  if (!message) {
    return null;
  }

  return (
    <div className={`alert alert-${type}`}>
      {getIcon(type)}
      <span className="u-ml-2">{message}</span>
    </div>
  );
}
