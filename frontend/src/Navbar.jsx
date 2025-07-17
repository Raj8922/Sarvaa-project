import React from 'react';

const BG_DARK = '#181A1B';
const TEXT_WHITE = '#fff';
const TEXT_LIGHT = '#E5E7EB';
const BORDER = '#232526';
const BTN_DARK = '#232526';
const BTN_LIGHT = '#292b2d';

export default function Navbar({ menu, language, onLanguageChange, onLogin, onSignup, onExplore, user, onLogout, onHome }) {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{
      background: BG_DARK,
      color: TEXT_WHITE,
      borderBottom: `1px solid ${BORDER}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      zIndex: 1050
    }}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            {menu.filter(item => !['about us', 'download', 'services', 'contact us'].includes(item.name.toLowerCase())).map((item, idx) => (
              <li className="nav-item d-flex align-items-center" key={item.name}>
                {item.name.toLowerCase() === 'home' ? (
                  <button
                    className={`nav-link btn btn-link p-0${item.active ? ' active fw-bold' : ''}`}
                    style={{
                      color: TEXT_WHITE,
                      textDecoration: 'none',
                      minWidth: 70,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      margin: '0 4px',
                      fontWeight: item.active ? 700 : 500,
                      background: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={onHome}
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    className={`nav-link${item.active ? ' active fw-bold' : ''}`}
                    href={item.link}
                    style={{
                      color: TEXT_WHITE,
                      minWidth: 70,
                      borderRadius: '8px',
                      padding: '8px 12px',
                      margin: '0 4px',
                      fontWeight: item.active ? 700 : 500,
                      background: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-3">
            <button
              className="btn"
              style={{
                background: BORDER,
                color: TEXT_WHITE,
                minWidth: 90,
                border: 'none',
                borderRadius: 8,
                fontWeight: 600,
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
              }}
              onClick={onExplore}
            >
              Explore
            </button>
            <select
              className="form-select"
              style={{
                width: 120,
                background: BG_DARK,
                color: TEXT_LIGHT,
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                fontWeight: 500
              }}
              value={language}
              onChange={e => onLanguageChange(e.target.value)}
            >
              <option value="English" style={{ background: BG_DARK, color: TEXT_WHITE }}>English</option>
              <option value="Hindi" style={{ background: BG_DARK, color: TEXT_WHITE }}>हिंदी</option>
              <option value="Marathi" style={{ background: BG_DARK, color: TEXT_WHITE }}>मराठी</option>
            </select>
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span style={{ color: TEXT_LIGHT, fontSize: 14, fontWeight: 500 }}>Welcome, {user.name}</span>
                <button
                  className="btn btn-sm"
                  style={{
                    background: BTN_DARK,
                    color: TEXT_WHITE,
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 10,
                    fontWeight: 700,
                    padding: '8px 22px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    letterSpacing: 1,
                    fontSize: 15,
                    transition: 'all 0.2s',
                  }}
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm"
                  style={{
                    background: BTN_DARK,
                    color: TEXT_WHITE,
                    border: `1.5px solid ${BORDER}`,
                    borderRadius: 10,
                    fontWeight: 700,
                    padding: '8px 22px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    letterSpacing: 1,
                    fontSize: 15,
                    transition: 'all 0.2s',
                  }}
                  onClick={onLogin}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .navbar .nav-link:hover,
        .navbar .btn:hover {
          background: #232526 !important;
          color: #fff !important;
        }
        .navbar .nav-link.active {
          background: #232526 !important;
          color: #fff !important;
        }
        .form-select option {
          background: #181A1B !important;
          color: #fff !important;
        }
        .btn.btn-sm:hover, .btn.btn-sm:focus {
          background: #292b2d !important;
          color: #fff !important;
          border-color: #fff !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18) !important;
        }
      `}</style>
    </nav>
  );
} 