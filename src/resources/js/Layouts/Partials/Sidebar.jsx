import { useState, useEffect, useRef } from 'react';

import { usePage } from '@inertiajs/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import Dropdown from './Dropdown';
import NavList from './NavList';

export default function Sidebar({ isOpen, onToggle }) {
  const { auth, appName } = usePage().props
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target)) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const SidebarIcon = isOpen ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />;

  return (
    <aside className={`sidebar ${!isOpen ? 'is-collapse' : ''}`}>
      <nav className="sidebar-nav">
        <header className="side-header">
          <div className="sidebar-title">{appName}</div>
          <span
            className="sidebar-toggler"
            onClick={onToggle}
          >
            {SidebarIcon}
          </span>
        </header>
        <NavList />
        <footer className="side-footer">
          <div className="sidebar-dropdown-control">
            <div className="dropdown-toggle-wrapper">
              <button
                ref={triggerRef}
                className={`dropdown-toggle ${showDropdown ? 'active' : ''}`}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="icon-wrapper">
                  <AccountCircleIcon className="account-icon" />
                  <span>{auth.user.name}</span>
                </div>
              </button>
            </div>
          </div>
          {showDropdown && <Dropdown ref={dropdownRef} />}
        </footer>
      </nav>
    </aside>
  );
}

