import React from 'react';

export default function FitnessGoalToggle({ activeGoal, onGoalChange }) {
  const goals = [
    { id: 'weightLoss', label: 'Weight Loss', shortLabel: 'Loss', icon: '📉' },
    { id: 'maintenance', label: 'Maintenance', shortLabel: 'Maintain', icon: '⚖️' },
    { id: 'muscleGain', label: 'Muscle Gain', shortLabel: 'Gain', icon: '💪' }
  ];

  return (
    <div className="goal-toggle-container">
      <div className="goal-toggle-wrapper">
        {goals.map(g => (
          <button
            key={g.id}
            className={`goal-btn ${activeGoal === g.id ? 'active' : ''}`}
            onClick={() => onGoalChange(g.id)}
          >
            <span className="goal-icon">{g.icon}</span>
            <span className="goal-text-full">{g.label}</span>
            <span className="goal-text-short">{g.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
