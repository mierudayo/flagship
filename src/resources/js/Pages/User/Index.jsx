import AppLayout from '@/Layouts/AppLayout';
import UserTable from "./Partials/UserTable";

export default function Index({ users }) {
  return (
    <AppLayout>
      <h1>User List</h1>
      <UserTable users={users} />
    </AppLayout>
  );
}
