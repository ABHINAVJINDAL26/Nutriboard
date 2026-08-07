# VibeNutri: Calorie Tracker & Real-Time Macro Dashboard

VibeNutri is a full-stack health-tracking web application that serves as a daily food journal. The application scales nutritional values (calories, protein, carbs, fats) based on serving weights, displays visual calorie and macronutrient budgets, and prompts users with real-time alerts if their daily budget limit is exceeded.

## 🚀 Key Features

*   **Decoupled Architecture**: Strictly separates concerns. The backend handles all mathematical calculations, budget limits, scaling operations, and state evaluations, while the frontend functions purely as a presentation layer.
*   **Portion-Based Nutritional Scaling**: Dynamically scales baseline nutrients per 100g relative to the logged portion size in grams.
*   **Fitness Goal Management**: Dynamically switch between **Weight Loss** (1600 kcal), **Maintenance** (2000 kcal), and **Muscle Gain** (2500 kcal) profiles. Targets adjust immediately without resetting your active food history.
*   **Mock AI Scanner**: Logs a predefined healthy meal ("Grilled Chicken Bowl") using a single click to simulate photo recognition capabilities.
*   **Dynamic UI Feedback & Warning Modal**: The calorie budget progress bar dynamically changes color (green/blue for within limits, crimson red for exceeded) based on the backend status flag. A modal overlay alerts the user on the exact moment the threshold is breached.
*   **Interactive History Log**: Real-time listing of entries with the capability to delete logs and trigger automatic dashboard recalculations.

---

## 🛠️ Technology Stack

*   **Frontend**: React (Vite), Functional Components, Hooks, Context-like state binding, Vanilla CSS variables.
*   **Backend**: Node.js, Express, Cors middleware, In-memory state storage.

---

## 📂 Project Architecture

```
Quantiphi/
├── backend/
│   ├── data/
│   │   └── foodBaseline.js       # Database lookup for baseline nutrition per 100g
│   ├── controllers/
│   │   └── foodController.js     # Express request-response controllers
│   ├── services/
│   │   ├── nutrientCalculator.js # Portion scaling algorithm & mock scan generation
│   │   └── budgetTracker.js      # Memory storage state & running totals calculator
│   ├── routes/
│   │   └── foodRoutes.js         # API endpoint definitions
│   ├── server.js                 # App entry point, middlewares, and port configurations
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoggingPanel.jsx      # Food manual entry & photo scanner simulation
│   │   │   ├── CalorieBar.jsx        # Primary calorie progress display card
│   │   │   ├── MacroBars.jsx         # Triple macro (protein, carbs, fats) progress cards
│   │   │   ├── FoodHistoryList.jsx   # List table with delete buttons
│   │   │   ├── WarningModal.jsx      # Alert popup trigger
│   │   │   └── FitnessGoalToggle.jsx # 3-option fitness goal selector
│   │   ├── api/
│   │   │   └── foodApi.js            # Frontend HTTP client wrapper
│   │   ├── App.jsx                   # Main layout coordinator & State Binder
│   │   ├── App.css                   # Grid layout structures
│   │   ├── index.css                 # Color scheme, typography, glassmorphism design
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## 📡 API Design

### `GET /api/foods`
Retrieves the logged meal journal and current aggregate status.
*   **Response (200 OK)**:
    ```json
    {
      "foods": [],
      "totals": { "calories": 0, "protein": 0, "carbs": 0, "fats": 0 },
      "targets": { "calories": 2000, "protein": 140, "carbs": 220, "fats": 65 },
      "goal": "maintenance",
      "status": "OK"
    }
    ```

### `POST /api/foods`
Adds a meal. Accepts custom gram portion or a boolean mock scan flag.
*   **Request Body (Manual Entry)**:
    ```json
    {
      "name": "chicken",
      "grams": 200
    }
    ```
*   **Request Body (AI Scan Simulation)**:
    ```json
    {
      "mock": true
    }
    ```
*   **Response (201 Created)**: Updated dashboard summary structure.

### `DELETE /api/foods/:id`
Deletes a logged food item.
*   **Response (200 OK)**: Recalculated dashboard summary structure.

### `POST /api/goal`
Changes the daily fitness goal.
*   **Request Body**:
    ```json
    {
      "goal": "weightLoss"
    }
    ```
*   **Response (200 OK)**: Recalculated target values and adjusted status codes.

---

## ⚙️ Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 1. Launch the Backend Server
```bash
cd backend
npm install
npm start
```
The server starts on: **`http://localhost:5000`**

### 2. Launch the React Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application starts on: **`http://localhost:5174`** (or another port provided in console log).

---

## 🧪 Edge Cases Handled
1.  **Empty/Blank Input Validation**: Blocks submission of meals with whitespace-only names.
2.  **Invalid Portions**: Blocks decimal portions `<= 0` or text strings from being sent to the backend.
3.  **Cross-Goal Memory Persistence**: Meal lists are stored independently of selected target limits; changing target goals recalculates status immediately without database loss.
4.  **Case Insensitivity**: Searching `Chicken`, `chicken`, or `  cHicKen ` correctly maps to `chicken` in base nutrition lookup tables.
