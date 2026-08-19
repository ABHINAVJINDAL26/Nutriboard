const { calculateNutrition, getMockScannedMeal } = require('../services/nutrientCalculator');
const { getSummary, addFoodItem, deleteFoodItem, changeGoal } = require('../services/budgetTracker');
const { getSuggestions } = require('../services/suggestionEngine');
const { BASE_NUTRITION_PER_100G } = require('../data/foodBaseline');

// GET /api/foods
exports.getFoods = (req, res) => {
  try {
    const summary = getSummary();
    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve food log' });
  }
};

// POST /api/foods
exports.addFood = (req, res) => {
  try {
    const { name, grams, mock } = req.body;
    let foodData;

    if (mock) {
      foodData = getMockScannedMeal();
    } else {
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Food name is required' });
      }
      
      const parsedGrams = parseFloat(grams);
      if (isNaN(parsedGrams) || parsedGrams <= 0) {
        return res.status(400).json({ error: 'Grams must be a positive number greater than 0' });
      }

      const nutrition = calculateNutrition(name, parsedGrams);
      foodData = {
        name: name.trim(),
        grams: parsedGrams,
        ...nutrition
      };
    }

    const updatedSummary = addFoodItem(foodData);
    res.status(201).json(updatedSummary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add food item' });
  }
};

// DELETE /api/foods/:id
exports.deleteFood = (req, res) => {
  try {
    const { id } = req.params;
    const updatedSummary = deleteFoodItem(id);
    res.status(200).json(updatedSummary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};

// POST /api/goal
exports.updateGoal = (req, res) => {
  try {
    const { goal } = req.body;
    if (!goal || !['weightLoss', 'maintenance', 'muscleGain'].includes(goal)) {
      return res.status(400).json({ error: 'Invalid fitness goal specified' });
    }
    const updatedSummary = changeGoal(goal);
    res.status(200).json(updatedSummary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update fitness goal' });
  }
};

// GET /api/suggestions
exports.getSuggestions = (req, res) => {
  try {
    const summary = getSummary();
    const remainingBudget = summary.targets.calories - summary.totals.calories;
    const suggestions = getSuggestions(remainingBudget, BASE_NUTRITION_PER_100G);
    res.status(200).json({ suggestions, remainingBudget });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve suggestions' });
  }
};

