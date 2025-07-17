import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import minister from '../assets/minister.png';

const CARD_BG = '#fff';
const CARD_BORDER = '#e5e7eb';
const CARD_SHADOW = '0 2px 12px 0 rgba(0,0,0,0.06)';
const ACCENT_BLUE = '#2563eb';
const ACCENT_GREEN = '#22c55e';
const BG_DARK = '#181A1B';
const TEXT_DARK = '#181A1B';
const TEXT_LIGHT = '#E5E7EB';

export default function MinisterProfileEdit() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Shri. Prakash Abitkar',
    email: 'minister@maharashtra.gov.in',
    phone: '+91 98765 43210',
    designation: 'Minister, Public Health and Family Welfare',
    photo: minister,
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = ev => setProfile(prev => ({ ...prev, photo: ev.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSave = e => {
    e.preventDefault();
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', background: BG_DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, margin: 0, position: 'fixed', top: 0, left: 0, zIndex: 10000 }}>
      <div style={{ background: CARD_BG, borderRadius: 18, boxShadow: CARD_SHADOW, border: `1.5px solid ${CARD_BORDER}`, padding: '44px 38px 36px 38px', width: 420, maxWidth: '90vw', color: TEXT_DARK, position: 'relative', margin: 0 }}>
        <button onClick={() => navigate('/erp')} style={{ position: 'absolute', left: 18, top: 18, background: ACCENT_BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 16, padding: '6px 18px', cursor: 'pointer', transition: 'background 0.2s' }}>← Back</button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
          <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
            <img src={profile.photo} alt="Minister" style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${ACCENT_BLUE}`, marginBottom: 10, boxShadow: '0 2px 12px #2563eb22' }} />
            <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
          </label>
          <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 2 }}>{profile.name}</div>
          <div style={{ color: '#2563eb', fontWeight: 600, fontSize: 15 }}>{profile.designation}</div>
        </div>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>Name</label>
            <input name="name" value={profile.name} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1.5px solid ${CARD_BORDER}`, fontSize: 16, fontWeight: 500, marginBottom: 2 }} required />
          </div>
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>Email</label>
            <input name="email" type="email" value={profile.email} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1.5px solid ${CARD_BORDER}`, fontSize: 16, fontWeight: 500, marginBottom: 2 }} required />
          </div>
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>Phone</label>
            <input name="phone" value={profile.phone} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1.5px solid ${CARD_BORDER}`, fontSize: 16, fontWeight: 500, marginBottom: 2 }} required />
          </div>
          <div>
            <label style={{ fontWeight: 600, fontSize: 15, marginBottom: 4, display: 'block' }}>Designation</label>
            <input name="designation" value={profile.designation} onChange={handleChange} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: `1.5px solid ${CARD_BORDER}`, fontSize: 16, fontWeight: 500, marginBottom: 2 }} required />
          </div>
          <button type="submit" style={{ background: ACCENT_GREEN, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 17, padding: '12px 0', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s' }}>Save Changes</button>
          {success && <div style={{ color: ACCENT_GREEN, fontWeight: 700, fontSize: 15, marginTop: 8, textAlign: 'center' }}>{success}</div>}
        </form>
      </div>
    </div>
  );
} 