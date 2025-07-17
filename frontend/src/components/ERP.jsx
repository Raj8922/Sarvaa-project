import React, { useState, useRef, useEffect } from 'react';
import logo from '../assets/logo.png';
import minister from '../assets/minister.png';
import { FaHospitalSymbol, FaProcedures, FaAmbulance, FaExchangeAlt, FaVials, FaUserMd, FaHeartbeat, FaBoxOpen, FaExclamationTriangle, FaTools, FaSyringe, FaUsers, FaCalendarAlt, FaChartLine, FaThermometerHalf, FaTruck, FaBoxes, FaBullhorn, FaBell } from 'react-icons/fa';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { ResponsiveContainer, BarChart as ReBarChart, XAxis, YAxis, Bar, Tooltip as ReTooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import kadamri from '../assets/kadamri.png';
import nitin from '../assets/nitin.png';
import nipun from '../assets/nipun.png';
import virendra from '../assets/virendra.png';
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const BG_DARK = '#181A1B';
const SIDEBAR_DARK = BG_DARK;
const TEXT_WHITE = '#fff';
const TEXT_LIGHT = '#E5E7EB';
const CARD_BG = '#fff';
const CARD_BORDER = '#e5e7eb';
const CARD_SHADOW = '0 2px 12px 0 rgba(0,0,0,0.06)';
const ACCENT_BLUE = '#2563eb';
const ACCENT_GREEN = '#22c55e';
const ACCENT_YELLOW = '#fbbf24';
const ACCENT_RED = '#ef4444';

const initialSidebarItems = [
  { icon: '📊', label: 'Minister Dashboard' },
  { icon: '🏥', label: 'Hospitals' },
  { icon: '💉', label: 'Vaccination' },
];

const initialProjects = [
  { name: 'Approval of civil works tender for 100-bed trauma care unit in Nagpur',percent: 50, type: 'Hospitals' },
  { name: 'Site clearance request for hospital wing upgrades at Nashik District Hospital', percent: 85, type: 'Vaccination' },
];

const initialTeam = [
  { name: 'Dr. Kadambari Balkawade (I.A.S)', avatar: kadamri, role: 'Commissioner (HS) & MD (NHM)', email: 'commissioner.health@maharashtra.gov.in', phone: '022-22620235', todo: Math.floor(Math.random()*5)+1, progress: Math.floor(Math.random()*5)+1, completed: Math.floor(Math.random()*5)+1 },
  { name: 'Dr. Nipun Vinayak (I.A.S)', avatar: nipun,  role: 'Secretary-1, Public Health Department', email: 'psec.pubhealth@maharashtra.gov.in', phone: '022-22617388', todo: Math.floor(Math.random()*5)+1, progress: Math.floor(Math.random()*5)+1, completed: Math.floor(Math.random()*5)+1 },
  { name: 'Shri. Virendra Singh (I.A.S)', avatar: virendra,  role: 'Secretary-2, Public Health Department', email: 'psec2.pubhealth@maharashtra.gov.in', phone: '022-22617392', todo: Math.floor(Math.random()*5)+1, progress: Math.floor(Math.random()*5)+1, completed: Math.floor(Math.random()*5)+1 },
  { name: 'Dr. Nitin Ambadekar', avatar: nitin, role: 'Director Health Services, Mumbai', email: 'director.dhs-mh@gov.in', phone: '022-22620292', todo: Math.floor(Math.random()*5)+1, progress: Math.floor(Math.random()*5)+1, completed: Math.floor(Math.random()*5)+1 },
];

const initialTasksPie = [
  { name: 'Pending Approvals', value: 2, color: ACCENT_YELLOW },
  { name: 'In Progress', value: 2, color: ACCENT_BLUE },
  { name: 'Completed', value: 5, color: ACCENT_GREEN },
  { name: 'Critical', value: 1, color: ACCENT_RED },
];

const initialProgressBarData = [
  { date: 'Apr 1', pending: 2, progress: 2, completed: 3, critical: 0 },
  { date: 'Apr 2', pending: 1, progress: 3, completed: 4, critical: 1 },
  { date: 'Apr 3', pending: 2, progress: 2, completed: 5, critical: 0 },
  { date: 'Apr 4', pending: 1, progress: 2, completed: 6, critical: 0 },
  { date: 'Apr 5', pending: 2, progress: 1, completed: 7, critical: 0 },
  { date: 'Apr 6', pending: 1, progress: 2, completed: 8, critical: 0 },
  { date: 'Apr 7', pending: 2, progress: 2, completed: 7, critical: 0 },
];

// Add new health metrics for donut charts
const initialDonutData = [
  {
    title: 'Hospital Bed Occupancy',
    value: 78,
    color: ACCENT_RED,
    total: 100,
    legend: [
      { label: 'Occupied', value: 78, color: ACCENT_RED },
      { label: 'Available', value: 22, color: ACCENT_GREEN },
    ],
  },
  {
    title: 'Vaccination Coverage',
    value: 92,
    color: ACCENT_GREEN,
    total: 100,
    legend: [
      { label: 'Vaccinated', value: 92, color: ACCENT_GREEN },
      { label: 'Unvaccinated', value: 8, color: ACCENT_YELLOW },
    ],
  },
  {
    title: 'Program Reach',
    value: 67,
    color: ACCENT_BLUE,
    total: 100,
    legend: [
      { label: 'Reached', value: 67, color: ACCENT_BLUE },
      { label: 'Unreached', value: 33, color: ACCENT_YELLOW },
    ],
  },
  {
    title: 'Staff Availability',
    value: 85,
    color: ACCENT_YELLOW,
    total: 100,
    legend: [
      { label: 'Available', value: 85, color: ACCENT_YELLOW },
      { label: 'On Leave', value: 15, color: ACCENT_RED },
    ],
  },
];

// Mock hospital data for demonstration
const hospitals = [
  { name: 'JJ Hospital', city: 'Mumbai', beds: 2000, type: 'District Hospitals', lat: 19.0707, lng: 72.8606, general: 1200, icu: 400, oxygen: 400, occupied: { general: 900, icu: 350, oxygen: 350 } },
  { name: 'Sassoon Hospital', city: 'Pune', beds: 1500, type: 'District Hospitals', lat: 18.5286, lng: 73.8746, general: 900, icu: 300, oxygen: 300, occupied: { general: 700, icu: 250, oxygen: 250 } },
  { name: 'Ruby Hall Clinic', city: 'Pune', beds: 800, type: 'Private Hospitals', lat: 18.5362, lng: 73.8777, general: 500, icu: 150, oxygen: 150, occupied: { general: 400, icu: 120, oxygen: 120 } },
  { name: 'KEM Hospital', city: 'Mumbai', beds: 1800, type: 'District Hospitals', lat: 19.0176, lng: 72.8562, general: 1100, icu: 350, oxygen: 350, occupied: { general: 800, icu: 300, oxygen: 300 } },
  { name: 'Wockhardt Hospital', city: 'Nagpur', beds: 500, type: 'Private Hospitals', lat: 21.1458, lng: 79.0882, general: 300, icu: 100, oxygen: 100, occupied: { general: 200, icu: 80, oxygen: 80 } },
  { name: 'Civil Hospital', city: 'Nashik', beds: 600, type: 'District Hospitals', lat: 19.9975, lng: 73.7898, general: 350, icu: 120, oxygen: 130, occupied: { general: 250, icu: 90, oxygen: 100 } },
  { name: 'PHCs Shirdi', city: 'Shirdi', beds: 60, type: 'PHCs', lat: 19.7667, lng: 74.4774, general: 40, icu: 10, oxygen: 10, occupied: { general: 30, icu: 7, oxygen: 8 } },
  { name: 'CHCs Latur', city: 'Latur', beds: 120, type: 'CHCs', lat: 18.4088, lng: 76.5604, general: 80, icu: 20, oxygen: 20, occupied: { general: 60, icu: 15, oxygen: 15 } },
  // Added for mockup/demo coverage across Maharashtra:
  { name: 'District Hospitals', city: 'Aurangabad', beds: 900, type: 'District Hospitals', lat: 19.8762, lng: 75.3433, general: 600, icu: 150, oxygen: 150, occupied: { general: 400, icu: 100, oxygen: 100 } },
  { name: 'General Hospital', city: 'Solapur', beds: 700, type: 'District Hospitals', lat: 17.6599, lng: 75.9064, general: 400, icu: 150, oxygen: 150, occupied: { general: 300, icu: 100, oxygen: 100 } },
  { name: 'PHCs Ratnagiri', city: 'Ratnagiri', beds: 80, type: 'PHCs', lat: 16.9902, lng: 73.3120, general: 50, icu: 15, oxygen: 15, occupied: { general: 40, icu: 10, oxygen: 10 } },
  { name: 'CHC Chandrapur', city: 'Chandrapur', beds: 150, type: 'CHCs', lat: 19.9615, lng: 79.2961, general: 100, icu: 25, oxygen: 25, occupied: { general: 80, icu: 20, oxygen: 20 } },
  { name: 'Private Hospitals', city: 'Kolhapur', beds: 300, type: 'Private Hospitals', lat: 16.7050, lng: 74.2433, general: 200, icu: 50, oxygen: 50, occupied: { general: 150, icu: 40, oxygen: 40 } },
  { name: 'District Hospitals', city: 'Amravati', beds: 500, type: 'District Hospitals', lat: 20.9374, lng: 77.7796, general: 300, icu: 100, oxygen: 100, occupied: { general: 200, icu: 70, oxygen: 70 } },
  { name: 'PHCs Satara', city: 'Satara', beds: 70, type: 'PHCs', lat: 17.6805, lng: 74.0183, general: 40, icu: 15, oxygen: 15, occupied: { general: 30, icu: 10, oxygen: 10 } },
  { name: 'CHCs Akola', city: 'Akola', beds: 110, type: 'CHCs', lat: 20.7096, lng: 77.0086, general: 70, icu: 20, oxygen: 20, occupied: { general: 50, icu: 15, oxygen: 15 } },
  { name: 'Private Hospitals', city: 'Dhule', beds: 200, type: 'Private Hospitals', lat: 20.9042, lng: 74.7749, general: 120, icu: 40, oxygen: 40, occupied: { general: 90, icu: 30, oxygen: 30 } },
  { name: 'District Hospitals', city: 'Jalgaon', beds: 400, type: 'District Hospitals', lat: 21.0077, lng: 75.5626, general: 250, icu: 75, oxygen: 75, occupied: { general: 180, icu: 50, oxygen: 50 } },
  { name: 'PHCs Nanded', city: 'Nanded', beds: 90, type: 'PHCs', lat: 19.1383, lng: 77.3210, general: 60, icu: 15, oxygen: 15, occupied: { general: 45, icu: 10, oxygen: 10 } },
  { name: 'CHC Parbhani', city: 'Parbhani', beds: 130, type: 'CHCs', lat: 19.2686, lng: 76.7708, general: 80, icu: 25, oxygen: 25, occupied: { general: 60, icu: 15, oxygen: 15 } },
  { name: 'Private Hospitals', city: 'Beed', beds: 220, type: 'Private Hospitals', lat: 18.9891, lng: 75.7601, general: 140, icu: 40, oxygen: 40, occupied: { general: 100, icu: 30, oxygen: 30 } },
  { name: 'District Hospitals', city: 'Osmanabad', beds: 350, type: 'District Hospitals', lat: 18.1860, lng: 76.0419, general: 200, icu: 75, oxygen: 75, occupied: { general: 140, icu: 50, oxygen: 50 } },
  { name: 'PHCs Bhandara', city: 'Bhandara', beds: 60, type: 'PHCs', lat: 21.1661, lng: 79.6526, general: 40, icu: 10, oxygen: 10, occupied: { general: 30, icu: 7, oxygen: 8 } },
  { name: 'CHCs Yavatmal', city: 'Yavatmal', beds: 120, type: 'CHCs', lat: 20.3888, lng: 78.1204, general: 80, icu: 20, oxygen: 20, occupied: { general: 60, icu: 15, oxygen: 15 } },
];
const hospitalTypes = ['District Hospitals', 'Private Hospitals', 'PHCs', 'CHCs'];
const hospitalTypeCounts = hospitalTypes.map(type => ({ type, count: hospitals.filter(h => h.type === type).length }));
const totalBedsByDistrict = hospitals.map(h => ({
  name: h.city,
  General: h.general,
  ICU: h.icu,
  Oxygen: h.oxygen,
  OccupiedGeneral: h.occupied.general,
  OccupiedICU: h.occupied.icu,
  OccupiedOxygen: h.occupied.oxygen,
}));

// Hospital operations stats (mock data)
const hospitalOpsStats = [
  { label: 'OPD Footfall', value: '3,500 OPD patients/week', icon: <FaProcedures color="#2563eb" /> },
  { label: 'Emergency Admissions', value: '540 ER patients last 7 days', icon: <FaAmbulance color="#ef4444" /> },
  { label: 'Referral Rate', value: '12% referrals to tertiary centers', icon: <FaExchangeAlt color="#fbbf24" /> },
  { label: 'Diagnostics Performed', value: '4,320 tests this month', icon: <FaVials color="#27ae60" /> },
  { label: 'Doctor & Nurse Availability', value: '85% filled, 10 vacancies', icon: <FaUserMd color="#2563eb" /> },
  { label: 'Equipment Status', value: '18/20 dialysis machines active', icon: <FaHeartbeat color="#ef4444" /> },
  { label: 'Stock Status', value: 'Antibiotics: 3 days left', icon: <FaBoxOpen color="#fbbf24" /> },
  { label: 'Public Grievances', value: '5 unresolved sanitation complaints', icon: <FaExclamationTriangle color="#ef4444" /> },
  { label: 'Ongoing Projects', value: 'OT upgrade – 60% complete', icon: <FaTools color="#2563eb" /> },
];
// Vaccination campaign stats (mock data)
const vaccinationStats = [
  { label: 'Vaccine Type', value: 'HPV (adolescent)', icon: <FaSyringe color="#2563eb" /> },
  { label: 'Target Group', value: 'Women 15–26 yrs', icon: <FaUsers color="#27ae60" /> },
  { label: 'Campaign Window', value: '1–10 July 2025', icon: <FaCalendarAlt color="#fbbf24" /> },
  { label: 'Total Target Population', value: '1,25,000 eligible Women', icon: <FaUsers color="#2563eb" /> },
  { label: 'Doses Administered', value: '91,230 doses (72.9%)', icon: <FaSyringe color="#27ae60" /> },
  { label: 'First vs Second Dose', value: 'First dose: 88% / Second: 69%', icon: <FaChartLine color="#ef4444" /> },
  { label: 'Daily Progress Tracker', value: '4,500 doses/day (avg.)', icon: <FaChartLine color="#2563eb" /> },
  { label: 'AEFI', value: '11 minor AEFIs, 0 serious', icon: <FaThermometerHalf color="#fbbf24" /> },
  { label: 'Cold Chain Integrity', value: 'Cold box failures: 2', icon: <FaTruck color="#ef4444" /> },
  { label: 'Mobile Camp Coverage', value: '43 camps across 5 talukas', icon: <FaTruck color="#27ae60" /> },
  { label: 'Supply Stock', value: 'Covaxin: 8,000 doses in stock', icon: <FaBoxes color="#2563eb" /> },
  
];

// Mock noticeboard data
const hospitalNoticeboard = [
  { id: 1, text: 'JJ Hospital: New ICU wing operational from 10th July.' },
  { id: 2, text: 'Sassoon Hospital: Blood donation camp on 15th July.' },
  { id: 3, text: 'Civil Hospital Nashik: Fire safety drill scheduled for 20th July.' },
  { id: 4, text: 'Wockhardt Hospital: NABH audit next week.' },
  { id: 5, text: 'All hospitals: Submit monthly patient statistics by 12th July.' },
  { id: 6, text: 'Mumbai Central: MRI machine upgrade completed.', isNew: true },
  { id: 7, text: 'Pune Health Institute: Free health check-up camp on 18th July.', isNew: true },
  { id: 8, text: 'Kolhapur: New ambulance fleet deployed.', isNew: true },
  { id: 9, text: 'Nagpur Medical Center: COVID-19 booster drive extended.', isNew: true },
  { id: 10, text: 'District Hospitals: Oxygen plant maintenance on 22nd July.', isNew: true },
  { id: 11, text: 'PHCs: Staff training session on 25th July.', isNew: true },
];

const vaccinationNoticeboard = [
  { id: 1, text: 'HPV vaccination drive extended till 25th July.', isNew: true },
  { id: 2, text: 'Polio round scheduled for 1st August.', isNew: true },
];

export default function ERP() {
  const [sidebarItems] = useState(initialSidebarItems);
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [projects, setProjects] = useState(initialProjects);
  const [team, setTeam] = useState(initialTeam.map(m => ({ ...m, tasks: m.tasks || [] })));
  const [tasksPie, setTasksPie] = useState(initialTasksPie);
  const [progressBarData, setProgressBarData] = useState(initialProgressBarData);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', percent: 0, type: 'Hospitals' });
  const [openCard, setOpenCard] = useState(null);
  const [donutData] = useState(initialDonutData);
  const [progressChartRef, progressChartWidth] = useContainerWidth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Budget approval required for Nagpur trauma care unit.' },
    { id: 2, text: 'Vaccination campaign progress: 72.9% doses administered.' },
    { id: 3, text: 'Hospital grievance: Sanitation complaint unresolved.' },
  ]);
  const notificationRef = useRef();
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const teamDropdownRef = useRef();
  const [showWorkloadModal, setShowWorkloadModal] = useState(false);
  const [workloadMode, setWorkloadMode] = useState('assign'); // 'assign' or 'add'
  const [selectedWorkMember, setSelectedWorkMember] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '', phone: '' });
  const [selectedVaccine, setSelectedVaccine] = useState('HPV');
  const vaccineStatsData = {
    'HPV': [
      { label: 'Vaccine Type', value: 'HPV (adolescent)', icon: <FaSyringe color="#2563eb" /> },
      { label: 'Target Group', value: 'Women 15–26 yrs', icon: <FaUsers color="#27ae60" /> },
      { label: 'Campaign Window', value: '1–10 July 2025', icon: <FaCalendarAlt color="#fbbf24" /> },
      { label: 'Total Target Population', value: '1,25,000 eligible women', icon: <FaUsers color="#2563eb" /> },
      { label: 'Doses Administered', value: '91,230 doses (72.9%)', icon: <FaSyringe color="#27ae60" /> },
      { label: 'First vs Second Dose', value: 'First dose: 88% / Second: 69%', icon: <FaChartLine color="#ef4444" /> },
      { label: 'Daily Progress Tracker', value: '4,500 doses/day (avg.)', icon: <FaChartLine color="#2563eb" /> },
      { label: 'AEFI', value: '11 minor AEFIs, 0 serious', icon: <FaThermometerHalf color="#fbbf24" /> },
      { label: 'Cold Chain Integrity', value: 'Cold box failures: 2', icon: <FaTruck color="#ef4444" /> },
      { label: 'Mobile Camp Coverage', value: '43 camps across 5 talukas', icon: <FaTruck color="#27ae60" /> },
      { label: 'Supply Stock', value: 'Covaxin: 8,000 doses in stock', icon: <FaBoxes color="#2563eb" /> },
    ],
    'Polio': [
      { label: 'Vaccine Type', value: 'Oral Polio Vaccine (OPV)', icon: <FaSyringe color="#2563eb" /> },
      { label: 'Target Group', value: 'Children <5 yrs', icon: <FaUsers color="#27ae60" /> },
      { label: 'Campaign Window', value: '15–22 Aug 2025', icon: <FaCalendarAlt color="#fbbf24" /> },
      { label: 'Total Target Population', value: '2,00,000 eligible children', icon: <FaUsers color="#2563eb" /> },
      { label: 'Doses Administered', value: '1,98,000 doses (99%)', icon: <FaSyringe color="#27ae60" /> },
      { label: 'Booster Coverage', value: 'Booster: 95%', icon: <FaChartLine color="#ef4444" /> },
      { label: 'Daily Progress Tracker', value: '12,000 doses/day (avg.)', icon: <FaChartLine color="#2563eb" /> },
      { label: 'AEFI', value: '3 minor AEFIs, 0 serious', icon: <FaThermometerHalf color="#fbbf24" /> },
      { label: 'Mobile Camp Coverage', value: '120 camps across 12 districts', icon: <FaTruck color="#27ae60" /> },
      { label: 'Supply Stock', value: 'OPV: 15,000 doses in stock', icon: <FaBoxes color="#2563eb" /> },
    ],
    'COVID-19': [
      { label: 'Vaccine Type', value: 'Covishield/Covaxin', icon: <FaSyringe color="#2563eb" /> },
      { label: 'Target Group', value: 'All adults', icon: <FaUsers color="#27ae60" /> },
      { label: 'Campaign Window', value: 'Ongoing', icon: <FaCalendarAlt color="#fbbf24" /> },
      { label: 'Total Target Population', value: '12,50,000 eligible adults', icon: <FaUsers color="#2563eb" /> },
      { label: 'Doses Administered', value: '11,20,000 doses (89.6%)', icon: <FaSyringe color="#27ae60" /> },
      { label: 'Booster Coverage', value: 'Booster: 68%', icon: <FaChartLine color="#ef4444" /> },
      { label: 'Daily Progress Tracker', value: '18,000 doses/day (avg.)', icon: <FaChartLine color="#2563eb" /> },
      { label: 'AEFI', value: '21 minor AEFIs, 1 serious', icon: <FaThermometerHalf color="#fbbf24" /> },
      { label: 'Mobile Camp Coverage', value: '200 camps across 20 districts', icon: <FaTruck color="#27ae60" /> },
      { label: 'Supply Stock', value: 'Covishield: 25,000 doses in stock', icon: <FaBoxes color="#2563eb" /> },
    ],
    'Measles-Rubella': [
      { label: 'Vaccine Type', value: 'Measles-Rubella (MR)', icon: <FaSyringe color="#2563eb" /> },
      { label: 'Target Group', value: 'Children 9mo–15 yrs', icon: <FaUsers color="#27ae60" /> },
      { label: 'Campaign Window', value: '1–15 Sept 2025', icon: <FaCalendarAlt color="#fbbf24" /> },
      { label: 'Total Target Population', value: '1,80,000 eligible children', icon: <FaUsers color="#2563eb" /> },
      { label: 'Doses Administered', value: '1,71,000 doses (95%)', icon: <FaSyringe color="#27ae60" /> },
      { label: 'Booster Coverage', value: 'Booster: 82%', icon: <FaChartLine color="#ef4444" /> },
      { label: 'Daily Progress Tracker', value: '7,500 doses/day (avg.)', icon: <FaChartLine color="#2563eb" /> },
      { label: 'AEFI', value: '7 minor AEFIs, 0 serious', icon: <FaThermometerHalf color="#fbbf24" /> },
      { label: 'Mobile Camp Coverage', value: '60 camps across 8 districts', icon: <FaTruck color="#27ae60" /> },
      { label: 'Supply Stock', value: 'MR: 9,000 doses in stock', icon: <FaBoxes color="#2563eb" /> },
    ],
    'Hepatitis B': [
      { label: 'Vaccine Type', value: 'Hepatitis B', icon: <FaSyringe color="#2563eb" /> },
      { label: 'Target Group', value: 'Newborns', icon: <FaUsers color="#27ae60" /> },
      { label: 'Campaign Window', value: 'Ongoing', icon: <FaCalendarAlt color="#fbbf24" /> },
      { label: 'Total Target Population', value: '75,000 eligible newborns', icon: <FaUsers color="#2563eb" /> },
      { label: 'Doses Administered', value: '63,000 doses (84%)', icon: <FaSyringe color="#27ae60" /> },
      { label: 'Booster Coverage', value: 'Booster: 70%', icon: <FaChartLine color="#ef4444" /> },
      { label: 'Daily Progress Tracker', value: '1,200 doses/day (avg.)', icon: <FaChartLine color="#2563eb" /> },
      { label: 'AEFI', value: '2 minor AEFIs, 0 serious', icon: <FaThermometerHalf color="#fbbf24" /> },
      { label: 'Mobile Camp Coverage', value: '15 camps across 3 districts', icon: <FaTruck color="#27ae60" /> },
      { label: 'Supply Stock', value: 'HepB: 2,000 doses in stock', icon: <FaBoxes color="#2563eb" /> },
    ],
  };

  const [showPendingPopup, setShowPendingPopup] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    }
    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (teamDropdownRef.current && !teamDropdownRef.current.contains(e.target)) {
        setShowTeamDropdown(false);
        setSelectedTeamMember(null);
      }
    }
    if (showTeamDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTeamDropdown]);

  // Filter projects by sidebar section
  const filteredProjects = activeSidebar === 0
    ? projects
    : projects.filter(p => p.type === sidebarItems[activeSidebar].label);

  // Compute dynamic pending approvals for current section
  const dynamicPendingApprovals = filteredProjects.filter(p => p.percent < 100).length;
  // Update dashboardStats to use dynamic value
  const dashboardStats = {
    initiatives: filteredProjects.length,
    completed: 5,
    pending: dynamicPendingApprovals,
    critical: tasksPie.find(t => t.name === 'Critical')?.value || 0,
  };

  // Add new project
  const handleAddProject = e => {
    e.preventDefault();
    if (!newProject.name) return;
    setProjects([...projects, { ...newProject, percent: Number(newProject.percent) }]);
    setShowModal(false);
    setNewProject({ name: '', percent: 0, type: 'Hospitals' });
  };

  // Card detail content
  function getCardDetail(cardIdx) {
    switch (cardIdx) {
      case 0:
        return (
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Active Health Initiatives</h3>
            <ul style={{ paddingLeft: 18, color: '#333', fontSize: 16 }}>
              {filteredProjects.map(p => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Completed Programs</h3>
            <ul style={{ paddingLeft: 18, color: '#333', fontSize: 16 }}>
              {filteredProjects.filter(p => p.percent === 100).length === 0 ? <div> <li>Polio Immunization Drive - Completed on 30 Mar 2025.</li> <li>COVID-19 Booster Campaign - Completed on 15 Jan 2025.</li> <li>School Eye Screening Project - Completed on 25 Feb 2025.</li> <li>TB Detection Outreach Camp - Completed on 20 Dec 2024.</li> <li>Anemia Mukt Bharat Phase 1 - Completed on 10 Nov 2024.</li> </div> :
                filteredProjects.filter(p => p.percent === 100).map(p => (
                  <li key={p.name}><b>{p.name}</b> ({p.type})</li>
                ))}
            </ul>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Pending Approvals</h3>
            <ul style={{ paddingLeft: 18, color: '#333', fontSize: 16 }}>
              {dynamicPendingApprovals === 0 ? <li>No pending approvals.</li> :
                filteredProjects.filter(p => p.percent < 100).map(p => (
                  <li key={p.name}><b>{p.name}</b></li>
                ))}
            </ul>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 style={{ fontWeight: 800, fontSize: 24, marginBottom: 12 }}>Critical Issues</h3>
            <ul style={{ paddingLeft: 18, color: '#333', fontSize: 16 }}>
              {tasksPie.find(t => t.name === 'Critical')?.value === 0 ? <li>No critical issues.</li> :
                <li>Daga Memorial Hospital, Nagpur Budget Sanction File: 4 Days Delay</li>}
            </ul>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', background: '#f6f8fa', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: SIDEBAR_DARK, color: TEXT_WHITE, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 0 24px 0', boxShadow: `2px 0 12px 0 rgba(0,0,0,0.08)`, zIndex: 20, height: '100vh', minHeight: '100vh' }}>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 90, borderBottom: `1.5px solid ${CARD_BORDER}`, marginBottom: 8, background: BG_DARK }}>
          <img src={logo} alt="Maharashtra Emblem" style={{ height: 70, width: 120, objectFit: 'contain', marginRight: 10, cursor: 'pointer' }} onClick={() => navigate('/')} />
        </div>
        <button style={{ margin: '18px 0 16px 0', width: '80%', background: ACCENT_BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, padding: '12px 0', boxShadow: '0 2px 8px #2563eb22', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Create New</button>
        <nav style={{ width: '100%' }}>
          {sidebarItems.map((item, idx) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', fontWeight: 600, fontSize: 16, color: idx === activeSidebar ? ACCENT_BLUE : TEXT_LIGHT, background: idx === activeSidebar ? '#232526' : 'none', borderLeft: idx === activeSidebar ? `4px solid ${ACCENT_BLUE}` : '4px solid transparent', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => setActiveSidebar(idx)}>
              <span style={{ fontSize: 20, marginRight: 16 }}>{item.icon}</span> {item.label}
            </div>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
        {/* ERP Navbar */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: BG_DARK,
          borderBottom: `1.5px solid #232526`,
          padding: '0 2vw',
          height: 90,
          boxSizing: 'border-box',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          position: 'relative',
          zIndex: 10,
          minWidth: 0
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: 1, color: TEXT_WHITE, lineHeight: 1, marginBottom: 6 }}>
              MAHA AROGYA PULSE
            </div>
            <div style={{ fontWeight: 500, fontSize: '1.1rem', color: TEXT_LIGHT, letterSpacing: 0.2 }}>
              
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', position: 'relative' }}>
            {/* Team Avatar Group Button */}
            <div style={{ position: 'relative', marginRight: 24 }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                  outline: 'none',
                  position: 'relative',
                  marginRight: 18,
                }}
                title="Team Workload"
                aria-label="Team Workload"
                onClick={() => setShowTeamDropdown(s => !s)}
              >
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: 44 }}>
                  {team.slice(0, 4).map((member, idx) => (
                    <img
                      key={member.name}
                      src={member.avatar}
                      alt={member.name}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        border: '2.5px solid #fff',
                        objectFit: 'cover',
                        position: 'absolute',
                        left: idx * 22,
                        zIndex: 10 - idx,
                        boxShadow: '0 2px 8px #0002',
                        background: '#eee',
                        transition: 'box-shadow 0.18s',
                      }}
                    />
                  ))}
                  <span style={{ marginLeft: team.length * 22 + 8, fontWeight: 700, color: '#fff', fontSize: 18 }}></span>
                </div>
              </button>
              {/* Team Dropdown */}
              {showTeamDropdown && (
                <div ref={teamDropdownRef} style={{
                  position: 'absolute',
                  top: 44,
                  left: 0,
                  minWidth: 260,
                  background: '#fff',
                  color: '#181A1B',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: 12,
                  boxShadow: '0 8px 32px 0 rgba(37,99,235,0.18), 0 2px 12px 0 rgba(0,0,0,0.10)',
                  zIndex: 100,
                  padding: 0,
                  marginTop: 6,
                  overflow: 'hidden',
                  animation: 'fadeInPop .25s cubic-bezier(.4,0,.2,1)'
                }}>
                  <div style={{ fontWeight: 700, fontSize: 16, padding: '14px 18px 10px 18px', borderBottom: '1.5px solid #e5e7eb', background: '#f6f8fa' }}>Staff Directory</div>
                  {team.map((member, idx) => (
                    <div
                      key={member.name}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', cursor: 'pointer', borderBottom: idx !== team.length - 1 ? '1px solid #f3f4f6' : 'none', transition: 'background 0.18s' }}
                      onClick={() => { setSelectedTeamMember(member); setShowTeamDropdown(false); }}
                    >
                      <img src={member.avatar} alt={member.name} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', background: '#eee', border: '2px solid #e5e7eb' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{member.name}</div>
                        <div style={{ fontSize: 13, color: '#2563eb', fontWeight: 500 }}>{member.role}</div>
                      </div>
                    </div>
                  ))}
                  {/* Individual Member Dropdown */}
                  {selectedTeamMember && (
                    <div style={{ position: 'absolute', top: 44 + team.findIndex(m => m === selectedTeamMember) * 58, left: 260, minWidth: 260, background: '#fff', color: '#181A1B', border: '1.5px solid #e5e7eb', borderRadius: 12, boxShadow: '0 8px 32px 0 rgba(37,99,235,0.18), 0 2px 12px 0 rgba(0,0,0,0.10)', zIndex: 200, padding: 0, marginTop: 0, overflow: 'hidden', animation: 'fadeInPop .25s cubic-bezier(.4,0,.2,1)' }}>
                      <div style={{ fontWeight: 700, fontSize: 16, padding: '14px 18px 10px 18px', borderBottom: '1.5px solid #e5e7eb', background: '#f6f8fa' }}>Contact Details</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 18px 10px 18px' }}>
                        <img src={selectedTeamMember.avatar} alt={selectedTeamMember.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', background: '#eee', border: '2px solid #e5e7eb' }} />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: 16 }}>{selectedTeamMember.name}</div>
                          <div style={{ fontSize: 14, color: '#2563eb', fontWeight: 600 }}>{selectedTeamMember.role}</div>
                        </div>
                      </div>
                      <div style={{ padding: '0 18px 18px 18px', fontSize: 15, color: '#444' }}>
                        <div style={{ marginBottom: 6 }}><b>Email:</b> <span style={{ color: '#2563eb', fontWeight: 600 }}>{selectedTeamMember.email}</span></div>
                        <button style={{ background: ACCENT_BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '8px 22px', marginTop: 8, cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22' }}>Message</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div style={{ position: 'relative', marginRight: 24 }}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: 28,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  outline: 'none',
                  position: 'relative',
                }}
                title="Notifications"
                aria-label="Notifications"
                onClick={() => setShowNotifications(s => !s)}
              >
                <FaBell />
                {notifications.length > 0 && (
                  <span style={{ position: 'absolute', top: 2, right: -6, background: '#ef4444', color: '#fff', borderRadius: '50%', fontSize: 12, width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, border: '2px solid #181A1B' }}>{notifications.length}</span>
                )}
              </button>
              {showNotifications && (
                <div ref={notificationRef} style={{
                  position: 'absolute',
                  top: 38,
                  right: 0,
                  minWidth: 320,
                  background: '#fff',
                  color: '#181A1B',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: 12,
                  boxShadow: '0 8px 32px 0 rgba(37,99,235,0.18), 0 2px 12px 0 rgba(0,0,0,0.10)',
                  zIndex: 100,
                  padding: '0 0 0 0',
                  marginTop: 6,
                  overflow: 'hidden',
                  animation: 'fadeInPop .25s cubic-bezier(.4,0,.2,1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 10px 18px', borderBottom: '1.5px solid #e5e7eb', background: '#f6f8fa' }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>Notifications</span>
                    <button
                      onClick={() => { setNotifications([]); setShowNotifications(false); }}
                      style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 900, fontSize: 20, cursor: 'pointer', marginLeft: 8, padding: 0, lineHeight: 1 }}
                      title="Clear notifications"
                      aria-label="Clear notifications"
                    >×</button>
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '22px 18px', color: '#888', fontWeight: 600, fontSize: 15, textAlign: 'center' }}>No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} style={{ padding: '16px 18px', borderBottom: '1px solid #f3f4f6', fontSize: 15, fontWeight: 500 }}>{n.text}</div>
                    ))
                  )}
                </div>
              )}
            </div>
            <img
              src={minister}
              alt="Minister"
              style={{ height: 70, width: 70, objectFit: 'cover', borderRadius: 16, background: '#ddd', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', cursor: 'pointer' }}
              onClick={() => navigate('/minister-profile-edit')}
              title="Edit Minister Profile"
            />
          </div>
        </div>
        {/* Dashboard Main Area */}
        <div style={{ flex: 1, padding: '32px 32px 0 32px', background: '#f6f8fa', minHeight: 0, overflowY: 'auto', height: 'calc(100vh - 90px)', maxHeight: 'calc(100vh - 90px)' }}>
          {/* Top Cards */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
            {[{
              color: ACCENT_BLUE, label: 'Active Health Initiatives', value: dashboardStats.initiatives
            }, {
              color: ACCENT_GREEN, label: 'Completed Programs', value: dashboardStats.completed
            }, {
              color: ACCENT_YELLOW, label: 'Pending Approvals', value: dashboardStats.pending
            }, {
              color: ACCENT_RED, label: 'Critical Issues', value: dashboardStats.critical
            }].map((card, idx) => (
              <DashboardCard
                key={card.label}
                color={card.color}
                label={card.label}
                value={card.value}
                onClick={() => {
                  if (idx === 2) setShowPendingPopup(true);
                  else setOpenCard(idx);
                }}
                pro
              />
            ))}
          </div>
          {showPendingPopup && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(24,26,27,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowPendingPopup(false)}>
              <div style={{ background: '#fff', borderRadius: 18, padding: 32, minWidth: 340, boxShadow: '0 8px 32px 0 rgba(37,99,235,0.18)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowPendingPopup(false)} style={{ position: 'absolute', top: 14, right: 14, background: '#eee', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, color: '#222', padding: '2px 12px', cursor: 'pointer' }}>×</button>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18 }}>Pending Approvals</div>
                <ul style={{ paddingLeft: 18, color: '#333', fontSize: 16 }}>
                  <li>Tender for Mumbai Central PHC Upgrade</li>
                  <li>Supplement Vaccine Buying for Nagpur</li>
                </ul>
              </div>
            </div>
          )}
          {/* Projects & Tasks Overview */}
          <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
            {activeSidebar === 1 ? (
            <div style={{ flex: 2, background: CARD_BG, borderRadius: 16, boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}`, padding: 24, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>Hospitals Overview</div>
                <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
                  {hospitalTypeCounts.map(ht => (
                    <div key={ht.type} style={{ background: '#f7faff', borderRadius: 12, padding: '18px 22px', minWidth: 120, flex: 1, fontWeight: 700, color: '#222', fontSize: 17, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span>{ht.type}: <span style={{ color: '#2563eb' }}>{ht.count}</span></span>
                    </div>
                  ))}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Hospital Locations</div>
                <HospitalMapLeaflet hospitals={hospitals} />
                <div style={{ fontWeight: 700, fontSize: 17, margin: '18px 0 8px 0' }}>District Wise: Total vs Occupied Beds</div>
                <ResponsiveContainer width="100%" height={220}>
                  <ReBarChart data={totalBedsByDistrict} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" fontSize={13} tick={{ fill: "#4a6fa1" }} />
                    <YAxis fontSize={13} tick={{ fill: "#4a6fa1" }} />
                    <ReTooltip cursor={{ fill: 'rgba(37,99,235,0.08)' }} contentStyle={{ borderRadius: 12, fontWeight: 600, fontSize: 15, boxShadow: '0 2px 12px #2563eb22' }} />
                    <Bar dataKey="General" fill="#2563eb" name="General Beds" activeBar={{ fill: '#1746a2' }} />
                    <Bar dataKey="OccupiedGeneral" fill="#b3d8fd" name="Occupied General" activeBar={{ fill: '#2563eb' }} />
                    <Bar dataKey="ICU" fill="#ef4444" name="ICU Beds" activeBar={{ fill: '#b91c1c' }} />
                    <Bar dataKey="OccupiedICU" fill="#fbbf24" name="Occupied ICU" activeBar={{ fill: '#b45309' }} />
                    <Bar dataKey="Oxygen" fill="#27ae60" name="Oxygen Beds" activeBar={{ fill: '#14532d' }} />
                    <Bar dataKey="OccupiedOxygen" fill="#a7f3d0" name="Occupied Oxygen" activeBar={{ fill: '#059669' }} />
                  </ReBarChart>
                </ResponsiveContainer>
                <div style={{ display: 'flex', gap: 18, marginTop: 10, alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#2563eb', borderRadius: 4, display: 'inline-block', marginRight: 4 }}></span>General</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#b3d8fd', borderRadius: 4, display: 'inline-block', marginRight: 4 }}></span>Occupied General</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#ef4444', borderRadius: 4, display: 'inline-block', marginRight: 4 }}></span>ICU</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#fbbf24', borderRadius: 4, display: 'inline-block', marginRight: 4 }}></span>Occupied ICU</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#27ae60', borderRadius: 4, display: 'inline-block', marginRight: 4 }}></span>Oxygen</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 16, height: 16, background: '#a7f3d0', borderRadius: 4, display: 'inline-block', marginRight: 4 }}></span>Occupied Oxygen</span>
                </div>
                <div style={{ marginTop: 28 }}>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>Key Hospital Operations</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
                    {hospitalOpsStats.map(stat => (
                      <div key={stat.label} style={{ background: '#f7faff', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 1px 6px #2563eb11' }}>
                        <span style={{ fontSize: 22 }}>{stat.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{stat.label}</div>
                          <div style={{ color: '#4a6fa1', fontWeight: 500, fontSize: 14 }}>{stat.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
            <div style={{ flex: 2, background: CARD_BG, borderRadius: 16, boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}`, padding: 24, minWidth: 0 }}>
                {sidebarItems[activeSidebar].label !== 'Vaccination' && (
                  <>
                    <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>Project Overview</div>
              <div style={{ display: 'flex', gap: 24 }}>
                <div style={{ flex: 1 }}>
                  {filteredProjects.slice(0, 2).map(p => (
                    <div key={p.name} style={{ marginBottom: 18 }}>
                      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ background: '#e5e7eb', borderRadius: 8, height: 8, width: '100%', marginBottom: 2 }}>
                        <div style={{ width: `${p.percent}%`, background: ACCENT_GREEN, height: 8, borderRadius: 8, transition: 'width 0.4s' }} />
                      </div>
                      <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{p.percent}% completed</div>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  {filteredProjects.slice(2).map(p => (
                    <div key={p.name} style={{ marginBottom: 18 }}>
                      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{p.name}</div>
                      <div style={{ background: '#e5e7eb', borderRadius: 8, height: 8, width: '100%', marginBottom: 2 }}>
                        <div style={{ width: `${p.percent}%`, background: ACCENT_GREEN, height: 8, borderRadius: 8, transition: 'width 0.4s' }} />
                      </div>
                      <div style={{ fontSize: 13, color: '#888', fontWeight: 500 }}>{p.percent}% completed</div>
                    </div>
                  ))}
                </div>
              </div>
                  </>
                )}
                {/* Vaccination Campaign Overview inside Projects Overview card */}
                {sidebarItems[activeSidebar].label === 'Vaccination' && (
                  <div style={{ marginTop: 28 }}>
                    <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
                      Vaccination Campaign Overview
                      <select value={selectedVaccine} onChange={e => setSelectedVaccine(e.target.value)} style={{ marginLeft: 12, padding: '4px 10px', borderRadius: 8, border: '1.5px solid #2563eb', fontSize: 15, fontWeight: 600, color: '#2563eb', background: '#f7faff' }}>
                        {Object.keys(vaccineStatsData).map(vac => <option key={vac} value={vac}>{vac}</option>)}
                      </select>
            </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
                      {vaccineStatsData[selectedVaccine].map(stat => (
                        <div key={stat.label} style={{ background: '#f7faff', borderRadius: 12, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, fontWeight: 600, color: '#222', fontSize: 15, boxShadow: '0 1px 6px #2563eb11' }}>
                          <span style={{ fontSize: 22 }}>{stat.icon}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 15 }}>{stat.label}</div>
                            <div style={{ color: '#4a6fa1', fontWeight: 500, fontSize: 14 }}>{stat.value}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            )}
            {/* My Tasks Overview and Notiboard */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
              <div style={{ background: CARD_BG, borderRadius: 16, boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}`, padding: 24, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18 }}>My Tasks Overview</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, fontWeight: 500, color: '#444', width: '100%' }}>
                  <li style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, background: '#222', borderRadius: 3, display: 'inline-block', marginRight: 8 }}></span>Total Tasks Assigned <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{tasksPie.reduce((a, b) => a + b.value, 0) - tasksPie.find(t => t.name === 'Pending Approvals').value + dynamicPendingApprovals}</span></li>
                {tasksPie.map(t => (
                    t.name === 'Pending Approvals' ?
                      <li key={t.name} style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, background: t.color, borderRadius: 3, display: 'inline-block', marginRight: 8 }}></span>{t.name} <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{dynamicPendingApprovals}</span></li>
                    :
                  <li key={t.name} style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, background: t.color, borderRadius: 3, display: 'inline-block', marginRight: 8 }}></span>{t.name} <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{t.value}</span></li>
                ))}
              </ul>
              {/* Pie Chart */}
              <div style={{ width: 110, height: 110, margin: '18px auto 0 auto' }}>
                  <DonutChart data={tasksPie} />
              </div>
              </div>
              {(activeSidebar === 1 || activeSidebar === 2) && (
                <div style={{ background: CARD_BG, borderRadius: 16, boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}`, padding: 24, minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12, color: '#2563eb' }}>
                    Noticeboard
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, color: '#222', width: '100%' }}>
                    {(activeSidebar === 1 ? [...hospitalNoticeboard] : [...vaccinationNoticeboard])
                      .sort((a, b) => (b.isNew === true) - (a.isNew === true))
                      .map(n => (
                        <li key={n.id} style={{ marginBottom: 10, padding: '10px 0', borderBottom: '1px solid #e5e7eb', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ color: '#2563eb', fontWeight: 700, marginRight: 8 }}>•</span>
                          <span>{n.text}</span>
                          {n.isNew && (
                            <span style={{
                              marginLeft: 10,
                              background: '#fbbf24',
                              color: '#fff',
                              fontWeight: 900,
                              fontSize: 12,
                              borderRadius: 8,
                              padding: '2px 10px',
                              boxShadow: '0 1px 6px #fbbf2444',
                              animation: 'floatNew 1.2s infinite alternate',
                              letterSpacing: 1,
                            }}>NEW</span>
                          )}
                        </li>
                      ))}
                  </ul>
                  <style>{`
                  @keyframes floatNew {
                    0% { transform: translateY(0) scale(1); box-shadow: 0 1px 6px #fbbf2444; }
                    60% { transform: translateY(-4px) scale(1.08); box-shadow: 0 4px 16px #fbbf2444; }
                    100% { transform: translateY(0) scale(1); box-shadow: 0 1px 6px #fbbf2444; }
                  }
                  `}</style>
                </div>
              )}
            </div>
          </div>
          {/* Team Workload & Progress Chart */}
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Team Workload */}
            <div style={{ flex: 1.5, background: CARD_BG, borderRadius: 16, boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}`, padding: 24, minWidth: 0, position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <span style={{ fontWeight: 700, fontSize: 20 }}>Team Workload</span>
                <button
                  style={{
                    width: 40,
                    height: 40,
                    aspectRatio: 1,
                    borderRadius: '10%',
                    background: ACCENT_BLUE,
                    color: '#fff',
                    border: 'none',
                    fontSize: 28,
                    fontWeight: 900,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px #2563eb22',
                    cursor: 'pointer',
                    transition: 'background 0.18s, transform 0.18s',
                  }}
                  title="Add or Assign Work"
                  onClick={() => setShowWorkloadModal(true)}
                  onMouseOver={e => { e.currentTarget.style.background = '#1746a2'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = ACCENT_BLUE; e.currentTarget.style.transform = 'none'; }}
                >+</button>
              </div>
              {team.map((member, idx) => (
                <div key={member.name + idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 18, gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e5e7eb', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: '#333' }}>
                    {member.avatar ? <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>{member.name}</div>
                    <div style={{ display: 'flex', gap: 12, fontSize: 14, color: '#666', fontWeight: 500, marginTop: 2 }}>
                      <span style={{ color: ACCENT_BLUE, background: '#e0e7ff', borderRadius: 6, padding: '2px 10px', fontWeight: 700 }}>To-Do {member.todo}</span>
                      <span style={{ color: ACCENT_YELLOW, background: '#fef9c3', borderRadius: 6, padding: '2px 10px', fontWeight: 700 }}>In Progress {member.progress}</span>
                      <span style={{ color: ACCENT_GREEN, background: '#d1fae5', borderRadius: 6, padding: '2px 10px', fontWeight: 700 }}>Completed {member.completed}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#444', marginTop: 4 }}>{member.role}</div>
                    {member.tasks && member.tasks.length > 0 && (
                      <ul style={{ margin: '6px 0 0 0', padding: '0 0 0 18px', fontSize: 13, color: '#183153' }}>
                        {member.tasks.map((task, i) => <li key={i} style={{ fontWeight: 700 }}>{task}</li>)}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Progress Chart */}
            <div ref={progressChartRef} style={{ flex: 2, background: CARD_BG, borderRadius: 16, boxShadow: CARD_SHADOW, border: `1px solid ${CARD_BORDER}`, padding: 24, minWidth: 0, display: 'flex', flexDirection: 'column', height: 400 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 20 }}>Progress Chart</div>
                <div style={{ fontSize: 14, color: '#888', fontWeight: 500 }}>Last 7 days</div>
              </div>
              <div style={{ flex: 1, width: '100%', height: '100%' }}>
                <BarChart data={progressBarData} width={progressChartWidth} />
              </div>
              {/* Progress Chart Legend */}
              <div style={{ display: 'flex', gap: 24, marginTop: 18, alignItems: 'center', flexWrap: 'wrap' }}>
                <LegendItem color={ACCENT_GREEN} label="Completed" />
                <LegendItem color={ACCENT_BLUE} label="In Progress" />
                <LegendItem color={ACCENT_YELLOW} label="Pending" />
                <LegendItem color={ACCENT_RED} label="Critical" />
                <button
                  style={{ marginLeft: 'auto', background: ACCENT_BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, padding: '6px 18px', cursor: 'pointer', boxShadow: '0 2px 8px 0 #2563eb22' }}
                  onClick={() => {
                    // Simulate dynamic update: add a new day with random values
                    const lastDate = progressBarData[progressBarData.length - 1].date;
                    const nextDate = (() => {
                      const d = new Date(Date.parse('2024 ' + lastDate));
                      d.setDate(d.getDate() + 1);
                      return d.toLocaleString('en-US', { month: 'short', day: 'numeric' });
                    })();
                    setProgressBarData([
                      ...progressBarData.slice(1),
                      {
                        date: nextDate,
                        pending: Math.floor(Math.random() * 3),
                        progress: Math.floor(Math.random() * 4),
                        completed: Math.floor(Math.random() * 8) + 1,
                        critical: Math.floor(Math.random() * 2),
                      },
                    ]);
                  }}
                >Simulate Update</button>
            </div>
          </div>
          </div>
        </div>
        {/* Card Detail Modal */}
        {openCard !== null && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(24,26,27,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }} onClick={() => setOpenCard(null)}>
            <div
              style={{
                background: 'rgba(255,255,255,0.96)',
                border: '2.5px solid #2563eb',
                boxShadow: '0 12px 48px 0 rgba(37,99,235,0.18), 0 4px 24px 0 rgba(0,0,0,0.18)',
                borderRadius: 24,
                padding: '44px 40px 36px 40px',
                minWidth: 360,
                maxWidth: 480,
                color: '#181A1B',
                position: 'relative',
                animation: 'fadeInPop .4s cubic-bezier(.4,0,.2,1)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setOpenCard(null)} style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(32,33,36,0.12)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, color: '#222', padding: '2px 12px', cursor: 'pointer', transition: 'background 0.2s' }}>×</button>
              {getCardDetail(openCard)}
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
      {/* Create New Project Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleAddProject} style={{ background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)' }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#222' }}>Add New Project/Initiative</div>
            <div className="mb-3">
              <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Name</label>
              <input type="text" value={newProject.name} onChange={e => setNewProject({ ...newProject, name: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 12 }} required />
            </div>
            <div className="mb-3">
              <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Progress (%)</label>
              <input type="number" min={0} max={100} value={newProject.percent} onChange={e => setNewProject({ ...newProject, percent: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 12 }} required />
            </div>
            <div className="mb-3">
              <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Type</label>
              <select value={newProject.type} onChange={e => setNewProject({ ...newProject, type: e.target.value })} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 18 }}>
                {sidebarItems.slice(1, 5).map(item => (
                  <option key={item.label} value={item.label}>{item.label}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button type="submit" style={{ background: ACCENT_BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, padding: '10px 24px', cursor: 'pointer' }}>Add</button>
              <button type="button" style={{ background: '#eee', color: '#333', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, padding: '10px 24px', cursor: 'pointer' }} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {selectedTeamMember && (
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
          onClick={() => setSelectedTeamMember(null)}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.98)',
              border: '2.5px solid #2563eb',
              boxShadow: '0 12px 48px 0 rgba(37,99,235,0.18), 0 4px 24px 0 rgba(0,0,0,0.18)',
              borderRadius: 28,
              padding: '44px 40px 36px 40px',
              minWidth: 340,
              maxWidth: 420,
              color: '#181A1B',
              position: 'relative',
              animation: 'fadeInPop .4s cubic-bezier(.4,0,.2,1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelectedTeamMember(null)} style={{ position: 'absolute', top: 18, right: 18, background: 'rgba(32,33,36,0.12)', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, color: '#222', padding: '2px 12px', cursor: 'pointer', transition: 'background 0.2s' }}>×</button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginBottom: 18, width: '100%' }}>
              <div style={{
                width: 74,
                height: 74,
                borderRadius: '50%',
                background: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px #2563eb11',
                border: `3.5px solid ${['#2563eb','#22c55e','#fbbf24','#ef4444'][team.findIndex(m => m.name === selectedTeamMember.name) % 4]}`
              }}>
                <img src={selectedTeamMember.avatar} alt={selectedTeamMember.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', background: '#eee', border: '2px solid #e5e7eb' }} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 20, marginTop: 6, textAlign: 'center' }}>{selectedTeamMember.name}</div>
              <div style={{ fontSize: 15, color: '#2563eb', fontWeight: 600, textAlign: 'center' }}>{selectedTeamMember.role}</div>
            </div>
            <div style={{ fontSize: 15, color: '#444', marginBottom: 8, width: '100%', textAlign: 'center' }}><b>Email:</b> <span style={{ color: '#2563eb', fontWeight: 600 }}>{selectedTeamMember.email}</span></div>
            <div style={{ fontSize: 15, color: '#444', marginBottom: 18, width: '100%', textAlign: 'center' }}><b>Phone:</b> <span style={{ color: '#2563eb', fontWeight: 600 }}>{selectedTeamMember.phone}</span></div>
            <div style={{ display: 'flex', gap: 14, marginTop: 10, width: '100%', justifyContent: 'center' }}>
              <button style={{ background: ACCENT_BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '8px 22px', cursor: 'pointer', boxShadow: '0 2px 8px #2563eb22', transition: 'background 0.18s' }}
                onMouseOver={e => e.currentTarget.style.background = '#1746a2'}
                onMouseOut={e => e.currentTarget.style.background = ACCENT_BLUE}
              >Message</button>
              <button style={{ background: ACCENT_GREEN, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '8px 22px', cursor: 'pointer', boxShadow: '0 2px 8px #22c55e22', transition: 'background 0.18s' }}
                onMouseOver={e => e.currentTarget.style.background = '#15803d'}
                onMouseOut={e => e.currentTarget.style.background = ACCENT_GREEN}
              >Assign Work</button>
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
      {/* Workload Modal */}
      {showWorkloadModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(24,26,27,0.55)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowWorkloadModal(false)}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 32, minWidth: 340, boxShadow: '0 8px 32px 0 rgba(37,99,235,0.18)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowWorkloadModal(false)} style={{ position: 'absolute', top: 14, right: 14, background: '#eee', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, color: '#222', padding: '2px 12px', cursor: 'pointer' }}>×</button>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 18 }}>Add or Assign Work</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
              <button style={{ flex: 1, background: workloadMode === 'assign' ? ACCENT_BLUE : '#eee', color: workloadMode === 'assign' ? '#fff' : '#333', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '8px 0', cursor: 'pointer' }} onClick={() => setWorkloadMode('assign')}>Assign Work</button>
              <button style={{ flex: 1, background: workloadMode === 'add' ? ACCENT_GREEN : '#eee', color: workloadMode === 'add' ? '#fff' : '#333', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, padding: '8px 0', cursor: 'pointer' }} onClick={() => setWorkloadMode('add')}>Add Member</button>
            </div>
            {workloadMode === 'assign' ? (
              <form onSubmit={e => {
                e.preventDefault();
                if (!selectedWorkMember || !newTask) return;
                setTeam(team => team.map(m => m.name === selectedWorkMember ? { ...m, progress: m.progress + 1, tasks: [...(m.tasks || []), newTask] } : m));
                setShowWorkloadModal(false);
                setSelectedWorkMember('');
                setNewTask('');
              }}>
                <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Select Member</label>
                <select value={selectedWorkMember} onChange={e => setSelectedWorkMember(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 12 }} required>
                  <option value="">-- Select --</option>
                  {team.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                </select>
                <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Task/Work</label>
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 18 }} required />
                <button type="submit" style={{ background: ACCENT_BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, padding: '10px 24px', cursor: 'pointer', width: '100%' }}>Assign</button>
              </form>
            ) : (
              <form onSubmit={e => {
                e.preventDefault();
                if (!newMember.name || !newMember.role || !newMember.email) return;
                setTeam(team => [...team, { ...newMember, todo: 1, progress: 0, completed: 0, avatar: '', phone: newMember.phone || '' }]);
                setShowWorkloadModal(false);
                setNewMember({ name: '', role: '', email: '', phone: '' });
              }}>
                <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Name</label>
                <input type="text" value={newMember.name} onChange={e => setNewMember(n => ({ ...n, name: e.target.value }))} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 12 }} required />
                <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Role</label>
                <input type="text" value={newMember.role} onChange={e => setNewMember(n => ({ ...n, role: e.target.value }))} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 12 }} required />
                <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Email</label>
                <input type="email" value={newMember.email} onChange={e => setNewMember(n => ({ ...n, email: e.target.value }))} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 12 }} required />
                <label style={{ fontWeight: 600, color: '#333', marginBottom: 4, display: 'block' }}>Phone (optional)</label>
                <input type="text" value={newMember.phone} onChange={e => setNewMember(n => ({ ...n, phone: e.target.value }))} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16, marginBottom: 18 }} />
                <button type="submit" style={{ background: ACCENT_GREEN, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, padding: '10px 24px', cursor: 'pointer', width: '100%' }}>Add Member</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardCard({ color, label, value, onClick, pro }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        background: '#fff',
        borderRadius: 16,
        boxShadow: pro ? '0 6px 32px 0 rgba(37,99,235,0.08), 0 2px 12px 0 rgba(0,0,0,0.06)' : CARD_SHADOW,
        border: `1.5px solid ${CARD_BORDER}`,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 0,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.25s, transform 0.18s',
        position: 'relative',
        overflow: 'hidden',
        outline: 'none',
      }}
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick && onClick()}
      onMouseOver={e => {
        if (pro) e.currentTarget.style.boxShadow = `0 12px 36px 0 ${color}22, 0 4px 18px 0 rgba(0,0,0,0.10)`;
        if (pro) e.currentTarget.style.transform = 'translateY(-2px) scale(1.025)';
      }}
      onMouseOut={e => {
        if (pro) e.currentTarget.style.boxShadow = '0 6px 32px 0 rgba(37,99,235,0.08), 0 2px 12px 0 rgba(0,0,0,0.06)';
        if (pro) e.currentTarget.style.transform = 'none';
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 22, color }}>{value}</div>
      <div style={{ fontWeight: 600, fontSize: 16, color: '#222', marginTop: 8 }}>{label}</div>
      {pro && <div style={{ position: 'absolute', right: 18, top: 18, width: 10, height: 10, borderRadius: '50%', background: color, opacity: 0.18 }} />}
    </div>
  );
}

function PieChart({ data }) {
  // Simple SVG pie chart
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let acc = 0;
  const radius = 50, cx = 55, cy = 55;
  return (
    <svg width={110} height={110} viewBox="0 0 110 110">
      {data.map((d, i) => {
        const start = acc / total * 2 * Math.PI;
        acc += d.value;
        const end = acc / total * 2 * Math.PI;
        const x1 = cx + radius * Math.sin(start);
        const y1 = cy - radius * Math.cos(start);
        const x2 = cx + radius * Math.sin(end);
        const y2 = cy - radius * Math.cos(end);
        const large = d.value / total > 0.5 ? 1 : 0;
        return (
          <path key={d.name} d={`M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${large} 1 ${x2},${y2} Z`} fill={d.color} stroke="#fff" strokeWidth={1.5} />
        );
      })}
    </svg>
  );
}

function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(420);
  useEffect(() => {
    function handleResize() {
      if (ref.current) setWidth(ref.current.offsetWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return [ref, width];
}

function BarChart({ data, width }) {
  // Responsive SVG bar chart that always fits its parent
  const max = Math.max(...data.map(d => d.pending + d.progress + d.completed + d.critical));
  const svgWidth = Math.max(width || 420, 320); // fallback min width
  const svgHeight = 340;
  const n = data.length;
  const gap = 18;
  // Calculate bar width so all bars + gaps fit in svgWidth
  const barW = (svgWidth - gap * (n + 1)) / n;
  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} width="100%" height="100%" style={{ display: 'block' }}>
      {data.map((d, i) => {
        let y = svgHeight - 40;
        const hCompleted = (d.completed / max) * (svgHeight - 80);
        const hProgress = (d.progress / max) * (svgHeight - 80);
        const hTodo = (d.pending / max) * (svgHeight - 80);
        const hCritical = (d.critical / max) * (svgHeight - 80);
        const x = gap + i * (barW + gap);
        return (
          <g key={d.date}>
            {/* Completed */}
            <rect x={x} y={y - hCompleted} width={barW} height={hCompleted} fill={ACCENT_GREEN} />
            {/* In Progress */}
            <rect x={x} y={y - hCompleted - hProgress} width={barW} height={hProgress} fill={ACCENT_BLUE} />
            {/* Pending */}
            <rect x={x} y={y - hCompleted - hProgress - hTodo} width={barW} height={hTodo} fill={ACCENT_YELLOW} />
            {/* Critical */}
            <rect x={x} y={y - hCompleted - hProgress - hTodo - hCritical} width={barW} height={hCritical} fill={ACCENT_RED} />
            {/* Date label */}
            <text x={x + barW / 2} y={svgHeight - 16} textAnchor="middle" fontSize={15} fill="#888">{d.date}</text>
          </g>
        );
      })}
    </svg>
  );
}

function get7DayPieData(data) {
  const total = { Pending: 0, 'In Progress': 0, Completed: 0, Critical: 0 };
  data.forEach(d => {
    total['Pending'] += d.pending;
    total['In Progress'] += d.progress;
    total['Completed'] += d.completed;
    total['Critical'] += d.critical;
  });
  return [
    { name: 'Pending', value: total['Pending'], color: ACCENT_YELLOW },
    { name: 'In Progress', value: total['In Progress'], color: ACCENT_BLUE },
    { name: 'Completed', value: total['Completed'], color: ACCENT_GREEN },
    { name: 'Critical', value: total['Critical'], color: ACCENT_RED },
  ];
}

function DonutCard({ data }) {
  const percent = Math.round((data.value / data.total) * 100);
  const donutChartData = [
    { value: data.value, color: data.color },
    { value: data.total - data.value, color: '#e5e7eb' },
  ];
  return (
    <div style={{ background: '#fff', borderRadius: 18, boxShadow: CARD_SHADOW, border: `1.5px solid ${CARD_BORDER}`, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 10 }}>{data.title}</div>
      <div style={{ position: 'relative', width: 110, height: 110, marginBottom: 10 }}>
        <DonutChart data={donutChartData} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, color: data.color }}>{percent}%</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4, width: '100%' }}>
        {data.legend.map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', fontSize: 14, color: '#444', fontWeight: 500 }}>
            <span style={{ width: 14, height: 14, background: l.color, borderRadius: 3, display: 'inline-block', marginRight: 8 }}></span>
            {l.label}: <span style={{ fontWeight: 700, marginLeft: 4 }}>{l.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let acc = 0;
  const radius = 50, cx = 55, cy = 55, thickness = 18;
  return (
    <svg width={110} height={110} viewBox="0 0 110 110">
      {data.map((d, i) => {
        const start = acc / total * 2 * Math.PI;
        acc += d.value;
        const end = acc / total * 2 * Math.PI;
        const x1 = cx + radius * Math.sin(start);
        const y1 = cy - radius * Math.cos(start);
        const x2 = cx + radius * Math.sin(end);
        const y2 = cy - radius * Math.cos(end);
        const large = d.value / total > 0.5 ? 1 : 0;
        return (
          <path key={i} d={`M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${large} 1 ${x2},${y2} Z`} fill={d.color} stroke="#fff" strokeWidth={1.5} />
        );
      })}
      <circle cx={cx} cy={cy} r={radius - thickness} fill="#fff" />
    </svg>
  );
}

function HospitalMapLeaflet({ hospitals }) {
  // Custom marker icon for better visibility
  const hospitalIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  return (
    <MapContainer center={{ lat: 19.7515, lng: 75.7139 }} zoom={6.2} style={{ width: '100%', height: 320, borderRadius: 12 }} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hospitals.map((h, i) => (
        <LeafletMarker key={h.name + i} position={[h.lat, h.lng]} icon={hospitalIcon}>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 16 }}>{h.name}</div>
              <div style={{ color: '#444', fontSize: 15 }}>{h.city}</div>
              <div style={{ color: '#666', fontSize: 14 }}>{h.beds} beds</div>
              <div style={{ color: h.type === 'Private Hospitals' ? '#27ae60' : h.type === 'PHCs' ? '#fbbf24' : h.type === 'CHCs' ? '#ef4444' : '#2563eb', fontWeight: 600, fontSize: 14 }}>
                {h.type === 'Private' ? 'Private Hospitals' : h.type}
              </div>
            </div>
          </Popup>
        </LeafletMarker>
      ))}
    </MapContainer>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: '#333', fontWeight: 500 }}>
      <span style={{ width: 18, height: 18, background: color, borderRadius: 4, display: 'inline-block', marginRight: 6, border: '1.5px solid #e5e7eb' }}></span>
      {label}
    </div>
  );
}
