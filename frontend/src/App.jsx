import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import mapbackside from './assets/mapbackside.png';
import Login from './Login';
import Signup from './Signup';
import Explore from './Explore';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ERP from './components/ERP';
import Heatmap from './components/Heatmap';
import BudgetTracker from './components/BudgetTracker';
import ProjectCampaignDashboard from './components/ProjectCampaignDashboard';
import ThreeWaveBackground from './components/ThreeWaveBackground';
import { LanguageProvider, useLanguage } from './LanguageContext';
import SearchResults from './SearchResults';
import MinisterProfileEdit from './components/MinisterProfileEdit';
import naradVideo from './assets/video.mp4';
import logo from './assets/logo.png';
import projectCampaignVideo from './assets/Projectcampaign.mp4';
import budgetTrackerVideo from './assets/BudgetTracker.mp4';
import liveTrackerVideo from './assets/liveTracker.mp4';
import ministryVideo from './assets/ministry.mp4';

const BG_DARK = '#181A1B';
const TEXT_LIGHT = '#E5E7EB';
const TEXT_WHITE = '#fff';
const CARD_DARK = '#232526';
const SHADOW = '0 4px 24px rgba(0,0,0,0.25)';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authMode, setAuthMode] = React.useState('login');
  const [user, setUser] = React.useState(null);
  const [authError, setAuthError] = React.useState('');
  const [authSuccess, setAuthSuccess] = React.useState('');
  const [authLoading, setAuthLoading] = React.useState(false);
  const [showVideoModal, setShowVideoModal] = React.useState(null);
  const [titleVisible, setTitleVisible] = React.useState(false);

  const handleLanguageChange = (lang) => setLanguage(lang);
  const handleLoginClick = () => { setAuthMode('login'); setShowAuthModal(true); };
  const handleSignupClick = () => { setAuthMode('signup'); setShowAuthModal(true); };
  const handleCloseModal = () => setShowAuthModal(false);
  const API_URL = 'http://localhost:5000/api';

  const handleLogin = async ({ email, password }) => {
    setAuthLoading(true); setAuthError(''); setAuthSuccess('');
    setTimeout(() => {
      setUser({ name: 'Demo User', email });
      setAuthSuccess('Demo login successful!');
      setAuthLoading(false);
      setShowAuthModal(false);
      navigate('/explore');
    }, 800);
  };
  const handleSignup = async ({ name, email, password }) => {
    setAuthLoading(true); setAuthError(''); setAuthSuccess('');
    setTimeout(() => {
      setAuthSuccess('Demo signup successful! You can now log in.');
      setAuthLoading(false);
      setAuthMode('login');
    }, 1000);
  };
  const handleLogout = () => { setUser(null); localStorage.removeItem('token'); };
  const handleExplore = () => { navigate('/explore'); setShowAuthModal(false); };
  const handleHome = () => { navigate('/'); setShowAuthModal(false); };

  React.useEffect(() => {
    setTimeout(() => setTitleVisible(true), 200);
  }, []);

  const customVideos = [
    {
      title: 'Project Campaign Dashboard',
      src: projectCampaignVideo,
      desc: 'A walkthrough of the Project Campaign Dashboard for Maharashtra Health Department.'
    },
    {
      title: 'Budget Tracker',
      src: budgetTrackerVideo,
      desc: 'Track and analyze health department budgets in real time.'
    },
    {
      title: 'Live Tracker',
      src: liveTrackerVideo,
      desc: 'Live tracking of health initiatives and progress across districts.'
    },
    {
      title: 'Ministry Overview',
      src: ministryVideo,
      desc: 'Overview of ministry operations and key health programs.'
    },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column position-relative" style={{ background: BG_DARK }}>
      {/* Header/Navbar */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {location.pathname !== '/erp' && (
          <Navbar
            menu={t.navbar}
            language={language}
            onLanguageChange={handleLanguageChange}
            onLogin={handleLoginClick}
            onSignup={handleSignupClick}
            user={user}
            onLogout={handleLogout}
            onExplore={handleExplore}
            onHome={handleHome}
            darkMode={true}
          />
        )}
        {/* Notification Bar */}
        {location.pathname !== '/erp' && (
          <div className="py-2 px-3" style={{ background: BG_DARK, color: TEXT_LIGHT, fontWeight: 500, borderBottom: '1px solid #232526', boxShadow: SHADOW }}>
            <strong>Latest Updates:</strong> {t.updates.join(' | ')}
          </div>
        )}
      </div>
      {/* Main Content (above background) */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/explore" element={<Explore />} />
          <Route path="/erp" element={<ERP />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/budget-tracker" element={<BudgetTracker />} />
          <Route path="/project-campaign" element={<ProjectCampaignDashboard />} />
          <Route path="/login" element={<Login onSubmit={handleLogin} onSwitch={() => navigate('/signup')} loading={authLoading} error={authError} success={authSuccess} />} />
          <Route path="/signup" element={<Signup onSubmit={handleSignup} onSwitch={() => navigate('/login')} loading={authLoading} error={authError} success={authSuccess} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/minister-profile-edit" element={<MinisterProfileEdit />} />
          {/* Default route: show landing page as before */}
          <Route path="*" element={
            <>
              {/* Full Page Banner Section */}
              <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ minHeight: 0, flex: 1, width: '100vw', background: BG_DARK }}>
                <div className="d-flex flex-row w-100 h-100 align-items-center position-relative" style={{ minHeight: 'calc(100vh - 120px)' }}>
                  {/* Mapbackside image between text and minister (subtle, dark) */}
                  <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, width: '50%', height: 'auto', opacity: 0.08, pointerEvents: 'none', filter: 'grayscale(1)' }}>
                    <img src={mapbackside} alt="Map" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    {/* Pulse overlays on map */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                      {[
                        { left: '18%', top: '32%' },
                        { left: '38%', top: '22%' },
                        { left: '60%', top: '40%' },
                        { left: '70%', top: '60%' },
                        { left: '30%', top: '70%' },
                        { left: '55%', top: '55%' },
                        { left: '80%', top: '30%' },
                        { left: '45%', top: '65%' },
                        { left: '65%', top: '20%' },
                      ].map((pos, i) => (
                        <span
                          key={i}
                          className="pulse-animate-back pulse-map"
                          style={{
                            position: 'absolute',
                            left: pos.left,
                            top: pos.top,
                            width: '2.2em',
                            height: '2.2em',
                            opacity: 0.45,
                            animationDelay: `${i * 0.4}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Centered MAHA AROGYA PULSE Text, no logo */}
                  <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 w-100" style={{ zIndex: 2, minHeight: '60vh' }}>
                    <div style={{
                      fontWeight: 1000,
                      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                      lineHeight: 1.05,
                      color: TEXT_WHITE,
                      letterSpacing: '-2px',
                      textAlign: 'center',
                      marginBottom: 0,
                      marginTop: 0,
                      textShadow: '0 4px 8px #000',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {t.mainTitle.map((line, idx) => (
                        <div
                          key={idx}
                          className={`hero-title-animate${titleVisible ? ' visible' : ''}`}
                          style={{
                            width: '100%',
                            transition: 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)',
                            opacity: titleVisible ? 1 : 0,
                            transform: titleVisible ? 'translateY(0)' : 'translateY(40px)',
                            transitionDelay: `${0.2 + idx * 0.18}s`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            flexDirection: 'column',
                          }}
                        >
                          {line}
                          {(line.trim().toLowerCase() === 'pulse' || line.trim() === 'पल्स') && (
                            <div style={{ width: 'min(420px, 60vw)', margin: '0 auto', marginTop: '0.5em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                              <svg viewBox="0 0 420 60" width="100%" height="60" style={{ display: 'block' }}>
                                <path
                                  id="ecg-path"
                                  d="M0 30 Q20 30 30 30 Q35 30 38 35 Q41 40 48 25 Q55 10 62 40 Q69 55 80 30 Q100 30 120 30 Q130 30 135 25 Q140 20 150 40 Q160 60 170 30 Q180 0 200 30 Q210 45 220 30 Q230 15 240 30 Q250 45 260 30 Q270 15 280 30 Q300 30 320 30 Q330 30 335 25 Q340 20 350 40 Q360 60 370 30 Q380 0 400 30 Q410 45 420 30"
                                  fill="none"
                                  stroke="#e53935"
                                  strokeWidth="4"
                                  strokeLinejoin="round"
                                  strokeLinecap="round"
                                >
                                  <animate
                                    attributeName="stroke-dasharray"
                                    from="0,1000"
                                    to="1000,0"
                                    dur="2.8s"
                                    repeatCount="indefinite"
                                  />
                                  <animate
                                    attributeName="stroke-dashoffset"
                                    from="1000"
                                    to="0"
                                    dur="2.8s"
                                    repeatCount="indefinite"
                                  />
                                </path>
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3" style={{ fontSize: '1.5rem', color: TEXT_LIGHT, fontWeight: 600, textAlign: 'center' }}>{t.tagline}</div>
                  </div>
                </div>
              </div>
              {/* Support Helpline Numbers Section */}
              <section className="py-5" style={{ background: 'transparent', position: 'relative' }}>
                <ThreeWaveBackground style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                  <h2 className="mb-4 text-center" style={{ fontWeight: 700, color: TEXT_WHITE, fontSize: '2.5rem', letterSpacing: '-1px' }}>Support Helpline Numbers</h2>
                  <div className="helpline-carousel" style={{ position: 'relative', overflow: 'hidden', padding: '20px 0' }}>
                    <div className="helpline-track" style={{ display: 'flex', animation: 'helplineRotate 8s linear infinite' }}>
                      {/* First set of cards */}
                      <div className="helpline-card" style={{ minWidth: '300px', margin: '0 15px', flexShrink: 0 }}>
                        <div className="card h-100 border-0 shadow-sm" style={{ background: CARD_DARK, color: TEXT_LIGHT, boxShadow: SHADOW, borderRadius: '16px' }}>
                          <div className="card-body text-center p-4">
                            <div className="mb-3"><i className="bi bi-telephone-fill" style={{ fontSize: '2.5rem', color: TEXT_WHITE }}></i></div>
                            <h5 className="card-title fw-bold mb-2" style={{ color: TEXT_WHITE }}>Emergency Helpline</h5>
                            <p className="card-text mb-3">24/7 emergency medical assistance</p>
                            <div className="fw-bold" style={{ fontSize: '1.2rem', color: TEXT_WHITE }}>108</div>
                          </div>
                        </div>
                      </div>
                      <div className="helpline-card" style={{ minWidth: '300px', margin: '0 15px', flexShrink: 0 }}>
                        <div className="card h-100 border-0 shadow-sm" style={{ background: CARD_DARK, color: TEXT_LIGHT, boxShadow: SHADOW, borderRadius: '16px' }}>
                          <div className="card-body text-center p-4">
                            <div className="mb-3"><i className="bi bi-heart-pulse-fill" style={{ fontSize: '2.5rem', color: TEXT_WHITE }}></i></div>
                            <h5 className="card-title fw-bold mb-2" style={{ color: TEXT_WHITE }}>COVID-19 Helpline</h5>
                            <p className="card-text mb-3">Coronavirus related queries</p>
                            <div className="fw-bold" style={{ fontSize: '1.2rem', color: TEXT_WHITE }}>1075</div>
                          </div>
                        </div>
                      </div>
                      <div className="helpline-card" style={{ minWidth: '300px', margin: '0 15px', flexShrink: 0 }}>
                        <div className="card h-100 border-0 shadow-sm" style={{ background: CARD_DARK, color: TEXT_LIGHT, boxShadow: SHADOW, borderRadius: '16px' }}>
                          <div className="card-body text-center p-4">
                            <div className="mb-3"><i className="bi bi-shield-check-fill" style={{ fontSize: '2.5rem', color: TEXT_WHITE }}></i></div>
                            <h5 className="card-title fw-bold mb-2" style={{ color: TEXT_WHITE }}>Child Helpline</h5>
                            <p className="card-text mb-3">Child protection and welfare</p>
                            <div className="fw-bold" style={{ fontSize: '1.2rem', color: TEXT_WHITE }}>1098</div>
                          </div>
                        </div>
                      </div>
                      {/* Duplicate set for seamless loop */}
                      <div className="helpline-card" style={{ minWidth: '300px', margin: '0 15px', flexShrink: 0 }}>
                        <div className="card h-100 border-0 shadow-sm" style={{ background: CARD_DARK, color: TEXT_LIGHT, boxShadow: SHADOW, borderRadius: '16px' }}>
                          <div className="card-body text-center p-4">
                            <div className="mb-3"><i className="bi bi-telephone-fill" style={{ fontSize: '2.5rem', color: TEXT_WHITE }}></i></div>
                            <h5 className="card-title fw-bold mb-2" style={{ color: TEXT_WHITE }}>Emergency Helpline</h5>
                            <p className="card-text mb-3">24/7 emergency medical assistance</p>
                            <div className="fw-bold" style={{ fontSize: '1.2rem', color: TEXT_WHITE }}>108</div>
                          </div>
                        </div>
                      </div>
                      <div className="helpline-card" style={{ minWidth: '300px', margin: '0 15px', flexShrink: 0 }}>
                        <div className="card h-100 border-0 shadow-sm" style={{ background: CARD_DARK, color: TEXT_LIGHT, boxShadow: SHADOW, borderRadius: '16px' }}>
                          <div className="card-body text-center p-4">
                            <div className="mb-3"><i className="bi bi-heart-pulse-fill" style={{ fontSize: '2.5rem', color: TEXT_WHITE }}></i></div>
                            <h5 className="card-title fw-bold mb-2" style={{ color: TEXT_WHITE }}>COVID-19 Helpline</h5>
                            <p className="card-text mb-3">Coronavirus related queries</p>
                            <div className="fw-bold" style={{ fontSize: '1.2rem', color: TEXT_WHITE }}>1075</div>
                          </div>
                        </div>
                      </div>
                      <div className="helpline-card" style={{ minWidth: '300px', margin: '0 15px', flexShrink: 0 }}>
                        <div className="card h-100 border-0 shadow-sm" style={{ background: CARD_DARK, color: TEXT_LIGHT, boxShadow: SHADOW, borderRadius: '16px' }}>
                          <div className="card-body text-center p-4">
                            <div className="mb-3"><i className="bi bi-shield-check-fill" style={{ fontSize: '2.5rem', color: TEXT_WHITE }}></i></div>
                            <h5 className="card-title fw-bold mb-2" style={{ color: TEXT_WHITE }}>Child Helpline</h5>
                            <p className="card-text mb-3">Child protection and welfare</p>
                            <div className="fw-bold" style={{ fontSize: '1.2rem', color: TEXT_WHITE }}>1098</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Narad AI Video Dashboard Section */}
              <section className="py-5" style={{ background: 'transparent', position: 'relative' }}>
                <ThreeWaveBackground style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
                <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ maxWidth: 900, width: '100%', margin: '0 auto' }}>
                    <div style={{ background: CARD_DARK, borderRadius: '20px', boxShadow: SHADOW, padding: 0, overflow: 'hidden', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '100%', background: 'rgba(255,255,255,0.02)', padding: '18px 0 10px 0', textAlign: 'center', fontWeight: 900, color: TEXT_WHITE, fontSize: 32, borderBottom: `1px solid ${BG_DARK}`, letterSpacing: '1px' }}>
                        Narad AI
                      </div>
                      <video
                        src={naradVideo}
                        style={{ width: '100%', maxHeight: '540px', minHeight: '320px', objectFit: 'cover', background: '#000', marginBottom: 0 }}
                        controls
                        autoPlay
                        muted
                        playsInline
                        poster={logo}
                      />
                    </div>
                  </div>
                </div>
              </section>
              {/* Video Dashboard Section */}
              <section className="py-5" style={{ background: 'transparent', position: 'relative' }}>
                <ThreeWaveBackground style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                  <h2 className="mb-4 text-center" style={{ fontWeight: 700, color: TEXT_WHITE, fontSize: '2.5rem', letterSpacing: '-1px' }}>Live Dashboards</h2>
                  <div className="video-carousel" style={{ position: 'relative', overflow: 'hidden', padding: '20px 0' }}>
                    <div className="video-track" style={{ display: 'flex', animation: 'videoMove 18s linear infinite', gap: 40, minWidth: 'max-content' }}>
                      {[...customVideos, ...customVideos].map((video, idx) => (
                        <div
                          key={video.title + idx}
                          className="video-card"
                          style={{
                            width: '400px',
                            height: '320px',
                            margin: '0 20px',
                            flexShrink: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'none',
                          }}
                          onClick={() => setShowVideoModal(video)}
                        >
                          <div style={{
                            background: CARD_DARK,
                            borderRadius: '20px',
                            boxShadow: SHADOW,
                            padding: 0,
                            overflow: 'hidden',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            pointerEvents: 'auto',
                          }}>
                            <div style={{
                              width: '100%',
                              background: 'rgba(255,255,255,0.02)',
                              padding: '18px 0 10px 0',
                              textAlign: 'center',
                              fontWeight: 700,
                              color: TEXT_WHITE,
                              fontSize: 22,
                              borderBottom: `1px solid ${BG_DARK}`
                            }}>
                              {video.title}
                            </div>
                            <video
                              src={video.src}
                              style={{ width: '100%', height: '180px', objectFit: 'cover', background: '#000', marginBottom: 0 }}
                              autoPlay
                              loop
                              muted
                              playsInline
                            />
                            <div style={{
                              padding: '16px 18px 18px 18px',
                              color: TEXT_LIGHT,
                              fontSize: 16,
                              textAlign: 'center',
                              minHeight: 60,
                              flex: 1,
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              {video.desc}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              
            </>
          } />
        </Routes>
      </div>
      {/* Footer */}
      {location.pathname !== '/minister-profile-edit' && <Footer t={t.footer} darkMode={true} />}
      {/* Auth Modals */}
      {showAuthModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 3000 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px', background: CARD_DARK, color: TEXT_LIGHT }}>
              <div className="modal-header border-0 pb-0" style={{ background: BG_DARK }}>
                <h5 className="modal-title fw-bold" style={{ color: TEXT_WHITE }}>
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body pt-0">
                {authMode === 'login' ? (
                  <Login
                    onSubmit={handleLogin}
                    onSwitch={() => setAuthMode('signup')}
                    loading={authLoading}
                    error={authError}
                    success={authSuccess}
                  />
                ) : (
                  <Signup
                    onSubmit={handleSignup}
                    onSwitch={() => setAuthMode('login')}
                    loading={authLoading}
                    error={authError}
                    success={authSuccess}
                  />
                )}
                {authError && (
                  <div className="alert alert-danger mt-3" style={{ borderRadius: '8px', background: '#2d2f31', color: '#fff' }}>
                    {authError}
                  </div>
                )}
                {authSuccess && (
                  <div className="alert alert-success mt-3" style={{ borderRadius: '8px', background: '#232526', color: '#fff' }}>
                    {authSuccess}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Video Modal */}
      {showVideoModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 3000 }}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px', background: CARD_DARK, color: TEXT_LIGHT }}>
              <div className="modal-header border-0 pb-0" style={{ background: BG_DARK }}>
                <h5 className="modal-title fw-bold" style={{ color: TEXT_WHITE }}>
                  {showVideoModal.title}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowVideoModal(null)} style={{ filter: 'invert(1)' }}></button>
              </div>
              <div className="modal-body pt-0 p-0">
                <div style={{ padding: '18px 24px', color: TEXT_LIGHT, fontSize: 18, textAlign: 'center' }}>{showVideoModal.desc}</div>
                <video
                  src={showVideoModal.src}
                  style={{ width: '100%', height: '70vh', objectFit: 'cover', background: '#000' }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 8px 25px rgba(0,0,0,0.25) !important;
        }
        
        @keyframes helplineRotate {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes videoMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .helpline-carousel {
          mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
          -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
        }
        
        .video-carousel {
          mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
          -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
        }
        
        .helpline-card {
          transition: transform 0.3s ease;
        }
        
        .helpline-card:hover {
          transform: scale(1.05);
        }
        
        .video-card {
          transition: transform 0.3s ease;
        }
        
        .video-card:hover {
          transform: scale(1.05);
        }
        
        .hero-title-animate {
          opacity: 0;
          transform: translateY(40px);
        }
        
        .hero-title-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .pulse-animate-back {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 1.2em;
          height: 1.2em;
          background: radial-gradient(circle, #27ae60 40%, rgba(39,174,96,0.18) 100%);
          border-radius: 50%;
          z-index: 1;
          animation: pulse-glow 1.6s cubic-bezier(.4,0,.2,1) infinite;
          pointer-events: none;
          opacity: 0.7;
        }
        .pulse-map {
          background: radial-gradient(circle, #27ae60 50%, rgba(39,174,96,0.10) 100%);
          opacity: 0.45;
          filter: blur(0.5px);
        }
        @keyframes pulse-glow {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
            box-shadow: 0 0 0 0 #27ae6044;
          }
          60% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0.3;
            box-shadow: 0 0 24px 16px #27ae6022;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
            box-shadow: 0 0 0 0 #27ae6000;
          }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}