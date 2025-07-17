import React from 'react';
import Particles from '@tsparticles/react';

export default function ThreeWaveBackground({ className = '', style = {} }) {
  const options = {
    fullScreen: false,
    background: {
      color: '#15171a',
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 600,
        density: {
          enable: true,
          area: 200,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.9,
        random: { enable: true, minimumValue: 0.6 },
        anim: { enable: false },
      },
      size: {
        value: 6.5,
        random: { enable: true, minimumValue: 4.0 },
        anim: { enable: false },
      },
      move: {
        enable: true,
        speed: 2.5,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'bounce',
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
        trail: {
          enable: true,
          length: 10,
          fill: { color: '#000000' },
        },
      },
      links: {
        enable: false,
      },
      zIndex: {
        value: 1,
      },
      shadow: {
        enable: true,
        color: '#ffffff',
        blur: 8,
        offset: {
          x: 0,
          y: 0,
        },
      },
      orbit: {
        enable: true,
        radius: 50,
        rotation: {
          value: 0,
          random: true,
          sync: false,
        },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        onClick: {
          enable: false,
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      ...style,
    },
  };

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      <Particles id="tsparticles-wave" options={options} style={{ width: '100%', height: '100%' }} />
    </div>
  );
} 