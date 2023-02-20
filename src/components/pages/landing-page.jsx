import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="page page--landing">
      <Logo />
      <div className="page__content">
        <section>
          <p>This page is the landing page.</p>
          <p>In the future, it will contain a continue button.</p>
        </section>
        <section>
          <button
            className="btn btn--primary full-width"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <div className="flex">
            <p>Don't have an account?</p>
            <button
              className="btn btn--secondary"
              onClick={() => navigate('/register')}
            >
              Sign up
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
