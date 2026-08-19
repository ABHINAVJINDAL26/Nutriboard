import React from 'react';

export default function Hero() {
  const scrollToDemo = (e) => {
    e.preventDefault();
    const demo = document.getElementById('product-demo');
    if (demo) {
      demo.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const feat = document.getElementById('features');
    if (feat) {
      feat.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-badge-wrap">
        <span className="hero-badge">
          <span className="hero-badge-sparkle">⚡</span>
          REAL-TIME MACRO INTELLIGENCE
        </span>
      </div>

      <h1 className="hero-title">
        Don't just count calories. <br />
        <span className="hero-gradient-text">Know if your day is actually balanced.</span>
      </h1>

      <p className="hero-subtitle">
        Nutriboard evaluates your exact portion splits against your active goal, calculating a live 
        0–100 Macro Balance Score so you never have to guess if your nutrition is on track.
      </p>

      <div className="hero-actions">
        <button onClick={scrollToDemo} className="hero-btn-primary">
          <span>Try the live dashboard</span>
          <span className="hero-btn-arrow">↓</span>
        </button>
        <button onClick={scrollToFeatures} className="hero-btn-secondary">
          <span>How It Works</span>
          <span className="hero-btn-arrow">→</span>
        </button>
      </div>

      <div className="hero-metrics-strip">
        <div className="metric-pill">
          <span className="metric-pill-icon">🎯</span>
          <span className="metric-pill-text">0–100 Ratio Deviation Engine</span>
        </div>
        <div className="metric-pill">
          <span className="metric-pill-icon">⚡</span>
          <span className="metric-pill-text">Instant recalculation — no page reload</span>
        </div>
        <div className="metric-pill">
          <span className="metric-pill-icon">🔄</span>
          <span className="metric-pill-text">Non-Destructive Goal Switching</span>
        </div>
      </div>
    </section>
  );
}
