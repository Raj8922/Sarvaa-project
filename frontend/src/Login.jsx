import React, { useState } from 'react';

const BLUE = '#2563eb';
const DARK_BLUE = '#1d4ed8';
const LIGHT_BLUE = '#3b82f6';
const BG_DARK = '#181A1B';
const TEXT_WHITE = '#fff';
const TEXT_LIGHT = '#E5E7EB';
const BORDER = '#232526';
const BTN_DARK = '#232526';
const BTN_LIGHT = '#292b2d';

export default function Login({ onSubmit = () => {}, onSwitch = () => {}, error: propError, loading, success }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    onSubmit({ email, password });
  };

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #e3f0ff 0%, #f7fafd 100%)' }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '2.5px solid #e0e0e0',
          boxShadow: '0 8px 32px 0 rgba(37,99,235,0.12)',
          borderRadius: 24,
          padding: '44px 38px 36px 38px',
          minWidth: 340,
          maxWidth: 410,
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <h2 style={{ fontWeight: 900, color: '#2563eb', letterSpacing: 2, fontSize: 36, marginBottom: 6, textShadow: '0 2px 12px #2563eb22' }}>Login</h2>
          <div style={{ color: '#183153', fontSize: 17, fontWeight: 600 }}>Welcome back! Please login to your account.</div>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%' }}>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 700, fontSize: 15 }}>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              autoFocus
              style={{
                background: 'rgba(240,246,251,0.92)',
                color: '#183153',
                border: '1.5px solid #2563eb',
                fontSize: 17,
                fontWeight: 600,
                borderRadius: 12,
                boxShadow: '0 2px 8px #2563eb11',
                padding: '12px 16px',
                marginBottom: 6,
                transition: 'border 0.2s',
              }}
              onFocus={e => (e.target.style.border = `1.5px solid #1746a2`)}
              onBlur={e => (e.target.style.border = '1.5px solid #2563eb')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: '#2563eb', fontWeight: 700, fontSize: 15 }}>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                background: 'rgba(240,246,251,0.92)',
                color: '#183153',
                border: '1.5px solid #2563eb',
                fontSize: 17,
                fontWeight: 600,
                borderRadius: 12,
                boxShadow: '0 2px 8px #2563eb11',
                padding: '12px 16px',
                marginBottom: 6,
                transition: 'border 0.2s',
              }}
              onFocus={e => (e.target.style.border = `1.5px solid #1746a2`)}
              onBlur={e => (e.target.style.border = '1.5px solid #2563eb')}
            />
          </div>
          {(error || propError) && <div className="alert alert-danger py-1 mb-2" style={{ borderRadius: 8, background: '#fbbf24', color: '#fff', fontWeight: 700, fontSize: 15 }}>{error || propError}</div>}
          {success && <div className="alert alert-success py-1 mb-2" style={{ borderRadius: 8, background: '#22c55e', color: '#fff', fontWeight: 700, fontSize: 15 }}>{success}</div>}
          <button
            type="submit"
            className="btn w-100 mb-2 d-flex align-items-center justify-content-center"
            disabled={loading}
            style={{
              background: 'linear-gradient(90deg, #2563eb 0%, #1746a2 100%)',
              color: '#fff',
              border: `none`,
              borderRadius: 14,
              fontWeight: 800,
              padding: '13px 0',
              boxShadow: '0 4px 16px #2563eb22',
              letterSpacing: 1,
              fontSize: 20,
              transition: 'all 0.2s',
              textShadow: '0 2px 8px #2563eb22',
            }}
          >
            {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
            Login
          </button>
        </form>
        <div className="text-center mt-3" style={{ width: '100%' }}>
         
        </div>
      </div>
    </div>
  );
} 