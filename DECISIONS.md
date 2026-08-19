# Engineering & Design Decisions — Nutriboard

### 1. Why this design direction & what took longer than expected

I wanted Nutriboard to feel like a high-end personal health HUD rather than a boring spreadsheet. I chose a dark glassmorphic interface with high-contrast neon accents so users can assess their caloric and macro status at a glance without visual fatigue.

Architecturally, I enforced a strict decoupled design: **all mathematical operations, portion scaling, goal limits, and balance scoring stay exclusively on the backend**. The frontend is purely a presentation layer that renders server state. 

The piece that took longer than expected was getting the **Macro Balance Score** deviation formula right. Comparing raw grams didn't work because different goals (Weight Loss vs Muscle Gain) have wildly different total gram targets. I had to normalize both actual logged macros and goal targets into percentage splits (`protein%`, `carbs%`, `fats%`) before calculating absolute deviation. Handling the edge case where `totals.calories === 0` on first load was critical to avoid `NaN` or divide-by-zero crashes before any food was logged.

### 2. One trade-off made during development

I chose an **in-memory data store** over a full database like MongoDB or PostgreSQL. 

The upside was zero setup friction, sub-5ms API response times, and an architecture that is dead simple to demonstrate and trace during an assessment. The obvious trade-off is persistence—restarting the Node server resets the active food log. To keep this clean for future extension, I isolated all state mutations inside `budgetTracker.js` behind clean helper functions (`addFoodItem`, `deleteFoodItem`, `getSummary`), so swapping in a SQLite or Prisma persistence layer later requires touching only one file without altering any frontend API contracts.

### 3. AI usage & what was rejected

I used an LLM to quickly scaffold the circular SVG geometry (`stroke-dasharray` / `stroke-dashoffset` radius math) for the `BalanceGauge` component and generate the initial Express route handler boilerplates.

What I explicitly rejected was the AI's suggestion to handle portion calculations and goal deviation math inside React `useEffect` hooks on the client. Doing math on the frontend would have leaked business logic, made state harder to synchronize across components, and broken the separation of concerns. I stripped out all client-side calculation logic and moved it into dedicated backend services (`nutrientCalculator.js`, `balanceScoreCalculator.js`).

If I had one more full week, I would replace the simulated photo scanner with a real **camera stream integration using OpenAI's Vision API**, allowing users to snap an actual photo of their meal and receive estimated portion weights and macro breakdowns automatically.
