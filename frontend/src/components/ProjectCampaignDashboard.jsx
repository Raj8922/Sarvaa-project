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
  { name: "TB-Free Panchayats Initiative", Allocated: 5.2, Utilized: 4.4, Remaining: 5.2 - 4.4 },
  { name: "Cancer Daycare Centres", Allocated: 12.8, Utilized: 8.3, Remaining: 12.8 - 8.3 },
  { name: "CHO Management System", Allocated: 3.5, Utilized: 3.2, Remaining: 3.5 - 3.2 },
  { name: "Rural Health Outreach", Allocated: 8, Utilized: 3.6, Remaining: 8 - 3.6 },
  { name: "Digital Health Records", Allocated: 15, Utilized: 4.5, Remaining: 15 - 4.5 },
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

const COLORS = ["#2e7d32", "#e0e0e0", "#1976d2", "#d32f2f", "#fbc02d", "#757575"];

const slugify = str => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ProjectCampaignDashboard = () => {
  const [openCase, setOpenCase] = React.useState(null);
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
          {/* Utilization progress bar */}
          <div style={{ width: '100%', height: 14, background: '#e0e0e0', borderRadius: 8, marginBottom: 18, overflow: 'hidden', position: 'relative' }}>
            <div style={{
              width: `${utilizationPercent}%`,
              height: '100%',
              background: `linear-gradient(90deg, #1976d2 0%, #2e7d32 100%)`,
              borderRadius: 8,
              transition: 'width 0.7s cubic-bezier(.4,1.4,.6,1)',
              boxShadow: '0 2px 8px #1976d233',
            }} />
            <span style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', fontSize: 13, color: '#183153', fontWeight: 600, lineHeight: '14px' }}>{utilizationPercent}%</span>
          </div>
          {/* Enhanced Bar Chart */}
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={fundData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" fontSize={13} tick={{ fill: "#4a6fa1" }} interval={0} angle={-12} height={60} tickLine={false} />
              <YAxis fontSize={13} tick={{ fill: "#4a6fa1" }} tickLine={false} />
              <ReTooltip content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) return null;
                const d = payload[0].payload;
                return (
                  <div style={{ background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 10, boxShadow: '0 4px 24px #0002', padding: '12px 18px', minWidth: 180 }}>
                    <div style={{ fontWeight: 700, color: '#1976d2', marginBottom: 4 }}>{label}</div>
                    <div style={{ color: '#183153', fontSize: 15 }}><b>Allocated:</b> ₹{d.Allocated} Cr</div>
                    <div style={{ color: '#2e7d32', fontSize: 15 }}><b>Utilized:</b> ₹{d.Utilized} Cr</div>
                    <div style={{ color: '#fbc02d', fontSize: 15 }}><b>Remaining:</b> ₹{d.Remaining} Cr</div>
                    <div style={{ color: '#888', fontSize: 14, marginTop: 6 }}>Utilization: <b>{Math.round((d.Utilized/d.Allocated)*100)}%</b></div>
                  </div>
                );
              }} />
              <Bar dataKey="Allocated" fill="#1976d2" radius={[6, 6, 0, 0]}>
                {fundData.map((entry, idx) => (
                  <Cell key={`alloc-${idx}`} fill="#1976d2" />
                ))}
                <LabelList dataKey="Allocated" position="top" formatter={v => `₹${v} Cr`} style={{ fill: '#1976d2', fontWeight: 700, fontSize: 13 }} />
              </Bar>
              <Bar dataKey="Remaining" fill="#bdbdbd" radius={[6, 6, 0, 0]}>
                {fundData.map((entry, idx) => (
                  <Cell key={`rem-${idx}`} fill="#bdbdbd" />
                ))}
                <LabelList dataKey="Remaining" position="top" formatter={v => `₹${v} Cr`} style={{ fill: '#bdbdbd', fontWeight: 700, fontSize: 13 }} />
              </Bar>
              <Bar dataKey="Utilized" radius={[6, 6, 0, 0]}
                >
                {fundData.map((entry, idx) => {
                  // Color gradient: green if >80%, yellow if 60-80%, red if <60%
                  const percent = entry.Utilized / entry.Allocated;
                  let color = '#2e7d32';
                  if (percent < 0.6) color = '#d32f2f';
                  else if (percent < 0.8) color = '#fbc02d';
                  return <Cell key={`util-${idx}`} fill={color} />;
                })}
                <LabelList dataKey="Utilized" position="top" formatter={v => `₹${v} Cr`} style={{ fontWeight: 700, fontSize: 13 }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {/* Custom Legend - visually distinct */}
          <div style={{ display: 'flex', gap: 18, marginTop: 10, alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 18, height: 18, background: '#1976d2', borderRadius: 6, display: 'inline-block', marginRight: 4, border: '2px solid #1976d2' }}></span>Allocated
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 18, height: 18, background: '#bdbdbd', borderRadius: 6, display: 'inline-block', marginRight: 4, border: '2px solid #bdbdbd' }}></span>Remaining
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 18, height: 18, background: 'linear-gradient(90deg,#2e7d32,#fbc02d,#d32f2f)', borderRadius: 6, display: 'inline-block', marginRight: 4, border: '2px solid #2e7d32' }}></span>Utilized
            </span>
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
            }}
            onMouseOver={e => e.currentTarget.style.background = '#f0f6fb'}
            onMouseOut={e => e.currentTarget.style.background = openCase === i ? '#f7fafd' : 'none'}
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
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectCampaignDashboard; 