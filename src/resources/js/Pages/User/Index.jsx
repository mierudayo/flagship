import AppLayout from '@/Layouts/AppLayout';
import UserTable from "./Partials/UserTable";
import { useForm } from "@inertiajs/react";

export default function Index({ users, usersCount }) {
  const { data, setData, get, errors } = useForm({
    keyword: '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('users.index'), {
      preserveState: true,
    });
  };

  return (
    <AppLayout>
      <h1 className="content-title">User List</h1>
      <div className="content-navbar">
        <a
          href={route('users.create')}
          className="btn btn-primary"
        >
          新規登録
        </a>
        <div className="search-box">
          <form onSubmit={submit}>
            <input
              type="search"
              name="keyword"
              value={data.keyword}
              onChange={(e) => setData('keyword', e.target.value)}
              onBlur={submit}
              className={`input-field ${errors.keyword ? 'is-invalid' : ''}`}
              placeholder="検索ワード"
            />
            <div className="invalid-feedback">{errors.keyword}</div>
          </form>
        </div>
        <div className="record-count">
          {usersCount}件
        </div>
      </div>
      <UserTable users={users} />
    </AppLayout>
  );
}
