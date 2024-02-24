import { useEffect } from 'react';

import { useForm } from '@inertiajs/react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ appName, status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout title="login">
      <div className="login-container">
        <form onSubmit={submit}>

          <h1 className="login-title">
            {appName} ログイン 🚩
          </h1>

          {status &&
            <div className="alert alert-danger">{status}</div>
          }

          <div className="login-form-block">
            {/* Email */}
            <div className="login-input-row">
              <label className="form-label" htmlFor="userEmailInput">
                E-mail
              </label>
              <input
                className={`input-field ${errors.email ? 'is-invalid' : ''}`}
                id="userEmailInput"
                name="email"
                onChange={e => setData('email', e.target.value)}
                type="email"
                value={data.email}
              />
              <InvalidFeedback errors={errors} name="email" />
            </div>

            {/* Password */}
            <div className="login-input-row">
              <label className="form-label" htmlFor="userPasswordInput">
                Password
              </label>
              <input
                className={`input-field ${errors.password ? 'is-invalid' : ''}`}
                id="userPasswordInput"
                name="password"
                onChange={e => setData('password', e.target.value)}
                type="password"
                value={data.password}
              />
              <InvalidFeedback errors={errors} name="password" />
            </div>

            {/* Remember Me */}
            <div className="login-input-row">
              <FormControlLabel
                control={<Checkbox onChange={e => setData('remember', e.target.checked)} />}
                label="ログインを記憶"
              />
            </div>

            <div className="login-input-row">
              <button className="btn btn-login" disabled={processing}>
                ログイン
              </button>
            </div>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
}
