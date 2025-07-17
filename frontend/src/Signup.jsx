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

export default function Signup({ onSubmit = () => {}, onSwitch = () => {}, error: propError, loading, success }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill all fields.');
      return;
    }
    setError('');
    onSubmit({ name, email, password });
  };

  return (
    <div className="p-0" style={{ minWidth: 340, maxWidth: 400, margin: '0 auto' }}>
      <div
        className="rounded-4 shadow-lg"
        style={{
          background: 'rgba(32,33,36,0.92)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1.5px solid #232526',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.32)',
          padding: '44px 36px 36px 36px',
          position: 'relative',
        }}
      >
        <div className="mb-4 text-center">
          <h2 style={{ fontWeight: 900, color: TEXT_WHITE, letterSpacing: 2, fontSize: 34, marginBottom: 4, textShadow: '0 2px 12px #0008' }}>Sign Up</h2>
          <div style={{ color: TEXT_LIGHT, fontSize: 16, fontWeight: 500 }}>Create your account to get started.</div>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label" style={{ color: TEXT_LIGHT, fontWeight: 600 }}>Name</label>
            <input
              type="text"
              className="form-control rounded-pill px-4 py-2"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter name"
              autoFocus
              style={{
                background: 'rgba(24,26,27,0.92)',
                color: TEXT_WHITE,
                border: '1.5px solid #232526',
                fontSize: 17,
                fontWeight: 500,
                boxShadow: '0 2px 8px #0002',
                transition: 'border 0.2s',
              }}
              onFocus={e => (e.target.style.border = `1.5px solid #fff`)}
              onBlur={e => (e.target.style.border = '1.5px solid #232526')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: TEXT_LIGHT, fontWeight: 600 }}>Email address</label>
            <input
              type="email"
              className="form-control rounded-pill px-4 py-2"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                background: 'rgba(24,26,27,0.92)',
                color: TEXT_WHITE,
                border: '1.5px solid #232526',
                fontSize: 17,
                fontWeight: 500,
                boxShadow: '0 2px 8px #0002',
                transition: 'border 0.2s',
              }}
              onFocus={e => (e.target.style.border = `1.5px solid #fff`)}
              onBlur={e => (e.target.style.border = '1.5px solid #232526')}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ color: TEXT_LIGHT, fontWeight: 600 }}>Password</label>
            <input
              type="password"
              className="form-control rounded-pill px-4 py-2"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                background: 'rgba(24,26,27,0.92)',
                color: TEXT_WHITE,
                border: '1.5px solid #232526',
                fontSize: 17,
                fontWeight: 500,
                boxShadow: '0 2px 8px #0002',
                transition: 'border 0.2s',
              }}
              onFocus={e => (e.target.style.border = `1.5px solid #fff`)}
              onBlur={e => (e.target.style.border = '1.5px solid #232526')}
            />
          </div>
          {(error || propError) && <div className="alert alert-danger py-1 mb-2" style={{ borderRadius: 8, background: '#2d2f31', color: '#fff', fontWeight: 600 }}>{error || propError}</div>}
          {success && <div className="alert alert-success py-1 mb-2" style={{ borderRadius: 8, background: '#232526', color: '#fff', fontWeight: 600 }}>{success}</div>}
          <button
            type="submit"
            className="btn w-100 mb-2 d-flex align-items-center justify-content-center rounded-pill"
            disabled={loading}
            style={{
              background: 'linear-gradient(90deg, #232526 0%, #181A1B 100%)',
              color: TEXT_WHITE,
              border: `1.5px solid #fff`,
              borderRadius: 16,
              fontWeight: 800,
              padding: '12px 0',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              letterSpacing: 1,
              fontSize: 19,
              transition: 'all 0.2s',
              textShadow: '0 2px 8px #0008',
            }}
          >
            {loading && <span className="spinner-border spinner-border-sm me-2"></span>}
            Sign Up
          </button>
        </form>
        <div className="text-center mt-3">
          <span style={{ color: TEXT_LIGHT, fontWeight: 500 }}>Already have an account? </span>
          <button className="btn btn-link p-0" style={{ background: 'rgba(36,37,38,0.92)', color: TEXT_WHITE, border: `2px solid #fff`, borderRadius: 16, fontWeight: 900, padding: '12px 0', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', letterSpacing: 1, fontSize: 18, transition: 'all 0.2s', width: '100%', marginTop: 8 }} onClick={onSwitch}>Login</button>
        </div>
      </div>
    </div>
  );
} 