import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png';
import mapbackside from './assets/mapbackside.png';

const BG_DARK = '#181A1B';
const TEXT_WHITE = '#fff';
const TEXT_LIGHT = '#E5E7EB';
const CARD_DARK = '#232526';
const SHADOW = '0 4px 24px rgba(0,0,0,0.25)';

const EXAMPLES = [
  'Who is the current Chief Minister of Maharashtra?',
  'What is the structure of the Maharashtra State Legislature?',
  'Which major schemes are run by the Maharashtra Government for farmers?',
  'Hi! How can I help you with Maharashtra Health Department information today?'
];

const navItems = [
  { label: 'ERP', path: '/erp' },
  { label: 'Heatmap', path: '/heatmap'},
  { label: 'Budget Tracker', path: '/budget-tracker'},
  { label: 'Project and Campaign', path: '/project-campaign'},
];



const QUICK_ACTIONS = [
  { label: 'Show Budget', value: 'Show me the health budget' },
  { label: 'Get Helpline', value: 'What are the health helpline numbers?' },
  { label: 'Switch Language', value: 'Switch language to Marathi' },
];

// Add 100 important Maharashtra Health Department Q&A
const FAQS = [
  { q: 'What is the helpline number for health emergencies in Maharashtra?', a: 'The Maharashtra health emergency helpline is 104.' },
  { q: 'Who is the current Health Minister of Maharashtra?', a: 'As of 2024, the Health Minister is Tanaji Sawant.' },
  { q: 'What is the Mahatma Jyotirao Phule Jan Arogya Yojana?', a: 'It is a flagship health insurance scheme for low-income families in Maharashtra.' },
  { q: 'How can I apply for a health card in Maharashtra?', a: 'You can apply online at https://www.jeevandayee.gov.in or visit your nearest government hospital.' },
  { q: 'What is the COVID-19 helpline number in Maharashtra?', a: 'The COVID-19 helpline is 020-26127394.' },
  { q: 'Where can I get free vaccination in Maharashtra?', a: 'Free vaccination is available at all government hospitals and primary health centers.' },
  { q: 'What is the National Health Mission?', a: 'It is a government initiative to improve healthcare delivery across India, including Maharashtra.' },
  { q: 'How to report a medical emergency in Mumbai?', a: 'Call 108 for ambulance services in Mumbai.' },
  { q: 'What is the Balasaheb Thackeray Accidental Insurance Scheme?', a: 'It provides accidental insurance coverage to residents of Maharashtra.' },
  { q: 'How to check blood bank availability in Maharashtra?', a: 'Visit https://mahasacs.org/bloodbank for real-time blood bank information.' },
  { q: 'How do I find the nearest government hospital in Maharashtra?', a: "You can use the Health Department's hospital locator at https://arogya.maharashtra.gov.in." },
  { q: 'What is the process for organ donation in Maharashtra?', a: 'Register with the Zonal Transplant Coordination Centre (ZTCC) or visit a government hospital for guidance.' },
  { q: 'How to get a health insurance claim in Maharashtra?', a: "Contact your insurance provider or the hospital's insurance desk." },
  { q: 'How to get a birth certificate in Maharashtra?', a: 'Apply at your local municipal office or online at https://www.mahaonline.gov.in.' },
  { q: 'What is the Janani Suraksha Yojana?', a: 'A safe motherhood intervention under the National Health Mission for pregnant women.' },
  { q: 'How to register a complaint about a hospital in Maharashtra?', a: 'Contact the District Health Officer or use the online grievance portal at https://arogya.maharashtra.gov.in.' },
  { q: 'What is the toll-free number for ambulance services in Maharashtra?', a: 'Dial 108 for free ambulance services.' },
  { q: 'How to get a disability certificate in Maharashtra?', a: 'Visit a government hospital with required documents for assessment and certification.' },
  { q: 'What is the Rashtriya Swasthya Bima Yojana?', a: 'A health insurance scheme for BPL families, now merged with Ayushman Bharat.' },
  { q: 'Where can I get information about malaria prevention?', a: 'Contact your local health center or visit the Maharashtra Health Department website.' },
  { q: 'How to avail free medicines in Maharashtra?', a: 'Free medicines are provided at government hospitals and primary health centers.' },
  { q: 'What is the process for TB treatment in Maharashtra?', a: 'TB treatment is free at all government health facilities under the Revised National TB Control Programme.' },
  { q: 'How to get a death certificate in Maharashtra?', a: 'Apply at your local municipal office or online at https://www.mahaonline.gov.in.' },
  { q: 'What is the Pradhan Mantri Jan Arogya Yojana?', a: 'A national health insurance scheme providing coverage up to Rs. 5 lakh per family per year.' },
  { q: 'How to get a COVID-19 test in Maharashtra?', a: 'COVID-19 tests are available at government and approved private labs.' },
  { q: 'What is the helpline for mental health support in Maharashtra?', a: 'Call 9152987821 for mental health support.' },
  { q: 'How to apply for Ayushman Bharat in Maharashtra?', a: 'Apply online at https://pmjay.gov.in or visit your nearest government hospital.' },
  { q: 'What is the Universal Immunization Programme?', a: 'A government program providing free vaccines to all children.' },
  { q: 'How to get a medical fitness certificate in Maharashtra?', a: 'Visit a government hospital and consult a registered medical officer.' },
  { q: 'What is the Sickle Cell Anemia Control Programme?', a: 'A program for screening and management of sickle cell anemia in tribal areas.' },
  { q: 'How to get a duplicate health card in Maharashtra?', a: 'Apply at the issuing hospital or online portal with necessary documents.' },
  { q: 'What is the helpline for womens health in Maharashtra?', a: 'Call 181 for womens health and safety support.' },
  { q: 'How to get a Yellow Fever vaccination in Maharashtra?', a: 'Yellow Fever vaccination is available at select government hospitals.' },
  { q: 'What is the role of ASHA workers in Maharashtra?', a: 'ASHA workers are community health volunteers who promote health awareness and services.' },
  { q: 'How to get a medical reimbursement in Maharashtra?', a: 'Submit your claim with bills to the concerned government department or employer.' },
  { q: 'What is the helpline for child health in Maharashtra?', a: 'Call 1098 for child health and protection services.' },
  { q: 'How to get a polio vaccination certificate in Maharashtra?', a: 'Request at your local government health center after vaccination.' },
  { q: 'What is the Mukhyamantri Aarogya Mitra Yojana?', a: 'A scheme to provide health insurance to unorganized sector workers.' },
  { q: 'How to get a medical leave certificate in Maharashtra?', a: 'Consult a registered medical practitioner at a government hospital.' },
  { q: 'What is the helpline for HIV/AIDS in Maharashtra?', a: 'Call 1097 for HIV/AIDS information and support.' },
  { q: 'How to get a disability pension in Maharashtra?', a: 'Apply at the Social Welfare Department with the required documents.' },
  { q: 'What is the role of Primary Health Centres (PHCs)?', a: 'PHCs provide basic healthcare services in rural areas.' },
  { q: 'How to get a blood test in Maharashtra?', a: 'Visit any government hospital or authorized lab.' },
  { q: 'What is the Janani Shishu Suraksha Karyakram?', a: 'A program providing free delivery and newborn care in government hospitals.' },
  { q: 'How to get a health insurance claim in Maharashtra?', a: 'Contact your insurance provider or the hospitals insurance desk' },
  { q: 'What is the helpline for senior citizens in Maharashtra?', a: 'Call 1291 for senior citizen support.' },
  { q: 'How to get a cancer screening in Maharashtra?', a: 'Cancer screening is available at district hospitals and cancer centers.' },
  { q: 'What is the Rashtriya Bal Swasthya Karyakram?', a: 'A program for early identification and intervention for children from birth to 18 years.' },
  { q: 'How to get a health check-up in Maharashtra?', a: 'Free health check-ups are available at government hospitals and PHCs.' },
  { q: 'What is the role of District Hospitals?', a: 'District Hospitals provide secondary healthcare services and specialist care.' },
  { q: 'How to get a COVID-19 vaccination certificate?', a: 'Download from https://cowin.gov.in or the Aarogya Setu app.' },
  { q: 'What is the Pradhan Mantri Surakshit Matritva Abhiyan?', a: 'A program for free antenatal check-ups for pregnant women.' },
  { q: 'How to get a health camp organized in my area?', a: 'Contact your local health officer or PHC.' },
  { q: 'What is the role of Urban Health Posts?', a: 'They provide primary healthcare in urban slum areas.' },
  { q: 'How to get a medical certificate for school admission?', a: 'Visit a government hospital for a check-up and certificate.' },
  { q: 'What is the Rashtriya Kishor Swasthya Karyakram?', a: 'A program for adolescent health and development.' },
  { q: 'How to get a health awareness program in my community?', a: 'Contact your local health department or ASHA worker.' },
  { q: 'What is the role of Community Health Centres (CHCs)?', a: 'CHCs provide referral and specialist healthcare in rural areas.' },
  { q: 'How to get a medical certificate for travel?', a: 'Consult a government hospital doctor for assessment and certification.' },
  { q: 'What is the National Vector Borne Disease Control Programme?', a: 'A program for prevention and control of vector-borne diseases like malaria and dengue.' },
  { q: 'How to get a health insurance card in Maharashtra?', a: 'Apply at your nearest government hospital or online portal.' },
  { q: 'What is the role of the State Blood Transfusion Council?', a: 'It regulates and monitors blood transfusion services in Maharashtra.' },
  { q: 'How to get a medical certificate for employment?', a: 'Visit a government hospital for a medical examination and certificate.' },
  { q: 'What is the Rashtriya Swasthya Karyakram?', a: 'A national program for health system strengthening and service delivery.' },
  { q: 'How to get a health card for senior citizens?', a: 'Apply at your local government hospital with age proof.' },
  { q: 'What is the role of the Food and Drug Administration (FDA) Maharashtra?', a: 'FDA regulates food safety and drug quality in the state.' },
  { q: 'How to get a medical certificate for driving license?', a: 'Consult a government hospital doctor for the required check-up and certificate.' },
  { q: 'What is the National Programme for Prevention and Control of Cancer, Diabetes, Cardiovascular Diseases and Stroke?', a: 'A program for screening and management of NCDs.' },
  { q: 'How to get a health card for children?', a: 'Apply at your nearest government hospital or health center.' },
  { q: 'What is the role of the Maharashtra Medical Council?', a: 'It regulates the registration and practice of doctors in Maharashtra.' },
  { q: 'How to get a medical certificate for fitness?', a: 'Visit a government hospital for a fitness assessment and certificate.' },
  { q: 'What is the National Leprosy Eradication Programme?', a: 'A program for detection, treatment, and eradication of leprosy.' },
  { q: 'How to get a health card for pregnant women?', a: 'Register at your local government hospital or PHC.' },
  { q: 'What is the role of the Maharashtra Nursing Council?', a: 'It regulates nursing education and practice in the state.' },
  { q: 'How to get a medical certificate for insurance claim?', a: 'Consult a government hospital doctor for the required documentation.' },
  { q: 'What is the National Programme for Control of Blindness?', a: 'A program for prevention and treatment of blindness.' },
  { q: 'How to get a health card for BPL families?', a: 'Apply at your nearest government hospital with BPL certificate.' },
  { q: 'What is the role of the Maharashtra State AIDS Control Society?', a: 'It implements HIV/AIDS prevention and control programs.' },
  { q: 'How to get a medical certificate for school sports?', a: 'Visit a government hospital for a sports fitness check-up and certificate.' },
  { q: 'What is the National Tobacco Control Programme?', a: 'A program for tobacco use prevention and cessation.' },
  { q: 'How to get a health card for government employees?', a: 'Apply through your department or at a government hospital.' },
  { q: 'What is the role of the Maharashtra State Health Systems Resource Centre?', a: 'It provides technical support for health system strengthening.' },
  { q: 'How to get a medical certificate for air travel?', a: 'Consult a government hospital doctor for assessment and certification.' },
  { q: 'What is the National Programme for Health Care of the Elderly?', a: 'A program for providing dedicated healthcare to senior citizens.' },
  { q: 'How to get a health card for students?', a: 'Apply at your school or nearest government hospital.' },
  { q: 'What is the role of the Maharashtra State Pharmacy Council?', a: 'It regulates pharmacy education and practice in the state.' },
  { q: 'How to get a medical certificate for government job?', a: 'Visit a government hospital for a medical examination and certificate.' },
  { q: 'What is the National Mental Health Programme?', a: 'A program for mental health awareness, treatment, and rehabilitation.' },
  { q: 'How to get a health card for disabled persons?', a: 'Apply at your nearest government hospital with disability certificate.' },
  { q: 'What is the role of the Maharashtra State Family Welfare Bureau?', a: 'It implements family welfare and reproductive health programs.' },
  { q: 'How to get a medical certificate for passport?', a: 'Consult a government hospital doctor for the required check-up and certificate.' },
  { q: 'What is the National Programme for Prevention and Control of Deafness?', a: 'A program for prevention and management of hearing loss.' },
  { q: 'How to get a health card for migrant workers?', a: 'Apply at your nearest government hospital or health center.' },
  { q: 'What is the role of the Maharashtra State Health Mission?', a: 'It coordinates health programs and initiatives in the state.' },
  { q: 'How to get a medical certificate for fitness for marriage?', a: 'Visit a government hospital for a pre-marital health check-up and certificate.' },
  { q: 'What is the National Programme for Prevention and Control of Fluorosis?', a: 'A program for prevention and management of fluorosis.' },
  { q: 'How to get a health card for senior citizens above 80?', a: 'Apply at your local government hospital with age proof.' },
  { q: 'What is the role of the Maharashtra State Health Directorate?', a: 'It oversees the implementation of health policies and programs.' },
  { q: 'How to get a medical certificate for fitness for adoption?', a: 'Consult a government hospital doctor for assessment and certification.' },
  { q: 'What is the National Programme for Prevention and Control of Diabetes?', a: 'A program for diabetes screening, prevention, and management.' },
  { q: 'How to get a health card for orphans?', a: 'Apply at your nearest government hospital or child welfare center.' },
  { q: 'What is the role of the Maharashtra State Health Resource Centre?', a: 'It provides research and technical support for health programs.' },
  { q: 'How to get a medical certificate for fitness for sports?', a: 'Visit a government hospital for a sports fitness check-up and certificate.' },
  { q: 'What is the National Programme for Prevention and Control of Cancer?', a: 'A program for cancer screening, prevention, and management.' },
  { q: 'How to get a health card for widows?', a: 'Apply at your nearest government hospital with widow certificate.' },
  { q: 'What is the role of the Maharashtra State Health Society?', a: 'It manages health program funds and implementation.' },
  { q: 'How to get a medical certificate for fitness for government service?', a: 'Visit a government hospital for a medical examination and certificate.' },
  { q: 'What is the National Programme for Prevention and Control of Hypertension?', a: 'A program for hypertension screening, prevention, and management.' },
  { q: 'How to get a health card for tribal communities?', a: 'Apply at your nearest government hospital or tribal health center.' },
  { q: 'What is the role of the Maharashtra State Health Department?', a: 'It is responsible for public health, medical education, and family welfare in Maharashtra.' },
  { q: 'How to get a medical certificate for fitness for higher education?', a: 'Consult a government hospital doctor for assessment and certification.' },
  { q: 'What is the National Programme for Prevention and Control of Occupational Diseases?', a: 'A program for prevention and management of occupational diseases.' },
  { q: 'How to get a health card for senior citizens above 90?', a: 'Apply at your local government hospital with age proof.' },
  { q: 'What is the role of the Maharashtra State Health Insurance Society?', a: 'It implements health insurance schemes in the state.' },
  { q: 'How to get a medical certificate for fitness for competitive exams?', a: 'Visit a government hospital for a medical examination and certificate.' },
  { q: 'What is the National Programme for Prevention and Control of Iodine Deficiency Disorders?', a: 'A program for prevention and management of iodine deficiency.' },
  { q: 'How to get a health card for senior citizens above 100?', a: 'Apply at your local government hospital with age proof.' },
];

function getBotReply(question) {
  // Placeholder static answers
  if (question.toLowerCase().includes('chief minister')) return 'The current Chief Minister of Maharashtra is Eknath Shinde (as of 2024).';
  if (question.toLowerCase().includes('structure')) return 'The Maharashtra State Legislature is bicameral, consisting of the Legislative Assembly and Legislative Council.';
  if (question.toLowerCase().includes('schemes')) return 'Major schemes include Mahatma Jyotirao Phule Jan Arogya Yojana, Balasaheb Thackeray Accidental Insurance, and more.';
  return 'Thank you for your question! Our team will get back to you soon.';
}

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
  const [aiAnswer, setAiAnswer] = useState("");

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
    { name: "CoveredNJ_FAQ.html", url: "#" },
    { name: "easyenrollexisting.pdf", url: "#" },
    { name: "easyenrollnew.pdf", url: "#" },
    { name: "GetCoveredNJ_NewCustomers.html", url: "#" },
    { name: "GetCoveredNJ_getFinancialHelp.html", url: "#" }
  ];
  const mockAnswer = "What can I help you with? Feel free to ask a follow-up question.";

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
              e.currentTarget.style.background = "rgba(61,218,215,0.10)";
              e.currentTarget.style.color = "#3ddad7";
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
                        FAQS.filter(faq => faq.q.toLowerCase().includes(val)).slice(0, 5)
                      );
                    } else {
                      setSuggestions([]);
                    }
                  }}
                  placeholder="What are the enroll"
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
                      setInput(faq.q);
                      setSuggestions([]);
                    }}
                  >
                    <span style={{ fontWeight: 900 }}>{faq.q}</span>
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