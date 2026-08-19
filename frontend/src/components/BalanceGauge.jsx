import React from 'react';

export default function BalanceGauge({ score = 100, status = 'balanced' }) {
  // Normalize score between 0 and 100
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));

  // SVG circular geometry
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  // Status mapping
  const statusConfig = {
    balanced: {
      color: 'var(--color-ok, #10b981)',
      label: 'Well balanced',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      badgeBorder: 'rgba(16, 185, 129, 0.3)'
    },
    'off-track': {
      color: '#f59e0b',
      label: 'Slightly off',
      badgeBg: 'rgba(245, 158, 11, 0.15)',
      badgeBorder: 'rgba(245, 158, 11, 0.3)'
    },
    unbalanced: {
      color: 'var(--color-exceeded, #ef4444)',
      label: 'Needs rebalancing',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.3)'
    }
  };

  const currentStatus = statusConfig[status] || statusConfig.balanced;

  return (
    <div className="glass-card balance-gauge-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '1.25rem' }}>🎯</span>
          <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>Macro Balance Score</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem 0', lineHeight: 1.4 }}>
          Measures how accurately your macro proportions match your goal's ideal ratio.
        </p>
        <span 
          style={{
            display: 'inline-block',
            fontSize: '0.8rem',
            fontWeight: 600,
            padding: '0.25rem 0.65rem',
            borderRadius: '9999px',
            color: currentStatus.color,
            background: currentStatus.badgeBg,
            border: `1px solid ${currentStatus.badgeBorder}`
          }}
        >
          {currentStatus.label}
        </span>
      </div>

      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        >
          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Animated Foreground Score Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={currentStatus.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.6s ease, stroke 0.4s ease'
            }}
          />
        </svg>

        {/* Center Score Display */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <span
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              fontFamily: 'var(--font-header, sans-serif)',
              color: 'var(--text-primary)',
              lineHeight: 1
            }}
          >
            {normalizedScore}
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginTop: '2px'
            }}
          >
            / 100
          </span>
        </div>
      </div>
    </div>
  );
}
