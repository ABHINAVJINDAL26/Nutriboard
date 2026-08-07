import React from 'react';

export default function FoodHistoryList({ foods, onDeleteFood, isLoading }) {
  return (
    <div className="glass-card history-card">
      <div className="history-header">
        <h3 className="history-title">Daily Food Journal</h3>
        <span className="history-count">
          {foods.length} {foods.length === 1 ? 'item' : 'items'} logged
        </span>
      </div>

      {foods.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <p>Your food journal is empty. Log a meal above to get started!</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="meal-table">
            <thead>
              <tr>
                <th>Meal / Portion</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fats</th>
                <th style={{ width: '60px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id}>
                  <td className="cell-food">
                    <span className="food-name">{food.name}</span>
                    <span className="food-sub">
                      {food.grams}g • {food.timestamp}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{food.calories} kcal</td>
                  <td className="cell-macro-p">{food.protein}g</td>
                  <td className="cell-macro-c">{food.carbs}g</td>
                  <td className="cell-macro-f">{food.fats}g</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn-delete"
                      onClick={() => onDeleteFood(food.id)}
                      title="Delete entry"
                      disabled={isLoading}
                    >
                      <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
