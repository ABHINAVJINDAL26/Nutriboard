const { BASE_NUTRITION_PER_100G } = require('../data/foodBaseline');

/**
 * Calculates nutritional values based on portion size in grams.
 * @param {string} foodName 
 * @param {number} grams 
 */
function calculateNutrition(foodName, grams) {
  const normalizedKey = foodName.toLowerCase().trim();
  const baseline = BASE_NUTRITION_PER_100G[normalizedKey] || BASE_NUTRITION_PER_100G.default;

  const factor = grams / 100;
  
  return {
    calories: Math.round(baseline.calories * factor),
    protein: parseFloat((baseline.protein * factor).toFixed(1)),
    carbs: parseFloat((baseline.carbs * factor).toFixed(1)),
    fats: parseFloat((baseline.fats * factor).toFixed(1))
  };
}

/**
 * Simulates photo recognition scanning to return a mock meal.
 */
function getMockScannedMeal() {
  // Predefined mock meal
  return {
    name: 'Grilled Chicken Bowl (AI Scan 📸)',
    grams: 450,
    calories: 580,
    protein: 42.5,
    carbs: 52.0,
    fats: 16.5,
    isMock: true
  };
}

module.exports = {
  calculateNutrition,
  getMockScannedMeal
};
