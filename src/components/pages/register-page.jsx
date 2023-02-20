import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../features/account/account-connection';
import LoadingOverlay from '../loading-overlay';
import Logo from '../logo';
import Alert from '../alert';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className="page page--register">
      <LoadingOverlay text={inProgress} />
      <Logo />

      <div className="page__content">
        <h2>Sign up for a free account.</h2>
        <section>
          <input
            type="text"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />

          <input
            type="password"
            placeholder="Confirm password"
            onChange={({ target }) => setConfirmPassword(target.value)}
            onKeyDown={({ key }) => {
              if (key === 'Enter')
                document.querySelector('#register-button').click();
            }}
          />

          {error && (
            <Alert type="error" setText={setError}>
              {error}
            </Alert>
          )}
        </section>

        <section>
          <button
            id="register-button"
            className="btn btn--primary"
            onClick={async () => {
              if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
              }

              setInProgress('Registering');
              const isRegisterSuccessful = await register(username, password);
              setInProgress();
              if (isRegisterSuccessful) {
                localStorage.removeItem('refreshToken');
                navigate('/login', { state: { username, password } });
              } else
                setError('That username is invalid or has already been taken');
            }}
          >
            Sign up
          </button>

          <div className="flex">
            <p>Already have an account?</p>
            <button
              className="btn btn--secondary"
              onClick={() => {
                navigate('/login');
              }}
            >
              Login
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
