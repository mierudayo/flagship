import { useState, useEffect, useRef } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from "./Partials/Dropdown";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import CategoryIcon from '@mui/icons-material/Category';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

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
            <span className="sidebar-toggler"><KeyboardDoubleArrowLeftIcon /></span>
          </header>
          <ul className="side-nav-list">
            <li>
              <Link
                href={route('home')}
                className={`side-nav-link ${url === '/' ? 'is-active' : ''}`}
              >
                <div className="icon-wrapper">
                  <HomeIcon className="sidenav-icon" />
                  <span>HOME</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={route('users.index')}
                className={`side-nav-link ${component.startsWith('User') ? 'is-active' : ''}`}
              >
                <div className="icon-wrapper">
                  <PeopleIcon className="sidenav-icon" />
                  <span>ユーザー</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={route('customers.index')}
                className={`side-nav-link ${url.startsWith('/customers') ? 'is-active' : ''}`}
              >
                <div className="icon-wrapper">
                  <CorporateFareIcon className="sidenav-icon" />
                  <span>取引先</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={route('contacts.index')}
                className={`side-nav-link ${url.startsWith('/contacts') ? 'is-active' : ''}`}
              >
                <div className="icon-wrapper">
                  <ContactsIcon className="sidenav-icon" />
                  <span>連絡先</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={route('products.index')}
                className={`side-nav-link ${url.startsWith('/products') ? 'is-active' : ''}`}
              >
                <div className="icon-wrapper">
                  <CategoryIcon className="sidenav-icon" />
                  <span>商品管理</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href={route('inquiries.index')}
                className={`side-nav-link ${url.startsWith('/inquiries') ? 'is-active' : ''}`}
              >
                <div className="icon-wrapper">
                  <MarkEmailUnreadIcon className="sidenav-icon" />
                  <span>問い合わせ</span>
                </div>
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
      <main className="main-container">
        {children}
      </main>
    </div>
  );
}
