import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import mapbackside from './assets/mapbackside.png';

const BG_DARK = '#181A1B';
const TEXT_WHITE = '#fff';
const TEXT_LIGHT = '#E5E7EB';
const CARD_DARK = '#232526';
const SHADOW = '0 4px 24px rgba(0,0,0,0.25)';


const navItems = [
  { label: 'Ministry Dashboard', path: '/erp' },
  { label: 'Live Tracker', path: '/heatmap'},
  { label: 'Budget Tracker', path: '/budget-tracker'},
  { label: 'Project and Campaign', path: '/project-campaign'},
];


const faqs = [
  "Which divisions have ICU beds near capacity?",
  "What is pending in the dengue response file?",
  "Which district performed the highest covid tests today?",
  "What is the status of the tender payment I approved two days ago?",
  "Draft a press release on successful TB Panchayat campaign.",
  "Which districts urgently require additional vaccine supplements?"
];


export default function ChatBot() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [aiSummary, setAiSummary] = useState(null);
  const [aiSources, setAiSources] = useState([]);
  const [aiResults, setAiResults] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        background: BG_DARK,
        color: TEXT_LIGHT,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
      }}
    >
      {/* Sidebar (unchanged) */}
      <div
        style={{
          width: 280,
          minWidth: 150,
          background: "rgba(36,37,38,0.98)",
          borderRight: "1.5px solid #232526",
          boxShadow: "2px 0 24px #0004",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px 0 24px 0",
          gap: 18,
          zIndex: 10,
          position: "sticky",
          top: 0,
          height: "100vh",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: 114,
            height: 84,
            borderRadius: 14,
            marginBottom: 28,
            boxShadow: "0 2px 8px #0002",
          }}
        />
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: 28,
              borderRadius: 12,
              padding: "18px 0",
              width: "100%",
              margin: "0 0 10px 0",
              cursor: "pointer",
              transition: "background 0.18s, color 0.18s",
              fontWeight: 700,
              boxShadow: "0 1px 4px #0001",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#f7e23e";
              e.currentTarget.style.color = "#181A1B";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "#fff";
            }}
          >
            {item.icon && (
              <span style={{ fontSize: 32, minWidth: 36, textAlign: "center" }}>{item.icon}</span>
            )}
            <div style={{ fontSize: 18, fontWeight: 700, textAlign: "center" }}>{item.label}</div>
          </button>
        ))}
      </div>
      {/* Main Content Area (screenshot design) */}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "0 16px",
        }}
      >
        {/* Mapbackside Background */}
        <img
          src={mapbackside}
          alt="Map Background"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            width: '60vw',
            minWidth: 320,
            maxWidth: 900,
            opacity: 0.28,
            filter: 'none',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        {/* Centered Logo and Title */}
        <div style={{ width: "100%", maxWidth: 700, margin: "0 auto", textAlign: "center", marginTop: "-8vh", marginBottom: "8vh" }}>
          <div style={{ marginBottom: 40 }}>
            <img src={logo} alt="Logo" style={{ width: 120, height: 120, objectFit: 'contain', marginBottom: 16, borderRadius: 24, boxShadow: '0 2px 12px #0002' }} />
            <div style={{ fontWeight: 800, fontSize: '1.35rem', color: '#181A1B', letterSpacing: '0.5px', marginBottom: 8 }}>Narad AI </div>
            <div style={{ fontWeight: 900, fontSize: "2.2rem", color: "#181A1B", letterSpacing: "-1px", marginBottom: 8 }}>
             
              What's on your mind today?
            </div>
          </div>
          {/* Search Bar */}
          <div style={{ width: "100%", maxWidth: 480, margin: "0 auto", position: "relative" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // handle search submit if needed
              }}
              style={{ width: "100%" }}
              autoComplete="off"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "2.5px solid #27ae60",
                  borderRadius: 8,
                  background: "#fff",
                  boxShadow: "0 2px 12px #0001",
                  padding: "0 12px",
                  height: 52,
                  width: "100%",
                  transition: "border 0.2s",
                }}
              >
                <input
                  ref={searchBarRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    if (e.target.value.length > 0) {
                      const val = e.target.value.toLowerCase();
                      setSuggestions(
                        faqs.filter(faq => faq.toLowerCase().includes(val)).slice(0, 5)
                      );
                    } else {
                      setSuggestions([]);
                    }
                  }}
                  placeholder="Ask anything"
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: 20,
                    background: "#fff",
                    color: "#181A1B",
                    fontWeight: 500,
                    padding: "8px 0",
                  }}
                />
                {/* File/Photo Upload Buttons */}
                <label htmlFor="photo-upload" style={{ cursor: 'pointer', marginLeft: 6, display: 'flex', alignItems: 'center' }} title="Attach photo">
                  <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} />
                  <svg width="24" height="24" fill="none" stroke="#27ae60" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5-4 4-7-7" />
                  </svg>
                </label>
                <button
                  type="submit"
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    padding: 0,
                    marginLeft: 8,
                    display: "flex",
                    alignItems: "center",
                  }}
                  tabIndex={-1}
                  aria-label="Search"
                  onClick={() => {
                    if (input.trim()) {
                      navigate(`/search?q=${encodeURIComponent(input)}`);
                    }
                  }}
                >
                  <svg width="26" height="26" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </form>
            {/* Dropdown Suggestion */}
            {suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 56,
                  background: "#fff",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: 8,
                  boxShadow: "0 4px 24px #0002",
                  zIndex: 20,
                  fontSize: 17,
                  color: "#181A1B",
                  fontWeight: 700,
                  textAlign: "left",
                  padding: 0,
                  cursor: "pointer",
                  maxHeight: 260,
                  overflowY: 'auto',
                }}
              >
                {suggestions.map((faq, idx) => (
                  <div
                    key={idx}
                    style={{ padding: "14px 18px", borderBottom: idx !== suggestions.length - 1 ? '1px solid #f0f0f0' : 'none' }}
                    onMouseDown={() => {
                      setInput(faq);
                      setSuggestions([]);
                    }}
                  >
                    <span style={{ fontWeight: 900 }}>{faq}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Search Results Interface */}
      {showResults && (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 32,
          width: '100%',
          maxWidth: 1200,
          margin: '40px auto 0 auto',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Left Column: AI Summary, Sources, Results */}
          <div style={{ flex: 2, minWidth: 0 }}>
            {/* AI Summary Box */}
            <div style={{
              border: '2.5px solid #27ae60',
              borderRadius: 12,
              background: '#fff',
              boxShadow: '0 2px 12px #0001',
              padding: '24px 28px',
              marginBottom: 24,
              fontSize: 18,
              color: '#181A1B',
              fontWeight: 500,
              position: 'relative',
            }}>
              <div style={{ fontWeight: 800, color: '#27ae60', marginBottom: 8, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>AI Summary</span>
                <span style={{ fontSize: 13, color: '#27ae60', background: '#eafaf1', borderRadius: 6, padding: '2px 10px', fontWeight: 700 }}>Finished generating</span>
              </div>
              {aiSummary && aiSummary.map((line, idx) => (
                <div key={idx} style={{ marginBottom: idx === 0 ? 16 : 0, fontWeight: idx === 0 ? 700 : 500, fontSize: idx === 0 ? 18 : 16 }}>
                  {line}
                </div>
              ))}
            </div>
            {/* Sources */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#181A1B' }}>Sources:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {aiSources && aiSources.map((src, idx) => (
                  <a key={idx} href={src.url} style={{
                    background: '#f4f4f4',
                    border: '1.5px solid #e0e0e0',
                    borderRadius: 8,
                    padding: '6px 14px',
                    fontWeight: 600,
                    color: '#2563eb',
                    fontSize: 15,
                    textDecoration: 'none',
                    transition: 'background 0.18s',
                  }}>{src.name}</a>
                ))}
              </div>
            </div>
            {/* Search Results */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#181A1B' }}>Search Results</div>
              <div style={{ background: '#f9f9f9', borderRadius: 8, border: '1.5px solid #e0e0e0', padding: '12px 0' }}>
                {aiResults && aiResults.map((res, idx) => (
                  <a key={idx} href={res.url} style={{
                    display: 'block',
                    padding: '12px 18px',
                    color: '#2563eb',
                    fontWeight: 600,
                    fontSize: 15,
                    borderBottom: idx !== aiResults.length - 1 ? '1px solid #ececec' : 'none',
                    textDecoration: 'none',
                    transition: 'background 0.18s',
                  }}>{res.name}</a>
                ))}
              </div>
            </div>
          </div>
          {/* Right Column: Chat/Follow-up */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 400 }}>
            <div style={{
              background: '#f8f8f8',
              border: '1.5px solid #e0e0e0',
              borderRadius: 12,
              boxShadow: '0 2px 12px #0001',
              padding: '22px 20px 18px 20px',
              fontSize: 16,
              color: '#181A1B',
              fontWeight: 500,
              marginBottom: 18,
            }}>
              <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 10, color: '#2563eb' }}>C3 Generative AI Chat</div>
              {chatHistory.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700, color: '#181A1B', marginBottom: 4 }}>Q: {chatHistory[0].q}</div>
                  <div style={{ color: '#2563eb', fontWeight: 600, marginBottom: 8 }}>A:</div>
                  <div style={{ color: '#181A1B', fontWeight: 500, whiteSpace: 'pre-line' }}>{chatHistory[0].a}</div>
                </div>
              )}
              <div style={{ marginTop: 18, color: '#888', fontSize: 15 }}>What can I help you with? Feel free to ask a follow-up question.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 