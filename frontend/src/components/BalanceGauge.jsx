import React from 'react';
import { useBalanceEasterEgg } from '../hooks/useBalanceEasterEgg';

export default function BalanceGauge({ score = 100, status = 'balanced' }) {
  const { isTriggered, prefersReducedMotion } = useBalanceEasterEgg();

  // If easter egg triggered, show 100 / balanced without altering real data
  const displayScore = isTriggered ? 100 : score;
  const displayStatus = isTriggered ? 'balanced' : status;

  const normalizedScore = Math.min(100, Math.max(0, Math.round(displayScore)));

  // SVG circular geometry
  const size = 100;
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

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

  const currentStatus = statusConfig[displayStatus] || statusConfig.balanced;

  return (
    <div className={`glass-card balance-gauge-card ${isTriggered ? 'easter-egg-active' : ''}`}>
      <div className="balance-gauge-info">
        <div className="balance-gauge-header">
          <span className="balance-gauge-icon">🎯</span>
          <h3 className="balance-gauge-title">Macro Balance Score</h3>
        </div>
        <p className="balance-gauge-desc">
          Measures how accurately your macro proportions match your goal's ideal ratio.
        </p>

        <div className="balance-gauge-badge-row">
          <span 
            className="balance-gauge-badge"
            style={{
              color: currentStatus.color,
              background: currentStatus.badgeBg,
              borderColor: currentStatus.badgeBorder
            }}
          >
            {currentStatus.label}
          </span>

          {/* Easter Egg Notice (Displayed only on trigger, 0 layout shift) */}
          {isTriggered && (
            <span className="easter-egg-caption">
              ✨ Perfect balance. (Demo state — not your real data.)
            </span>
          )}
        </div>
      </div>

      <div className="balance-gauge-svg-wrap">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="balance-gauge-svg"
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
              transition: prefersReducedMotion 
                ? 'none' 
                : 'stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease'
            }}
          />
        </svg>

        {/* Center Score Display */}
        <div className="balance-gauge-center">
          <span className="balance-gauge-num">
            {normalizedScore}
          </span>
          <span className="balance-gauge-unit">
            / 100
          </span>
        </div>
      </div>
    </div>
  );
}
