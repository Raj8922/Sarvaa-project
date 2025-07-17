import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, LineChart, Line, Legend, LabelList } from 'recharts';
import { FaHospitalSymbol, FaUserMd, FaProcedures, FaSyringe, FaHeartbeat, FaChartPie, FaChartBar, FaDownload, FaUserCircle, FaFilter, FaSearch, FaFileDownload, FaChartLine, FaCalendarAlt, FaUserInjured } from 'react-icons/fa';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import logo from '../assets/logo.png';

const LIGHT_BG = '#f7f8fa';
const CARD_BG = '#fff';
const CARD_SHADOW = '0 2px 16px #e0e7ef33';
const ACCENT = '#27ae60';
const ACCENT2 = '#2563eb';
const GREY = '#e0e0e0';
const CHART_COLORS = ['#2563eb', '#27ae60', '#3b82f6', '#f59e42', '#f43f5e', '#6366f1'];

// Healthcare-specific data
const budgetAllocation = [
  { name: 'Public Health', value: 3200 },
  { name: 'Medical Education', value: 1800 },
  { name: 'AYUSH', value: 900 },
  { name: 'Family Welfare', value: 1200 },
  { name: 'National Health Mission', value: 2200 },
  { name: 'Other', value: 700 },
];
const summaryCards = [
  { label: 'Total Health Budget (Cr)', value: '₹10,000', icon: <FaHospitalSymbol style={{ color: ACCENT2, fontSize: 28 }} /> },
  { label: 'Payment Processed', value: 5, icon: <FaFileDownload style={{ color: ACCENT, fontSize: 28 }} /> },
  { label: 'Over Budget Requirement', value: '₹1,200 Cr', icon: <FaChartBar style={{ color: '#f59e42', fontSize: 28 }} /> },
];
const monthlyExpenditure = [
  { month: 'Jan', Expenditure: 800 },
  { month: 'Feb', Expenditure: 950 },
  { month: 'Mar', Expenditure: 1100 },
  { month: 'Apr', Expenditure: 1200 },
  { month: 'May', Expenditure: 1050 },
  { month: 'Jun', Expenditure: 980 },
  { month: 'Jul', Expenditure: 1150 },
  { month: 'Aug', Expenditure: 1200 },
  { month: 'Sep', Expenditure: 1300 },
  { month: 'Oct', Expenditure: 1400 },
  { month: 'Nov', Expenditure: 1350 },
  { month: 'Dec', Expenditure: 1500 },
];
const vaccinationProgress = [
  { name: 'Jan', Vaccinated: 12000 },
  { name: 'Feb', Vaccinated: 18000 },
  { name: 'Mar', Vaccinated: 25000 },
  { name: 'Apr', Vaccinated: 32000 },
  { name: 'May', Vaccinated: 40000 },
  { name: 'Jun', Vaccinated: 47000 },
  { name: 'Jul', Vaccinated: 52000 },
  { name: 'Aug', Vaccinated: 60000 },
  { name: 'Sep', Vaccinated: 67000 },
  { name: 'Oct', Vaccinated: 72000 },
  { name: 'Nov', Vaccinated: 80000 },
  { name: 'Dec', Vaccinated: 90000 },
];

// Mock hospital data for demonstration
const hospitals = [
  { name: 'JJ Hospital', city: 'Mumbai', beds: 2000, type: 'Government', lat: 19.0707, lng: 72.8606 },
  { name: 'Sassoon Hospital', city: 'Pune', beds: 1500, type: 'Government', lat: 18.5286, lng: 73.8746 },
  { name: 'Ruby Hall Clinic', city: 'Pune', beds: 800, type: 'Private', lat: 18.5362, lng: 73.8777 },
  { name: 'KEM Hospital', city: 'Mumbai', beds: 1800, type: 'Government', lat: 19.0176, lng: 72.8562 },
  { name: 'Wockhardt Hospital', city: 'Nagpur', beds: 500, type: 'Private', lat: 21.1458, lng: 79.0882 },
  { name: 'Civil Hospital', city: 'Nashik', beds: 600, type: 'Government', lat: 19.9975, lng: 73.7898 },
];

// Mock data for Patients trend
const patientTrend = [
  { month: 'Jan', Patients: 80000 },
  { month: 'Feb', Patients: 95000 },
  { month: 'Mar', Patients: 110000 },
  { month: 'Apr', Patients: 120000 },
  { month: 'May', Patients: 105000 },
  { month: 'Jun', Patients: 98000 },
  { month: 'Jul', Patients: 115000 },
  { month: 'Aug', Patients: 120000 },
  { month: 'Sep', Patients: 130000 },
  { month: 'Oct', Patients: 140000 },
  { month: 'Nov', Patients: 135000 },
  { month: 'Dec', Patients: 150000 },
];

// Mock data for Campaigns
const campaigns = [
  { name: 'Polio Eradication', type: 'Vaccination', status: 'Ongoing', date: '2024-04-10' },
  { name: 'World Health Day', type: 'Awareness', status: 'Upcoming', date: '2024-04-07' },
  { name: 'Malaria Screening', type: 'Screening', status: 'Completed', date: '2024-03-15' },
  { name: 'Measles-Rubella', type: 'Vaccination', status: 'Upcoming', date: '2024-05-01' },
];

// Mock data for Budget breakdown
const budgetBreakdown = [
  { name: 'Public Health', value: 3200 },
  { name: 'Medical Education', value: 1800 },
  { name: 'AYUSH', value: 900 },
  { name: 'Family Welfare', value: 1200 },
  { name: 'NHM', value: 2200 },
  { name: 'Other', value: 700 },
];

// Mock data for Analytics KPIs
const analyticsKPIs = [
  { label: 'Bed Occupancy', value: '82%', icon: <FaUserInjured style={{ color: ACCENT2, fontSize: 22 }} /> },
  { label: 'Patient Satisfaction', value: '91%', icon: <FaChartLine style={{ color: ACCENT, fontSize: 22 }} /> },
  { label: 'Infection Rate', value: '2.3%', icon: <FaSyringe style={{ color: '#f43f5e', fontSize: 22 }} /> },
];

// Mock data for Reports
const reports = [
  { name: 'Yearly Financial Report', url: '#', date: '2024-04-01' },
  { name: 'Monthly Financial Report', url: '#', date: '2025-04-01' },
  { name: 'Hospital Wise Yearly Financial Report', url: '#', date: '2024-06-15' },
  { name: 'Hospital Wise Monthly Financial Report', url: '#', date: '2023-11-12' },
];

// Add bill data (public knowledge, demo links)
const healthBills = [
  {
    name: 'Maharashtra Public Health Act, 1949',
    url: 'https://www.indiacode.nic.in/handle/123456789/2282?view_type=browse&sam_handle=123456789/1362',
    short: 'View Act'
  },
  {
    name: 'Maharashtra Nursing Homes Registration Act, 1949',
    url: 'https://www.indiacode.nic.in/handle/123456789/2283?view_type=browse&sam_handle=123456789/1362',
    short: 'View Act'
  },
  {
    name: 'Maharashtra Medical Council Act, 1965',
    url: 'https://www.indiacode.nic.in/handle/123456789/2284?view_type=browse&sam_handle=123456789/1362',
    short: 'View Act'
  },
  {
    name: 'Maharashtra Clinical Establishments (Registration and Regulation) Act, 2010',
    url: 'https://prsindia.org/files/bills_acts/acts_states/maharashtra/2010/2010MH23.pdf',
    short: 'View Act'
  },
  {
    name: 'Maharashtra Epidemic Diseases Act, 2020',
    url: 'https://prsindia.org/files/bills_acts/acts_states/maharashtra/2020/2020MH03.pdf',
    short: 'View Act'
  },
];

// Helper style for color dot
const colorDotStyle = (color) => ({
  display: 'inline-block',
  width: 20,
  height: 20,
  borderRadius: '50%',
  background: color,
  border: '2px solid #fff',
  boxShadow: '0 0 0 1.5px #e0e0e0',
  marginRight: 6,
  flexShrink: 0,
});

// Helper style for legend text columns
const legendTextStyle = {
  overflow: 'visible',
  textOverflow: 'clip',
  whiteSpace: 'normal',
  minWidth: 0,
};

// SVG outline of Maharashtra (simplified, for demo)
const maharashtraSVG = (
  <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ display: 'block' }}>
    <path d="M 50 100 Q 80 60 120 80 Q 180 40 220 90 Q 270 60 320 120 Q 370 180 340 250 Q 390 320 300 350 Q 250 390 200 340 Q 120 390 80 320 Q 30 250 70 200 Q 40 160 50 100 Z" fill="#e3e9f6" stroke="#2563eb" strokeWidth="3" />
  </svg>
);

// Google Maps config
const MAHARASHTRA_CENTER = { lat: 19.7515, lng: 75.7139 };
const MAP_CONTAINER_STYLE = { width: '100%', height: '320px', borderRadius: 12 };
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // <-- Replace with your real API key

// Add detailed descriptions for each department
const departmentDescriptions = {
  'Public Health': 'Covers disease prevention, health awareness, sanitation, and rural/urban health programs.',
  'Medical Education': 'Funds medical colleges, training, research, and skill development for healthcare professionals.',
  'AYUSH': 'Supports Ayurveda, Yoga, Unani, Siddha, and Homeopathy systems of medicine.',
  'Family Welfare': 'Focuses on maternal/child health, family planning, and reproductive health services.',
  'National Health Mission': 'Central government mission for strengthening health systems and service delivery.',
  'Other': 'Miscellaneous health initiatives, admin, and special projects.',
};

export default function BudgetTracker() {
  const [filter, setFilter] = useState('FY 2023-24');
  const [activeSection, setActiveSection] = useState(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterOptions = ['FY 2023-24', 'FY 2022-23', 'FY 2021-22'];
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [showBillsModal, setShowBillsModal] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showFilterDropdown) return;
    function handleClick(e) {
      if (!e.target.closest('.filter-period-dropdown')) setShowFilterDropdown(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showFilterDropdown]);

  // Helper to get department info by name
  function getDepartmentInfo(query) {
    const lower = query.trim().toLowerCase();
    const dept = budgetAllocation.find(d => d.name.toLowerCase() === lower);
    if (!dept) return null;
    const total = budgetAllocation.reduce((sum, e) => sum + e.value, 0);
    const percent = ((dept.value / total) * 100).toFixed(1);
    return { ...dept, percent };
  }

  function handleSearch(e) {
    e.preventDefault();
    const info = getDepartmentInfo(search);
    if (info) {
      setSearchResult(info);
      setShowSearchPopup(true);
    } else {
      setSearchResult('notfound');
      setShowSearchPopup(true);
    }
  }

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      minHeight: 'calc(100vh - 0px)',
      height: '100%',
      background: LIGHT_BG,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Sidebar removed */}
      {/* Main Content */}
      <main style={{
        flex: 1,
        minWidth: 0,
        minHeight: '100vh',
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        background: LIGHT_BG,
        padding: 0,
      }}>
        {/* Top Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 40px 0 40px', background: 'none' }}>
          <div style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
            <form onSubmit={handleSearch} style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Search here"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '14px 48px 14px 18px', borderRadius: 12, border: '1.5px solid #e0e0e0', fontSize: 17, background: '#fff', color: '#222', boxShadow: '0 2px 12px #e0e7ef22', outline: 'none', fontWeight: 500 }}
              />
              <button type="submit" style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <FaSearch style={{ color: '#2563eb', fontSize: 22 }} />
              </button>
            </form>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button
              style={{
                background: ACCENT2,
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                padding: '10px 22px',
                boxShadow: '0 2px 8px #2563eb22',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'background 0.18s',
              }}
              onClick={() => setActiveSection('Reports')}
            >
              <FaFileDownload style={{ fontSize: 18 }} /> Reports
            </button>
            <div
              className="filter-period-dropdown"
              style={{ background: '#fff', borderRadius: 10, padding: '10px 18px', fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 2px 12px #e0e7ef22', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', position: 'relative' }}
              onClick={() => setShowFilterDropdown(v => !v)}
            >
              <FaFilter style={{ color: ACCENT2, fontSize: 18 }} />
              <span>Filter Period</span>
              <span style={{ color: '#888', fontWeight: 500, fontSize: 14 }}>{filter}</span>
              <span style={{ marginLeft: 6, fontSize: 13, color: '#888' }}>{showFilterDropdown ? '▲' : '▼'}</span>
              {showFilterDropdown && (
                <div style={{ position: 'absolute', top: '110%', right: 0, background: '#fff', borderRadius: 10, boxShadow: '0 4px 16px #2563eb22', zIndex: 100, minWidth: 160, padding: '6px 0' }}>
                  {filterOptions.map(opt => (
                    <div
                      key={opt}
                      style={{ padding: '10px 18px', cursor: 'pointer', color: filter === opt ? ACCENT2 : '#222', fontWeight: filter === opt ? 700 : 500, background: filter === opt ? ACCENT2 + '11' : 'none', transition: 'background 0.15s' }}
                      onClick={e => { e.stopPropagation(); setFilter(opt); setShowFilterDropdown(false); }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Dashboard Title */}
        <div style={{ fontWeight: 800, fontSize: 28, color: '#222', margin: '32px 0 18px 40px', letterSpacing: 0.5 }}>Budget Dashboard</div>
        {/* Summary Cards */}
        <div style={{ display: 'flex', gap: 28, padding: '0 40px', marginBottom: 32, flexWrap: 'wrap' }}>
          {summaryCards.map((card, idx) => (
            <div
              key={card.label}
              style={{ background: CARD_BG, borderRadius: 18, boxShadow: CARD_SHADOW, padding: '28px 36px', minWidth: 180, flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 18, cursor: card.label === 'Bill Passed' ? 'pointer' : 'default', transition: 'box-shadow 0.18s' }}
              onClick={card.label === 'Bill Passed' ? () => setShowBillsModal(true) : undefined}
            >
              <div>{card.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 6 }}>{card.value}</div>
                <div style={{ color: '#888', fontWeight: 600, fontSize: 15 }}>{card.label}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Charts Row */}
        <div style={{ display: 'flex', gap: 28, padding: '0 40px', marginBottom: 32, flexWrap: 'wrap', alignItems: 'stretch' }}>
          {/* Pie Chart Card */}
          <div
            style={{
              background: CARD_BG,
              borderRadius: 18,
              boxShadow: CARD_SHADOW,
              padding: '38px 38px 48px 38px',
              minWidth: 340,
              maxWidth: 600,
              flex: '1 1 480px',
              marginBottom: 16,
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 18, textAlign: 'center', width: '100%' }}>
              Budget Allocation by Department
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: 32,
                flexWrap: 'wrap',
              }}
            >
              {/* Chart */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 220, flex: '0 0 260px' }}>
                <ResponsiveContainer width={220} height={200}>
                  <PieChart>
                    <Pie data={budgetAllocation} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} label={false} labelLine={false} >
                      {budgetAllocation.map((entry, i) => (
                        <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={v => `₹${v} Cr`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  minWidth: 180,
                  flex: '1 1 200px',
                  marginTop: 0,
                }}
              >
                {budgetAllocation.map((entry, i) => {
                  const total = budgetAllocation.reduce((sum, e) => sum + e.value, 0);
                  const percent = ((entry.value / total) * 100).toFixed(1);
                  return (
                    <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: '#444', marginBottom: 2, flexWrap: 'wrap' }}>
                      <span style={colorDotStyle(CHART_COLORS[i % CHART_COLORS.length])}></span>
                      <span style={{ ...legendTextStyle, fontWeight: 600, minWidth: 90, maxWidth: 140, flex: 1 }}>{entry.name}</span>
                      <span style={{ ...legendTextStyle, color: '#666', minWidth: 60, maxWidth: 90, textAlign: 'right' }}>₹{entry.value} Cr</span>
                      <span style={{ ...legendTextStyle, color: '#888', minWidth: 38, maxWidth: 52, textAlign: 'right' }}>{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Responsive: stack legend below chart on small screens */}
            <style>{`
              @media (max-width: 700px) {
                .pie-legend-row {
                  flex-direction: column !important;
                  align-items: center !important;
                  gap: 0 !important;
                }
                .pie-legend-row > div:last-child {
                  margin-top: 24px !important;
                }
              }
            `}</style>
            {/* Responsive: allow horizontal scroll for legend on very small screens */}
            <style>{`
              @media (max-width: 500px) {
                .pie-legend-row > div:last-child {
                  overflow-x: auto !important;
                }
              }
            `}</style>
            {/* Responsive: stack legend columns vertically on very small screens */}
            <style>{`
              @media (max-width: 500px) {
                .pie-legend-row > div {
                  flex-direction: column !important;
                  align-items: flex-start !important;
                  gap: 4px !important;
                }
              }
            `}</style>
          </div>
          {/* Monthly Expenditure Line Chart (Advanced) */}
          <div style={{ background: CARD_BG, borderRadius: 18, boxShadow: CARD_SHADOW, padding: '32px 36px 36px 36px', minWidth: 340, flex: '2 1 480px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, position: 'relative', marginBottom: 16, height: 420, justifyContent: 'flex-start' }}>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#222', marginBottom: 4, width: '100%' }}>Monthly Expenditure (Cr)</div>
            <div style={{ color: '#888', fontWeight: 500, fontSize: 15, marginBottom: 8, width: '100%' }}>
              Total: <span style={{ color: ACCENT2, fontWeight: 700 }}>₹{monthlyExpenditure.reduce((sum, v) => sum + v.Expenditure, 0).toLocaleString()} Cr</span> &nbsp;|&nbsp; Avg: <span style={{ color: ACCENT, fontWeight: 700 }}>₹{Math.round(monthlyExpenditure.reduce((sum, v) => sum + v.Expenditure, 0) / monthlyExpenditure.length).toLocaleString()} Cr</span>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#666', marginBottom: 2 }}>
              <span>Highest: <b style={{ color: ACCENT }}>{monthlyExpenditure.reduce((a, b) => a.Expenditure > b.Expenditure ? a : b).month}</b></span>
              <span>Lowest: <b style={{ color: '#f43f5e' }}>{monthlyExpenditure.reduce((a, b) => a.Expenditure < b.Expenditure ? a : b).month}</b></span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyExpenditure} margin={{ top: 32, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#bbb" fontSize={13} />
                <YAxis hide />
                <Tooltip formatter={v => `₹${v} Cr`} />
                <Line type="monotone" dataKey="Expenditure" stroke={ACCENT2} strokeWidth={3} dot={{ r: 5, fill: ACCENT2 }}>
                  <LabelList dataKey="Expenditure" position="top" formatter={v => `₹${v}`} style={{ fill: '#222', fontWeight: 700, fontSize: 13 }} />
                </Line>
              </LineChart>
            </ResponsiveContainer>
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', fontSize: 13, color: '#888', marginTop: 8, gap: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8 }}><span style={{ width: 16, height: 4, background: ACCENT2, borderRadius: 2, display: 'inline-block', marginRight: 4 }}></span>Expenditure</span>
            </div>
            <button style={{ position: 'absolute', top: 28, right: 32, background: ACCENT2, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22', transition: 'background 0.18s' }}><FaDownload style={{ marginRight: 8 }} />Save Report</button>
          </div>
        </div>
      </main>
      {/* Section Modal/Drawer */}
      {activeSection && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(24,26,27,0.82)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
            padding: '40px 36px 32px 36px',
            minWidth: 340,
            maxWidth: 540,
            width: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
          }}>
            <button
              onClick={() => setActiveSection(null)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                fontSize: 26,
                color: '#888',
                cursor: 'pointer',
                zIndex: 10,
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{ fontWeight: 800, fontSize: 26, color: ACCENT2, marginBottom: 18 }}>{activeSection}</div>
            <div style={{ color: '#222', fontSize: 17, fontWeight: 500, marginBottom: 8 }}>
              {/* Placeholder content for each section */}
              {activeSection === 'Hospitals' && (
                <>
                  <div style={{ marginBottom: 18 }}>
                    <div>Total Hospitals: <b>542</b></div>
                    <div>Major Types: Government, Private, Rural, Urban</div>
                    <div>Bed Capacity: <b>1,20,000+</b></div>
                    <div>Specialties: Cardiology, Oncology, Pediatrics, etc.</div>
                  </div>
                  {/* Maharashtra Map with hospital markers (placeholder SVG) */}
                  <div style={{
                    width: '100%',
                    maxWidth: 420,
                    margin: '0 auto',
                    marginBottom: 18,
                    background: '#f7faff',
                    borderRadius: 16,
                    boxShadow: '0 4px 24px #2563eb11',
                    padding: 18,
                    minHeight: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <GoogleMapWithHospitals hospitals={hospitals} />
                    {/* Legend */}
                    <div style={{ display: 'flex', gap: 18, marginTop: 12, fontSize: 15, color: '#444', alignItems: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}><span style={{ width: 16, height: 16, background: '#2563eb', borderRadius: '50%', display: 'inline-block', marginRight: 6, border: '2px solid #fff' }}></span>Government</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}><span style={{ width: 16, height: 16, background: '#27ae60', borderRadius: '50%', display: 'inline-block', marginRight: 6, border: '2px solid #fff' }}></span>Private</span>
                    </div>
                  </div>
                  {/* Hospital List */}
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Major Hospitals</div>
                  <div style={{ maxHeight: 180, overflowY: 'auto', marginBottom: 4 }}>
                    {hospitals.map(h => (
                      <div key={h.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid #eee' }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: h.type === 'Government' ? '#2563eb' : '#27ae60', display: 'inline-block', marginRight: 4 }}></span>
                        <span style={{ fontWeight: 600 }}>{h.name}</span>
                        <span style={{ color: '#888', fontSize: 15 }}>{h.city}</span>
                        <span style={{ color: '#666', fontSize: 15, marginLeft: 'auto' }}>{h.beds} beds</span>
                        <span style={{ color: '#aaa', fontSize: 14, marginLeft: 8 }}>{h.type}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeSection === 'Patients' && (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: 18 }}>
                    <div style={{ background: '#f7faff', borderRadius: 12, padding: '18px 22px', minWidth: 120, flex: 1, fontWeight: 700, color: ACCENT2, fontSize: 18 }}>YTD: 1,200,000</div>
                    <div style={{ background: '#f7faff', borderRadius: 12, padding: '18px 22px', minWidth: 120, flex: 1, fontWeight: 700, color: ACCENT, fontSize: 18 }}>Inpatients: 320,000</div>
                    <div style={{ background: '#f7faff', borderRadius: 12, padding: '18px 22px', minWidth: 120, flex: 1, fontWeight: 700, color: '#3b82f6', fontSize: 18 }}>Outpatients: 880,000</div>
                    <div style={{ background: '#f7faff', borderRadius: 12, padding: '18px 22px', minWidth: 120, flex: 1, fontWeight: 700, color: '#f59e42', fontSize: 18 }}>Avg Stay: 4.2 days</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Monthly Patient Trend</div>
                  <div style={{ width: '100%', minHeight: 180 }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={patientTrend}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#bbb" fontSize={13} />
                        <YAxis hide />
                        <Tooltip formatter={v => v.toLocaleString()} />
                        <Line type="monotone" dataKey="Patients" stroke={ACCENT2} strokeWidth={3} dot={{ r: 5, fill: ACCENT2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
              {activeSection === 'Campaigns' && (
                <>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Campaign Timeline</div>
                  <div style={{ width: '100%', maxHeight: 220, overflowY: 'auto', marginBottom: 8 }}>
                    {campaigns.map(c => (
                      <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid #eee' }}>
                        <span style={{ fontSize: 18, color: c.type === 'Vaccination' ? ACCENT : c.type === 'Awareness' ? ACCENT2 : '#f59e42' }}>
                          {c.type === 'Vaccination' ? <FaSyringe /> : c.type === 'Awareness' ? <FaCalendarAlt /> : <FaChartPie />}
                        </span>
                        <span style={{ fontWeight: 600 }}>{c.name}</span>
                        <span style={{ color: '#888', fontSize: 15 }}>{c.type}</span>
                        <span style={{ color: c.status === 'Ongoing' ? ACCENT : c.status === 'Upcoming' ? '#f59e42' : '#aaa', fontWeight: 600, marginLeft: 'auto' }}>{c.status}</span>
                        <span style={{ color: '#666', fontSize: 14, marginLeft: 8 }}>{c.date}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {activeSection === 'Budget' && (
                <>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Budget Breakdown</div>
                  <div style={{ width: '100%', minHeight: 180 }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie data={budgetBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={60} label={({ name }) => name} labelLine={false} >
                          {budgetBreakdown.map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={v => `₹${v} Cr`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ marginTop: 10, color: '#888', fontWeight: 500 }}>Utilization Rate: <span style={{ color: ACCENT, fontWeight: 700 }}>87%</span></div>
                </>
              )}
              {activeSection === 'Vaccination' && (
                <>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Vaccination Progress</div>
                  <div style={{ width: '100%', minHeight: 180 }}>
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={vaccinationProgress}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#bbb" fontSize={13} />
                        <YAxis hide />
                        <Tooltip formatter={v => `${v.toLocaleString()} doses`} />
                        <Bar dataKey="Vaccinated">
                          {vaccinationProgress.map((entry, i) => {
                            const max = Math.max(...vaccinationProgress.map(v => v.Vaccinated));
                            const min = Math.min(...vaccinationProgress.map(v => v.Vaccinated));
                            let fill = ACCENT2;
                            if (entry.Vaccinated === max) fill = ACCENT;
                            if (entry.Vaccinated === min) fill = '#f43f5e';
                            return <Cell key={entry.name} fill={fill} />;
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ marginTop: 10, color: '#888', fontWeight: 500 }}>Coverage: <span style={{ color: ACCENT2, fontWeight: 700 }}>92%</span> of eligible population</div>
                  <div style={{ color: '#888', fontWeight: 500 }}>Next Drive: <span style={{ color: '#f59e42', fontWeight: 700 }}>Measles-Rubella</span></div>
                </>
              )}
              {activeSection === 'Analytics' && (
                <>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Key Performance Indicators</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginBottom: 18 }}>
                    {analyticsKPIs.map(kpi => (
                      <div key={kpi.label} style={{ background: '#f7faff', borderRadius: 12, padding: '18px 22px', minWidth: 120, flex: 1, fontWeight: 700, color: '#222', fontSize: 17, display: 'flex', alignItems: 'center', gap: 10 }}>
                        {kpi.icon}
                        <span>{kpi.label}: <span style={{ color: ACCENT2 }}>{kpi.value}</span></span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Recent Trends</div>
                  <div style={{ color: '#888', fontWeight: 500, marginBottom: 8 }}>Improved OPD wait times, reduced infection rates, higher patient satisfaction.</div>
                  <div style={{ color: '#888', fontWeight: 500 }}>Data Sources: <span style={{ color: ACCENT2 }}>HMIS, Surveys, Field Reports</span></div>
                </>
              )}
              {activeSection === 'Reports' && (
                <div style={{ padding: '32px 40px' }}>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Downloadable Reports</div>
                  {reports.map(r => (
                    <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, background: '#f7faff', borderRadius: 10, padding: '16px 18px', boxShadow: '0 1px 6px #2563eb11', fontWeight: 600, color: '#222', fontSize: 15 }}>
                      <FaFileDownload style={{ color: ACCENT2, fontSize: 18 }} />
                      <span>{r.name}</span>
                      <a href={r.url} style={{ marginLeft: 'auto', color: ACCENT2, fontWeight: 700, fontSize: 15, textDecoration: 'underline' }}>Download</a>
                    </div>
                  ))}
                  
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Search Popup */}
      {showSearchPopup && searchResult && (
        <div className="search-popup-topup" style={{
           position: 'fixed',
           top: 32,
           left: '50%',
           transform: 'translateX(-50%)',
           background: '#fff',
           borderRadius: 18,
           boxShadow: '0 8px 40px #2563eb33',
           padding: '38px 48px 38px 48px',
           zIndex: 3000,
           minWidth: 280,
           maxWidth: '96vw',
           width: '100%',
           maxWidth: 440,
           display: 'flex',
           flexDirection: 'column',
           alignItems: 'flex-start',
           border: '2.5px solid #2563eb22',
           wordBreak: 'break-word',
           animation: 'popup-fade-in 0.32s cubic-bezier(.4,1.4,.6,1)',
         }}>
            <button
              onClick={() => setShowSearchPopup(false)}
              style={{ position: 'absolute', top: 18, right: 28, background: 'none', border: 'none', fontSize: 28, color: '#888', cursor: 'pointer', zIndex: 10, transition: 'color 0.18s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#2563eb')}
              onMouseOut={e => (e.currentTarget.style.color = '#888')}
              aria-label="Close"
            >×</button>
            {searchResult === 'notfound' ? (
              <>
                <div style={{ fontWeight: 800, fontSize: 22, color: '#f43f5e', marginBottom: 10 }}>No department found</div>
                <div style={{ fontSize: 17, color: '#888', fontWeight: 600, marginBottom: 2 }}>Please check your spelling or try another search.</div>
              </>
            ) : (
              <>
                <div className="search-popup-content" style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                  <div style={{ minWidth: 100, width: 120, height: 120, flex: '0 0 120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: searchResult.name, value: searchResult.value },
                            { name: 'Other', value: budgetAllocation.reduce((sum, e) => sum + e.value, 0) - searchResult.value },
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={38}
                          outerRadius={56}
                          label={false}
                          labelLine={false}
                        >
                          <Cell fill={CHART_COLORS[budgetAllocation.findIndex(d => d.name === searchResult.name) % CHART_COLORS.length]} />
                          <Cell fill="#e0e0e0" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 2 }}>
                      <span style={{ display: 'inline-block', width: 28, height: 28, borderRadius: '50%', background: CHART_COLORS[budgetAllocation.findIndex(d => d.name === searchResult.name) % CHART_COLORS.length], marginRight: 6, border: '2px solid #fff', boxShadow: '0 0 0 1.5px #e0e0e0' }}></span>
                      <span style={{ fontWeight: 900, fontSize: 24, color: '#2563eb', letterSpacing: 0.5 }}>{searchResult.name}</span>
                    </div>
                    <div style={{ fontSize: 19, color: '#222', fontWeight: 800 }}>₹{searchResult.value} Cr <span style={{ color: '#888', fontWeight: 600, fontSize: 15 }}>( {searchResult.percent}% of Total )</span></div>
                    <div style={{ fontSize: 15, color: '#2563eb', fontWeight: 700, marginBottom: 6 }}>{departmentDescriptions[searchResult.name] || ''}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ ...colorDotStyle(CHART_COLORS[budgetAllocation.findIndex(d => d.name === searchResult.name) % CHART_COLORS.length]), width: 16, height: 16 }}></span>
                        <span style={{ fontWeight: 700, color: '#2563eb', fontSize: 15 }}>{searchResult.name}</span>
                        <span style={{ color: '#888', fontWeight: 600, marginLeft: 8 }}>₹{searchResult.value} Cr</span>
                        <span style={{ color: '#aaa', fontWeight: 500, marginLeft: 8 }}>{searchResult.percent}%</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ ...colorDotStyle('#e0e0e0'), width: 16, height: 16 }}></span>
                        <span style={{ fontWeight: 700, color: '#888', fontSize: 15 }}>Other</span>
                        <span style={{ color: '#888', fontWeight: 600, marginLeft: 8 }}>₹{budgetAllocation.reduce((sum, e) => sum + e.value, 0) - searchResult.value} Cr</span>
                        <span style={{ color: '#aaa', fontWeight: 500, marginLeft: 8 }}>{(100 - parseFloat(searchResult.percent)).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      {/* Bill Passed Modal */}
      {showBillsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(24,26,27,0.55)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.3s',
        }}
          onClick={() => setShowBillsModal(false)}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.98)',
              border: '2.5px solid #2563eb',
              boxShadow: '0 12px 48px 0 rgba(37,99,235,0.18), 0 4px 24px 0 rgba(0,0,0,0.18)',
              borderRadius: 24,
              padding: '38px 36px 32px 36px',
              minWidth: 340,
              maxWidth: 520,
              color: '#181A1B',
              position: 'relative',
              animation: 'fadeInPop .4s cubic-bezier(.4,0,.2,1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setShowBillsModal(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(32,33,36,0.12)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, color: '#222', padding: '2px 12px', cursor: 'pointer', transition: 'background 0.2s' }}>×</button>
            <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 18, color: '#2563eb', textAlign: 'center' }}>Maharashtra Health Bills Passed</div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {healthBills.map(bill => (
                <div key={bill.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f7f8fa', borderRadius: 10, padding: '12px 18px', boxShadow: '0 1px 6px #2563eb11', fontSize: 16, fontWeight: 600 }}>
                  <span style={{ color: '#222', flex: 1 }}>{bill.name}</span>
                  <a href={bill.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 700, fontSize: 15, marginLeft: 18, textDecoration: 'underline', background: '#e3e9f6', borderRadius: 6, padding: '4px 12px', transition: 'background 0.18s' }}>{bill.short}</a>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes fadeInPop {
              0% { opacity: 0; transform: scale(0.92) translateY(30px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

// GoogleMapWithHospitals component
function GoogleMapWithHospitals({ hospitals }) {
  const [selected, setSelected] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div style={{ width: '100%', height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontWeight: 600 }}>Loading map…</div>;
  return (
    <GoogleMap
      mapContainerStyle={MAP_CONTAINER_STYLE}
      center={MAHARASHTRA_CENTER}
      zoom={6.2}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        ],
      }}
    >
      {hospitals.map((h, i) => (
        <Marker
          key={h.name}
          position={{ lat: h.lat, lng: h.lng }}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: h.type === 'Government' ? '#2563eb' : '#27ae60',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
            scale: 10,
          }}
          onClick={() => setSelected(h)}
        />
      ))}
      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div style={{ minWidth: 160 }}>
            <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 16 }}>{selected.name}</div>
            <div style={{ color: '#444', fontSize: 15 }}>{selected.city}</div>
            <div style={{ color: '#666', fontSize: 14 }}>{selected.beds} beds</div>
            <div style={{ color: selected.type === 'Government' ? '#2563eb' : '#27ae60', fontWeight: 600, fontSize: 14 }}>{selected.type}</div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
} 