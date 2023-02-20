import React from 'react';
import { useState } from 'react';

export default function Alert({ type, children, setText }) {
  return (
    <div className={`alert alert--${type}`}>
      {children}
      <button className="alert__close" onClick={() => setText(null)}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}
