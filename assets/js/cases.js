/* ============================================================================
   CASE STUDIES — this is the only file you need to edit to update your cases.
   ----------------------------------------------------------------------------
   To add a case:   copy one { ... } block, paste it, change the text.
   To remove one:   delete its { ... } block, including the trailing comma.
   To reorder:      move the blocks around — they render top to bottom.

   Field guide
     id       "01", "02" — the small number on the card
     title    short, concrete. "Cohort retention analysis", not "Case study 1"
     summary  ONE sentence: the business question. This is all a recruiter reads.
     stack    tools used — shown as small chips
     metric   the single headline number. Use null if there isn't one.
     context  where the data came from, what the situation was
     task     what exactly had to be figured out
     approach how you did it — methods, assumptions, anything tricky
     result   what you concluded and what the business should do about it
     image    "assets/img/cases/01.png" or null
     docUrl   link to your Google Doc, or null — the button hides itself

   IMPORTANT: in the Google Doc, set sharing to
   "Anyone with the link → Viewer", otherwise recruiters hit a request-access screen.

   Careful with quotes: if your text contains a double quote, write \" for it.
   ========================================================================== */

const CASES = [

  {
    id: "01",
    title: "Subscription price A/B test – AMO Case",
    summary: "Was the $6.99 to $9.99 price hike actually the win the first test said it was?",
    stack: ["Python", "pandas", "Statsmodels"],
    metric: "-$73,994 revenue impact",
    context:
      "A subscription fitness app with quiz-funnel onboarding and no free tier. Six months " +
      "earlier the price rose from $6.99 to $9.99 after a test reportedly showed no drop in " +
      "conversion — but revenue never followed, so the CEO asked for the test to be re-checked.",
    task:
      "Check whether that conclusion was right, quantify the real conversion impact, calculate " +
      "1.5-month LTV per price group including refunds and upsells, and give a pricing " +
      "recommendation backed by ROAS.",
    approach:
      "Audited the raw data first: found duplicate rows, a misrouted traffic day, and the " +
      "critical bug — Tier-1 test users were never actually charged $9.99. After excluding a " +
      "payment-outage day too, ran a z-test on the clean data. For LTV, projected immature " +
      "cohorts with chain-ladder retention factors, validated against matured ones, then " +
      "layered in refunds and OTP upsells.",
    result:
      "Conversion actually fell 8.96% (p = 0.0003), not flat as first reported. Per-user LTV " +
      "rose only 5.2%, not the 42% implied — so the conversion loss won out: revenue fell " +
      "$73,994, and ROAS barely moved. Recommended reverting to $6.99 and testing a smaller " +
      "increase instead.",
    image: null,
    docUrl: "https://app.notion.com/p/Genesis-Analytics-Camp-3-0-3a33f9d9c1b280d898ccc4fb00260c9e"
  },

  {
    id: "02",
    title: "Marketing Analytics – OBRIO Case",
    summary: "How much ad-spend data do you actually need before trusting a Stop or Scale call?",
    stack: ["SQL", "Python"],
    metric: "$26K saved (backtest)",
    context:
      "A subscription product company runs constant ad-creative tests, but each marketer " +
      "judged results their own way — some killed creatives on too little data, others waited " +
      "too long and burned budget on obvious losers. Leadership asked for one shared framework.",
    task:
      "Design a Stop / Continue / Scale framework: find the minimum data needed before any " +
      "decision is safe, define clear thresholds for obviously good or bad creatives, and " +
      "propose how to measure whether the framework actually works.",
    approach:
      "Analyzed 70K creatives in SQL. Found 75% never get a single conversion, so early ROMI " +
      "is meaningless — tested CTR as an early proxy and found no correlation with final ROMI " +
      "(r = 0.003). Tracked how often a creative's status flipped as spend grew to find where " +
      "ROMI stabilises, and how many future winners each stop threshold would kill by mistake.",
    result:
      "Set Stop at 200 clicks or 8,000 impressions with zero conversions (~5-7% error, reaching " +
      "under 1% of creatives), and Scale at $300+ spend with ROMI ≥ 30% (77% stayed profitable). " +
      "Below $300 spend ROMI is unreliable — up to 68% of eventual winners still look " +
      "unprofitable there. Backtested against real data and proposed Scale Precision, False " +
      "Stop Rate and Saved Spend to track it going forward.",
    image: null,
    docUrl: "https://www.canva.com/design/DAHRK4VJLnY/xHx8LrMkhwHNe9fx2lWQVw/view"
  },

  {
    id: "03",
    title: "Traffic Distribution System – appflame Case",
    summary: "Which ad offer should a click see, and how do you rank offers before you know if they'll pay?",
    stack: ["SQL"],
    metric: "97% revenue from 78% of clicks",
    context:
      "appflame needed a way to pick which ad offer to show on each click, but there was no " +
      "documented ranking logic, and brand-new offers with zero history had no fair way to " +
      "compete for traffic.",
    task:
      "Design an offer-ranking algorithm: define the core metric, decide how to segment it " +
      "reliably, handle offers with too little data, and validate the design against how the " +
      "live system actually behaves.",
    approach:
      "Defined RPC (Net Revenue / Clicks) as the ranking metric, computed at the most granular " +
      "reliable level — offer+geo+source, falling back to offer+geo, then offer, then a " +
      "payout-type average as volume drops below 50 clicks. Cleaned 21K duplicate rows first, " +
      "then validated by picking a real click and checking where the algorithm would have " +
      "ranked the offer actually shown.",
    result:
      "Priority offers take 78% of clicks but 97% of revenue, while Backfill eats 22% of " +
      "clicks for just 3% — and Mexico's entire 34K clicks fell into Backfill, a clear " +
      "coverage gap. On a real test click, the algorithm ranked the actual offer shown 4th of " +
      "68 candidates, a good match. Proposed a cold-start rule for brand-new offers and five " +
      "monitoring alerts to catch anomalies after launch.",
    image: null,
    docUrl: "https://app.notion.com/p/TDS-case-appflame-2026-3b73f9d9c1b2807f8506f3e008998443"
  },

  {
    id: "04",
    title: "Partner Traffic Anti-Fraud – TENTENS Case",
    summary: "Which ad networks are actually running fraud, and which just look suspicious?",
    stack: ["SQL", "Tableau"],
    metric: "2 of 14 networks flagged as fraud",
    context:
      "TENTENS Tech runs 14 partner ad networks driving app signups. Some had unusual " +
      "metrics, but unusual isn't automatically fraud — needed a systematic check to tell " +
      "real fraud from just a different price segment.",
    task:
      "Find which networks are actually running fraud, back each finding with at least two " +
      "independent metrics, classify the fraud type, and propose an ongoing monitoring " +
      "metric plus a dashboard.",
    approach:
      "Built a baseline metrics table (CPA, ROAS, chargeback rate) across all 14 networks in " +
      "SQL, then checked every outlier individually instead of trusting headline numbers. " +
      "Cleared four false positives — one was a premium segment, three had a real data gap " +
      "(activity log missing for two months), not dead traffic. Tested and rejected three " +
      "other fraud hypotheses before settling on chargeback rate as the signal that actually " +
      "caught both real cases.",
    result:
      "Confirmed carding fraud on two networks: one lossmaking in every country (14.98% " +
      "chargebacks vs a 0.45% baseline), one profitable but localised to the US. Four other " +
      "suspicious networks turned out clean. Recommended a weekly chargeback-rate alert by " +
      "network and country at 3x baseline, and built a Tableau dashboard for the team to " +
      "monitor it.",
    image: "assets/img/cases/04-tentens-dashboard.png",
    docUrl: "https://app.notion.com/p/Genesis-Analytics-Camp-3-0-3a73f9d9c1b28035900ad36c36be7e49"
  }

];
