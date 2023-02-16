import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { logout } from '../../features/account/account-connection';
import LoadingOverlay from '../loading-overlay';

export default function AccountPage() {
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(false);

  return (
    <div className="AccountPage">
      {inProgress && <LoadingOverlay />}
      <h1>Account Page</h1>
      <button onClick={() => {}}>Get Account Info</button>
      <button
        onClick={async () => {
          setInProgress(true);
          await logout();
          setInProgress(false);
          navigate('/');
        }}
      >
        Logout
      </button>
    </div>
  );
}
