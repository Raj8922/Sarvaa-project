import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, Legend as ReLegend, ResponsiveContainer, LabelList } from "recharts";
import "./heatmap.css";
import TopPerformers from './TopPerformers';
import mapBackside from '../assets/mapbackside.png';
import logo from '../assets/logo.png';

const stats = [
  { label: "Total Projects", value: 45 },
  { label: "Completed", value: 28, color: "#2e7d32" },
  { label: "In Progress", value: 12, color: "#1976d2" },
  { label: "Delayed", value: 4, color: "#d32f2f" },
  { label: "On Hold", value: 1, color: "#757575" },
];

const completionData = [
  { name: "Completed", value: 28, color: "#2e7d32" },
  { name: "Remaining", value: 17, color: "#e0e0e0" },
];

const taskStatusData = [
  { name: "Completed", value: 28, color: "#2e7d32" },
  { name: "In Progress", value: 12, color: "#1976d2" },
  { name: "Overdue", value: 4, color: "#d32f2f" },
  { name: "Planned", value: 1, color: "#fbc02d" },
];

const fundData = [
  { name: "TB-Free Panchayats Initiative", Allocated: 5.2, Utilized: 4.4, UtilizedWithinBudget: 4.4, OverBudget: 0 },
  { name: "Cancer Daycare Centres", Allocated: 12.8, Utilized: 8.3, UtilizedWithinBudget: 8.3, OverBudget: 0 },
  { name: "CHO Management System", Allocated: 3.5, Utilized: 3.2, UtilizedWithinBudget: 3.2, OverBudget: 0 },
  { name: "Rural Health Outreach", Allocated: 8, Utilized: 3.6, UtilizedWithinBudget: 3.6, OverBudget: 0 },
  { name: "Digital Health Records", Allocated: 15, Utilized: 16.5, UtilizedWithinBudget: 15, OverBudget: 1.5 },
];

const projectTable = [
  { name: "TB-Free Panchayats Initiative", progress: "85%", status: "Nearing Completion", statusColor: "#1976d2", budget: "₹5.2", utilized: "₹4.4", poc: "Dr. Sharma", contractor: "Health Corp Ltd" },
  { name: "Cancer Daycare Centres", progress: "65%", status: "In Progress", statusColor: "#fbc02d", budget: "₹12.8", utilized: "₹8.3", poc: "Dr. Patel", contractor: "MedBuild Pvt Ltd" },
  { name: "CHO Management System", progress: "92%", status: "Ready", statusColor: "#2e7d32", budget: "₹3.5", utilized: "₹3.2", poc: "Dr. Kumar", contractor: "TechHealth Solutions" },
  { name: "Rural Health Outreach", progress: "45%", status: "Delayed", statusColor: "#d32f2f", budget: "₹8", utilized: "₹3.6", poc: "Dr. Singh", contractor: "Rural Care Inc" },
  { name: "Digital Health Records", progress: "30%", status: "On Hold", statusColor: "#757575", budget: "₹15", utilized: "₹4.5", poc: "Dr. Mehta", contractor: "DataHealth Systems" },
];

const caseStudies = [
  "TB-Free Panchayats Initiative",
  "Cancer Daycare Centre Tracking",
  "Managing Chief Health Officers"
];

const caseStudyLinks = {
  "TB-Free Panchayats Initiative": "https://publications.jsi.com/JSIInternet/Inc/Common/_download_pub.cfm?id=23236&lid=3",
  "Cancer Daycare Centre Tracking": "https://www.niti.gov.in/best-practice-detail?id=107461",
  "Managing Chief Health Officers": "https://www.pria.org/knowledge_resource/Women_Leaders_in_Panchayats_1.pdf"
};

const caseStudySummaries = {
  "TB-Free Panchayats Initiative": "A pioneering campaign to eliminate tuberculosis in rural Maharashtra by empowering local panchayats. Achieved a 30% increase in early TB detection and improved community awareness.",
  "Cancer Daycare Centre Tracking": "A digital initiative to monitor and optimize cancer daycare services across the state. Improved patient tracking, resource allocation, and treatment outcomes.",
  "Managing Chief Health Officers": "A leadership program for Chief Health Officers, focusing on capacity building, data-driven decision making, and effective public health management."
};

const COLORS = ["#2e7d32", "#e0e0e0", "#1976d2", "#d32f2f", "#fbc02d", "#757575"];

const slugify = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ProjectCampaignDashboard = () => {
  const [openCase, setOpenCase] = React.useState(null);
  // Popup state for case study summary
  const [hoveredCase, setHoveredCase] = React.useState(null);
  const [popupPos, setPopupPos] = React.useState({ x: 0, y: 0 });
  const [popupLoading, setPopupLoading] = React.useState(false);
  const popupTimeout = React.useRef();
  const [popupHovered, setPopupHovered] = React.useState(false);
  const [popupExpanded, setPopupExpanded] = React.useState(false);
  // Calculate summary stats
  const totalAllocated = fundData.reduce((sum, p) => sum + p.Allocated, 0);
  const totalUtilized = fundData.reduce((sum, p) => sum + p.Utilized, 0);
  const utilizationPercent = Math.round((totalUtilized / totalAllocated) * 100);
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        padding: "2rem 1rem",
        background: `#f7fafd url(${mapBackside}) center 120px / 50% no-repeat fixed`,
        overflowX: "hidden",
        position: 'relative',
      }}
    >
      <div style={{
        width: '100%',
        minHeight: 220,
        background: 'linear-gradient(90deg, #e3f0ff 0%, #f7fafd 100%)',
        borderRadius: 24,
        boxShadow: '0 8px 32px #2563eb11',
        marginBottom: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2.5rem 2.5rem 2.5rem 2rem',
        position: 'relative',
        flexWrap: 'wrap',
      }}>
        {/* Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <img src={logo} alt="Maharashtra Health Department" style={{ width: 90, height: 80, borderRadius: 16, boxShadow: '0 2px 12px #1976d233', background: '#fff' }} />
          <div>
            <h1 style={{ fontWeight: 900, fontSize: '2.7rem', margin: 0, color: '#183153', letterSpacing: 0.5, lineHeight: 1.1 }}>Projects & Medical Campaigns</h1>
            <div style={{ color: '#2563eb', fontSize: '1.25rem', marginTop: 6, fontWeight: 600, letterSpacing: 0.1 }}>Health Ministry of Maharashtra – Comprehensive Project Tracking Dashboard</div>
          </div>
        </div>
        {/* Top Performers */}
       
      </div>
      {/* Stats Cards - larger, with icons and hover effect */}
      <div style={{ display: 'flex', gap: 28, justifyContent: 'center', margin: '2.2rem 0 1.7rem 0', flexWrap: 'wrap' }}>
        {stats.map((s, i) => {
          const icons = [
            <span key="c" style={{ fontSize: 28, color: '#2e7d32' }}>📈</span>,
            <span key="c" style={{ fontSize: 28, color: '#2e7d32' }}>✅</span>,
            <span key="p" style={{ fontSize: 28, color: '#1976d2' }}>⏳</span>,
            <span key="d" style={{ fontSize: 28, color: '#d32f2f' }}>⚠️</span>,
            <span key="h" style={{ fontSize: 28, color: '#757575' }}>⏸️</span>,
          ];
          return (
            <div key={s.label} style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px #1976d211',
              minWidth: 150,
              padding: '1.5rem 2.1rem',
              textAlign: 'center',
              borderTop: `5px solid ${s.color || '#1976d2'}`,
              fontSize: 18,
              fontWeight: 700,
              position: 'relative',
              transition: 'transform 0.18s, box-shadow 0.18s',
              cursor: 'pointer',
              marginBottom: 8,
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 8px 32px #1976d233'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 12px #1976d211'; }}
            >
              {icons[i]}
              <div style={{ fontSize: 32, fontWeight: 900, color: s.color || '#183153', marginTop: 6 }}>{s.value}</div>
              <div style={{ color: '#4a6fa1', fontWeight: 600, fontSize: 16, marginTop: 2 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
      {/* Charts Row */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", width: "100%" }}>
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.06)", padding: 18, minWidth: 320, flex: 1, maxWidth: 400 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Project Completion Overview</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={completionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label={false}>
                {completionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ReLegend verticalAlign="top" height={36} iconType="circle"/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.06)", padding: 18, minWidth: 320, flex: 1, maxWidth: 400 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Task Status Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={taskStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label={false}>
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ReLegend verticalAlign="top" height={46} iconType="circle"/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Bar Chart - Advanced Card */}
      <div style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(8px)',
        borderRadius: 18,
        boxShadow: '0 8px 32px #2563eb22, 0 2px 8px #0001',
        padding: 0,
        margin: '2rem 0 1.5rem 0',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Accent bar */}
        <div style={{
          width: '100%',
          height: 7,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          background: 'linear-gradient(90deg, #1976d2 0%, #2e7d32 100%)',
          marginBottom: 0,
        }} />
        <div style={{ padding: '18px 22px 10px 22px' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, color: '#183153', letterSpacing: 0.2 }}>Project-wise Fund Allocation vs Utilization</div>
          {/* Summary stats row */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
            <div style={{ fontSize: 15.5, color: '#1976d2', fontWeight: 600 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>₹{totalAllocated.toFixed(1)} Cr</span> Allocated
            </div>
            <div style={{ fontSize: 15.5, color: '#2e7d32', fontWeight: 600 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>₹{totalUtilized.toFixed(1)} Cr</span> Utilized
            </div>
            <div style={{ fontSize: 15.5, color: utilizationPercent > 80 ? '#2e7d32' : utilizationPercent > 60 ? '#fbc02d' : '#d32f2f', fontWeight: 600 }}>
              <span style={{ fontWeight: 700, fontSize: 18 }}>{utilizationPercent}%</span> Utilization
            </div>
          </div>
          {/* Horizontal Bar Chart */}
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={fundData}
              layout="vertical"
              margin={{ top: 10, right: 40, left: 40, bottom: 10 }}
              barCategoryGap={18}
              stackOffset="none"
            >
              <XAxis type="number" domain={[0, 'dataMax + 2']} tick={{ fontSize: 15 }} tickFormatter={v => `${v} Cr`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 17, fontWeight: 700, fill: '#222' }} width={180} />
              <ReTooltip formatter={(v, name, props) => {
                if (name === 'Allocated') return [`₹${v} Cr`, 'Allocated'];
                if (name === 'UtilizedWithinBudget') return [`₹${v} Cr`, 'Utilized'];
                if (name === 'OverBudget') return [`₹${v} Cr`, 'Over Budget'];
                return v;
              }} />
              {/* Allocated as a reference bar (faint) */}
              <Bar dataKey="Allocated" fill="#2563eb" radius={[8, 8, 8, 8]} barSize={18} isAnimationActive={false} opacity={0.18} />
              {/* Utilized within budget (green) + Over budget (red) as a stack */}
              <Bar dataKey="UtilizedWithinBudget" stackId="a" fill="#14b8a6" radius={[8, 8, 8, 8]} barSize={18} >
                <LabelList dataKey="UtilizedWithinBudget" position="right" formatter={v => `${v} Cr`} style={{ fontWeight: 700, fontSize: 15, fill: '#14b8a6' }} />
              </Bar>
              <Bar dataKey="OverBudget" stackId="a" fill="#e53935" radius={[8, 8, 8, 8]} barSize={18} >
                <LabelList dataKey="OverBudget" position="right" formatter={v => v > 0 ? `${v} Cr (Over)` : ''} style={{ fontWeight: 700, fontSize: 15, fill: '#e53935' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Custom Legend - visually distinct */}
          <div style={{ display: 'flex', gap: 18, marginTop: 10, alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 18, background: '#2563eb', borderRadius: 6, display: 'inline-block', marginRight: 4, border: '2px solid #2563eb', opacity: 0.18 }}></span>Allocated</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 18, background: '#14b8a6', borderRadius: 6, display: 'inline-block', marginRight: 4, border: '2px solid #14b8a6' }}></span>Utilized</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 18, background: '#e53935', borderRadius: 6, display: 'inline-block', marginRight: 4, border: '2px solid #e53935' }}></span>Over Budget</span>
          </div>
        </div>
      </div>
      {/* Project Progress Table */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.06)", padding: 18, marginBottom: 18, width: "100%" }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Project Progress & Monitoring</div>
        <div style={{ color: "#4a6fa1", fontSize: 14, marginBottom: 8 }}>Real-time tracking of project POCs and contractors</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f7fafd" }}>
                <th style={{ padding: 8, fontWeight: 600, color: "#183153" }}>Project Name</th>
                <th style={{ padding: 8, fontWeight: 600, color: "#183153" }}>Progress</th>
                <th style={{ padding: 8, fontWeight: 600, color: "#183153" }}>Status</th>
                <th style={{ padding: 8, fontWeight: 600, color: "#183153" }}>Budget (₹Cr)</th>
                <th style={{ padding: 8, fontWeight: 600, color: "#183153" }}>Utilized (₹Cr)</th>
                <th style={{ padding: 8, fontWeight: 600, color: "#183153" }}>POC</th>
                <th style={{ padding: 8, fontWeight: 600, color: "#183153" }}>Contractor</th>
              </tr>
            </thead>
            <tbody>
              {projectTable.map((row, i) => (
                <tr key={row.name} style={{ borderBottom: "1px solid #e0e0e0" }}>
                  <td style={{ padding: 8 }}>{row.name}</td>
                  <td style={{ padding: 8 }}>{row.progress}</td>
                  <td style={{ padding: 8 }}><span style={{ background: row.statusColor, color: "#fff", borderRadius: 8, padding: "2px 10px", fontSize: 13 }}>{row.status}</span></td>
                  <td style={{ padding: 8 }}>{row.budget}</td>
                  <td style={{ padding: 8 }}>{row.utilized}</td>
                  <td style={{ padding: 8 }}>{row.poc}</td>
                  <td style={{ padding: 8 }}>{row.contractor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Case Studies */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 1px 8px rgba(0,0,0,0.06)", padding: 18, marginBottom: 18, width: "100%" }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}><span style={{ color: '#1976d2', marginRight: 8 }}>📝</span>Case Studies</div>
        {caseStudies.map((c, i) => (
          <a
            key={c}
            href={caseStudyLinks[c] || '#'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: '#183153',
              borderBottom: i < caseStudies.length - 1 ? "1px solid #e0e0e0" : "none",
              padding: "10px 0",
              fontSize: 15,
              display: 'block',
              transition: 'background 0.15s',
              cursor: 'pointer',
              background: openCase === i ? '#f7fafd' : 'none',
              position: 'relative',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#f0f6fb';
              setPopupPos({ x: e.clientX, y: e.clientY });
              setPopupLoading(true);
              setHoveredCase(c);
              clearTimeout(popupTimeout.current);
              popupTimeout.current = setTimeout(() => setPopupLoading(false), 1000);
            }}
            onMouseMove={e => setPopupPos({ x: e.clientX, y: e.clientY })}
            onMouseLeave={() => {
              setTimeout(() => {
                if (!popupHovered) {
                  setHoveredCase(null);
                  setPopupLoading(false);
                  clearTimeout(popupTimeout.current);
                }
              }, 60);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>{c}</span>
              <span style={{ fontSize: 18, color: '#1976d2' }}>{openCase === i ? '▲' : '▼'}</span>
            </div>
            {openCase === i && (
              <div style={{ color: '#4a6fa1', fontSize: 14, marginTop: 6 }}>
                This is a brief summary of the case study: <b>{c}</b>. (You can expand this with more details or a link to a full report.)
              </div>
            )}
            {/* Popup summary on hover */}
            {hoveredCase === c && (
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
                      setHoveredCase(null);
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
                  onClick={() => { setHoveredCase(null); setPopupLoading(false); setPopupHovered(false); }}
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
                      {/* Show summary, with expand/collapse if long */}
                      {(() => {
                        const summary = caseStudySummaries[c] || 'This is a summary of the selected case study.';
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
        ))}
      </div>
    </div>
  );
};

export default ProjectCampaignDashboard; 