import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Mock coordinates for demonstration (not accurate)
const districtCoords = {
  Mumbai: [19.076, 72.8777],
  Pune: [18.5204, 73.8567],
  Thane: [19.2183, 72.9781],
  Nagpur: [21.1458, 79.0882],
  Nashik: [20.011, 73.7903],
  Aurangabad: [19.8762, 75.3433],
  Solapur: [17.6599, 75.9064],
  Kolhapur: [16.705, 74.2433],
  Satara: [17.6805, 74.0183],
  Sangli: [16.8524, 74.5815],
  // ...add more as needed
};

// Custom SVG hospital icon with drop shadow
const hospitalSVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
  </filter>
  <circle cx="16" cy="16" r="14" fill="#fff" filter="url(#shadow)"/>
  <rect x="10" y="10" width="12" height="12" rx="3" fill="#005fa3"/>
  <rect x="14.2" y="12.2" width="3.6" height="7.6" rx="1.2" fill="#fff"/>
  <rect x="12.2" y="14.2" width="7.6" height="3.6" rx="1.2" fill="#fff"/>
</svg>`;
const hospitalIcon = new L.DivIcon({
  className: 'hospital-marker',
  html: hospitalSVG,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Color scale (red gradient for danger)
function getColor(value, min, max) {
  if (value == null) return "#eee";
  const percent = (value - min) / (max - min);
  // Gradient from #ffd6d6 (light red) to #c20000 (dark red)
  const r = Math.round(255 + (194 - 255) * percent); // 255 to 194
  const g = Math.round(214 + (0 - 214) * percent);  // 214 to 0
  const b = Math.round(214 + (0 - 214) * percent);  // 214 to 0
  return `rgb(${r},${g},${b})`;
}

// Offset hospital marker if it shares the same coords as a district
function offsetCoords(coords, i) {
  if (!coords) return coords;
  // Offset by a small amount based on index
  const offset = 0.03 * (i + 1);
  return [coords[0] + offset, coords[1] + offset];
}

// Helper component to auto-zoom/center map
function FlyToDistrict({ district }) {
  const map = useMap();
  useEffect(() => {
    if (district && districtCoords[district.name]) {
      map.flyTo(districtCoords[district.name], 9, { duration: 1.2 });
    }
  }, [district, map]);
  return null;
}

const MaharashtraMap = ({ data, metric, min, max, onDistrictClick, selectedDistrict, hospitals = [], onHospitalClick, selectedHospital }) => {
  const mapRef = useRef();

  useEffect(() => {
    const mapNode = mapRef.current;
    if (!mapNode) return;
    const handleWheel = (e) => {
      e.preventDefault();
    };
    mapNode.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      mapNode.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="maharashtra-map-container"
      style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0, flex: 1, display: "flex" }}
      ref={mapRef}
    >
      <MapContainer
        center={[19.5, 75.5]}
        zoom={6.5}
        style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0, flex: 1 }}
      >
        {/* Auto-zoom to selected district */}
        <FlyToDistrict district={selectedDistrict} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* District Circles */}
        {data.map((d) => {
          const coords = districtCoords[d.name];
          if (!coords || !Array.isArray(coords) || coords.length !== 2) return null;
          const value = d[metric];
          const isSelected = selectedDistrict && selectedDistrict.name === d.name;
          return (
            <CircleMarker
              key={d.name}
              center={coords}
              radius={16}
              fillColor={getColor(value, min, max)}
              color={isSelected ? "#005fa3" : "#fff"}
              weight={isSelected ? 4 : 1}
              fillOpacity={0.85}
              eventHandlers={onDistrictClick ? {
                click: () => onDistrictClick(d)
              } : {}}
              style={{ cursor: onDistrictClick ? "pointer" : "default" }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
                <div style={{ textAlign: "left", minWidth: 160 }}>
                  <div style={{ fontWeight: 700, color: '#005fa3', fontSize: '1.08em', marginBottom: 4 }}>{d.name}</div>
                  <div><b>{metric.charAt(0).toUpperCase() + metric.slice(1)}:</b> {value}</div>
                  <div><b>Hospitals:</b> {d.hospitals}</div>
                  <div><b>Doctors:</b> {d.doctors}</div>
                  <div><b>Patients:</b> {d.patients.toLocaleString()}</div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
        {/* Hospital Markers (rendered after circles, with offset if needed) */}
        {hospitals.map((hosp, i) => {
          // Offset if hospital shares coords with a district
          let coords = hosp.coords;
          for (const d of data) {
            const dCoords = districtCoords[d.name];
            if (dCoords && dCoords[0] === coords[0] && dCoords[1] === coords[1]) {
              coords = offsetCoords(coords, i);
              break;
            }
          }
          return (
            <Marker
              key={hosp.name + i}
              position={coords}
              icon={hospitalIcon}
              eventHandlers={onHospitalClick ? {
                click: () => onHospitalClick(hosp)
              } : {}}
            >
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontWeight: 700, color: '#005fa3', fontSize: '1.08em', marginBottom: 4 }}>{hosp.name}</div>
                  <div><b>TB Rate:</b> {hosp.tb}</div>
                  <div><b>Cancer Rate:</b> {hosp.cancer}</div>
                  <div><b>HIV/AIDS Rate:</b> {hosp.hiv}</div>
                  <div><b>Doctors:</b> {hosp.doctors}</div>
                  <div><b>Beds:</b> {hosp.beds}</div>
                  <div><b>Contact:</b> {hosp.contact}</div>
                  <div><b>Specializations:</b> {hosp.specializations.join(", ")}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MaharashtraMap; 