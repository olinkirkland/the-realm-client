import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  login,
  requestNewAccessToken,
  getRefreshToken
} from '../../features/account/account-connection';
import LoadingOverlay from '../loading-overlay';

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
    <div className="LoginPage">
      <LoadingOverlay text={inProgress} />

      <h1>Login Page</h1>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>{error && <span>{error}</span>}</div>

      <button
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

      <button
        onClick={() => {
          navigate('/register');
        }}
      >
        Don't have an account? Sign up
      </button>
    </div>
  );
}
