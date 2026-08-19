import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="landing-layout">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main className="landing-main">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Product Demo Section (Option A: Embedded Real Functional App) */}
        <section id="product-demo" className="product-demo-section">
          <div className="section-header">
            <span className="demo-live-badge">
              <span className="demo-pulsing-dot"></span>
              LIVE INTERACTIVE PRODUCT DEMO
            </span>
            <h2 className="section-title">The Real Dashboard. Right Here.</h2>
            <p className="section-subtitle">
              This is the real, working dashboard connected to the live Node.js engine — not a mockup. 
              Try logging a food item, watching the balance ring animate, or switching fitness goals below.
            </p>
          </div>

          {/* Realistic Browser-Chrome Container Frame */}
          <div className="demo-browser-frame">
            <div className="browser-frame-header">
              <div className="browser-controls">
                <span className="browser-dot dot-red"></span>
                <span className="browser-dot dot-yellow"></span>
                <span className="browser-dot dot-green"></span>
              </div>
              <div className="browser-address-bar">
                <span className="browser-lock-icon">🔒</span>
                <span className="browser-url-text">https://nutriboard.app/live-dashboard</span>
              </div>
              <div className="browser-status-tag">
                <span className="live-status-dot"></span>
                <span>Reactive Engine Online</span>
              </div>
            </div>

            <div className="browser-frame-body">
              {/* Embedded Live Working Nutriboard App */}
              <Dashboard />
            </div>
          </div>

          <div className="demo-footer-caption">
            <p>
              💡 <strong>How to test:</strong> Try entering <code>rice</code> and <code>300g</code>, then click <strong>Log Food</strong>. Watch the <strong>Macro Balance Score</strong> animate in real time, then switch goals to <strong>Muscle Gain</strong> to see the target ratio instantly recalibrate.
            </p>
          </div>
        </section>

        {/* 4. Feature Highlights */}
        <Features />
      </main>

      {/* 5. Minimal Honest Footer */}
      <Footer />
    </div>
  );
}
