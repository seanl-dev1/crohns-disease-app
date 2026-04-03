/**
 * SQLite Database Schema for CrohnsApp
 * Offline-first: SQLite is the source of truth. Cloud is backup.
 */

export const CREATE_TABLES_SQL = `
  -- User profile
  CREATE TABLE IF NOT EXISTS user_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    diagnosis_type TEXT DEFAULT 'crohns',
    diagnosis_date TEXT,
    crohns_location TEXT,
    surgery_type TEXT,
    surgery_date TEXT,
    disease_state TEXT DEFAULT 'uncertain',
    dietary_phase TEXT DEFAULT 'maintenance',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  -- Food entries
  CREATE TABLE IF NOT EXISTS food_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    meal_type TEXT NOT NULL,
    food_name TEXT NOT NULL,
    barcode TEXT,
    brand TEXT,
    serving_size TEXT,
    calories REAL,
    protein_g REAL,
    fat_g REAL,
    carbs_g REAL,
    fiber_g REAL,
    sugar_g REAL,
    sodium_mg REAL,
    fodmap_level TEXT,
    trigger_score INTEGER,
    flare_safety TEXT,
    photo_uri TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- Symptom entries
  CREATE TABLE IF NOT EXISTS symptom_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    overall_feeling INTEGER NOT NULL,
    bristol_scale INTEGER,
    bowel_movement_count INTEGER,
    pain_level INTEGER,
    energy_level INTEGER,
    symptoms TEXT,
    notes TEXT,
    voice_note_uri TEXT,
    disease_state TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- Medications
  CREATE TABLE IF NOT EXISTS medications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    dosage TEXT,
    frequency TEXT,
    time_of_day TEXT,
    category TEXT,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- Medication logs
  CREATE TABLE IF NOT EXISTS medication_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medication_id INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (medication_id) REFERENCES medications(id)
  );

  -- Hydration logs
  CREATE TABLE IF NOT EXISTS hydration_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    amount_ml INTEGER NOT NULL,
    type TEXT DEFAULT 'water',
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- Lab values
  CREATE TABLE IF NOT EXISTS lab_values (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_date TEXT NOT NULL,
    test_type TEXT NOT NULL,
    value REAL NOT NULL,
    unit TEXT,
    reference_range TEXT,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- Daily context (stress, sleep, etc. for correlation)
  CREATE TABLE IF NOT EXISTS daily_context (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    stress_level INTEGER,
    sleep_hours REAL,
    sleep_quality INTEGER,
    exercise INTEGER DEFAULT 0,
    medication_adherence INTEGER DEFAULT 1,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  -- Create indexes for common queries
  CREATE INDEX IF NOT EXISTS idx_food_timestamp ON food_entries(timestamp);
  CREATE INDEX IF NOT EXISTS idx_symptom_timestamp ON symptom_entries(timestamp);
  CREATE INDEX IF NOT EXISTS idx_med_log_timestamp ON medication_logs(timestamp);
  CREATE INDEX IF NOT EXISTS idx_hydration_timestamp ON hydration_logs(timestamp);
  CREATE INDEX IF NOT EXISTS idx_daily_context_date ON daily_context(date);
`;
