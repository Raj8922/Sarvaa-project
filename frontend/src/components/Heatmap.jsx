import React, { useState } from "react";
import MaharashtraMap from "./MaharashtraMap";
import DiseaseInfo from "./DiseaseInfo";
import DistrictModal from "./DistrictModal";
import "./heatmap.css";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as ReTooltip, Legend as ReLegend, PieChart, Pie, Cell } from 'recharts';

const metrics = [
  { key: "hospitals", label: "Hospitals" },
  { key: "diseases", label: "Diseases" },
  { key: "patients", label: "Patient Count" },
  { key: "doctors", label: "Doctors" },
];

const diseases = [
  { key: "tb", label: "Tuberculosis (TB)" },
  { key: "cancer", label: "Cancer" },
  { key: "hiv", label: "HIV/AIDS" },
  { key: "dengue", label: "Dengue" },
  { key: "malaria", label: "Malaria" },
  { key: "chikungunya", label: "Chikungunya" },
  { key: "cholera", label: "Cholera" },
  { key: "gastroenteritis", label: "Gastroenteritis" },
  { key: "diarrhea", label: "Diarrhea" },
  { key: "jaundice", label: "Jaundice" },
  { key: "typhoid", label: "Typhoid" },
];

// Mocked district data with new diseases
const districtData = [
  { name: "Mumbai", tb: 8.2, cancer: 5.1, hiv: 2.7, dengue: 3.2, malaria: 2.1, chikungunya: 1.2, cholera: 0.8, gastroenteritis: 2.5, diarrhea: 3.1, jaundice: 1.7, typhoid: 2.2, hospitals: 120, patients: 120000, doctors: 2000, city: "Mumbai", pincode: "400001" },
  { name: "Pune", tb: 7.5, cancer: 4.8, hiv: 2.3, dengue: 2.8, malaria: 1.8, chikungunya: 1.0, cholera: 0.7, gastroenteritis: 2.1, diarrhea: 2.7, jaundice: 1.4, typhoid: 1.9, hospitals: 110, patients: 110000, doctors: 1800, city: "Pune", pincode: "411001" },
  { name: "Thane", tb: 7.1, cancer: 4.5, hiv: 2.1, dengue: 2.5, malaria: 1.5, chikungunya: 0.9, cholera: 0.6, gastroenteritis: 1.9, diarrhea: 2.4, jaundice: 1.2, typhoid: 1.6, hospitals: 100, patients: 100000, doctors: 1700, city: "Thane", pincode: "400601" },
  { name: "Nagpur", tb: 6.8, cancer: 4.2, hiv: 1.9, dengue: 2.2, malaria: 1.2, chikungunya: 0.7, cholera: 0.5, gastroenteritis: 1.6, diarrhea: 2.1, jaundice: 1.0, typhoid: 1.3, hospitals: 90, patients: 90000, doctors: 1500, city: "Nagpur", pincode: "440001" },
  { name: "Nashik", tb: 6.2, cancer: 3.9, hiv: 1.7, dengue: 2.0, malaria: 1.0, chikungunya: 0.6, cholera: 0.4, gastroenteritis: 1.4, diarrhea: 1.8, jaundice: 0.9, typhoid: 1.1, hospitals: 80, patients: 80000, doctors: 1400, city: "Nashik", pincode: "422001" },
  { name: "Aurangabad", tb: 5.9, cancer: 3.7, hiv: 1.5, dengue: 1.8, malaria: 0.8, chikungunya: 0.5, cholera: 0.3, gastroenteritis: 1.2, diarrhea: 1.5, jaundice: 0.7, typhoid: 0.9, hospitals: 70, patients: 70000, doctors: 1200, city: "Aurangabad", pincode: "431001" },
  { name: "Solapur", tb: 5.5, cancer: 3.4, hiv: 1.3, dengue: 1.6, malaria: 0.7, chikungunya: 0.4, cholera: 0.2, gastroenteritis: 1.0, diarrhea: 1.3, jaundice: 0.6, typhoid: 0.8, hospitals: 60, patients: 60000, doctors: 1100, city: "Solapur", pincode: "413001" },
  { name: "Kolhapur", tb: 5.2, cancer: 3.2, hiv: 1.2, dengue: 1.4, malaria: 0.6, chikungunya: 0.3, cholera: 0.2, gastroenteritis: 0.9, diarrhea: 1.1, jaundice: 0.5, typhoid: 0.7, hospitals: 50, patients: 50000, doctors: 1000, city: "Kolhapur", pincode: "416003" },
  { name: "Satara", tb: 4.9, cancer: 3.0, hiv: 1.1, dengue: 1.2, malaria: 0.5, chikungunya: 0.2, cholera: 0.1, gastroenteritis: 0.7, diarrhea: 0.9, jaundice: 0.4, typhoid: 0.5, hospitals: 40, patients: 40000, doctors: 900, city: "Satara", pincode: "415001" },
  { name: "Sangli", tb: 4.7, cancer: 2.8, hiv: 1.0, dengue: 1.0, malaria: 0.4, chikungunya: 0.1, cholera: 0.1, gastroenteritis: 0.6, diarrhea: 0.8, jaundice: 0.3, typhoid: 0.4, hospitals: 30, patients: 30000, doctors: 800, city: "Sangli", pincode: "416416" },
  // More districts
  { name: "Amravati", tb: 4.5, cancer: 2.6, hiv: 0.9, dengue: 0.9, malaria: 0.3, chikungunya: 0.1, cholera: 0.1, gastroenteritis: 0.5, diarrhea: 0.7, jaundice: 0.3, typhoid: 0.3, hospitals: 28, patients: 28000, doctors: 780, city: "Amravati", pincode: "444601" },
  { name: "Akola", tb: 4.3, cancer: 2.4, hiv: 0.8, dengue: 0.8, malaria: 0.2, chikungunya: 0.1, cholera: 0.1, gastroenteritis: 0.4, diarrhea: 0.6, jaundice: 0.2, typhoid: 0.3, hospitals: 26, patients: 26000, doctors: 760, city: "Akola", pincode: "444001" },
  { name: "Jalgaon", tb: 4.1, cancer: 2.2, hiv: 0.7, dengue: 0.7, malaria: 0.2, chikungunya: 0.1, cholera: 0.1, gastroenteritis: 0.3, diarrhea: 0.5, jaundice: 0.2, typhoid: 0.2, hospitals: 24, patients: 24000, doctors: 740, city: "Jalgaon", pincode: "425001" },
  { name: "Latur", tb: 3.9, cancer: 2.0, hiv: 0.6, dengue: 0.6, malaria: 0.2, chikungunya: 0.1, cholera: 0.1, gastroenteritis: 0.2, diarrhea: 0.4, jaundice: 0.1, typhoid: 0.2, hospitals: 22, patients: 22000, doctors: 720, city: "Latur", pincode: "413512" },
  { name: "Nanded", tb: 3.7, cancer: 1.8, hiv: 0.5, dengue: 0.5, malaria: 0.1, chikungunya: 0.1, cholera: 0.1, gastroenteritis: 0.2, diarrhea: 0.3, jaundice: 0.1, typhoid: 0.1, hospitals: 20, patients: 20000, doctors: 700, city: "Nanded", pincode: "431601" },
];

// Mock hospital data
const hospitalData = [
  {
    name: "Mumbai Central Hospital",
    coords: [19.0728, 72.8826],
    tb: 7.8,
    cancer: 5.0,
    hiv: 2.5,
    doctors: 120,
    beds: 300,
    contact: "022-12345678",
    specializations: ["TB", "Cancer", "HIV/AIDS", "Cardiology"]
  },
  {
    name: "Pune Health Institute",
    coords: [18.5204, 73.8567],
    tb: 7.2,
    cancer: 4.7,
    hiv: 2.1,
    doctors: 90,
    beds: 200,
    contact: "020-87654321",
    specializations: ["TB", "Cancer"]
  },
  {
    name: "Nagpur Medical Center",
    coords: [21.1458, 79.0882],
    tb: 6.9,
    cancer: 4.3,
    hiv: 1.8,
    doctors: 70,
    beds: 150,
    contact: "0712-2345678",
    specializations: ["TB", "HIV/AIDS"]
  },
  // ...add more hospitals as needed
];

const getTopPerformers = (data, metric, count = 3) => {
  return [...data]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, count)
    .map((d, i) => ({ ...d, rank: i + 1 }));
};

const getStats = (data) => {
  return {
    totalDistricts: data.length,
    totalHospitals: data.reduce((sum, d) => sum + d.hospitals, 0),
    totalDoctors: data.reduce((sum, d) => sum + d.doctors, 0),
    totalPatients: data.reduce((sum, d) => sum + d.patients, 0),
  };
};

const didYouKnowFacts = [
  "TB is curable and preventable with proper treatment.",
  "Early cancer detection greatly improves survival rates.",
  "HIV cannot be cured, but antiretroviral therapy allows people to live long, healthy lives.",
  "Avoiding tobacco and alcohol reduces your risk of many cancers.",
  "Completing the full course of TB medication prevents drug resistance."
];

const helplineInfo = [
  { label: "Emergency Medical Helpline", value: "108" },
  { label: "National Health Helpline", value: "1800-180-1104" },
  { label: "State HIV/AIDS Helpline", value: "1097" },
  { label: "Cancer Helpline", value: "1800-22-1951" },
];

const Heatmap = () => {
  const [selectedMetric, setSelectedMetric] = useState("diseases");
  const [selectedDisease, setSelectedDisease] = useState("tb");
  const [showDiseaseInfo, setShowDiseaseInfo] = useState(false);
  const [factIdx, setFactIdx] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [modalDistrict, setModalDistrict] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchType, setSearchType] = useState('district');
  const [searchValue, setSearchValue] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(districtData);
  const [selectedSearchDistrict, setSelectedSearchDistrict] = useState(null);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const activeMetric = selectedMetric === "diseases" ? selectedDisease : selectedMetric;
  const topPerformers = getTopPerformers(districtData, activeMetric);
  const stats = getStats(districtData);

  // For legend
  const values = districtData.map((d) => d[activeMetric]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);

  // Rotate fact every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setFactIdx((idx) => (idx + 1) % didYouKnowFacts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  const handleFilterChange = (type, value, fromSuggestion = false) => {
    setSearchType(type);
    setSearchValue(value);
    let filtered = districtData;
    if (type === 'district' && value) {
      filtered = districtData.filter(d => d.name === value);
    } else if (type === 'city' && value) {
      filtered = districtData.filter(d => d.city && d.city.toLowerCase().includes(value.toLowerCase()));
      // City suggestions only when typing, not when selecting
      setCitySuggestions(
        !fromSuggestion && value.length > 0
          ? Array.from(new Set(districtData.filter(d => d.city && d.city.toLowerCase().includes(value.toLowerCase())).map(d => d.city)))
          : []
      );
    } else if (type === 'pincode' && value) {
      filtered = districtData.filter(d => d.pincode && d.pincode.toString() === value);
    }
    setFilteredDistricts(filtered.length ? filtered : districtData);
    setSelectedSearchDistrict(filtered.length === 1 ? filtered[0] : null);
    setSelectedDistrict(filtered.length === 1 ? filtered[0] : null);
    setModalDistrict(null);
  };

  return (
    <div className="heatmap-container">
      {/* Disease Info Modal */}
      {showDiseaseInfo && (
        <>
          <div className="disease-info-overlay" onClick={() => setShowDiseaseInfo(false)} />
          <DiseaseInfo diseaseKey={selectedDisease} onClose={() => setShowDiseaseInfo(false)} />
        </>
      )}
      {/* District Drilldown Modal */}
      {modalDistrict && (
        <>
          <div className="disease-info-overlay" onClick={() => setModalDistrict(null)} />
          <DistrictModal district={modalDistrict} onClose={() => setModalDistrict(null)} />
        </>
      )}
      {/* Hospital Modal */}
      {selectedHospital && (
        <>
          <div className="disease-info-overlay" onClick={() => setSelectedHospital(null)} />
          <DistrictModal district={selectedHospital} onClose={() => setSelectedHospital(null)} />
        </>
      )}
      {/* Left Sidebar (was right sidebar) */}
      <aside className="heatmap-sidebar heatmap-sidebar-left">
        {/* People Filter UI */}
        <div className="people-search-card glass-card" style={{ marginBottom: 18, padding: 18, borderRadius: 16, boxShadow: '0 2px 12px #2563eb11' }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#2563eb' }}>Filter by Location</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <select value={searchType} onChange={e => handleFilterChange(e.target.value, '')} style={{ padding: '6px 10px', borderRadius: 8, border: '1.5px solid #2563eb', fontSize: 15 }}>
              <option value="district">District</option>
              <option value="city">City</option>
              <option value="pincode">Pincode</option>
            </select>
            {searchType === 'district' && (
              <select value={searchValue} onChange={e => handleFilterChange('district', e.target.value)} style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1.5px solid #2563eb', fontSize: 15 }}>
                <option value="">All Districts</option>
                {districtData.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
              </select>
            )}
            {searchType === 'city' && (
              <div style={{ position: 'relative', flex: 1 }}>
                <input type="text" value={searchValue} onChange={e => handleFilterChange('city', e.target.value)} placeholder="Enter city name..." style={{ width: '100%', padding: '6px 10px', borderRadius: 8, border: '1.5px solid #2563eb', fontSize: 15 }} />
                {citySuggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: 38, left: 0, right: 0, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 8px #2563eb22', zIndex: 10, maxHeight: 160, overflowY: 'auto' }}>
                    {citySuggestions.map((city, idx) => (
                      <div key={city + idx} style={{ padding: '8px 12px', cursor: 'pointer', color: '#222', fontWeight: 500, borderBottom: '1px solid #f0f0f0' }} onMouseDown={() => handleFilterChange('city', city, true)}>{city}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {searchType === 'pincode' && (
              <input type="text" value={searchValue} onChange={e => handleFilterChange('pincode', e.target.value)} placeholder="Enter pincode..." style={{ flex: 1, padding: '6px 10px', borderRadius: 8, border: '1.5px solid #2563eb', fontSize: 15 }} />
            )}
          </div>
        </div>
        {selectedDistrict ? (
          <div className="district-details-card glass-card">
            <div className="district-header">
              <div className="district-title">{selectedDistrict.name}</div>
              <div className="district-meta">
                <span>Population: <b>{selectedDistrict.population?.toLocaleString() || 'N/A'}</b></span>
                <span>Area: <b>{selectedDistrict.area || 'N/A'} km²</b></span>
              </div>
            </div>
            <div className="district-mini-map">
              {/* Optionally, show a mini map or icon here */}
              <span role="img" aria-label="map" style={{ fontSize: 32 }}>🗺️</span>
            </div>
            <div className="district-disease-breakdown">
              <div className="section-title">Disease Breakdown</div>
              <div className="disease-breakdown-list">
                {diseases.map(d => (
                  <div key={d.key} className="disease-breakdown-item" style={{ borderLeft: `4px solid ${d.color}` }}>
                    <span className="disease-icon" style={{ color: d.color, fontSize: 18 }}>{d.icon}</span>
                    <span className="disease-label">{d.label}</span>
                    <span className="disease-value">{selectedDistrict[d.key] ?? '—'}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="district-stats">
              <div className="section-title">Key Healthcare Stats</div>
              <ul className="district-stats-list">
                <li>Hospitals: <b>{selectedDistrict.hospitals ?? 'N/A'}</b></li>
                <li>Doctors: <b>{selectedDistrict.doctors ?? 'N/A'}</b></li>
                <li>Beds: <b>{selectedDistrict.beds ?? 'N/A'}</b></li>
              </ul>
            </div>
            <div className="district-trend-chart">
              <div className="section-title">Recent Disease Trend</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={(selectedDistrict.trend || [1,2,3,2,4,3]).map((v,i) => ({ x: i+1, y: v }))}>
                  <Line type="monotone" dataKey="y" stroke="#c20000" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="district-alerts collapsible-panel">
              <div className="section-title">Recent Alerts</div>
              <ul>
                <li>No major outbreaks reported this week.</li>
                <li>Vaccination drive ongoing.</li>
              </ul>
            </div>
            <div className="district-resources collapsible-panel">
              <div className="section-title">Helplines & Resources</div>
              <ul>
                {helplineInfo.map((h, i) => (
                  <li key={i}><b>{h.label}:</b> {h.value}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="district-details-card glass-card empty-state">
            <div style={{ textAlign: 'center', color: '#4a6fa1', marginTop: 40 }}>
              <span role="img" aria-label="map" style={{ fontSize: 48 }}>🗺️</span>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', margin: '1rem 0 0.5rem 0' }}>Select a district on the map</div>
              <div style={{ fontSize: '1rem', color: '#7a8fa6' }}>See detailed healthcare stats, disease breakdown, and trends here.</div>
            </div>
      </div>
        )}
      </aside>
      {/* Main Content */}
      <main className="heatmap-main" style={{ alignItems: 'stretch' }}>
        <h1 className="main-title">MAP Live Tracking</h1>
        <p className="main-subtitle">Realtime Tracker across Districts</p>
        <div className="heatmap-map-wrapper" style={{ height: '70vh', minHeight: 480, width: '100%', maxWidth: '100%' }}>
          <MaharashtraMap
            data={filteredDistricts}
            metric={activeMetric}
            min={min}
            max={max}
            onDistrictClick={d => { setSelectedDistrict(d); setModalDistrict(d); setSelectedSearchDistrict(d); }}
            selectedDistrict={selectedSearchDistrict || selectedDistrict}
            hospitals={hospitalData}
            onHospitalClick={setSelectedHospital}
            selectedHospital={selectedHospital}
          />
        </div>
        {/* Dynamic Chart Card Section Below Map */}
        <div className="map-insight-card glass-card" style={{ width: '100%', maxWidth: '100%', marginTop: 24, boxSizing: 'border-box', alignSelf: 'stretch', overflowX: 'auto', padding: '1.5rem 2rem', flex: 1, minWidth: 0, minHeight: 360, height: 360 }}>
          {selectedDistrict ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2c3e50' }}>{selectedDistrict.name} Disease Insights</div>
                <button className="metric-btn" style={{ background: '#eaf2fb', color: '#005fa3', fontWeight: 600, fontSize: 13, padding: '3px 12px', borderRadius: 8, border: 'none', cursor: 'pointer' }} onClick={() => setSelectedDistrict(null)}>Back to Overview</button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={diseases.map(d => ({ name: d.label, value: selectedDistrict[d.key] ?? 0, fill: d.color }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Bar dataKey="value">
                    {diseases.map((d, idx) => <Cell key={d.key} fill={d.color} />)}
                  </Bar>
                  <ReTooltip />
                </BarChart>
              </ResponsiveContainer>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#2c3e50', marginBottom: 8 }}>Maharashtra Disease Trend Overview</div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={diseases.map((d, idx) => ({ name: d.label, value: districtData.reduce((sum, dist) => sum + (dist[d.key] || 0), 0) }))}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Line type="monotone" dataKey="value" stroke="#c20000" strokeWidth={2} />
                  <ReTooltip />
                </LineChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Heatmap; 