export default function AppLayout({ children }) {
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
              <a href="#" className="side-nav-link">HOME</a>
            </li>
            {[...Array(30)].map((_, i) => <li key={i}><a href="#" className="side-nav-link">Sample Menu{i + 1}</a></li>)}
          </ul>
        </nav>
      </aside>
      <main className="main-container">
        {children}
      </main>
    </div>
  );
}
