import { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';

import NavList from './Partials/NavList';
import Sidebar from './Partials/Sidebar';

export default function AppLayout({ title, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHeaderNavOpen, setIsHeaderNavOpen] = useState(false);
  const { appName } = usePage().props;

  const HeaderNavIcon = isHeaderNavOpen ?
    <CloseIcon className="header-menu-icon" /> :
    <MenuIcon className="header-menu-icon" />;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  router.on('success', () => {
    setIsHeaderNavOpen(false)
  })

  return (
    <>
      <Head title={title} />

      <div className="page-wrapper">
        <header className={`mobile-header  ${isHeaderNavOpen ? 'is-expanded' : ''}`}>
          <div className="mobile-header-menu">
            <button className="nav-toggler" onClick={() => setIsHeaderNavOpen(!isHeaderNavOpen)}>
              {HeaderNavIcon}
            </button>
            <div className="header-title">{appName}</div>
            <button className="header-account-nav">
              <AccountCircleOutlinedIcon className="header-account-icon" />
            </button>
          </div>
          {isHeaderNavOpen && <NavList />}
        </header>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <main className={`main-container ${!isSidebarOpen ? 'is-expanded' : ''}`}>
          {children}
        </main>
      </div>
    </>
  );
}
