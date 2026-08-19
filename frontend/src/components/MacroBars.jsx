import React from 'react';

export default function MacroBars({ totals, targets }) {
  const macros = [
    { name: 'Protein', value: totals.protein, target: targets.protein, colorClass: 'protein', icon: '🥩' },
    { name: 'Carbs', value: totals.carbs, target: targets.carbs, colorClass: 'carbs', icon: '🌾' },
    { name: 'Fats', value: totals.fats, target: targets.fats, colorClass: 'fats', icon: '🥑' }
  ];

  return (
    <div className="macro-bars-grid">
      {macros.map(m => {
        const percentage = m.target > 0 ? Math.min((m.value / m.target) * 100, 100) : 0;
        return (
          <div key={m.name} className="macro-bar-container">
            <div className="macro-bar-label">
              <span className="macro-name">{m.icon} {m.name}</span>
              <span className="macro-nums">{m.value}g / {m.target}g</span>
            </div>
            <div className="macro-track">
              <div 
                className={`macro-fill ${m.colorClass}`} 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
