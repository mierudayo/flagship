import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
  const { auth } = usePage().props

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
            <li>
              <a href={route('users.index')} className="side-nav-link">社員一覧</a>
            </li>
            {[...Array(30)].map((_, i) => <li key={i}><a href="#" className="side-nav-link">Sample Menu{i + 1}</a></li>)}
          </ul>
          <footer className="side-footer">
            {auth.user.email}
          </footer>
        </nav>
      </aside>
      <main className="main-container">

        {/* TODO: ログアウトボタン配置変更 */}
        <Link method="post" href={route('logout')} as="button">
          Log Out
        </Link>

        {children}
      </main>
    </div>
  );
}
