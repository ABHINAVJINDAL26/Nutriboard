import React, { useState, useEffect } from 'react';
import FitnessGoalToggle from './components/FitnessGoalToggle';
import CalorieBar from './components/CalorieBar';
import MacroBars from './components/MacroBars';
import LoggingPanel from './components/LoggingPanel';
import FoodHistoryList from './components/FoodHistoryList';
import WarningModal from './components/WarningModal';
import BalanceGauge from './components/BalanceGauge';
import { 
  getFoodSummary, 
  addFoodItem, 
  simulateImageUpload, 
  deleteFoodItem, 
  changeGoal 
} from './api/foodApi';

export default function App() {
  const [foods, setFoods] = useState([]);
  const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [targets, setTargets] = useState({ calories: 2000, protein: 140, carbs: 220, fats: 65 });
  const [goal, setGoal] = useState('maintenance');
  const [status, setStatus] = useState('OK');
  const [balanceScore, setBalanceScore] = useState({ score: 100, status: 'balanced' });
  const [isLoading, setIsLoading] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [apiError, setApiError] = useState('');

  // Fetch initial summary from backend
  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    setIsLoading(true);
    setApiError('');
    try {
      const data = await getFoodSummary();
      updateDashboardState(data);
    } catch (err) {
      console.error(err);
      setApiError('Unable to connect to the backend server. Make sure it is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateDashboardState = (data) => {
    setFoods(data.foods);
    setTotals(data.totals);
    setTargets(data.targets);
    setGoal(data.goal);
    setStatus(data.status);
    if (data.balanceScore) {
      setBalanceScore(data.balanceScore);
    }
  };

  const handleLogFood = async (name, grams) => {
    setIsLoading(true);
    setApiError('');
    try {
      const data = await addFoodItem(name, grams);
      const wasExceeded = status === 'EXCEEDED';
      updateDashboardState(data);
      
      // If now exceeded and wasn't exceeded before, show popup warning
      if (data.status === 'EXCEEDED' && !wasExceeded) {
        setShowWarningModal(true);
      }
    } catch (err) {
      console.error(err);
      setApiError(err.message || 'Failed to log food item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulateScan = async () => {
    setIsLoading(true);
    setApiError('');
    try {
      const data = await simulateImageUpload();
      const wasExceeded = status === 'EXCEEDED';
      updateDashboardState(data);

      if (data.status === 'EXCEEDED' && !wasExceeded) {
        setShowWarningModal(true);
      }
    } catch (err) {
      console.error(err);
      setApiError('Failed to simulate food scan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFood = async (id) => {
    setIsLoading(true);
    setApiError('');
    try {
      const data = await deleteFoodItem(id);
      updateDashboardState(data);
    } catch (err) {
      console.error(err);
      setApiError('Failed to delete food item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoalChange = async (newGoal) => {
    setIsLoading(true);
    setApiError('');
    try {
      const data = await changeGoal(newGoal);
      const wasExceeded = status === 'EXCEEDED';
      updateDashboardState(data);

      // Trigger modal if changing goal lowers budget causing immediate exceed status
      if (data.status === 'EXCEEDED' && !wasExceeded) {
        setShowWarningModal(true);
      }
    } catch (err) {
      console.error(err);
      setApiError('Failed to update fitness goal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">VibeNutri</h1>
        <p className="app-subtitle">Calorie Tracker & Real-Time Macro Dashboard</p>
      </header>

      {/* Fitness Goal Toggle */}
      <FitnessGoalToggle activeGoal={goal} onGoalChange={handleGoalChange} />

      {apiError && (
        <div 
          className="api-error-alert"
          style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '2rem',
            color: '#f87171',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 500
          }}
        >
          ⚠️ {apiError}
        </div>
      )}

      {/* Over-budget Alert Banner */}
      {status === 'EXCEEDED' && (
        <div className="exceeded-alert-banner">
          <span className="alert-icon">⚠️</span>
          <span className="alert-message">
            Over Limit! You are currently exceeding your calorie budget for the day.
          </span>
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className="dashboard-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Calorie Progress Bar */}
          <CalorieBar totals={totals} targets={targets} status={status} />
          
          {/* Macronutrients Progress Bars */}
          <MacroBars totals={totals} targets={targets} />

          {/* Macro Balance Score Gauge */}
          <BalanceGauge score={balanceScore.score} status={balanceScore.status} />

          {/* Logged Meal History */}
          <FoodHistoryList 
            foods={foods} 
            onDeleteFood={handleDeleteFood} 
            isLoading={isLoading} 
          />
        </div>

        <div>
          {/* Input Panel */}
          <LoggingPanel 
            onLogFood={handleLogFood} 
            onSimulateScan={handleSimulateScan}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Exceeded Warning Popup Modal */}
      <WarningModal 
        isOpen={showWarningModal} 
        onClose={() => setShowWarningModal(false)} 
      />
    </div>
  );
}
