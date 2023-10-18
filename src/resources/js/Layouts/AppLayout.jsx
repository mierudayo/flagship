import { Link } from '@inertiajs/react';

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

        {/* TODO: ログアウトボタン配置変更 */}
        {/* TODO: Ziggyでrouteメソッド使う */}
        <Link method="post" href="logout" as="button">
          Log Out
        </Link>

        {children}
      </main>
    </div>
  );
}
