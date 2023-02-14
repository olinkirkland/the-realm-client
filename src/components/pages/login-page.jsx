import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  login,
  refreshAccessToken
} from '../../features/account/account-connection';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Login page loaded');
    const initialUsername = location.state?.username;
    const initialPassword = location.state?.password;

    if (initialUsername && initialPassword) handleLoginFromRegisterPage();
    async function handleLoginFromRegisterPage() {
      setUsername(initialUsername);
      setPassword(initialPassword);

      setInProgress(true);
      const loginSuccess = await login(initialUsername, initialPassword);
      setInProgress(false);
      if (loginSuccess) navigate('/account');
      else setError('Invalid username or password');
    }

    // If there's a refresh token in localStorage, try to login with it
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) handleLoginWithRefreshToken(refreshToken);
    async function handleLoginWithRefreshToken(refreshToken) {
      setInProgress(true);
      const refreshAccessTokenSuccess = await refreshAccessToken(refreshToken);
      setInProgress(false);
      if (refreshAccessTokenSuccess) {
        navigate('/account');
      } else {
        setError('Invalid refresh token, please login again');
        localStorage.removeItem('refreshToken');
      }
    }
  }, []);

  return (
    <div className="LoginPage">
      {inProgress && <div>In Progress</div>}

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
          setInProgress(true);
          const isLoginSuccessful = await login(username, password);
          setInProgress(false);
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
