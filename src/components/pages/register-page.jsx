import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../features/account/account-connection';
import LoadingOverlay from '../loading-overlay';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className="RegisterPage">
      <LoadingOverlay text={inProgress} />

      <h1>Sign Up</h1>

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
          setInProgress('Registering');
          const isRegisterSuccessful = await register(username, password);
          setInProgress();
          if (isRegisterSuccessful) {
            localStorage.removeItem('refreshToken');
            navigate('/login', { state: { username, password } });
          } else setError('That username is invalid or has already been taken');
        }}
      >
        Sign up
      </button>

      <button
        onClick={() => {
          navigate('/login');
        }}
      >
        Already have an account? Login
      </button>
    </div>
  );
}
