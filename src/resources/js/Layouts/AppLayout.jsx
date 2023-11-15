import Sidebar from './Partials/Sidebar';

export default function AppLayout({ children }) {
  return (
    <div className="page-wrapper">
      <Sidebar />
      <main className="main-container">
        {children}
      </main>
    </div>
  );
}
