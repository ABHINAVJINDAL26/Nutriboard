import React from 'react';

export default function Footer() {
  const scrollToDemo = (e) => {
    e.preventDefault();
    const demo = document.getElementById('product-demo');
    if (demo) {
      demo.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="brand-logo-icon">📊</span>
            <span className="brand-name">Nutriboard</span>
          </div>
          <p className="footer-note">
            Built as a frontend engineering challenge submission for Acdyon Technologies. 
            Features decoupled Node.js & React architecture.
          </p>
        </div>

        <div className="footer-links-col">
          <button onClick={scrollToTop} className="footer-link-btn">
            ↑ Back to top
          </button>
          <button onClick={scrollToDemo} className="footer-link-btn">
            Open Live Dashboard →
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Nutriboard • All calculations executed server-side in real time.</p>
      </div>
    </footer>
  );
}
