import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from "./Partials/Dropdown";

export default function AppLayout({ children }) {
  const { auth } = usePage().props
  const { url, component } = usePage();
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

  return (
    <div className="page-wrapper">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <header className="side-header">
            <div className="sidebar-title">Sales Manager+</div>
            <span className="sidebar-toggler">&lt;&lt;</span>
          </header>
          <ul className="side-nav-list">
            <li>
              <Link
                href={route('home')}
                className={`side-nav-link ${url === '/' ? 'is-active' : ''}`}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href={route('users.index')}
                className={`side-nav-link ${component.startsWith('User') ? 'is-active' : ''}`}
              >
                ユーザー
              </Link>
            </li>
            <li>
              <Link
                href={route('customers.index')}
                className={`side-nav-link ${component.startsWith('Customer') ? 'is-active' : ''}`}
              >
                取引先
              </Link>
            </li>
          </ul>
          <footer className="side-footer">
            <div className="sidebar-dropdown-control">
              <div className="dropdown-toggle-wrapper">
                <button
                  ref={triggerRef}
                  className={`dropdown-toggle ${showDropdown ? 'active' : ''}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="user-email">{auth.user.email}</div>
                  <div className="indicator">⬆️</div>
                </button>
              </div>
            </div>
            {showDropdown && <Dropdown ref={dropdownRef} />}
          </footer>
        </nav>
      </aside>
      <main className="main-container">
        {children}
      </main>
    </div>
  );
}
