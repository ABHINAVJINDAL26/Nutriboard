import React from 'react';

export default function Features() {
  const featureList = [
    {
      icon: '🎯',
      title: 'Macro Balance Score Engine',
      tag: 'Core Differentiator',
      description: 'Unlike simple calorie counters that only track volume, Nutriboard normalizes your protein, carb, and fat intake into a percentage ratio and scores how tightly it matches your ideal target split on a 0–100 animated scale.'
    },
    {
      icon: '⚖️',
      title: 'Live, Non-Destructive Goal Switching',
      tag: 'Dynamic State Sync',
      description: 'Switch between Weight Loss (1600 kcal), Maintenance (2000 kcal), and Muscle Gain (2500 kcal) profiles at any point. Your targets and balance deviation update immediately without resetting or wiping your active meal log.'
    },
    {
      icon: '🍽️',
      title: 'Portion Scaling & Demo Photo Scan',
      tag: 'Decoupled Math',
      description: 'Nutrients scale accurately to exact portion weights in grams based on verified baseline data per 100g. Includes manual gram logging alongside a one-click simulated AI photo scanner mock for rapid interface testing.'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <span className="section-badge">ENGINEERING HIGHLIGHTS</span>
        <h2 className="section-title">Built for Precision, Not Just Counting</h2>
        <p className="section-subtitle">
          Every calculation is processed server-side through pure mathematical services, delivering 
          consistent real-time state with zero client-side calculation drift.
        </p>
      </div>

      <div className="features-grid">
        {featureList.map((feat, index) => (
          <div key={index} className="glass-card feature-card">
            <div className="feature-card-top">
              <span className="feature-icon">{feat.icon}</span>
              <span className="feature-tag">{feat.tag}</span>
            </div>
            <h3 className="feature-title">{feat.title}</h3>
            <p className="feature-description">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
