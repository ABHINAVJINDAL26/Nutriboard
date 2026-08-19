import React, { useState } from 'react';

/**
 * LoggingPanel Component
 * Handles user inputs for logging meals manually or triggering the simulated AI scan.
 */
export default function LoggingPanel({ onLogFood, onSimulateScan, isLogging, isScanning }) {
  const [foodName, setFoodName] = useState('');
  const [grams, setGrams] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (!foodName.trim()) {
      setError('Please enter a food name.');
      return;
    }
    const parsedGrams = parseFloat(grams);
    if (isNaN(parsedGrams) || parsedGrams <= 0) {
      setError('Grams must be a positive number greater than 0.');
      return;
    }

    // Submit valid data to parent callback handler
    onLogFood(foodName, parsedGrams);
    setFoodName('');
    setGrams('');
  };

  return (
    <div className="glass-card">
      <h3 className="logging-card-title">Log Your Nutrition</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="food-name">Food Item Name</label>
          <input
            id="food-name"
            className="input-styled"
            type="text"
            placeholder="e.g. chicken, rice, salmon, apple"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            disabled={isLogging}
          />
        </div>
        <div className="form-group">
          <label htmlFor="food-grams">Weight (Grams)</label>
          <input
            id="food-grams"
            className="input-styled"
            type="number"
            min="1"
            placeholder="e.g. 150"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            disabled={isLogging}
          />
        </div>
        {error && (
          <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 500 }}>
            ⚠️ {error}
          </div>
        )}
        <button className="btn-primary" type="submit" disabled={isLogging}>
          {isLogging ? 'Adding...' : '➕ Log Food'}
        </button>
      </form>
      <div style={{ margin: '1rem 0', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        — OR —
      </div>
      <button 
        className="btn-secondary" 
        onClick={onSimulateScan}
        disabled={isScanning}
      >
        {isScanning ? '📸 Analyzing Photo...' : '📸 Scan Meal Photo (AI Mock)'}
      </button>
    </div>
  );
}
