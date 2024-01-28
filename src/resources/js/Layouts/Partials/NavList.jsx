import { Link, usePage } from '@inertiajs/react';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CategoryIcon from '@mui/icons-material/Category';
import ContactsIcon from '@mui/icons-material/Contacts';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import HomeIcon from '@mui/icons-material/Home';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';

export default function NavList() {
  const { url, component } = usePage();
  const { auth } = usePage().props

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
      {auth.user.is_admin && (
        <li>
          <Link
            href={route('users.index')}
            className={`side-nav-link ${component.startsWith('User/') ? 'is-active' : ''}`}
          >
            <div className="icon-wrapper">
              <PeopleIcon className="sidenav-icon" />
              <span>ユーザー</span>
            </div>
          </Link>
        </li>
      )}
      <li>
        <Link
          href={route('customers.index')}
          className={`side-nav-link ${component.startsWith('Customer/') ? 'is-active' : ''}`}
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
          className={`side-nav-link ${component.startsWith('CustomerContact/') ? 'is-active' : ''}`}
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
          className={`side-nav-link ${component.startsWith('Product/') ? 'is-active' : ''}`}
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
          className={`side-nav-link ${component.startsWith('Inquiry/') ? 'is-active' : ''}`}
        >
          <div className="icon-wrapper">
            <MarkEmailUnreadIcon className="sidenav-icon" />
            <span>問い合わせ</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          href={route('sales-activities.index')}
          className={`side-nav-link ${component.startsWith('SalesActivity/') ? 'is-active' : ''}`}
        >
          <div className="icon-wrapper">
            <AddIcCallIcon className="sidenav-icon" />
            <span>営業履歴</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          href={route('sales-orders.index')}
          className={`side-nav-link ${component.startsWith('SalesOrder/')? 'is-active' : ''}`}
        >
          <div className="icon-wrapper">
            <CurrencyYenIcon className="sidenav-icon" />
            <span>受注</span>
          </div>
        </Link>
      </li>
      <li>
        <Link
          href={route('purchase-orders.index')}
          className={`side-nav-link ${component.startsWith('PurchaseOrder/')? 'is-active' : ''}`}
        >
          <div className="icon-wrapper">
            <PaymentsIcon className="sidenav-icon" />
            <span>発注</span>
          </div>
        </Link>
      </li>
    </ul>
  );
}
