import { forwardRef } from 'react';
import { Link } from "@inertiajs/react";
import LogoutIcon from '@mui/icons-material/Logout';

const Dropdown = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="sidebar-dropdown">
      <div className="sidebar-dropdown-content">
        <ul className="dropdown-list">
          <li className="dropdown-item">
            <Link href="#" className="dropdown-link">Menu1</Link>
          </li>
          <li className="dropdown-item">
            <Link href="#" className="dropdown-link">Menu2</Link>
          </li>
          <li className="dropdown-item">
            <Link method="post" href={route('logout')} className="dropdown-link" as="button">
              <div className="icon-wrapper">
                <LogoutIcon className="logout-icon" />
                <span>Log out</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Dropdown;
