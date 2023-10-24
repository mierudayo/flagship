import AppLayout from '@/Layouts/AppLayout';
import UserTable from "./Partials/UserTable";

export default function Index({ users }) {
  return (
    <AppLayout>
      <h1>User List</h1>
      <a
        href={route('users.create')}
        className="btn btn-primary"
      >
        新規登録
      </a>
      <UserTable users={users} />
    </AppLayout>
  );
}
