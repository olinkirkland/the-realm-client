import Logo from '../logo';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  login,
  requestNewAccessToken,
  getRefreshToken
} from '../../features/account/account-connection';
import LoadingOverlay from '../loading-overlay';
import Alert from '../alert';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Login page loaded');
    const initialUsername = location.state?.username;
    const initialPassword = location.state?.password;

    if (initialUsername && initialPassword) handleLogin();
    else if (getRefreshToken()) handleLoginWithRefreshToken(getRefreshToken());

    async function handleLogin() {
      setUsername(initialUsername);
      setPassword(initialPassword);

      setInProgress('Logging in');
      const loginSuccess = await login(initialUsername, initialPassword);
      setInProgress();
      if (loginSuccess) navigate('/account');
      else setError('Invalid username or password');
    }

    async function handleLoginWithRefreshToken(refreshToken) {
      setInProgress('Logging in');
      const getNewAccessTokenSuccess = await requestNewAccessToken(
        refreshToken
      );
      setInProgress();
      if (getNewAccessTokenSuccess) {
        navigate('/account');
      } else {
        setError('Invalid refresh token, please login again');
        localStorage.removeItem('refreshToken');
      }
    }
  }, []);

  return (
    <div className="page page--login">
      <LoadingOverlay text={inProgress} />
      <Logo />

      <div className="page__content">
        <h2>Enter your username and password to login.</h2>

        <section>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={({ key }) => {
              if (key === 'Enter')
                document.querySelector('#login-button').click();
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
            id="login-button"
            className="btn btn--primary"
            onClick={async () => {
              setInProgress('Logging in');
              const isLoginSuccessful = await login(username, password);
              setInProgress();
              if (isLoginSuccessful) navigate('/account');
              else setError('Invalid username or password');
            }}
          >
            Login
          </button>

          <div className="flex">
            <p>Don't have an account?</p>
            <button
              className="btn btn--secondary"
              onClick={() => {
                navigate('/register');
              }}
            >
              Sign up
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
