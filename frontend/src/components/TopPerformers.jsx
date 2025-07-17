import React, { useEffect, useState } from 'react';
import { FaMedal, FaInfoCircle } from 'react-icons/fa';

const rankColors = [
  '#FFD700', // Gold
  '#C0C0C0', // Silver
  '#CD7F32', // Bronze
];

const cardStyles = {
  background: 'rgba(255,255,255,0.7)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  borderRadius: '1.2rem',
  padding: '1.2rem 1.6rem',
  minWidth: 160,
  minHeight: 120,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  margin: '0.5rem',
  transition: 'transform 0.2s',
};

const badgeStyles = (rank) => ({
  position: 'absolute',
  top: 12,
  left: 12,
  background: rankColors[rank],
  color: '#fff',
  borderRadius: '50%',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 18,
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  border: '2px solid #fff',
  zIndex: 2,
});

const infoTooltipStyles = {
  position: 'absolute',
  top: 36,
  left: 0,
  background: 'rgba(44,62,80,0.97)',
  color: '#fff',
  padding: '0.7rem 1rem',
  borderRadius: '0.7rem',
  fontSize: '0.98rem',
  width: 260,
  boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
  zIndex: 10,
};

const TopPerformers = ({ performers }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [animatedScores, setAnimatedScores] = useState(performers.map(() => 0));

  useEffect(() => {
    // Animate the scores up to their value
    const intervals = performers.map((p, i) => {
      return setInterval(() => {
        setAnimatedScores((prev) => {
          const next = [...prev];
          if (next[i] < p.score) {
            next[i] = Math.min(p.score, +(next[i] + 0.07).toFixed(2));
          }
          return next;
        });
      }, 30);
    });
    return () => intervals.forEach(clearInterval);
  }, [performers]);

  return (
    <div style={{
      width: '100%',
      maxWidth: 700,
      margin: '0 auto 1.5rem auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10, gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: '1.25rem', color: '#2c3e50', letterSpacing: 0.5 }}>Top Performers</span>
        <span style={{ position: 'relative' }}>
          <FaInfoCircle
            style={{ color: '#4a6fa1', cursor: 'pointer', fontSize: 18 }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            tabIndex={0}
            aria-label="Info about Healthcare Quality Index"
          />
          {showTooltip && (
            <div style={infoTooltipStyles}>
              Scores represent the <b>Healthcare Quality Index (0–10)</b>, based on disease control, resource utilization, and campaign participation.
            </div>
          )}
        </span>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        gap: 0,
      }}>
        {performers.map((p, i) => (
          <div
            key={p.name}
            style={{
              ...cardStyles,
              boxShadow: `0 4px 24px ${rankColors[i]}33, 0 2px 8px rgba(0,0,0,0.08)`,
              border: `2.5px solid ${rankColors[i]}`,
              transform: 'scale(1)',
            }}
          >
            <div style={badgeStyles(i)}>
              <FaMedal style={{ marginRight: 3, fontSize: 18 }} />
              {i + 1}
            </div>
            <div style={{ fontWeight: 600, fontSize: '1.13rem', color: '#2c3e50', marginTop: 18 }}>{p.name}</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: rankColors[i], margin: '0.3rem 0 0.2rem 0', letterSpacing: 1 }}>
              {animatedScores[i].toFixed(1)}
            </div>
            <div style={{ fontSize: '0.98rem', color: '#4a6fa1', fontWeight: 500, opacity: 0.85 }}>Healthcare Quality Index</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformers; 