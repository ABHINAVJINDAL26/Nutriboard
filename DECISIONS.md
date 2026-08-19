# Engineering & Design Decisions — Tideline

### 1. Why this design direction & what took longer than expected

Most creator analytics dashboards feel like Bloomberg terminals crammed with 40 line charts, bounce rates, and vanity graphs that make people anxious. For Tideline, the whole premise was radical calm: deliver exactly three high-signal numbers once a week. 

I deliberately avoided typical SaaS tropes—no purple gradient mesh blobs, no floating 3D glass cards, and no meaningless graphs. I anchored the layout on **Fraunces** (an optical serif with warm, editorial italics) paired with **Plus Jakarta Sans** for structure and **JetBrains Mono** for numbers. 

The part that took noticeably longer than expected was dialling in the hero's 60/40 desktop composition and optical sizing. At 1440px wide, the layout felt either cluttered or hollow. I spent nearly two hours tweaking line-heights, asymmetric padding, and max-widths so the manifesto card felt grounded next to the weekly digest mockup without needing filler icons or decorative shapes to balance the space.

### 2. One trade-off made during development

I chose a **zero-dependency, zero-build architecture**—plain semantic HTML5, modular CSS with Custom Properties, and native ES Modules. The page loads in under 150ms and has zero supply-chain overhead.

The immediate trade-off was theme state management. Without a framework like React or Next.js to handle hydration, dark mode initially had a subtle white flash of unstyled content (FOUC) on hard reloads in dark mode. To fix it, I had to extract a tiny 4-line theme bootstrap script and place it blocking in the document `<head>` before the stylesheets load, reading `localStorage.getItem('tideline_theme')` and setting `document.documentElement.dataset.theme` synchronously before the browser paints the first frame.

### 3. AI usage & what was rejected

I used an LLM to quickly scaffold the responsive CSS Grid syntax for the 3-metric card container and to generate clean, accessible SVG paths for the metric status indicators.

What I explicitly rejected was the initial visual direction the AI suggested. When I asked for an analytics dashboard hero, it generated a generic SaaS template loaded with a multi-colored line chart, animated circular progress bars, and glowing neon purple pill tags. That completely violated the core product brand. I deleted all the charting code and replaced it with a clean, physical email card format showing just three clear metrics: readers who finished, verified human replies, and 30-day cohort retention.

If I had one more full week, I wouldn't add more metrics or animations. I would build a live **Substack/RSS feed parser** where a creator enters their publication link and the digest card instantly populates with their actual real-world readership data instead of static mockup values.
