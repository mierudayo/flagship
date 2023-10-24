import { useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { useForm } from "@inertiajs/react";

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    employee_code: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    mobile_number: '',
    employment_date: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  function submit(e) {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <AppLayout>
      <h1>ユーザー登録</h1>
      <div className="form-action-bar">
        <button className="btn btn-secondary">
          キャンセル
        </button>
        <button
          type="submit"
          form="userCreateForm"
          className="btn btn-primary"
          disabled={processing}
        >
          登録
        </button>
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
            <label htmlFor="password" className="form-label">
              Password
              <span className="required-mark">必須</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              className={`input-field ${errors.password ? 'is-invalid' : ''}`}
              onChange={e => setData('password', e.target.value)}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <div className="input-group">
            <label htmlFor="password_confirmation" className="form-label">
              Password確認
              <span className="required-mark">必須</span>
            </label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              value={data.password_confirmation}
              className="input-field"
              onChange={e => setData('password_confirmation', e.target.value)}
            />
          </div>

          <hr />

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

        </div>

      </form>
    </AppLayout>
  );
}