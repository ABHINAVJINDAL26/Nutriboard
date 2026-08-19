import React, { useState, useEffect } from 'react';
import { getSuggestions } from '../api/foodApi';

export default function SuggestionCard({ totals, targets }) {
  const [suggestions, setSuggestions] = useState([]);
  const [remainingBudget, setRemainingBudget] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchSuggestions() {
      try {
        const data = await getSuggestions();
        if (isMounted) {
          setSuggestions(data.suggestions || []);
          if (typeof data.remainingBudget === 'number') {
            setRemainingBudget(data.remainingBudget);
          } else {
            setRemainingBudget((targets?.calories || 0) - (totals?.calories || 0));
          }
        }
      } catch (err) {
        console.error('Failed to fetch food suggestions:', err);
      }
    }

    fetchSuggestions();

    return () => {
      isMounted = false;
    };
  }, [totals, targets]);

  const remaining = remainingBudget > 0 
    ? remainingBudget 
    : Math.max(0, (targets?.calories || 0) - (totals?.calories || 0));

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>💡</span>
        <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-primary)' }}>What Can I Eat Next?</h3>
      </div>

      {suggestions && suggestions.length > 0 ? (
        <div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            You have <strong style={{ color: 'var(--accent-cyan)' }}>{remaining} cal</strong> left. Try:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {suggestions.map((item) => (
              <li 
                key={item.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '0.6rem 0.85rem',
                  fontSize: '0.9rem'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {item.calories} cal, <span style={{ color: 'var(--color-ok)', fontWeight: 500 }}>{item.protein}g protein</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
          No suggestions right now — you're near or over budget.
        </p>
      )}
    </div>
  );
}
