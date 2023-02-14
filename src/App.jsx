import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/landing-page';
import LoginPage from './components/pages/login-page';
import AccountPage from './components/pages/account-page';
import GamePage from './components/pages/game-page';

import './assets/styles/css/styles.css';
import RegisterPage from './components/pages/register-page';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
