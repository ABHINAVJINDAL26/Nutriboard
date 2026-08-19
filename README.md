# Nutriboard: Calorie Tracker & Real-Time Macro Dashboard

Nutriboard is a modern full-stack nutrition and macro tracking dashboard. It enables users to log meals with exact gram portioning, dynamically tracks daily calorie and macronutrient budgets against customizable fitness goals, calculates a real-time **Macro Balance Score**, and alerts users instantly if their daily budget is exceeded.

---

## 🚀 Key Features

*   **Decoupled Architecture**: Strict separation of concerns — the backend handles all nutritional scaling, budget evaluation, ratio calculations, and validation logic, while the frontend provides a sleek, responsive presentation layer.
*   **Macro Balance Score (Circular SVG Gauge)**: Calculates a dynamic 0–100 score comparing the user's actual macro proportion split (protein / carbs / fats %) to their ideal target ratio. Displayed as a smooth animated ring gauge.
*   **Portion-Based Nutritional Scaling**: Real-time linear scaling of baseline nutrients per 100g relative to logged portion weights.
*   **Dynamic Fitness Goal Profiles**: Seamlessly switch between **Weight Loss** (1600 kcal), **Maintenance** (2000 kcal), and **Muscle Gain** (2500 kcal). Targets adjust live without wiping logged meal history.
*   **AI Photo Scan Simulation**: One-click mock meal scanning ("Grilled Chicken Bowl") simulating photo recognition workflows.
*   **Live Budget Visuals & Warning Overlays**: Reactive progress indicators with color status alerts and a modal popup triggered the moment a budget threshold is exceeded.
*   **Interactive Food Journal**: Live meal history table with instant deletion and synchronized recalculations.

---

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), Pure CSS3 Custom Properties, SVG Animations, Modern Glassmorphism UI.
*   **Backend**: Node.js, Express, CORS, In-memory state storage.

---

## 📂 Project Structure

```
Nutriboard/
├── backend/
│   ├── data/
│   │   └── foodBaseline.js           # Baseline nutrition lookup per 100g
│   ├── controllers/
│   │   └── foodController.js         # Request/response handlers
│   ├── services/
│   │   ├── nutrientCalculator.js     # Portion scaling & mock photo scanning
│   │   ├── balanceScoreCalculator.js # Macro ratio deviation & 0-100 score engine
│   │   └── budgetTracker.js          # In-memory store & aggregate state tracker
│   ├── routes/
│   │   └── foodRoutes.js             # Express API route declarations
│   ├── server.js                     # Express server configuration & port binding
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoggingPanel.jsx      # Manual meal entry & photo scan simulation
│   │   │   ├── CalorieBar.jsx        # Calorie budget progress display card
│   │   │   ├── MacroBars.jsx         # Triple macronutrient progress bars
│   │   │   ├── BalanceGauge.jsx      # Animated circular SVG macro balance gauge
│   │   │   ├── FoodHistoryList.jsx   # Interactive meal journal table
│   │   │   ├── WarningModal.jsx      # Budget exceeded alert popup
│   │   │   └── FitnessGoalToggle.jsx # 3-way fitness goal profile selector
│   │   ├── api/
│   │   │   └── foodApi.js            # Frontend HTTP API client wrapper
│   │   ├── App.jsx                   # Main layout coordinator & State management
│   │   ├── App.css                   # Grid layout structures
│   │   ├── index.css                 # Design tokens, animations, and glassmorphism styling
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## 📡 API Endpoints

### `GET /api/foods`
Retrieves current meal history, running totals, goal targets, and live balance score.
*   **Response (200 OK)**:
    ```json
    {
      "foods": [],
      "totals": { "calories": 0, "protein": 0, "carbs": 0, "fats": 0 },
      "targets": { "calories": 2000, "protein": 140, "carbs": 220, "fats": 65 },
      "goal": "maintenance",
      "status": "OK",
      "balanceScore": {
        "score": 100,
        "status": "balanced"
      }
    }
    ```

### `POST /api/foods`
Adds a meal. Supports manual weight in grams or mock photo scanning.
*   **Request Body (Manual Entry)**:
    ```json
    {
      "name": "chicken",
      "grams": 200
    }
    ```
*   **Request Body (Mock Scan)**:
    ```json
    {
      "mock": true
    }
    ```

### `DELETE /api/foods/:id`
Deletes a specific logged item by its unique ID and returns updated totals.

### `POST /api/goal`
Updates the active fitness goal profile (`weightLoss` | `maintenance` | `muscleGain`).
*   **Request Body**:
    ```json
    {
      "goal": "muscleGain"
    }
    ```

---

## ⚡ Getting Started

### 1. Start Backend Server
```bash
cd backend
npm install
npm start
# Server runs on http://localhost:5000
```

### 2. Start Frontend Client
```bash
cd frontend
npm install
npm run dev
# Vite client runs on http://localhost:5173
```
