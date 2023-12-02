import { Link, usePage } from '@inertiajs/react';

import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PeopleIcon from '@mui/icons-material/People';
import ContactsIcon from '@mui/icons-material/Contacts';
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import HomeIcon from '@mui/icons-material/Home';

export default function NavList() {
  const { url, component } = usePage();

  return (
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
      <li>
        <Link
          href={route('sales-orders.index')}
          className={`side-nav-link ${url.startsWith('/sales-orders') ? 'is-active' : ''}`}
        >
          <div className="icon-wrapper">
            <CurrencyYenIcon className="sidenav-icon" />
            <span>受注</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
