/**
 * Suggestion Engine for "What Can I Eat Next?"
 * Pure function to rank baseline foods by protein density fitting remaining calories.
 */

function getSuggestions(remainingBudget, foodBaseline) {
  if (typeof remainingBudget !== 'number' || remainingBudget <= 0) {
    return [];
  }

  if (!foodBaseline || typeof foodBaseline !== 'object') {
    return [];
  }

  const portionGrams = 120;
  const factor = portionGrams / 100;
  const candidates = [];

  for (const [key, base] of Object.entries(foodBaseline)) {
    if (key === 'default' || !base) continue;

    const calories = Math.round(base.calories * factor);
    const protein = parseFloat((base.protein * factor).toFixed(1));
    const carbs = parseFloat((base.carbs * factor).toFixed(1));
    const fats = parseFloat((base.fats * factor).toFixed(1));

    if (calories <= remainingBudget) {
      const proteinDensity = calories > 0 ? protein / calories : 0;
      const formattedName = key.charAt(0).toUpperCase() + key.slice(1);

      candidates.push({
        name: formattedName,
        calories,
        protein,
        carbs,
        fats,
        proteinDensity
      });
    }
  }

  // Sort descending by protein-to-calorie ratio
  candidates.sort((a, b) => b.proteinDensity - a.proteinDensity);

  // Return top 3 suggestions without internal ranking metadata
  return candidates.slice(0, 3).map(({ name, calories, protein, carbs, fats }) => ({
    name,
    calories,
    protein,
    carbs,
    fats
  }));
}

module.exports = {
  getSuggestions
};
