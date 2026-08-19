/**
 * Calculates the Macro Balance Score (0-100) representing how closely
 * the user's current macro percentage split matches their ideal target ratio.
 * 
 * @param {Object} totals - Current macronutrient totals { calories, protein, carbs, fats }
 * @param {Object} targets - Target macronutrients for active goal { calories, protein, carbs, fats }
 * @returns {Object} { score: number, status: 'balanced' | 'off-track' | 'unbalanced' }
 */
function calculateBalanceScore(totals, targets) {
  // Guard against divide-by-zero or empty log
  if (!totals || !targets || totals.calories === 0) {
    return { score: 100, status: 'balanced' };
  }

  const totalActualGrams = (totals.protein || 0) + (totals.carbs || 0) + (totals.fats || 0);
  const totalIdealGrams = (targets.protein || 0) + (targets.carbs || 0) + (targets.fats || 0);

  if (totalActualGrams === 0 || totalIdealGrams === 0) {
    return { score: 100, status: 'balanced' };
  }

  // Actual macro percentages
  const actualProteinPct = (totals.protein / totalActualGrams) * 100;
  const actualCarbsPct = (totals.carbs / totalActualGrams) * 100;
  const actualFatsPct = (totals.fats / totalActualGrams) * 100;

  // Ideal target macro percentages
  const idealProteinPct = (targets.protein / totalIdealGrams) * 100;
  const idealCarbsPct = (targets.carbs / totalIdealGrams) * 100;
  const idealFatsPct = (targets.fats / totalIdealGrams) * 100;

  // Total absolute deviation across protein, carbs, fats
  const deviation = Math.abs(actualProteinPct - idealProteinPct) +
                    Math.abs(actualCarbsPct - idealCarbsPct) +
                    Math.abs(actualFatsPct - idealFatsPct);

  // Score between 0 and 100
  const score = Math.max(0, Math.round(100 - deviation));

  // Determine status
  let status = 'unbalanced';
  if (score >= 80) {
    status = 'balanced';
  } else if (score >= 50) {
    status = 'off-track';
  }

  return { score, status };
}

module.exports = {
  calculateBalanceScore
};
