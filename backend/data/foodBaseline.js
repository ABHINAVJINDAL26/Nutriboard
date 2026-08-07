const BASE_NUTRITION_PER_100G = {
  default: { calories: 150, protein: 8.0, carbs: 20.0, fats: 5.0 },
  rice: { calories: 130, protein: 2.7, carbs: 28.0, fats: 0.3 },
  chicken: { calories: 165, protein: 31.0, carbs: 0.0, fats: 3.6 },
  salmon: { calories: 208, protein: 20.0, carbs: 0.0, fats: 13.0 },
  apple: { calories: 52, protein: 0.3, carbs: 14.0, fats: 0.2 },
  broccoli: { calories: 34, protein: 2.8, carbs: 7.0, fats: 0.4 },
  eggs: { calories: 155, protein: 13.0, carbs: 1.1, fats: 11.0 }
};

module.exports = { BASE_NUTRITION_PER_100G };
