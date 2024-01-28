import { Link } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export default function EditIconButton({ href }) {
  return (
    <Link href={href} onClick={(e) => e.stopPropagation()}>
      <IconButton>
        <EditIcon />
      </IconButton>
    </Link>
  );
}
