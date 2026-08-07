import React from 'react';

export default function FitnessGoalToggle({ activeGoal, onGoalChange }) {
  const goals = [
    { id: 'weightLoss', label: '📉 Weight Loss' },
    { id: 'maintenance', label: '⚖️ Maintenance' },
    { id: 'muscleGain', label: '💪 Muscle Gain' }
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
            {g.label}
          </button>
        ))}
      </div>
    </div>
  );
}
