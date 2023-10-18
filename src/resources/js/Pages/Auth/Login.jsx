import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

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

    // TODO: Ziggyでrouteメソッド使う
    post('login');
  };

  return (
    <GuestLayout>
      <div className="login-container">
        <form onSubmit={submit}>

          <div className="login-title-block">
            <h1>Login</h1>
          </div>

          {status && <div>{status}</div>}

          <div className="login-form-block">
            {/* Email */}
            <div className="login-input-row">
              <label htmlFor="userEmailInput">
                <span>E-mail</span>
              </label>
              <input
                id="userEmailInput"
                type="email"
                name="email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
              />
              <div className='invalid-feedback'>{errors.email}</div>
            </div>
            {/* Password */}
            <div className="login-input-row">
              <label htmlFor="userPasswordInput">
                <span>Password</span>
              </label>
              <input
                id="userPasswordInput"
                type="password"
                name="password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
              />
              <div className='invalid-feedback'>{errors.password}</div>
            </div>
            {/* Remember Me */}
            <div className="login-input-row">
              <label htmlFor="userRememberMeInput">
                <span>ログイン情報を記憶</span>
              </label>
              <input
                id="userRememberMeInput"
                type="checkbox"
                name="remember"
                checked={data.remember}
                onChange={e => setData('remember', e.target.value)}
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
