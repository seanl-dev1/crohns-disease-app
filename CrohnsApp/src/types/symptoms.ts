/**
 * Symptom entry types shared across the app.
 */

export interface SymptomEntry {
  id: number;
  timestamp: string;
  overall_feeling: number;      // 1-5
  bristol_scale?: number;       // 1-7
  bowel_movement_count?: number;
  pain_level?: number;          // 0-10
  energy_level?: number;        // 1-5
  symptoms?: string;            // JSON array of symptom tags
  notes?: string;
  voice_note_uri?: string;
  disease_state?: string;
  created_at?: string;
}

export const BRISTOL_SCALE = [
  { value: 1, label: 'Type 1', desc: 'Separate hard lumps', emoji: '🟤' },
  { value: 2, label: 'Type 2', desc: 'Lumpy sausage shape', emoji: '🟤' },
  { value: 3, label: 'Type 3', desc: 'Sausage with cracks', emoji: '🟡' },
  { value: 4, label: 'Type 4', desc: 'Smooth soft sausage', emoji: '🟢' },
  { value: 5, label: 'Type 5', desc: 'Soft blobs', emoji: '🟡' },
  { value: 6, label: 'Type 6', desc: 'Mushy, fluffy pieces', emoji: '🟠' },
  { value: 7, label: 'Type 7', desc: 'Entirely liquid', emoji: '🔴' },
];

export const SYMPTOM_TAGS = [
  'Abdominal pain',
  'Bloating',
  'Cramping',
  'Diarrhea',
  'Constipation',
  'Nausea',
  'Vomiting',
  'Blood in stool',
  'Mucus in stool',
  'Urgency',
  'Fatigue',
  'Joint pain',
  'Mouth sores',
  'Fever',
  'Night sweats',
  'Loss of appetite',
  'Weight loss',
  'Skin issues',
  'Eye inflammation',
  'Dehydration',
];

export const ENERGY_LEVELS = [
  { value: 1, label: 'Exhausted', emoji: '😴' },
  { value: 2, label: 'Low', emoji: '😪' },
  { value: 3, label: 'Moderate', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '💪' },
  { value: 5, label: 'Energized', emoji: '⚡' },
];
