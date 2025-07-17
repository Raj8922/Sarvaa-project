import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Mock data for demonstration
const mockSummary = [
  "To enroll in GetCoveredNJ, follow these steps:",
  "1. Compare health plans and prices: Use the shop and compare tool to see which plans are available and how much financial help you may qualify for.",
  "2. Apply: Complete a GetCoveredNJ application to get your official eligibility results. You can apply before or after shopping for plans.",
  "3. Pay your first premium: Once you enroll, you will need to pay your first month's premium before your coverage can start."
];
const mockSources = [
  { name: "GetCoveredNJ_NewCustomers.html", url: "#" },
  { name: "GetCoveredNJ_WhatToExpect.html", url: "#" }
];
const mockResults = [
  { name: "A Review of Health Plan Enrollment Strategies.pdf", url: "#", desc: "Comprehensive analysis of enrollment strategies in public health plans, including GetCoveredNJ." },
  { name: "GetCoveredNJ_Eligibility_and_Application_Process.pdf", url: "#", desc: "Step-by-step guide to eligibility and application for GetCoveredNJ." },
  { name: "Financial_Assistance_in_Health_Insurance.pdf", url: "#", desc: "Research on financial help available for health insurance applicants." },
  { name: "Comparing_Health_Plans_2024.pdf", url: "#", desc: "Comparison of available health plans and their benefits for 2024." },
  { name: "Premium_Payment_and_Coverage_Start.pdf", url: "#", desc: "Study on the impact of premium payment timing on coverage activation." },
  { name: "User_Experience_in_Online_Health_Enrollment.pdf", url: "#", desc: "Survey of user experiences with online health plan enrollment portals." },
];

// Unified FAQ list (same as ChatBot)
const FAQS = [
  "Which divisions have ICU beds near capacity?",
  "What is pending in the dengue response file?",
  "Which district performed the highest covid tests today?",
  "What is the status of the tender payment I approved two days ago?",
  "Draft a press release on successful TB Panchayat campaign.",
  "Which districts urgently require additional vaccine supplements?"
];

// FAQ answer, summary, and Google sources mapping
const FAQ_DATA = {
  "Which divisions have ICU beds near capacity?": {
    answer: "Currently, the Mumbai and Pune divisions have ICU bed occupancy rates above 90%. Immediate resource allocation and patient transfer protocols are being reviewed to address the surge.",
    summary: [
      "Mumbai and Pune divisions are experiencing ICU bed occupancy above 90%.",
      "Resource allocation and patient transfer protocols are being reviewed to address the surge.",
      "Other divisions remain below 70% occupancy but are being monitored."
    ],
    sources: [
      { name: "ICU Bed Status - Maharashtra Government", url: "https://arogya.maharashtra.gov.in/icu-bed-status" },
      { name: "COVID-19 Hospital Dashboard", url: "https://covid19.maharashtra.gov.in/hospital-dashboard" }
    ],
    detail: `The Mumbai and Pune divisions are currently facing a critical situation with ICU bed occupancy rates exceeding 90%. This is primarily due to a recent surge in severe cases, particularly among high-risk populations. Hospitals in these divisions have reported that most ICU beds are occupied, and the remaining capacity is being reserved for emergency admissions. The state health department has initiated emergency protocols, including the transfer of stable patients to nearby districts with available capacity, and the rapid deployment of additional ventilators and critical care staff. Authorities are also working to increase ICU capacity by converting general wards and setting up temporary ICU units in collaboration with private hospitals. Real-time monitoring and daily reporting have been mandated to ensure swift response to any further escalation. Residents are advised to seek medical attention early and follow all COVID-19 and infectious disease guidelines to reduce the burden on critical care facilities.`
  },
  "What is pending in the dengue response file?": {
    answer: "Key pending items include real-time disease surveillance, supply of rapid diagnostic kits to rural PHCs, consistent vector control in slum areas, and improved public awareness campaigns. Interdepartmental coordination and centralized monitoring are also lacking.",
    summary: [
      "Several key components of the dengue response remain pending:",
      "- Lack of real-time disease surveillance across regions.",
      "- Insufficient supply of rapid diagnostic kits in rural PHCs.",
      "- Inconsistent vector control in slum/outskirt areas.",
      "- Inadequate public awareness and sanitation efforts.",
      "- Need for better interdepartmental collaboration and monitoring."
    ],
    sources: [
      { name: "Dengue Prevention - WHO", url: "https://www.who.int/news-room/fact-sheets/detail/dengue-and-severe-dengue" },
      { name: "Maharashtra Health - Dengue", url: "https://arogya.maharashtra.gov.in/dengue-control" },
      { name: "Assessment of Disease Surveillance in Maharashtra (BMC Public Health)", url: "https://bmcpublichealth.biomedcentral.com/track/pdf/10.1186/1471-2458-13-575" },
      { name: "Maharashtra Public Health Department", url: "https://phd.maharashtra.gov.in/" },
      { name: "NHM Maharashtra Free Diagnostic Services", url: "https://mahahindlabs.com/" },
      { name: "COVID-19 Response in Mumbai (Indian Journal of Tuberculosis)", url: "https://api.elsevier.com/content/article/pii/S0019570721000858" }
    ],
    detail: `The dengue response file highlights several pending gaps that need urgent attention. First, there is a lack of comprehensive, real-time disease surveillance, especially in rural and peri-urban areas, which leads to delayed outbreak detection and underreporting. Many primary health centres (PHCs) in rural regions still lack rapid diagnostic kits, making early detection and timely treatment difficult. Vector control measures, such as fogging and anti-larval activities, are inconsistently implemented, particularly in slum areas and city outskirts, allowing mosquito populations to thrive. Public awareness campaigns are limited, with insufficient outreach in schools and communities to educate people about mosquito breeding prevention. Sanitation efforts, including waste disposal and elimination of stagnant water, remain uncoordinated between municipal and health departments. The file recommends establishing a centralized monitoring system and improving interdepartmental collaboration to ensure a swift, unified response to outbreak hotspots.`
  },
  "Which district performed the highest covid tests today?": {
    answer: "Nagpur district performed the highest number of COVID-19 tests today, with over 12,000 tests conducted, followed by Mumbai and Pune.",
    summary: [
      "Nagpur led Maharashtra in COVID-19 testing today with 12,000+ tests.",
      "Mumbai and Pune districts followed closely behind.",
      "Testing data is updated daily on the state health dashboard."
    ],
    sources: [
      { name: "COVID-19 Testing Dashboard", url: "https://covid19.maharashtra.gov.in/testing-dashboard" },
      { name: "District-wise COVID-19 Data", url: "https://www.covid19india.org/state/MH" }
    ],
    detail: `Today, Nagpur district reported the highest number of COVID-19 tests in Maharashtra, conducting over 12,000 tests. This surge in testing is part of an intensified effort to identify and isolate new cases quickly, especially in high-density urban zones and containment areas. Mumbai and Pune also reported high testing numbers, but Nagpur's proactive approach, including mobile testing vans and door-to-door sample collection, has set a benchmark for other districts. The district health office has attributed this achievement to strong coordination between municipal authorities, local health workers, and private labs. The data is updated daily on the Maharashtra COVID-19 dashboard, providing transparency and enabling targeted interventions where needed.`
  },
  "What is the status of the tender payment I approved two days ago?": {
    answer: "The tender payment you approved two days ago is currently being processed by the finance department. Expected clearance is within the next 48 hours, pending final verification.",
    summary: [
      "Tender payment approved two days ago is under processing by the finance department.",
      "Expected clearance: within 48 hours, pending final verification.",
      "For real-time status, contact the finance department or check the ERP portal."
    ],
    sources: [
      { name: "Maharashtra e-Tender Portal", url: "https://mahatenders.gov.in/nicgep/app" },
      { name: "Finance Department - Maharashtra", url: "https://finance.maharashtra.gov.in/" }
    ],
    detail: `The tender payment you approved two days ago is currently in the final stages of processing by the finance department. After your approval, the file was forwarded for verification and compliance checks, which are now nearly complete. The finance team has indicated that, barring any discrepancies, the payment will be cleared within the next 48 hours. You can track the real-time status of this payment on the Maharashtra e-Tender Portal or by contacting the finance department directly. If you require an official payment confirmation, it will be available for download once the transaction is finalized.`
  },
  "Draft a press release on successful TB Panchayat campaign.": {
    answer: "Press Release: The Maharashtra Health Department proudly announces the successful completion of the TB Panchayat campaign, resulting in a 30% increase in early TB case detection and improved community awareness across rural districts.",
    summary: [
      "Maharashtra Health Department announces successful TB Panchayat campaign.",
      "Achievements: 30% increase in early TB case detection, improved community awareness.",
      "Campaign covered all rural districts with active local participation."
    ],
    sources: [
      { name: "TB Campaign Success - Times of India", url: "https://timesofindia.indiatimes.com/city/mumbai/tb-panchayat-campaign-success/articleshow/100000000.cms" },
      { name: "Maharashtra Health - TB", url: "https://arogya.maharashtra.gov.in/tb-control" }
    ],
    detail: `Press Release: The Maharashtra Health Department is pleased to announce the successful completion of the TB Panchayat campaign, a state-wide initiative aimed at early detection and community engagement in the fight against tuberculosis. The campaign, which ran for three months across all rural districts, resulted in a 30% increase in early TB case detection and significantly improved awareness about TB prevention and treatment. Local panchayats played a crucial role in mobilizing communities, organizing screening camps, and ensuring treatment adherence. The department extends its gratitude to all healthcare workers, volunteers, and community leaders who contributed to this achievement. The success of this campaign sets a new benchmark for public health initiatives in Maharashtra.`
  },
  "Which districts urgently require additional vaccine supplements?": {
    answer: "Currently, Gadchiroli, Nandurbar, and Palghar districts have reported low vaccine stock and high demand, requiring urgent additional vaccine supplements.",
    summary: [
      "Gadchiroli, Nandurbar, and Palghar districts require urgent vaccine supplements.",
      "Low stock and high demand reported in these areas.",
      "State health authorities are coordinating supply."
    ],
    sources: [
      { name: "Vaccine Supply Status - Maharashtra", url: "https://arogya.maharashtra.gov.in/vaccine-supply" },
      { name: "COVID-19 Vaccine Tracker", url: "https://www.cowin.gov.in/" }
    ],
    detail: `The districts of Gadchiroli, Nandurbar, and Palghar have been identified as requiring urgent additional vaccine supplements due to a combination of low stock and high demand. Recent reports from district health officers indicate that ongoing vaccination drives have depleted existing supplies faster than anticipated, particularly in remote and tribal areas. The state health department is coordinating with central agencies and vaccine manufacturers to expedite shipments to these districts. In the meantime, local authorities are prioritizing high-risk groups and optimizing distribution to ensure that the most vulnerable populations receive timely protection. Regular updates on vaccine availability are being provided to district health offices and the public via the state health portal.`
  }
};

// SVG icons for professional look
const ChevronIcon = ({ expanded }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"/></svg>
);
const DeleteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m5 0V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
);
const ExpandIcon = ({ expanded }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}><polyline points="9 18 15 12 9 6"/></svg>
);

// Helper: Info cards for dengue FAQ
const DENGUE_INFO_CARDS = [
  {
    title: "Real-time Disease Surveillance",
    summary: "Comprehensive, real-time monitoring is essential for early outbreak detection and rapid response. Maharashtra's IDSP system is being strengthened, but rural and peri-urban areas still face delays.",
    link: "https://bmcpublichealth.biomedcentral.com/track/pdf/10.1186/1471-2458-13-575"
  },
  {
    title: "Rapid Diagnostic Kits for Rural PHCs",
    summary: "Many rural Primary Health Centres lack rapid diagnostic kits, making early dengue detection and treatment difficult. Improving supply chains is a key priority.",
    link: "https://mahahindlabs.com/"
  },
  {
    title: "Vector Control in Slum Areas",
    summary: "Consistent vector control (fogging, anti-larval activities) is needed in slums and city outskirts to prevent mosquito breeding and disease spread.",
    link: "https://arogya.maharashtra.gov.in/dengue-control"
  },
  {
    title: "Public Awareness Campaigns",
    summary: "Effective public awareness and sanitation campaigns are crucial for dengue prevention. Outreach in schools and communities needs to be expanded.",
    link: "https://phd.maharashtra.gov.in/"
  },
  {
    title: "Interdepartmental Coordination",
    summary: "Better collaboration between municipal and health departments is needed for sanitation, waste disposal, and outbreak response.",
    link: "https://phd.maharashtra.gov.in/"
  },
  {
    title: "Centralized Monitoring",
    summary: "A centralized system for monitoring and rapid response can help coordinate efforts and ensure swift action in outbreak hotspots.",
    link: "https://bmcpublichealth.biomedcentral.com/track/pdf/10.1186/1471-2458-13-575"
  }
];

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const query = params.get('q') || '';
  const [chatInput, setChatInput] = useState('');
  const [topInput, setTopInput] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [aiLiked, setAiLiked] = useState(null); // null, 'like', 'dislike'
  const [aiSummaryExpanded, setAiSummaryExpanded] = useState(false);
  const [chatDeleted, setChatDeleted] = useState(false);
  const [chatExpanded, setChatExpanded] = useState(false);
  const footerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hoveredSource, setHoveredSource] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [popupLoading, setPopupLoading] = useState(false);
  const popupTimeout = useRef();
  const [popupHovered, setPopupHovered] = useState(false);
  const [popupExpanded, setPopupExpanded] = useState(false);

  // Reset chatDeleted when query changes (new search)
  useEffect(() => {
    setChatDeleted(false);
  }, [query]);

  // Simulate loading on search
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [query]);

  // Determine if query matches an FAQ
  const matchedFAQ = FAQS.find(faq => faq.toLowerCase() === query.trim().toLowerCase());
  const faqData = matchedFAQ ? FAQ_DATA[matchedFAQ] : null;

  // Helper to get summary for a source
  function getSourceSummary(srcName) {
    if (faqData && faqData.sources) {
      const idx = faqData.sources.findIndex(s => s.name === srcName);
      if (faqData.summary && faqData.summary[idx]) return faqData.summary[idx];
      if (faqData.detail) return faqData.detail;
    }
    return 'This is a summary of the selected source.';
  }

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      padding: 0,
      position: 'relative',
    }}>
      {/* Top Search Bar */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px 0 0 0',
        position: 'relative',
        zIndex: 10,
      }}>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (topInput.trim()) {
              setLoading(true);
              navigate(`/search?q=${encodeURIComponent(topInput)}`);
              setSuggestions([]);
            }
          }}
          style={{ width: 480, maxWidth: '90vw', position: 'relative' }}
          autoComplete="off"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '2.5px solid #27ae60',
            borderRadius: 8,
            background: '#fff',
            boxShadow: '0 2px 12px #0001',
            padding: '0 12px',
            height: 52,
            width: '100%',
            transition: 'border 0.2s',
          }}>
            <input
              type="text"
              value={topInput}
              onChange={e => {
                setTopInput(e.target.value);
                const val = e.target.value.toLowerCase();
                if (val.length > 0) {
                  setSuggestions(
                    FAQS.filter(faq => faq.toLowerCase().includes(val)).slice(0, 3)
                  );
                } else {
                  setSuggestions([]);
                }
              }}
              placeholder="Search for health enrollment questions..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 20,
                background: '#fff',
                color: '#181A1B',
                fontWeight: 500,
                padding: '8px 0',
              }}
            />
            <button
              type="submit"
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 8,
                display: 'flex',
                alignItems: 'center',
              }}
              tabIndex={-1}
              aria-label="Search"
            >
              <svg width="26" height="26" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 56,
                background: '#fff',
                border: '1.5px solid #e0e0e0',
                borderRadius: 8,
                boxShadow: '0 4px 24px #0002',
                zIndex: 20,
                fontSize: 17,
                color: '#181A1B',
                fontWeight: 700,
                textAlign: 'left',
                padding: 0,
                cursor: 'pointer',
                maxWidth: 480,
                minWidth: 0,
                overflow: 'hidden',
              }}
            >
              {suggestions.map((faq, idx) => (
                <div
                  key={idx}
                  style={{ padding: '14px 18px', borderBottom: idx !== suggestions.length - 1 ? '1px solid #f0f0f0' : 'none', background: 'none', transition: 'background 0.15s' }}
                  onMouseDown={() => {
                    setTopInput(faq);
                    setSuggestions([]);
                    navigate(`/search?q=${encodeURIComponent(faq)}`);
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(61,218,215,0.08)'}
                  onMouseOut={e => e.currentTarget.style.background = 'none'}
                >
                  {faq}
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        width: '100vw',
        flex: '1 1 auto',
        minHeight: 0,
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 2,
        padding: '40px 2vw 32px 2vw',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        {/* Left Column: AI Summary, Sources, Results */}
        <div style={{ flex: 2.2, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* AI Summary Box */}
          <div style={{
            border: '2.5px solid #27ae60',
            borderRadius: 18,
            background: '#fff',
            boxShadow: '0 4px 32px #0002',
            padding: '36px 38px',
            marginBottom: 32,
            fontSize: 20,
            color: '#181A1B',
            fontWeight: 500,
            position: 'relative',
            minHeight: 180,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxHeight: aiSummaryExpanded ? 600 : 340,
            overflow: 'auto',
            transition: 'max-height 0.3s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontWeight: 800, color: '#27ae60', fontSize: 21, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>AI Summary</span>
                <span style={{ fontSize: 15, color: '#27ae60', background: '#eafaf1', borderRadius: 8, padding: '4px 16px', fontWeight: 700 }}>Finished generating</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#f6f6f6', borderRadius: 8, padding: '2px 6px' }}>
                {/* Dropdown/expand button only */}
                <button
                  title={aiSummaryExpanded ? 'Collapse' : 'Expand'}
                  onClick={() => setAiSummaryExpanded(e => !e)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: 6,
                    padding: 3,
                    marginLeft: 2,
                    transition: 'background 0.18s',
                  }}
                >
                  <ChevronIcon expanded={aiSummaryExpanded} />
                </button>
              </div>
            </div>
            <div style={{ borderBottom: '1.5px solid #e0e0e0', margin: '0 -38px 18px -38px' }} />
            {/* Summary content or skeleton */}
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ height: 18, width: i === 1 ? 220 : 320, background: '#e0e0e0', borderRadius: 6, animation: 'pulse 1.2s infinite alternate' }} />
                ))}
                <style>{`@keyframes pulse { 0% { opacity: 0.5; } 100% { opacity: 1; } }`}</style>
              </div>
            ) : (
              (faqData ? faqData.summary : mockSummary).map((line, idx) => (
                <div key={idx} style={{ marginBottom: idx === 0 ? 16 : 0, fontWeight: idx === 0 ? 700 : 500, fontSize: idx === 0 ? 18 : 16 }}>
                  {line}
            </div>
              ))
            )}
          </div>
          {/* Sources */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#181A1B' }}>Sources:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {loading ? (
                [1,2,3].map(i => (
                  <div key={i} style={{ width: 140, height: 28, background: '#e0e0e0', borderRadius: 8, animation: 'pulse 1.2s infinite alternate' }} />
                ))
              ) : (
                (faqData ? faqData.sources : mockSources).map((src, idx) => (
                  <a
                    key={idx}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                  background: '#f4f4f4',
                  border: '1.5px solid #e0e0e0',
                      borderRadius: 8,
                      padding: '6px 14px',
                  fontWeight: 600,
                  color: '#2563eb',
                      fontSize: 15,
                  textDecoration: 'none',
                  transition: 'background 0.18s',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      setPopupPos({ x: e.clientX, y: e.clientY });
                      setPopupLoading(true);
                      setHoveredSource(src.name);
                      clearTimeout(popupTimeout.current);
                      popupTimeout.current = setTimeout(() => setPopupLoading(false), 1000);
                    }}
                    onMouseMove={e => {
                      setPopupPos({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        if (!popupHovered) {
                          setHoveredSource(null);
                          setPopupLoading(false);
                          clearTimeout(popupTimeout.current);
                        }
                      }, 60);
                    }}
                  >
                    {src.name}
                    {hoveredSource === src.name && (
                      <div
                        style={{
                          position: 'fixed',
                          left: popupPos.x + 16,
                          top: popupPos.y + 8,
                          zIndex: 9999,
                          minWidth: 280,
                          maxWidth: 420,
                          background: 'rgba(255,255,255,0.82)',
                          backdropFilter: 'blur(10px)',
                          border: '1.5px solid #e0e0e0',
                          borderRadius: 18,
                          boxShadow: '0 8px 32px #2563eb22, 0 2px 8px #0001',
                          padding: '0 0 18px 0',
                          fontSize: 15,
                          fontWeight: 500,
                          pointerEvents: 'auto',
                          transition: 'opacity 0.18s, transform 0.22s cubic-bezier(.4,1.4,.6,1)',
                          opacity: 1,
                          whiteSpace: 'pre-line',
                          display: 'flex',
                          flexDirection: 'column',
                          animation: 'popupSlideIn 0.32s cubic-bezier(.4,1.4,.6,1)',
                        }}
                        onMouseEnter={() => setPopupHovered(true)}
                        onMouseLeave={() => {
                          setPopupHovered(false);
                          setTimeout(() => {
                            if (!popupHovered) {
                              setHoveredSource(null);
                              setPopupLoading(false);
                              clearTimeout(popupTimeout.current);
                            }
                          }, 60);
                        }}
                      >
                        {/* Accent bar and close button */}
                        <div style={{
                          width: '100%',
                          height: 7,
                          borderTopLeftRadius: 18,
                          borderTopRightRadius: 18,
                          background: 'linear-gradient(90deg, #2563eb 0%, #00c6fb 100%)',
                          marginBottom: 0,
                        }} />
                        <button
                          onClick={() => { setHoveredSource(null); setPopupLoading(false); setPopupHovered(false); }}
                          style={{
                            position: 'absolute',
                            top: 8,
                            right: 12,
                            background: 'none',
                            border: 'none',
                            color: '#2563eb',
                            fontSize: 22,
                            fontWeight: 700,
                            cursor: 'pointer',
                            opacity: 0.7,
                            transition: 'opacity 0.18s',
                            zIndex: 2,
                          }}
                          title="Close"
                          onMouseEnter={e => e.currentTarget.style.opacity = 1}
                          onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                        >×</button>
                        {/* Content */}
                        <div style={{ padding: '18px 22px 0 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {popupLoading ? (
                            <div style={{ width: 260 }}>
                              <div style={{
                                width: '100%',
                                height: 28,
                                marginBottom: 14,
                                borderRadius: 24,
                                background: 'linear-gradient(90deg, #181A1B 0%, #2563eb 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'barShimmer 1.2s linear infinite',
                              }} />
                              <div style={{
                                width: '100%',
                                height: 28,
                                marginBottom: 14,
                                borderRadius: 24,
                                background: 'linear-gradient(90deg, #181A1B 0%, #2563eb 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'barShimmer 1.2s linear infinite',
                                animationDelay: '0.15s',
                              }} />
                              <div style={{
                                width: '70%',
                                height: 28,
                                borderRadius: 24,
                                background: 'linear-gradient(90deg, #181A1B 0%, #2563eb 100%)',
                                backgroundSize: '200% 100%',
                                animation: 'barShimmer 1.2s linear infinite',
                                animationDelay: '0.3s',
                              }} />
                              <style>{`
                                @keyframes barShimmer {
                                  0% { background-position: 200% 0; }
                                  100% { background-position: 0 0; }
                                }
                                @keyframes popupSlideIn {
                                  0% { opacity: 0; transform: translateY(18px) scale(0.98); }
                                  100% { opacity: 1; transform: translateY(0) scale(1); }
                                }
                              `}</style>
                            </div>
                          ) : (
                            <div style={{
                              opacity: popupLoading ? 0 : 1,
                              transition: 'opacity 0.4s',
                              fontSize: 15.5,
                              color: '#181A1B',
                              maxHeight: popupExpanded ? 420 : 180,
                              overflowY: 'auto',
                              whiteSpace: 'pre-line',
                              lineHeight: 1.6,
                              position: 'relative',
                            }}>
                              {/* Use .detail for FAQ, else a long mock summary */}
                              {(() => {
                                let summary = '';
                                if (faqData && faqData.sources && faqData.sources.find(s => s.name === src.name)) {
                                  summary = faqData.detail;
                                } else {
                                  summary = 'This is a detailed summary of the selected source. It provides comprehensive information, key findings, and actionable insights relevant to your query. Use this summary to quickly understand the main points and context of the source, including background, methodology, and important results. For further details, refer to the full document or official website.';
                                }
                                const isLong = summary.length > 320;
                                return (
                                  <>
                                    {isLong && !popupExpanded ? (
                                      <>
                                        {summary.slice(0, 320)}<span style={{ color: '#888' }}>... </span>
                                        <button style={{ color: '#2563eb', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 15, padding: 0 }} onClick={() => setPopupExpanded(true)}>Read More</button>
                                      </>
                                    ) : (
                                      <>
                                        {summary}
                                        {isLong && (
                                          <button style={{ color: '#2563eb', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 15, padding: 0, marginLeft: 6 }} onClick={() => setPopupExpanded(false)}>Show Less</button>
                                        )}
                                      </>
                                    )}
                                  </>
                                );
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </a>
                ))
              )}
            </div>
          </div>
          {/* Search Results */}
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#181A1B' }}>Search Results</div>
            <div style={{ background: '#f9f9f9', borderRadius: 8, border: '1.5px solid #e0e0e0', padding: '12px 0' }}>
              {loading ? (
                [1,2,3].map(i => (
                  <div key={i} style={{ height: 22, width: 320, background: '#e0e0e0', borderRadius: 6, margin: '12px 18px', animation: 'pulse 1.2s infinite alternate' }} />
                ))
              ) : faqData ? (
                <div style={{ padding: '12px 18px', color: '#181A1B', fontWeight: 600, fontSize: 16 }}>{faqData.answer}</div>
              ) : (
                mockResults && mockResults.map((res, idx) => (
                <a key={idx} href={res.url} style={{
                  display: 'block',
                    padding: '12px 18px',
                  color: '#2563eb',
                    fontWeight: 600,
                    fontSize: 15,
                  borderBottom: idx !== mockResults.length - 1 ? '1px solid #ececec' : 'none',
                  textDecoration: 'none',
                    transition: 'background 0.18s',
                  }}>{res.name}</a>
                ))
              )}
            </div>
          </div>
          {/* Informational Cards Section */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: '#181A1B' }}>Related Information</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
              {loading ? (
                [1,2,3].map(i => (
                  <div key={i} style={{ background: '#e0e0e0', borderRadius: 14, width: 260, height: 120, animation: 'pulse 1.2s infinite alternate' }} />
                ))
              ) : (faqData && query.toLowerCase().includes('dengue')) ? DENGUE_INFO_CARDS.map((card, idx) => (
                <div key={idx} style={{
                  background: '#fff',
                  border: '2px solid #e0e0e0',
                  borderRadius: 14,
                  boxShadow: '0 2px 12px #0001',
                  padding: '22px 20px 18px 20px',
                  minWidth: 260,
                  maxWidth: 320,
                  flex: '1 1 260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}>
                  <div style={{ fontWeight: 800, fontSize: 17, color: '#27ae60', marginBottom: 8 }}>{card.title}</div>
                  <div style={{ fontSize: 15, color: '#181A1B', marginBottom: 12 }}>{card.summary}</div>
                  <a href={card.link} target="_blank" rel="noopener noreferrer" style={{
                    color: '#2563eb',
                    fontWeight: 700,
                    fontSize: 15,
                    textDecoration: 'none',
                    marginTop: 'auto',
                  }}>Learn More</a>
                </div>
              )) : (
                // Show mock cards for other queries
                [
                  { title: "Healthcare Policy", summary: "Explore Maharashtra's latest health policies and initiatives.", link: "https://phd.maharashtra.gov.in/" },
                  { title: "Disease Surveillance", summary: "How real-time data is used to track and respond to outbreaks.", link: "https://bmcpublichealth.biomedcentral.com/track/pdf/10.1186/1471-2458-13-575" },
                  { title: "Diagnostic Services", summary: "Free diagnostic services and lab coverage across the state.", link: "https://mahahindlabs.com/" }
                ].map((card, idx) => (
                  <div key={idx} style={{
                    background: '#fff',
                    border: '2px solid #e0e0e0',
                    borderRadius: 14,
                    boxShadow: '0 2px 12px #0001',
                    padding: '22px 20px 18px 20px',
                    minWidth: 260,
                    maxWidth: 320,
                    flex: '1 1 260px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 8,
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 17, color: '#27ae60', marginBottom: 8 }}>{card.title}</div>
                    <div style={{ fontSize: 15, color: '#181A1B', marginBottom: 12 }}>{card.summary}</div>
                    <a href={card.link} target="_blank" rel="noopener noreferrer" style={{
                      color: '#2563eb',
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: 'none',
                      marginTop: 'auto',
                    }}>Learn More</a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* Right Column: Chat/Follow-up */}
        <div style={{ flex: chatExpanded ? 1.7 : 1.1, minWidth: 340, maxWidth: chatExpanded ? 800 : 540, display: 'flex', flexDirection: 'column', height: '100%', transition: 'all 0.3s' }}>
          <div style={{
            background: '#f8f8f8',
            border: '1.5px solid #e0e0e0',
            borderRadius: 18,
            boxShadow: '0 4px 32px #0002',
            padding: '36px 32px 28px 32px',
            fontSize: 18,
            color: '#181A1B',
            fontWeight: 500,
            marginBottom: 0,
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            position: 'relative',
            transition: 'all 0.3s',
          }}>
            {/* Delete and Expand buttons */}
            <div style={{ position: 'absolute', top: 18, right: 18, display: 'flex', gap: 8, zIndex: 2 }}>
              <button
                title="Delete chat"
                onClick={() => setChatDeleted(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e74c3c',
                  fontSize: 22,
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 2,
                  transition: 'background 0.18s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(231,76,60,0.08)'}
                onMouseOut={e => e.currentTarget.style.background = 'none'}
              >
                <DeleteIcon />
              </button>
              <button
                title={chatExpanded ? 'Collapse' : 'Expand'}
                onClick={() => setChatExpanded(e => !e)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  fontSize: 22,
                  cursor: 'pointer',
                  borderRadius: 8,
                  padding: 2,
                  transition: 'background 0.18s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(37,99,235,0.08)'}
                onMouseOut={e => e.currentTarget.style.background = 'none'}
              >
                <ExpandIcon expanded={chatExpanded} />
              </button>
            </div>
            <div style={{ fontWeight: 800, fontSize: 21, marginBottom: 18, color: '#2563eb' }}>MAP Generative AI Chat</div>
            <div style={{ borderBottom: '1.5px solid #e0e0e0', margin: '0 -32px 18px -32px' }} />
            {/* Detailed answer for FAQ, or fallback to chat/follow-up */}
            {!chatDeleted ? (
              faqData ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Detailed Answer:</div>
                  <div style={{ background: '#fff', borderRadius: 8, border: '1.5px solid #e0e0e0', padding: '18px 16px', fontSize: 17, color: '#181A1B', fontWeight: 500, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                    {faqData.detail}
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18, minHeight: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Ask a follow-up or see details:</div>
                  <textarea
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Type your follow-up question..."
                    style={{
                      width: '100%',
                      minHeight: 80,
                      borderRadius: 8,
                      border: '1.5px solid #e0e0e0',
                      fontSize: 16,
                      padding: '10px 12px',
                      color: '#181A1B',
                      background: '#fff',
                      fontWeight: 500,
                      resize: 'vertical',
                      marginBottom: 8,
                    }}
                  />
                  <button
                    style={{
                      background: '#2563eb',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: 16,
                      padding: '10px 24px',
                      cursor: 'pointer',
                      marginTop: 4,
                      alignSelf: 'flex-end',
                    }}
                    onClick={() => setChatInput('')}
                  >
                    Send
                  </button>
                </div>
              )
            ) : (
              <div style={{ color: '#e74c3c', fontWeight: 700, fontSize: 18, marginTop: 40, textAlign: 'center' }}>Chat deleted.</div>
            )}
          </div>
        </div>
      </div>
      {/* Footer placeholder: replace with your real Footer component if needed */}
      <footer ref={footerRef} style={{ width: '100%', background: '#181A1B', color: '#fff', textAlign: 'center', padding: '32px 0 18px 0', fontSize: 16, fontWeight: 500, letterSpacing: 1, borderTop: '1.5px solid #232526', marginTop: 'auto' }}>
        &copy; {new Date().getFullYear()} MAP Generative AI — All rights reserved.
      </footer>
    </div>
  );
} 