import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from "@inertiajs/react";

export default function Edit({ user, permissionSelectOptions }) {
  const { data, setData, patch, processing, errors, isDirty } = useForm({
    permission_id: user.permission_id,
    employee_code: user.employee_code,
    name: user.name,
    name_kana: user.name_kana || "",
    email: user.email,
    mobile_number: user.mobile_number || "",
    employment_date: user.employment_date || "",
    resignation_date: user.resignation_date || "",
  });

  function submit(e) {
    e.preventDefault();
    patch(route('users.update', user));
  };

  function handleBeforeLeave() {
    if (isDirty) {
      return confirm('入力内容が破棄されますがよろしいですか？');
    }
    return true;
  };

  return (
    <AppLayout>
      <h1 className="content-title">ユーザー 編集</h1>
      <div className="content-navbar">
        <Link
          onBefore={handleBeforeLeave}
          href={route('users.index')}
          className="btn btn-secondary u-mr-3"
        >
          キャンセル
        </Link>
        <button
          type="submit"
          form="userCreateForm"
          className="btn btn-primary"
          disabled={processing}
        >
          更新
        </button>
        {processing && <span>Now Loading...</span>}
      </div>
      <form id="userCreateForm" onSubmit={submit}>
        <div className="form-inner">

          <div className="input-group">
            <label htmlFor="employee_code" className="form-label">
              社員番号
              <span className="required-mark">必須</span>
            </label>
            <input
              type="text"
              id="employee_code"
              name="employee_code"
              value={data.employee_code}
              className={`input-field ${errors.employee_code ? 'is-invalid' : ''}`}
              onChange={e => setData('employee_code', e.target.value)}
            />
            <div className="invalid-feedback">{errors.employee_code}</div>
          </div>

          <div className="input-group">
            <label htmlFor="name" className="form-label">
              名前
              <span className="required-mark">必須</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              className={`input-field ${errors.name ? 'is-invalid' : ''}`}
              onChange={e => setData('name', e.target.value)}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>

          <div className="input-group">
            <label htmlFor="name_kana" className="form-label">
              読み仮名
            </label>
            <input
              type="text"
              id="name_kana"
              name="name_kana"
              value={data.name_kana}
              className={`input-field ${errors.name_kana ? 'is-invalid' : ''}`}
              onChange={e => setData('name_kana', e.target.value)}
            />
            <div className="invalid-feedback">{errors.name_kana}</div>
          </div>


          <div className="input-group">
            <label htmlFor="permission_id" className="form-label">
              権限
              <span className="required-mark">必須</span>
            </label>
            <select
              name="permission_id"
              id="permission_id"
              value={data.permission_id}
              onChange={e => setData('permission_id', e.target.value)}
              className={`input-field ${errors.permission_id ? 'is-invalid' : ''}`}
            >
              <option value="">-- 権限を選択 --</option>
              {permissionSelectOptions.map((permission) => (
                <option key={permission.id} value={permission.id}>
                  {permission.display_name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.permission_id}</div>
          </div>

          <div className="input-group">
            <label htmlFor="email" className="form-label">
              E-mail
              <span className="required-mark">必須</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              className={`input-field ${errors.email ? 'is-invalid' : ''}`}
              onChange={e => setData('email', e.target.value)}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="input-group">
            <label htmlFor="mobile_number" className="form-label">
              携帯番号
            </label>
            <input
              type="text"
              id="mobile_number"
              name="mobile_number"
              value={data.mobile_number}
              className={`input-field ${errors.mobile_number ? 'is-invalid' : ''}`}
              onChange={e => setData('mobile_number', e.target.value)}
            />
            <div className="invalid-feedback">{errors.mobile_number}</div>
          </div>

          <div className="input-group">
            <label htmlFor="employment_date" className="form-label">
              入社日
            </label>
            <input
              type="date"
              id="employment_date"
              name="employment_date"
              value={data.employment_date}
              className={`input-field ${errors.employment_date ? 'is-invalid' : ''}`}
              onChange={e => setData('employment_date', e.target.value)}
            />
            <div className="invalid-feedback">{errors.employment_date}</div>
          </div>

          <div className="input-group">
            <label htmlFor="resignation_date" className="form-label">
              退職日
            </label>
            <input
              type="date"
              id="resignation_date"
              name="resignation_date"
              value={data.resignation_date}
              className={`input-field ${errors.resignation_date ? 'is-invalid' : ''}`}
              onChange={e => setData('resignation_date', e.target.value)}
            />
            <div className="invalid-feedback">{errors.resignation_date}</div>
          </div>

        </div>

      </form>
    </AppLayout>
  );
}
