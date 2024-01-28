import { Link } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

export default function EditLinkButton({ href, style }) {
  const buttonStyle = {
    minWidth: '88px',
    height: '32px',
    ...style,
  };

  return (
    <Link href={href}>
      <Button variant="outlined" startIcon={<EditIcon />} style={buttonStyle}>
        編集
      </Button>
    </Link>
  );
}
