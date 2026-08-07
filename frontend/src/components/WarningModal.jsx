import React from 'react';

export default function WarningModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">⚠️</div>
        <h3 className="modal-title">Daily Budget Exceeded!</h3>
        <p className="modal-text">
          Your calorie intake has surpassed your configured goal threshold. Consider adjusting your portion sizes or updating your Fitness Goal target limits.
        </p>
        <button className="btn-dismiss" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
