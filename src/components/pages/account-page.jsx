import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  getAccount as getAccountData,
  logout
} from '../../features/account/account-connection';
import LoadingOverlay from '../loading-overlay';

export default function AccountPage() {
  const navigate = useNavigate();

  const [inProgress, setInProgress] = useState(null);
  const [accountData, setAccountData] = useState({});

  return (
    <div className="page page--account">
      <LoadingOverlay text={inProgress} />
      <h1>Account Page</h1>
      <button
        onClick={() => {
          getAccountData().then((account) => {
            setAccountData(account);
          });
        }}
      >
        Get Account Data
      </button>
      <button
        onClick={async () => {
          setInProgress('Logging out');
          await logout();
          setInProgress();
          navigate('/');
        }}
      >
        Logout
      </button>
      <p>Account Data:</p>
      <pre>{JSON.stringify(accountData, null, 2)}</pre>
    </div>
  );
}
