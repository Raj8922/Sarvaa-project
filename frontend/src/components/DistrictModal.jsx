import React, { useState } from "react";
import { diseaseColors, diseaseIcons, diseaseData } from "./DiseaseInfo";

const mockTrends = {
  tb: [5, 6, 7, 8, 7.5, 8.2],
  cancer: [2.5, 3, 3.5, 4, 4.8, 5.1],
  hiv: [1, 1.5, 2, 2.2, 2.5, 2.7],
};

const hospitals = [
  "District Hospital",
  "City Medical Center",
  "Community Health Clinic",
  "Specialty Cancer Hospital"
];

const helplines = [
  { label: "Emergency Medical Helpline", value: "108" },
  { label: "National Health Helpline", value: "1800-180-1104" },
  { label: "State HIV/AIDS Helpline", value: "1097" },
  { label: "Cancer Helpline", value: "1800-22-1951" },
];

const diseaseOrder = [
  "tb", "cancer", "hiv", "dengue", "malaria", "chikungunya", "cholera", "gastroenteritis", "diarrhea", "jaundice", "typhoid"
];

const DistrictModal = ({ district, onClose }) => {
  const [expanded, setExpanded] = useState(null);
  if (!district) return null;
  return (
    <div className="disease-info-modal" style={{ minWidth: 360, maxWidth: 700, width: "95vw", overflowY: "auto" }}>
      <button className="disease-info-close" onClick={onClose}>&times;</button>
      <h2 style={{ fontSize: "1.5rem", marginBottom: 10 }}>{district.name} District Disease Overview</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, justifyContent: "center" }}>
        {diseaseOrder.map((key) => {
          if (district[key] == null) return null;
          const color = diseaseColors[key] || "#c20000";
          const icon = diseaseIcons[key] || "💊";
          const info = diseaseData[key];
          return (
            <div
              key={key}
              style={{
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                borderTop: `5px solid ${color}`,
                minWidth: 180,
                maxWidth: 220,
                flex: "1 1 180px",
                marginBottom: 10,
                padding: "1.1rem 1.1rem 0.7rem 1.1rem",
                position: "relative",
                transition: "box-shadow 0.2s, transform 0.2s",
                cursor: "pointer",
                boxSizing: "border-box"
              }}
              onClick={() => setExpanded(expanded === key ? null : key)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <span className="disease-info-avatar" style={{ background: color, width: 32, height: 32, fontSize: 18 }}>{icon}</span>
                <span style={{ fontWeight: 700, color, fontSize: 15 }}>{info ? info.name : key.toUpperCase()}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: color, marginBottom: 2 }}>{district[key]}</div>
              <div style={{ fontSize: 13, color: "#4a6fa1", marginBottom: 4 }}>Incidence Rate</div>
              <button
                style={{
                  background: color,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "3px 12px",
                  fontWeight: 600,
                  fontSize: 13,
                  marginBottom: 6,
                  cursor: "pointer",
                  transition: "background 0.18s"
                }}
                onClick={e => { e.stopPropagation(); setExpanded(expanded === key ? null : key); }}
              >
                {expanded === key ? "Hide Info" : "Learn More"}
              </button>
              {expanded === key && info && (
                <div style={{ marginTop: 8, fontSize: 14, color: "#222" }}>
                  <div style={{ fontWeight: 700, color, marginBottom: 2 }}>Overview</div>
                  <div style={{ marginBottom: 6 }}>{info.overview}</div>
                  <div style={{ fontWeight: 700, color, marginBottom: 2 }}>Serious Health Concerns</div>
                  <ul style={{ margin: 0, marginBottom: 6, paddingLeft: 18 }}>
                    {info.concerns.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                  <div style={{ fontWeight: 700, color, marginBottom: 2 }}>Prevention Tips</div>
                  <ul style={{ margin: 0, marginBottom: 6, paddingLeft: 18 }}>
                    {info.prevention.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                  <div style={{ fontWeight: 700, color, marginBottom: 2 }}>Documents & Resources</div>
                  <ul style={{ margin: 0, marginBottom: 0, paddingLeft: 18 }}>
                    {info.documents.map((doc, i) => (
                      <li key={i}><a href={doc.url} target="_blank" rel="noopener noreferrer" style={{ color }}>{doc.name}</a></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DistrictModal; 