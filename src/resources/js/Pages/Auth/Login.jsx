import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login({ status }) {
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
    <GuestLayout>
      <div className="login-container">
        <form onSubmit={submit}>

          <h1 className="login-title">Login</h1>

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
              <div className='invalid-feedback'>{errors.email}</div>
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
              <div className='invalid-feedback'>{errors.password}</div>
            </div>

            {/* Remember Me */}
            <div className="login-input-row">
              <label htmlFor="userRememberMeInput">
                <span>ログイン情報を記憶</span>
              </label>
              <input
                checked={data.remember}
                id="userRememberMeInput"
                name="remember"
                onChange={e => setData('remember', e.target.checked)}
                type="checkbox"
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
