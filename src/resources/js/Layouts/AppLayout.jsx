import { useState } from 'react'
import { router } from '@inertiajs/react'
import Sidebar from './Partials/Sidebar';
import NavList from './Partials/NavList';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHeaderNavOpen, setIsHeaderNavOpen] = useState(false);

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
    <div className="page-wrapper">
      <header className={`mobile-header  ${isHeaderNavOpen ? 'is-expanded' : ''}`}>
        <div className="mobile-header-menu">
          <button className="nav-toggler" onClick={() => setIsHeaderNavOpen(!isHeaderNavOpen)}>
          {HeaderNavIcon}
          </button>
          <div className="header-title">Sales Manager+</div>
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
  );
}
