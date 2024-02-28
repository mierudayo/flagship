import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';

export default function FilterApplyButton({ handleClick, style }) {
  const buttonStyle = {
    minWidth: '64px',
    height: '32px',
    ...style,
  };

  return (
    <Button type="submit" onClick={handleClick} variant="outlined" startIcon={<CheckIcon />} style={buttonStyle}>
      決定
    </Button>
  );
}
