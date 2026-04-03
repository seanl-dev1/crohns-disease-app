/**
 * Medication types shared across the app.
 */

export interface Medication {
  id: number;
  name: string;
  dosage?: string;
  frequency?: string;
  time_of_day?: string;
  category?: string;
  active: number;       // 1 = active, 0 = discontinued
  created_at?: string;
}

export interface MedicationLog {
  id: number;
  medication_id: number;
  timestamp: string;
  status: 'taken' | 'skipped' | 'late';
}

export const MED_FREQUENCIES = [
  { value: 'once_daily', label: 'Once daily' },
  { value: 'twice_daily', label: 'Twice daily' },
  { value: 'three_daily', label: '3 times daily' },
  { value: 'every_other_day', label: 'Every other day' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every 2 weeks' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'as_needed', label: 'As needed' },
];

export const MED_TIMES = [
  { value: 'morning', label: 'Morning', icon: 'sunny-outline' },
  { value: 'afternoon', label: 'Afternoon', icon: 'partly-sunny-outline' },
  { value: 'evening', label: 'Evening', icon: 'moon-outline' },
  { value: 'bedtime', label: 'Bedtime', icon: 'bed-outline' },
  { value: 'with_food', label: 'With food', icon: 'restaurant-outline' },
];

export const MED_CATEGORIES = [
  'Biologic',
  'Immunomodulator',
  'Aminosalicylate',
  'Corticosteroid',
  'Antibiotic',
  'Anti-diarrheal',
  'Pain relief',
  'Supplement',
  'Probiotic',
  'Other',
];
