import React from 'react';

export default function Navbar() {
  const scrollToDemo = (e) => {
    e.preventDefault();
    const element = document.getElementById('product-demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand">
          <span className="brand-logo-icon">📊</span>
          <span className="brand-name">Nutriboard</span>
          <span className="brand-status-dot" title="Live Engine Active"></span>
        </a>

        <nav className="navbar-links">
          <a href="#features" onClick={scrollToFeatures} className="nav-link">Features</a>
          <a href="#product-demo" onClick={scrollToDemo} className="nav-link">Live Demo</a>
        </nav>

        <div className="navbar-cta-wrap">
          <a href="#product-demo" onClick={scrollToDemo} className="navbar-cta-btn">
            Try the live dashboard →
          </a>
        </div>
      </div>
    </header>
  );
}
