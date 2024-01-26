import { Link } from '@inertiajs/react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export default function EditIconButton({ href }) {
  return (
    <Link href={href} onClick={(e) => e.stopPropagation()}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Link>
  );
}
