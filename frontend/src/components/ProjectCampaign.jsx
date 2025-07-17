import React from 'react';
const BG_DARK = '#181A1B';
const TEXT_WHITE = '#fff';
const TEXT_LIGHT = '#E5E7EB';
const CARD_DARK = '#232526';
const SHADOW = '0 4px 24px rgba(0,0,0,0.25)';
export default function ProjectCampaign() {
  return (
    <div style={{ background: BG_DARK, color: TEXT_LIGHT, minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 40, fontWeight: 800, color: TEXT_WHITE, textAlign: 'center', letterSpacing: 1, width: '100%' }}>
        Project and Campaign Page (Coming Soon)
      </div>
    </div>
  );
} 