# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Crohn's disease management app built with **Expo (SDK 54) + React Native + TypeScript**. Targets iOS, Android, and web. Offline-first architecture with deterministic (no AI/ML) food safety scoring.

## Commands

All commands run from `CrohnsApp/`:

```bash
cd CrohnsApp
npm install          # install dependencies
npx expo start       # dev server (press w for web, a for Android, i for iOS)
npx expo start --web # web directly
npx tsc --noEmit     # type-check (no test framework configured yet)
```

## Architecture

### Routing (Expo Router, file-based)

- `app/_layout.tsx` — Root layout, initializes SQLite database + Zustand store
- `app/(tabs)/` — 5-tab bottom nav: Dashboard, Food, Symptoms, Meds, More
- Modal screens: `scan.tsx`, `profile.tsx`, `meal-plan.tsx`, `knowledge-hub.tsx`, `article/[id].tsx`, `dietary-guide.tsx`

### State Management

**Zustand** (`src/store/useAppStore.ts`) with AsyncStorage persistence. Stores `UserProfile` (disease state, dietary phase, resection status, preferences) and `TodaySummary` (non-persisted daily aggregates).

### Data Layer

**SQLite** via expo-sqlite (WAL mode). Schema in `src/db/schema.ts`, operations in `src/db/database.ts`. 8 tables: user_profile, food_entries, symptom_entries, medications, medication_logs, hydration_logs, lab_values, daily_context.

**Open Food Facts API** (`src/services/openFoodFacts.ts`) — free barcode lookup, no API key needed.

### Engine Layer (`src/engine/`)

Deterministic rule-based food analysis. This is the core differentiator of the app.

- **`foodClassifier.ts`** — Main entry point. Scores food across 6 dimensions: trigger ingredients, FODMAP level, fiber analysis, post-resection flags, flare safety, nutrient highlights. Overall rating: RED/YELLOW/GREEN.
- **`ingredientParser.ts`** — Normalizes raw ingredient strings from product labels.
- **`triggerDatabase.ts`** — 50+ known Crohn's trigger ingredients with severity ratings, context-aware for post-resection.
- **`replacementDatabase.ts`** — Safe alternative suggestions for each trigger ingredient.
- **`recipeDatabase.ts`** — 105 curated recipes with phase-safety tags and nutrition data.
- **`mealPlanner.ts`** — Generates 7-day meal plans from compatible recipes using round-robin by meal type.

### Key Data Flow: Barcode Scan

`scan.tsx` → camera detects barcode → `openFoodFacts.lookupBarcode()` → `foodClassifier.classifyFood(ingredients, nutrition, userContext)` → renders rating card with flags + replacement suggestions.

### Context-Sensitivity

All scoring adapts to three user dimensions:
- **Disease state**: flare vs. remission vs. uncertain (changes restriction level)
- **Resection status**: post-resection patients get additional flags (fat/sugar/oxalate)
- **Dietary phase**: phase_1 (clear liquids) through phase_5 (maintenance) gates recipe/meal compatibility

## Root-Level Reference Data

JSON databases (`crohns-ingredient-database.json`, `fodmap-database.json`, `recipe-database.json`, etc.) and markdown specs (`specs/`, `post-resection-dietary-guide.md`, `educational-content.md`) are research/reference files used to build the embedded engine databases. They are NOT loaded at runtime.

## Theme

Centralized in `src/theme/` (colors, spacing). Uses semantic colors: `safe`/`caution`/`danger` for food ratings. Supports dark/light mode via `useColorScheme`.
