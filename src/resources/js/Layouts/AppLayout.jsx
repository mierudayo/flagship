import { useState, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import Dropdown from "./Partials/Dropdown";

export default function AppLayout({ children }) {
  const { auth } = usePage().props
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
              <a href={route('home')} className="side-nav-link">HOME</a>
            </li>
            <li>
              <a href={route('users.index')} className="side-nav-link">ユーザー</a>
            </li>
            <li>
              <a href={route('customers.index')} className="side-nav-link">取引先</a>
            </li>
            {[...Array(30)].map((_, i) => <li key={i}><a href="#" className="side-nav-link">Sample Menu{i + 1}</a></li>)}
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
