import React from 'react';
import '../assets/styles/css/loading-overlay.css';

export default function LoadingOverlay({ text }) {
  return (
    text && (
      <div className="loading-overlay">
        <span>{text}</span>
      </div>
    )
  );
}
