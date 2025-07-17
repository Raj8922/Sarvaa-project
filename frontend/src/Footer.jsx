import React from 'react';

const BG_DARK = '#181A1B';
const TEXT_WHITE = '#fff';
const TEXT_LIGHT = '#E5E7EB';
const BORDER = '#232526';

export default function Footer({ t }) {
  return (
    <footer className="mt-auto pt-5 pb-3" style={{
      background: BG_DARK,
      color: TEXT_WHITE,
      borderTop: `1px solid ${BORDER}`,
      boxShadow: '0 -2px 16px rgba(0,0,0,0.18)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated dots for footer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
              borderRadius: '50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `footerFloat ${Math.random() * 8 + 6}s infinite linear`,
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>
      
      <div className="container">
        <div className="row gy-4 align-items-start">
          <div className="col-md-4 text-md-start text-center mb-3 mb-md-0">
            <div className="fw-bold" style={{ fontSize: 28, letterSpacing: 1 }}>{t.company}</div>
            <div style={{ fontSize: 15, opacity: 0.85, margin: '8px 0 16px 0', color: TEXT_LIGHT }}>{t.slogan}</div>
            <div style={{ fontSize: 13, opacity: 0.7 }}>&copy; {new Date().getFullYear()} {t.company}</div>
          </div>
          <div className="col-md-4 text-md-center text-center mb-3 mb-md-0">
            <div className="fw-bold mb-2" style={{ fontSize: 17 }}>{t.contact}</div>
            <div style={{ fontSize: 15, opacity: 0.9, color: TEXT_LIGHT }}>
              <span style={{ display: 'block', marginBottom: 4 }}>📞 {t.phone}</span>
              <span style={{ display: 'block', marginBottom: 4 }}>✉️ <a href="mailto:info@sarvaaanalytics.com" style={{ color: TEXT_WHITE, textDecoration: 'underline' }}>{t.email}</a></span>
              <span style={{ display: 'block' }}>📍 {t.address}</span>
            </div>
          </div>
          <div className="col-md-4 text-md-end text-center">
            <div className="fw-bold mb-2" style={{ fontSize: 17 }}>{t.follow}</div>
            <div className="d-flex justify-content-md-end justify-content-center gap-3">
              <a href="#" className="footer-social rounded-circle d-flex align-items-center justify-content-center" style={{ background: BORDER, width: 38, height: 38, color: TEXT_WHITE, fontSize: 18, transition: 'background 0.2s', border: 'none' }} title={t.facebook}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="footer-social rounded-circle d-flex align-items-center justify-content-center" style={{ background: BORDER, width: 38, height: 38, color: TEXT_WHITE, fontSize: 18, transition: 'background 0.2s', border: 'none' }} title={t.twitter}>
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="footer-social rounded-circle d-flex align-items-center justify-content-center" style={{ background: BORDER, width: 38, height: 38, color: TEXT_WHITE, fontSize: 18, transition: 'background 0.2s', border: 'none' }} title={t.linkedin}>
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: BORDER, margin: '32px 0 16px 0' }} />
        <div className="row">
          <div className="col-12 text-center">
            <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: 1, opacity: 0.9 }}>Powered by Sarvaa Analytics</span>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes footerFloat {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-8px) translateX(-4px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-12px) translateX(12px);
            opacity: 0.7;
          }
        }
        
        .footer-social:hover {
          background: #232526 !important;
          color: #fff !important;
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
} 