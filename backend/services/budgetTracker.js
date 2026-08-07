const GOAL_TARGETS = {
  weightLoss: { calories: 1600, protein: 120, carbs: 150, fats: 50 },
  maintenance: { calories: 2000, protein: 140, carbs: 220, fats: 65 },
  muscleGain: { calories: 2500, protein: 180, carbs: 280, fats: 70 }
};

// In-memory store
let loggedFoods = [];
let currentGoal = 'maintenance';

function getGoalTargets() {
  return GOAL_TARGETS[currentGoal] || GOAL_TARGETS.maintenance;
}

function calculateTotals() {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fats = 0;

  for (const item of loggedFoods) {
    calories += item.calories;
    protein += item.protein;
    carbs += item.carbs;
    fats += item.fats;
  }

  return {
    calories: Math.round(calories),
    protein: parseFloat(protein.toFixed(1)),
    carbs: parseFloat(carbs.toFixed(1)),
    fats: parseFloat(fats.toFixed(1))
  };
}

function getBudgetStatus() {
  const totals = calculateTotals();
  const targets = getGoalTargets();
  return totals.calories > targets.calories ? 'EXCEEDED' : 'OK';
}

function getSummary() {
  return {
    foods: loggedFoods,
    totals: calculateTotals(),
    targets: getGoalTargets(),
    goal: currentGoal,
    status: getBudgetStatus()
  };
}

function addFoodItem(item) {
  const newId = Date.now().toString() + Math.random().toString(36).substr(2, 5);
  const newItem = {
    id: newId,
    name: item.name,
    grams: item.grams,
    calories: item.calories,
    protein: item.protein,
    carbs: item.carbs,
    fats: item.fats,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
  loggedFoods.push(newItem);
  return getSummary();
}

function deleteFoodItem(id) {
  loggedFoods = loggedFoods.filter(item => item.id !== id);
  return getSummary();
}

function changeGoal(goal) {
  if (GOAL_TARGETS[goal]) {
    currentGoal = goal;
  }
  return getSummary();
}

module.exports = {
  getSummary,
  addFoodItem,
  deleteFoodItem,
  changeGoal
};
