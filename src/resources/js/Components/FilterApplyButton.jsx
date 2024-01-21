import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

export default function FilterApplyButton({ handleClick, style }) {
  const buttonStyle = {
    minWidth: '64px',
    height: '32px',
    ...style,
  };

  return (
    <Button onClick={handleClick} variant="outlined" startIcon={<CheckIcon />} style={buttonStyle}>
      決定
    </Button>
  );
}
