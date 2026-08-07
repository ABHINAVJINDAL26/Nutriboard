import React from 'react';

export default function CalorieBar({ totals, targets, status }) {
  const percentage = targets.calories > 0 
    ? Math.round((totals.calories / targets.calories) * 100) 
    : 0;

  const barWidth = Math.min(percentage, 100);
  const isExceeded = status === 'EXCEEDED';

  return (
    <div className="glass-card progress-card">
      <div className="progress-header">
        <div>
          <h3 className="progress-title">Daily Calorie Budget</h3>
          <div className="progress-values">
            {totals.calories} <span>/ {targets.calories} kcal</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span 
            className="status-badge"
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 700,
              background: isExceeded ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
              color: isExceeded ? '#fca5a5' : '#86efac',
              border: `1px solid ${isExceeded ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
            }}
          >
            {isExceeded ? '🚨 Budget Exceeded' : '✅ Within Budget'}
          </span>
        </div>
      </div>
      
      <div className="calorie-track-bar">
        <div 
          className={`calorie-fill-bar ${isExceeded ? 'exceeded' : 'ok'}`}
          style={{ width: `${barWidth}%` }}
        >
          {percentage > 10 && (
            <span className="calorie-percent-label">{percentage}%</span>
          )}
        </div>
      </div>
    </div>
  );
}
