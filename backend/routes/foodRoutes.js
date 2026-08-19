const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Define API Endpoints
router.get('/foods', foodController.getFoods);
router.post('/foods', foodController.addFood);
router.delete('/foods/:id', foodController.deleteFood);
router.post('/goal', foodController.updateGoal);
router.get('/suggestions', foodController.getSuggestions);

module.exports = router;
