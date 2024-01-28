import { useState } from 'react';

import Menu from '@mui/material/Menu';

export default function DropdownMenu({ children, buttonLabel, buttonClassName }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonClass = `btn btn-secondary ${buttonClassName || ''}`;

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        onClick={handleClick}
      >
        {buttonLabel}
      </button>
      <Menu
        id="customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </>
  );
}
