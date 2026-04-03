# CrohnsApp — Comprehensive Project Plan
**Version 1.0 — March 31, 2026**

---

## Table of Contents
1. [What This App Is](#1-what-this-app-is)
2. [Why It Matters](#2-why-it-matters)
3. [Competitive Landscape](#3-competitive-landscape)
4. [Our Unfair Advantage](#4-our-unfair-advantage)
5. [Core Design Philosophy](#5-core-design-philosophy)
6. [Feature Roadmap (5 Phases)](#6-feature-roadmap)
7. [Technical Architecture](#7-technical-architecture)
8. [Medical Content Strategy](#8-medical-content-strategy)
9. [Monetization Strategy](#9-monetization-strategy)
10. [Regulatory & Legal Requirements](#10-regulatory--legal-requirements)
11. [Funding & Partnership Strategy](#11-funding--partnership-strategy)
12. [Cost Breakdown by Phase](#12-cost-breakdown-by-phase)
13. [Risk Analysis](#13-risk-analysis)
14. [Success Metrics](#14-success-metrics)
15. [Immediate Next Steps](#15-immediate-next-steps)

---

## 1. What This App Is

A **personal health management platform built exclusively for people with Crohn's disease** — with special depth for post-surgical patients who've had bowel resection. It's a daily companion that helps you:

- Know what to eat (and what to avoid) based on YOUR body, not generic advice
- Scan any food label and instantly know if it's safe for you
- Track symptoms and discover YOUR personal trigger foods over time
- Follow evidence-based dietary phases after surgery
- Stay on top of medications, nutrients, and hydration
- Prepare for doctor appointments with real data
- Access curated, up-to-date research and findings about Crohn's disease
- Plan meals and generate grocery lists from foods you know are safe

**What it is NOT**: It is not a medical device. It does not diagnose, treat, or prescribe. It's a self-management tool that makes you a more informed patient.

---

## 2. Why It Matters

### The Problem
- **1.6 million Americans** have IBD (Crohn's or Ulcerative Colitis)
- 52% of Crohn's patients report **sub-optimally controlled disease**
- After bowel resection, patients face specific nutritional deficiencies (B12, bile acids, fat-soluble vitamins) that require different management than general Crohn's
- Existing information is fragmented — patients piece together advice from Google, Reddit, multiple apps, and conflicting doctor opinions
- No single app addresses the **post-surgical Crohn's patient** — a population with well-documented, specific needs that differ from general IBD management

### The Opportunity
- Health app industry: **$3.5 billion in 2025** (23.5% YoY growth)
- Digital health VC funding: **$14.2 billion in 2025** (35% increase)
- Health/fitness apps monetize at **2x the rate** of other app categories
- The post-surgical Crohn's niche has **zero direct competitors**

---

## 3. Competitive Landscape

### What Exists Today

| App | Price | Strengths | Critical Weaknesses |
|-----|-------|-----------|-------------------|
| **My IBD Care** | Free | Wearable integration, holistic tracking | No food scanning, no meal planning, no food-symptom correlation |
| **Oshi Health** | $250/visit | Full virtual care team | Telehealth platform, not self-management. Expensive without insurance |
| **Ayble Health** | Subscription | 4-phase elimination diet, nutrition-first | Insurance-dependent, no barcode scanning, no post-surgical guidance |
| **Crohn's Tracker** | $9.99/mo | Barcode scanner (new), PDF reports | Shallow food database, no IBD-specific classification, no meal planning |
| **GI Buddy** | Free | Simple symptom log, IBD impact score | Basic logging only — no intelligence, no food analysis |
| **LyfeMD** | Free | Highest-rated in clinical studies | **Canada only** — unavailable to US patients |
| **Cara Care** | Freemium | Low-FODMAP guidance, food-symptom tracking | General GI app, not Crohn's-specific. No post-surgical features |

### What Every Existing App Is Missing
1. **Post-surgical dietary guidance** — phased recovery plans for bowel resection
2. **Intelligent food scanning** — classifying by FODMAP, fiber type, flare safety (not just calories)
3. **Nutrient deficiency tracking** — B12, bile acids, vitamins A/D/E/K, iron, zinc, magnesium
4. **Flare vs. remission modes** — different guidance depending on disease state
5. **AI-driven personalization** — learning YOUR triggers, not generic lists
6. **Meal plan + grocery list generation** — from YOUR safe foods
7. **Fasting guidance** — evidence-based intermittent fasting recommendations for IBD

---

## 4. Our Unfair Advantage

### Built by a Patient, for Patients
This isn't a corporate product built by people who've never experienced a flare. It's built by someone who lives with Crohn's, has had bowel resection surgery, and knows firsthand what information is missing.

### Niche Specificity
Every competitor targets "IBD" broadly. We target **Crohn's disease patients, especially post-surgical**. This specificity means:
- Every feature is designed with Crohn's pathology in mind
- Food analysis considers Crohn's-specific concerns (not just calories or macros)
- Post-resection nutritional needs are a first-class feature, not an afterthought
- The app assumes you have Crohn's — no generic health content

### Positioning Statement
> The first and only app designed specifically for Crohn's disease patients who have undergone bowel resection — combining intelligent food analysis, personalized symptom tracking, and evidence-based dietary guidance in a single platform.

---

## 5. Core Design Philosophy

### Designing for Sick People
This is the most important section of this plan. Our users interact with this app while **fatigued, in pain, brain-fogged, nauseous, sleep-deprived, and emotionally drained**. Every design decision flows from this reality.

### The 7 Design Principles

**1. Assume the User is at Their Worst**
- Test every flow one-handed, with blurred vision, with a 5-second attention span
- Maximum 10 seconds to log any data point: open → tap → done
- One primary action per screen. No decision overload

**2. Flexible Granularity**
- Quick mode: "How are you?" → Good / Okay / Bad (one tap)
- Detailed mode: Bristol stool scale, pain 1-10, specific symptoms
- The user chooses their level of engagement. Never force detail

**3. No Guilt, Ever**
- Never: "You missed 3 days!" or streak-breaking punishment
- Instead: "Welcome back. Want to add anything from recently?"
- Missed days during a flare are the NORM, not a failure
- Catch-up flows for backfilling missed entries without judgment

**4. Dark Mode is Day One — Not V2**
- Crohn's patients are up at 3 AM. A bright white screen is hostile
- Default to system setting, allow manual override
- True OLED black (#000000) backgrounds for battery savings
- Slightly reduced contrast in dark mode (#E0E0E0 text, not pure white) to prevent halation

**5. Offline-First Architecture**
- All data writes locally first. Sync is secondary
- Patients log food in restaurants with poor signal, hospital basements, rural areas
- Every feature must work without internet. Period
- Full data export available offline (PDF generation from local data)

**6. Privacy as a Core Feature**
- Biometric lock (Face ID / fingerprint) — users don't want bowel habits visible if someone picks up their phone
- Blur/hide content in app switcher (screen privacy)
- All data encrypted at rest and in transit
- Local-only mode available (zero cloud, zero sync) for maximum privacy
- Granular data export and complete account deletion
- Transparent data practices explained during onboarding BEFORE asking for any health data

**7. Insight is the Reward**
- More tracking = better pattern recognition = more useful app
- Gamification through data richness, not badges or streaks
- "You now have enough data for weekly trend analysis" > "Achievement unlocked!"
- Progress bars tied to unlocking analytical capabilities, not arbitrary XP

### Accessibility Requirements (Non-Negotiable)
| Requirement | Standard |
|-------------|----------|
| Minimum font size | 16px base, user-scalable to 200% |
| Contrast ratios | WCAG AAA (7:1) for health data |
| Tap targets | 48x48dp minimum (larger for frequent actions) |
| Color usage | Never sole indicator — always color + icon + label |
| Navigation | Bottom tab bar in thumb zone. Never hide primary nav |
| Screen readers | Full VoiceOver / TalkBack support |
| Motion | Respect `prefers-reduced-motion` (animations can trigger nausea) |
| Voice input | Voice notes for symptom descriptions |
| Haptic feedback | Subtle confirmation on successful logs |
| Language level | Grade 6-8 reading level. Plain language, not medical jargon |

### Onboarding (Under 60 Seconds to First Value)
1. **Screen 1**: Name, diagnosis type (Crohn's), when diagnosed
2. **Screen 2**: Have you had surgery? (Yes/No → which type)
3. **Screen 3**: "What matters most to you?" Pick 1-2: track food triggers / manage medications / prepare for doctor visits / understand patterns
4. **Done** — into the app. First action: log a meal or how you're feeling
5. Everything else collected over the first 2 weeks through contextual, skippable prompts

---

## 6. Feature Roadmap

### Phase 1: Foundation (Months 1-3) — Cost: $0

**Goal**: A working app you actually use every day.

**Daily Dashboard**
- Morning check-in: "How are you feeling?" with quick-tap options
- Disease state toggle: Flare / Remission / Uncertain (changes guidance throughout app)
- Today's summary: meals logged, symptoms, medications taken, hydration
- Calendar heat map: month-at-a-glance showing good days (green), moderate (yellow), bad (red)

**Food Diary**
- Manual food entry with searchable database
- Quick-log: tap to re-log frequent/recent meals
- Meal photos (stored locally, optional)
- Meal timing tracking (breakfast/lunch/dinner/snack with timestamps)
- Notes field for each entry

**Symptom Tracker**
- Bristol Stool Scale (visual picker, introduced naturally on first log — not during onboarding)
- Pain level (1-10 slider or quick Low/Medium/High)
- Symptom checklist: diarrhea, urgency, bloating, gas, fatigue, nausea, cramping, blood, joint pain, skin issues, mouth sores
- Frequency tracking (how many bowel movements today)
- Energy level
- Free-text notes / voice notes

**Medication Manager**
- Add current medications with dosage and schedule
- Push notification reminders
- Taken/skipped/missed logging
- Medication history timeline

**Post-Resection Dietary Guide (Educational)**
- Phase 1: Clear liquids (days 1-7 post-surgery)
- Phase 2: Low-residue/low-fiber (weeks 1-4)
- Phase 3: Gradual reintroduction (months 2-3+)
- Safe food lists per phase
- Critical nutrients to monitor after ileal resection: B12, bile acids, vitamins A/D/E/K, iron, calcium, zinc, magnesium, folate
- What each nutrient does, why resection affects it, supplementation guidance

**Crohn's Knowledge Hub**
- What is Crohn's disease (written for patients, not doctors)
- Types/locations of Crohn's (ileal, colonic, ileocolonic, upper GI)
- Disease stages and progression
- Common medications and what they do
- When to call your doctor (red flag symptoms)
- Living with an ostomy (if applicable)
- Dietary frameworks overview: Low-FODMAP, CDED, SCD, Mediterranean
- All content written in our own words, citing medical guidelines (ACG, AGA, ECCO)

**Technical Implementation**
- React Native + Expo (cross-platform, free)
- TypeScript (type safety)
- SQLite via expo-sqlite (local storage, offline-first)
- React Navigation (tab-based, bottom nav)
- Dark mode from day one (design token system for theming)
- Biometric auth (expo-local-authentication)

---

### Phase 2: Food Intelligence (Months 4-6) — Cost: ~$25-50/month

**Goal**: Scan any food and know if it's safe for you.

**Barcode Scanner**
- Camera-based barcode scanning (react-native-vision-camera, free)
- Lookup against Open Food Facts API (free, open-source, 3M+ products)
- Fallback: manual search if barcode not found
- Option to submit missing products to Open Food Facts community database

**Crohn's Classification Engine**
A local rules engine that analyzes scanned/entered foods and rates them across Crohn's-relevant dimensions:

| Dimension | What It Shows |
|-----------|--------------|
| FODMAP Level | High / Medium / Low based on ingredient analysis |
| Fiber Type | Soluble vs. insoluble, total grams |
| Known Trigger Score | Flags ingredients commonly problematic for Crohn's: lactose, sugar alcohols (sorbitol, mannitol, xylitol), emulsifiers (carrageenan, polysorbate 80, CMC), high-fructose corn syrup, artificial sweeteners |
| Flare Safety | Safe during flare / Caution / Avoid during flare |
| Post-Resection Compatibility | Flags concerns specific to resection: high-fat content (bile acid overload), high-oxalate (kidney stone risk), insoluble fiber (obstruction risk) |
| Nutrient Highlights | Flags foods high in nutrients you need: B12, iron, calcium, zinc |

**Output for each scanned item:**
- Overall rating: Green (likely safe) / Yellow (proceed with caution) / Red (likely problematic)
- Specific flags with plain-language explanations: "Contains carrageenan — a common IBD trigger emulsifier"
- Personalized override: "You've eaten this 3 times with no symptoms logged" (once enough data exists)

**Basic Food-Symptom Correlation**
- Algorithm connecting food logs to symptom entries within 2-24 hour windows
- Lag-adjusted analysis (Crohn's reactions can be delayed)
- Visual timeline overlay: food intake on one track, symptoms on another
- Monthly report: "Foods associated with your worst symptom days"

**Hydration Tracker**
- Daily water intake logging (quick-tap glasses)
- Electrolyte tracking (critical post-resection)
- Reminders based on user preferences

---

### Phase 3: Intelligence & Personalization (Months 7-12) — Cost: ~$50-150/month

**Goal**: The app learns YOU and proactively helps.

**AI-Powered Meal Planning**
- Generate weekly meal plans from your personal safe foods list
- Respect dietary restrictions, preferences, budget
- Adjust for disease state (flare meals vs. remission meals)
- Nutritional balancing — ensure plans cover deficiency-prone nutrients
- Powered by Claude API (pay-per-use, ~$0.01-0.05 per meal plan generation)

**Smart Grocery Lists**
- Auto-generated from meal plans
- Organized by store section
- Mark items as purchased
- Favorite/save lists for reuse

**Flare Prediction & Pattern Analysis**
- Correlate stress levels, sleep quality, food intake, weather, menstrual cycle, and symptoms
- Surface patterns: "Your flares tend to follow periods of poor sleep + high stress"
- NOT a diagnostic claim — framed as: "Here are patterns in your data you may want to discuss with your doctor"
- Uses on-device ML where possible to preserve privacy

**Research Feed**
- Curated Crohn's disease research from PubMed API (free)
- AI-summarized abstracts in plain language
- Categorized: Diet, Medications, Surgery, Biologics, Lifestyle, Mental Health
- Saved/bookmarked articles for doctor discussions
- Weekly digest notification (optional)

**Fasting Guidance**
- Evidence-based information on intermittent fasting and Crohn's
- When fasting may help vs. when it's risky (active flare = don't fast)
- Fasting timer with meal window reminders
- Hydration emphasis during fasting periods

**Nutrient Deficiency Dashboard**
- Track supplements you're taking
- Lab value logging (B12, vitamin D, iron/ferritin, CRP, calprotectin, etc.)
- Visual trends of lab values over time
- Reminders for when to retest based on your GI's schedule
- Educational content: what each lab value means for Crohn's

**Doctor Report Generation**
- Exportable PDF summaries for GI appointments
- Configurable: choose date range, what data to include
- Symptom frequency, food triggers identified, medication adherence, lab trends
- Bristol Stool Scale trend line
- Flare timeline with duration and severity
- Generated locally (works offline)

---

### Phase 4: App Store Launch (Months 10-14) — Cost: ~$125 one-time + $99/year

**Goal**: Published on both Apple App Store and Google Play.

**Pre-Launch Requirements**
| Requirement | Details | Cost |
|-------------|---------|------|
| Apple Developer Program | Annual membership | $99/year |
| Google Play Developer | Organization account (mandatory for health apps) | $25 one-time |
| Privacy Policy | Comprehensive, plain-language, compliant with GDPR/CCPA/WA My Health My Data Act | $500-2,000 (legal review) or DIY with templates |
| Medical Disclaimer | In-app + first paragraph of both store listings | Free (template provided in regulatory research) |
| Terms of Service | Standard app ToS | Include with privacy policy |
| FDA Regulatory Consultation | Confirm feature set stays in "wellness" category | $5,000-15,000 (one-time, recommended but optional) |

**App Store Optimization**
- Screenshots showing key features (dark mode + light mode)
- Short video preview (30 seconds)
- Keywords: Crohn's disease, IBD, food tracker, symptom tracker, bowel resection, FODMAP
- Category: Health & Fitness (NOT Medical — keeps us in wellness lane)
- Disclaimer in first paragraph of Google Play description (required)

**Beta Testing**
- TestFlight for iOS (free, up to 10,000 testers)
- Google Play internal testing track (free)
- Recruit beta testers from:
  - Reddit r/CrohnsDisease (80,000+ members)
  - Crohn's & Colitis Foundation community
  - Personal network of Crohn's patients
- Structured feedback: onboarding experience, daily use friction, feature requests, bugs

**Launch Checklist**
- [ ] All data encrypted at rest and in transit
- [ ] Biometric lock functional
- [ ] Data export (JSON/CSV) working
- [ ] Account deletion working (within 30 days)
- [ ] Privacy policy accessible in-app and on store listing
- [ ] Medical disclaimer prominently displayed
- [ ] HealthKit rules followed (if integrated)
- [ ] Health Connect declaration completed (Google Play)
- [ ] App tested on 10+ device configurations
- [ ] Accessibility audit passed (VoiceOver, TalkBack, contrast, tap targets)
- [ ] Crash-free rate > 99%
- [ ] Offline functionality verified

---

### Phase 5: Growth & Scale (Year 2+) — Cost: Variable

**Wearable Integration**
- Apple Watch: HealthKit (sleep, steps, heart rate)
- Fitbit / Google Fit: Health Connect
- Oura Ring: sleep quality, readiness score
- Passive data collection reduces manual logging burden

**Community Features**
- Anonymous forum for Crohn's patients
- Topic channels: Diet, Surgery Recovery, Medications, Mental Health, Flare Support
- Moderated for medical misinformation
- Read-only access free; posting requires account

**Dietitian Marketplace** (Phase 5b — requires legal planning)
- Connect with IBD-specialized dietitians for consultations
- In-app booking and video calls
- Structured to avoid triggering HIPAA (independent dietitians, cash-pay, separate data systems)
- Requires healthcare compliance attorney review before launch

**Restaurant Navigator**
- Search nearby restaurants
- Menu analysis against your safe food profile
- Community-sourced "Crohn's friendly" restaurant ratings
- "What can I eat here?" feature

**Caregiver/Family Mode**
- Shared view for family members managing a patient's care
- Permission-based: patient controls exactly what caregivers see
- Meal prep coordination
- Appointment reminders shared with caregivers

**Multi-Language Support**
- Spanish, French, German, Portuguese (largest IBD populations outside English-speaking countries)
- RTL support for Arabic

**International Expansion**
- Partner with Crohn's and Colitis Canada, Crohn's & Colitis UK
- Adapt food databases for regional products
- Comply with regional privacy laws (GDPR already planned for)

---

## 7. Technical Architecture

### Stack (All Free/Open-Source for Phase 1-2)

| Layer | Technology | Cost | Why |
|-------|-----------|------|-----|
| **Framework** | React Native + Expo | Free | Cross-platform (iOS + Android), largest JS ecosystem for food/nutrition APIs, mature health integrations, smaller binary size than Flutter |
| **Language** | TypeScript | Free | Type safety prevents bugs in health data handling |
| **Local Database** | SQLite (expo-sqlite) | Free | Offline-first, fast, no server needed, battle-tested |
| **State Management** | Zustand | Free | Lightweight, simple, works great with React Native |
| **Navigation** | React Navigation | Free | Tab-based bottom nav, standard for RN apps |
| **Barcode Scanning** | react-native-vision-camera | Free | Fast, reliable camera-based scanning |
| **Food Database** | Open Food Facts API | Free | Open-source, 3M+ products, community-maintained |
| **Charts/Viz** | Victory Native or react-native-chart-kit | Free | Accessible, customizable health visualizations |
| **Notifications** | expo-notifications | Free | Local push notifications for medication reminders |
| **Biometric Auth** | expo-local-authentication | Free | Face ID / Touch ID / Fingerprint |
| **Theming** | React Native design tokens | Free | Dark/light mode from day one |

### Backend (Phase 2-3, When Needed)

| Layer | Technology | Cost | Why |
|-------|-----------|------|-----|
| **Backend-as-a-Service** | Supabase | Free tier (500MB DB, 1GB storage, 50K monthly active users) | Open-source, PostgreSQL-based, row-level security, auth built-in |
| **Authentication** | Supabase Auth | Free tier | Email/password + social login + biometric |
| **Cloud Storage** | Supabase Storage | Free tier | Food photos, user exports |
| **Sync** | Custom sync layer | Free | Delta sync only (changed records), bandwidth-efficient |
| **AI/ML** | Claude API | ~$0.01-0.05/request | Meal planning, food analysis, research summarization |
| **Research Feed** | PubMed E-utilities API | Free | Curated Crohn's research |
| **Medication Data** | RxNorm (NLM) | Free | Medication identification and interactions |

### Architecture Principles

```
┌─────────────────────────────────────────────┐
│                   App Layer                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │Food Scan │  │ Reports  │   │
│  │ Screen   │  │ Screen   │  │ Screen   │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │              │              │         │
│  ┌────┴──────────────┴──────────────┴────┐   │
│  │         State Management (Zustand)     │   │
│  └────────────────┬──────────────────────┘   │
│                   │                           │
│  ┌────────────────┴──────────────────────┐   │
│  │         Local Database (SQLite)        │   │
│  │    ← ALL reads/writes go here first    │   │
│  └────────────────┬──────────────────────┘   │
│                   │                           │
│  ┌────────────────┴──────────────────────┐   │
│  │     Background Sync (when online)      │   │
│  │    → Delta sync to Supabase            │   │
│  └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

**Key rule**: SQLite is the source of truth. The cloud is a backup. The app works fully offline.

### Data Model (Core Tables)

```
users
  - id, name, diagnosis_type, diagnosis_date, surgery_type, surgery_date
  - disease_state (flare/remission/uncertain)
  - dietary_phase (post_surgical_1/post_surgical_2/reintroduction/maintenance)
  - created_at, updated_at

food_entries
  - id, user_id, timestamp, meal_type (breakfast/lunch/dinner/snack)
  - food_name, barcode, brand
  - serving_size, calories, macros (fat/protein/carbs/fiber)
  - fodmap_level, fiber_type, trigger_score, flare_safety
  - photo_uri, notes
  - created_at

symptom_entries
  - id, user_id, timestamp
  - overall_feeling (1-5)
  - bristol_scale (1-7)
  - bowel_movement_count
  - pain_level (1-10)
  - symptoms[] (diarrhea, urgency, bloating, gas, fatigue, nausea, cramping, blood, joint_pain, skin, mouth_sores)
  - energy_level (1-5)
  - notes, voice_note_uri
  - created_at

medications
  - id, user_id, name, dosage, frequency, time_of_day
  - category (biologic, immunomodulator, steroid, aminosalicylate, antibiotic, supplement, other)
  - active (boolean)
  - created_at

medication_logs
  - id, medication_id, timestamp
  - status (taken/skipped/missed)

supplements
  - id, user_id, name, dosage, frequency
  - nutrient_type (B12, vitamin_D, iron, calcium, zinc, magnesium, folate, bile_acid_sequestrant, other)
  - active (boolean)

lab_values
  - id, user_id, test_date
  - test_type (B12, vitamin_D, ferritin, CRP, calprotectin, CBC, etc.)
  - value, unit, reference_range
  - notes

hydration_logs
  - id, user_id, timestamp
  - amount_ml, type (water/electrolyte/other)

correlations (computed)
  - id, user_id, food_id, symptom_pattern
  - lag_hours, confidence_score
  - occurrences, last_computed
```

---

## 8. Medical Content Strategy

### Content Principles
1. **Written in our own words** — synthesized from multiple peer-reviewed sources, never copied
2. **Cited properly** — "Based on ACG Clinical Guidelines, 2023" or "Per Crohn's & Colitis Foundation recommendations"
3. **Reviewed by a GI specialist** before publication (find a medical advisor)
4. **Grade 6-8 reading level** — plain language, not medical jargon
5. **Disclaimed** — every content section includes "This information is for educational purposes. Consult your healthcare provider."

### Content Sources (Legal to Use)
| Source | What We Can Use | Restrictions |
|--------|----------------|-------------|
| PubMed abstracts | Freely reference/summarize | Cite the source |
| Open-access articles (CC-BY) | Use, adapt, share | Attribution required |
| ACG/AGA clinical guidelines | Summarize in own words | Cannot reproduce full text |
| Crohn's & Colitis Foundation | Summarize; pursue content partnership | Contact for formal permission |
| WHO/CDC guidelines | Freely use | Government works |
| NLM/RxNorm drug data | Freely use | Public domain |

### Content We Need to Create

**Phase 1 Content (Built into MVP)**
- What is Crohn's Disease — 800-1000 words
- Types of Crohn's (by location) — 500 words each
- Post-Resection Recovery Guide — 2000 words (our flagship content)
- Critical Nutrients After Surgery — 500 words per nutrient (8 nutrients = 4000 words)
- Dietary Frameworks Overview — 500 words each (FODMAP, CDED, SCD, Mediterranean)
- Common Medications Guide — 200 words per medication class
- When to Call Your Doctor — red flag symptoms list
- Living with Crohn's Daily — practical tips

**Phase 3 Content (Research Feed)**
- Weekly curated PubMed research (automated via API + AI summarization)
- Monthly "What's New in Crohn's Research" digest
- Medication news and updates

### Medical Advisory
- Recruit 1-2 GI specialists or IBD-specialized dietitians as unpaid medical advisors
- Offer: app credit, advisor title, future equity consideration
- Their role: review content accuracy, validate food classification rules, guide feature priorities
- Where to find them: Crohn's & Colitis Foundation network, Crohn's and Colitis Dietitians network

---

## 9. Monetization Strategy

### The Model: Freemium with 21-Day Trial

Based on market research, health apps convert at **39.9% median trial-to-paid** — 2x other categories. Longer trials (17-32 days) convert at **45.7%** — and a 3-week trial aligns perfectly with Crohn's: patients need time to see food-symptom correlations emerge.

### Pricing

| Tier | Price | What's Included |
|------|-------|----------------|
| **Free Forever** | $0 | Basic symptom logging, basic food logging, medication reminders, educational content (disease basics), daily dashboard |
| **Premium Monthly** | $9.99/month | Everything — after 21-day free trial |
| **Premium Annual** | $59.99/year ($4.99/mo effective) | Everything — after 21-day free trial. **Push as default option** (users 57% more likely to choose annual for health goals) |

### What's Free vs. Premium

**FREE** (the hook — enough to be useful, creates data that makes premium compelling):
- Daily dashboard with check-in
- Basic food logging (manual entry)
- Basic symptom tracking
- Medication reminders
- Post-resection dietary phase guide (read-only educational content)
- Crohn's knowledge hub (all educational content)
- Basic calendar view

**PREMIUM** (the value — intelligence, personalization, actionable insights):
- Barcode scanning with Crohn's classification
- AI food-symptom correlation analysis
- Personalized meal plans
- Smart grocery lists
- Doctor-ready PDF reports
- Advanced analytics and trend visualization
- Nutrient deficiency dashboard with lab tracking
- Flare pattern analysis
- Research feed with AI summaries
- Fasting guidance and timer
- Wearable integration
- Unlimited food photo storage

### Why This Works
- Free tier provides genuine daily value — patients will use it
- After 2-3 weeks of logging, the FREE data makes premium features irresistible: "You have 21 days of data. Upgrade to see which foods correlate with your worst days."
- The insight-unlock model means the longer they use free, the MORE valuable premium becomes
- $9.99/month is competitive (Crohn's Tracker charges the same but offers less)
- Annual pricing ($4.99/mo effective) feels affordable for a chronic condition tool

### Future Revenue Streams (Year 2+)
1. **Dietitian consultations**: $29.99-49.99/session add-on
2. **HSA/FSA eligibility**: Provide Letter of Medical Necessity templates so users can get reimbursed
3. **Employer wellness benefits**: Partner with employers who offer health stipends
4. **B2B/Insurance partnerships**: Long-term (year 3+) after building clinical evidence
5. **Anonymized research data**: Aggregate, de-identified insights sold to research institutions (with user consent, never individual data)

---

## 10. Regulatory & Legal Requirements

### FDA: Stay in the "Wellness" Lane

**The January 2026 FDA guidance update is favorable**: regulatory status is determined by how you **market** the app, not inherently by what it does.

**SAFE language** (use this everywhere):
- "Track," "log," "visualize," "patterns," "self-management," "wellness"
- "Here are patterns in your data you may want to discuss with your doctor"
- "This information is for educational purposes"

**NEVER use** (this triggers medical device classification):
- "Diagnose," "detect," "predict flares," "treat," "prescribe"
- "ALERT: Flare detected"
- "Your calprotectin level is abnormal"
- "You should take [medication]"
- "Medical-grade accuracy"

### App Store Requirements

| Requirement | Apple App Store | Google Play |
|-------------|----------------|-------------|
| Developer account | $99/year | $25 one-time, **Organization account required** |
| Privacy policy | In-app + store listing | In-app + store listing |
| Medical disclaimer | Required | **First paragraph** of store description |
| Data encryption | HTTPS/SSL-TLS mandatory | SSL/TLS mandatory |
| User consent | Explicit opt-in for health data | Explicit permission |
| Health platform rules | HealthKit: no iCloud storage, no advertising use | Health Connect: strict eligibility, justified data types |
| Review timeline | 1-3 days (can be longer for health) | 7-14 days for health apps |
| Category | Health & Fitness (NOT Medical) | Health & Fitness (NOT Medical) |

### Privacy Law Compliance

We must comply with **all three** from day one:

**GDPR** (European users): Explicit opt-in consent, right to access/erasure/portability, data minimization, 72-hour breach notification

**CCPA/CPRA** (California users): Transparency on data collection, right to know/delete, "Do Not Sell" mechanism, specific data retention timeframes

**Washington My Health My Data Act** (most aggressive — has private right of action):
- Separate consent for collection vs. sharing
- Published data retention policy with specific timeframes
- Complete account deletion capability
- Cannot geofence around healthcare providers

### HIPAA

**Phase 1-4: NOT subject to HIPAA.** A standalone self-management app downloaded by consumers is not a covered entity.

**Phase 5 (if adding dietitian consultations): May trigger HIPAA.** Must engage healthcare compliance attorney. Structure: independent dietitians, cash-pay only, separate data systems to minimize HIPAA exposure. Budget $50K-150K if full HIPAA compliance needed.

### Required Disclaimers

**In-app (on first launch and in Settings > About)**:
> "[App Name] is not a medical device. It does not diagnose, treat, cure, or prevent any disease or condition. The information provided is for general wellness and self-management purposes only. Always consult your healthcare provider before making changes to your diet, medication, or treatment plan."

**Google Play description (first paragraph)**:
> "This app is not a medical device and does not diagnose, treat, or prevent any condition. It is a self-management tool designed to help you track and understand your personal health patterns."

---

## 11. Funding & Partnership Strategy

### Phase 1: Bootstrap (Months 1-6)
- **Self-funded**: Your time is the investment. $0 out of pocket for development
- **Apply to IBD Ventures**: Crohn's & Colitis Foundation offers up to **$500,000/year** with accelerator support. Next LOI deadline typically February or August. 5% acceptance rate but our niche (post-surgical Crohn's management) is exactly what they fund
- **Apply to IBD Innovate**: CCF product development showcase — networking with industry, investors, clinical experts

### Phase 2: Validate (Months 6-12)
- **Beta test with r/CrohnsDisease** community (80,000+ members)
- **Recruit 1-2 medical advisors**: IBD-specialized dietitians from Crohn's and Colitis Dietitians network
- **Approach 1 academic medical center** for pilot study (offer free research license in exchange for validation data)
- **Top targets**: Mass General, Mayo Clinic, University of Chicago, Cedars-Sinai, Mount Sinai, Cleveland Clinic

### Phase 3: Scale (Year 2+)
- **Y Combinator or Techstars Health**: Apply with traction data ($500K standard deal from YC)
- **Monitor NIH SBIR/STTR reauthorization** (expired Oct 2025, may return)
- **Digital health VC ecosystem**: Rock Health, General Catalyst, a16z Bio/Health
- **CCF Corporate Partners Program**: Formal partnership tiers with defined benefits
- **HSA/FSA eligibility**: Enable documentation so users can get subscription reimbursed
- **Employer wellness partnerships**: Many employers have $500-2,000/year wellness budgets

### Key Partnerships (Priority Order)

| Priority | Partner | What They Provide | What We Offer |
|----------|---------|-------------------|---------------|
| 1 | **Crohn's & Colitis Foundation** | Funding (IBD Ventures), patient network (1.6M+), credibility | Novel patient self-management tool |
| 2 | **IBD-specialized dietitians** | Content validation, medical credibility | Platform exposure, future consultation marketplace |
| 3 | **Reddit r/CrohnsDisease** | 80K+ beta testers, honest feedback | Free tool built by a fellow patient |
| 4 | **1 Academic medical center** | Clinical validation, research publications | Digital tool for patient-reported outcomes |
| 5 | **Open Food Facts** | Food database (3M+ products) | Crohn's-specific nutritional annotations |

---

## 12. Cost Breakdown by Phase

### Phase 1: Foundation (Months 1-3)
| Item | Cost |
|------|------|
| React Native + Expo | $0 |
| TypeScript, SQLite, all libraries | $0 |
| Development (your time) | $0 |
| Testing devices (use personal phone) | $0 |
| **Total** | **$0** |

### Phase 2: Food Intelligence (Months 4-6)
| Item | Cost |
|------|------|
| Open Food Facts API | $0 |
| Supabase free tier (if backend needed) | $0 |
| Domain name (for privacy policy hosting) | ~$12/year |
| **Total** | **~$12/year** |

### Phase 3: Intelligence (Months 7-12)
| Item | Cost |
|------|------|
| Claude API (meal planning, summarization) | ~$20-100/month (usage-based) |
| Supabase Pro (if exceeding free tier) | $25/month |
| **Total** | **~$50-125/month** |

### Phase 4: App Store Launch (Months 10-14)
| Item | Cost |
|------|------|
| Apple Developer Program | $99/year |
| Google Play Developer (Organization) | $25 one-time |
| Privacy policy legal review | $500-2,000 (one-time) |
| FDA regulatory consultation (recommended) | $5,000-15,000 (one-time) |
| **Total** | **$625-17,125 one-time + $99/year** |

### Phase 5: Growth (Year 2+)
| Item | Cost |
|------|------|
| Backend scaling | $50-500/month (based on users) |
| Claude API at scale | $100-1,000/month |
| Marketing | Variable |
| Legal (if adding dietitian feature) | $50K-150K for HIPAA compliance |
| **Total** | **Variable** |

### Cumulative Cost to App Store Launch
| Scenario | Total Cost |
|----------|-----------|
| **Minimum** (skip FDA consult, DIY legal) | ~$750 |
| **Recommended** (legal review, skip FDA consult for now) | ~$2,700 |
| **Full** (FDA consult + legal review) | ~$17,700 |

---

## 13. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| App Store rejection | Medium | High | Follow all guidelines from day one; test exhaustively; include all disclaimers; submit to Google Play first (faster iteration) |
| Low user retention | High | High | Fatigue-aware design; minimum viable logging; immediate value from first entry; no guilt mechanics |
| Medical misinformation liability | Low | Very High | All content reviewed by GI specialist; never claim to diagnose/treat; prominent disclaimers; cite sources |
| Food database gaps | Medium | Medium | Open Food Facts has 3M+ products; allow manual entry as fallback; let users submit missing products |
| Privacy breach | Low | Very High | Encryption at rest + transit; biometric lock; local-first architecture; no selling data; transparent practices |
| Competitor copies our niche | Low | Medium | First-mover advantage; deep feature set; patient-built authenticity; community loyalty |
| FDA reclassification | Very Low | Very High | Stay in wellness lane; never use diagnostic language; regulatory consultation; monitor FDA guidance updates |
| Burnout (solo developer) | High | Very High | Phase-based approach; ship MVP fast to get user feedback energy; don't try to build everything at once |

---

## 14. Success Metrics

### Phase 1 (Months 1-3): Build It
- [ ] Working app on your personal device
- [ ] Log meals, symptoms, and medications daily for 2 weeks yourself
- [ ] 5+ people in your network testing

### Phase 2 (Months 4-6): Make It Smart
- [ ] Barcode scanner working with 90%+ recognition rate
- [ ] Crohn's classification engine rating foods accurately
- [ ] Food-symptom correlations surfacing after 2 weeks of data

### Phase 3 (Months 7-12): Make It Personal
- [ ] AI meal plans generating successfully
- [ ] Doctor reports exportable as PDF
- [ ] 50+ beta testers actively using weekly

### Phase 4 (Months 10-14): Ship It
- [ ] Approved on Apple App Store
- [ ] Approved on Google Play Store
- [ ] 100+ downloads in first month
- [ ] 4.0+ star rating
- [ ] <1% crash rate

### Phase 5 (Year 2+): Grow It
- [ ] 1,000+ monthly active users
- [ ] 5%+ free-to-paid conversion rate
- [ ] $5,000+ monthly recurring revenue
- [ ] 1 academic medical center partnership
- [ ] IBD Ventures application submitted

---

## 15. Immediate Next Steps

### This Week
1. **Initialize the React Native + Expo project** — get "Hello World" running on your phone
2. **Set up the project structure** — navigation, theming (dark mode tokens), SQLite database schema
3. **Build the daily dashboard screen** — morning check-in, disease state toggle

### Next 2 Weeks
4. **Build the food diary** — manual entry, quick-log, meal photos
5. **Build the symptom tracker** — Bristol scale, pain level, symptom checklist
6. **Build medication manager** — add medications, set reminders, log taken/skipped

### Next Month
7. **Build the post-resection dietary guide** — all educational content
8. **Build the Crohn's knowledge hub** — disease info, medication guides
9. **Start using the app yourself daily** — eat your own cooking

### Ongoing
10. **Apply to IBD Ventures** (next LOI deadline)
11. **Find 1 medical advisor** (IBD dietitian or GI specialist)
12. **Recruit 5 beta testers** from Crohn's community

---

## App Name Candidates

Something to think about. The name should be:
- Immediately clear it's for Crohn's/IBD
- Warm, not clinical
- Available as a domain and on both app stores
- Short (1-2 words ideally)

Ideas to consider:
- **GutWise** — smart, approachable
- **FlareGuard** — protective, action-oriented
- **Remission** — the goal, aspirational
- **GutCheck** — casual, relatable
- **CrohnsCompanion** — clear, supportive
- **BellyBuddy** — friendly but might feel too casual for adults

(Research name availability before committing)

---

*This plan is a living document. It will evolve as we build, learn from users, and discover what actually matters most.*
