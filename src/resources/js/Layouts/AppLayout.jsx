import { useState } from 'react'
import Sidebar from './Partials/Sidebar';

export default function AppLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="page-wrapper">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <main className={`main-container ${!isSidebarOpen ? 'is-expanded' : ''}`}>
        {children}
      </main>
    </div>
  );
}
