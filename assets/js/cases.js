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
    title: "A/B test evaluation",
    summary: "Was the checkout redesign a real improvement, or noise in the data?",
    stack: ["Python", "pandas", "Matplotlib"],
    metric: "+3.4pp conversion, p = 0.02",
    context:
      "A two-week experiment on a redesigned checkout page, split evenly between control " +
      "and variant. The team wanted to ship based on the raw conversion difference alone.",
    task:
      "Determine whether the observed lift was statistically significant, check the test " +
      "was set up soundly, and give a clear ship / don't-ship recommendation.",
    approach:
      "Validated the split ratio and checked for sample-ratio mismatch before touching the " +
      "results. Ran a two-proportion z-test on conversion, computed the confidence interval " +
      "for the lift, and did a power calculation to confirm the sample was large enough to " +
      "detect the effect size the team cared about. Segmented by device to check the effect " +
      "wasn't driven by one platform.",
    result:
      "The lift held up at the 5% level and was consistent across desktop and mobile. " +
      "Recommended shipping, with a note that the confidence interval was wide enough that " +
      "the true effect could be roughly half the observed one.",
    image: null,
    docUrl: null
  },

  {
    id: "03",
    title: "Sales funnel diagnostics",
    summary: "Where users abandon the purchase flow, and what that costs per month.",
    stack: ["SQL", "Excel", "Power BI"],
    metric: "41% drop at payment step",
    context:
      "An e-commerce funnel with five steps from product page to order confirmation. " +
      "Overall conversion was falling but nobody could say which step was responsible.",
    task:
      "Quantify the drop-off at each step, find the biggest leak, and size the revenue " +
      "impact so the team could prioritise against other work.",
    approach:
      "Reconstructed the funnel from event data in SQL, handling users who skipped or " +
      "repeated steps. Built a Power BI dashboard with step-by-step conversion filterable " +
      "by device, traffic source and new-vs-returning. Multiplied the recoverable drop-off " +
      "by average order value to estimate monthly revenue at stake.",
    result:
      "The payment step lost 41% of users, concentrated on mobile. Sizing the leak turned " +
      "an abstract 'conversion is down' conversation into a specific number, which moved " +
      "the fix up the roadmap.",
    image: null,
    docUrl: null
  },

  {
    id: "04",
    title: "Marketing channel unit economics",
    summary: "Which acquisition channels pay for themselves, and how long they take to.",
    stack: ["SQL", "BigQuery", "Excel"],
    metric: "Payback 4.2 months",
    context:
      "Spend and revenue data across several paid and organic acquisition channels. " +
      "Channels were being compared on cost per install alone, which flattered the cheap " +
      "ones and hid what they were actually worth.",
    task:
      "Calculate CAC, LTV and payback period per channel, and say which channels deserve " +
      "more budget and which should be cut.",
    approach:
      "Joined spend data to user revenue by channel and signup month in SQL. Built LTV " +
      "curves per cohort rather than assuming a flat average, so channels with slow-burning " +
      "revenue weren't penalised. Calculated CAC per channel and the month at which " +
      "cumulative revenue crossed it.",
    result:
      "The cheapest channel by CAC had the worst payback – its users converted rarely and " +
      "spent little. Recommended shifting budget to a channel that looked expensive per " +
      "install but paid back in four months.",
    image: null,
    docUrl: null
  },

  {
    id: "05",
    title: "RFM customer segmentation",
    summary: "Splitting the customer base into groups worth treating differently.",
    stack: ["SQL", "Python", "Power BI"],
    metric: "18% of users, 61% of revenue",
    context:
      "A transactional dataset with no segmentation in place – every customer received the " +
      "same messaging regardless of how much or how recently they had bought.",
    task:
      "Build an RFM segmentation, size each segment, and identify which ones are worth " +
      "targeting first.",
    approach:
      "Scored recency, frequency and monetary value in SQL, using quintiles rather than " +
      "fixed thresholds so the segments stayed balanced. Grouped the scores into named " +
      "segments in Python, then built a Power BI view showing segment size against revenue " +
      "share and how customers moved between segments over time.",
    result:
      "A champions segment of 18% of customers drove 61% of revenue, while a large " +
      "at-risk group had bought recently enough to be worth a win-back campaign. Gave " +
      "marketing a concrete first target instead of the whole base.",
    image: null,
    docUrl: null
  }

];
