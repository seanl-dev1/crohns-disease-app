/**
 * Global app state with Zustand + AsyncStorage persistence.
 * User profile and preferences survive app restarts.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type DiseaseState = 'flare' | 'remission' | 'uncertain';
export type DietaryPhase =
  | 'phase_1_clear_liquids'
  | 'phase_2_full_liquids'
  | 'phase_3_low_residue'
  | 'phase_4_reintroduction'
  | 'phase_5_maintenance';

/**
 * Functional resection status — describes how your gut works TODAY,
 * not the surgical details from years ago.
 * - 'none': No bowel surgery
 * - 'adapted': Had surgery, but tolerate most foods now
 * - 'sensitive': Had surgery and still deal with digestive sensitivity
 */
export type ResectionStatus = 'none' | 'adapted' | 'sensitive';

export interface UserProfile {
  name: string;
  diagnosisType: string;
  diagnosisDate?: string;
  crohnsLocation?: string;
  hasResection: boolean;
  resectionStatus: ResectionStatus;
  resectionType?: string;
  resectionDate?: string;
  diseaseState: DiseaseState;
  dietaryPhase: DietaryPhase;
  onboardingComplete: boolean;
  // Meal planning preferences
  dietaryPreferences: string[];
  dislikedFoods: string[];
  calorieTarget?: number;
}

export interface WeeklyGoal {
  text: string;
  target: number;
  progress: number;
  /** ISO date string of the Monday this goal starts */
  weekStart: string;
}

export interface WeeklyCheckin {
  /** ISO date string */
  date: string;
  /** 1-5 scale */
  feeling: number;
  notes: string;
}

interface TodaySummary {
  feeling?: number;
  mealsLogged: number;
  symptomsLogged: number;
  medicationsTaken: number;
  medicationsTotal: number;
  waterMl: number;
}

interface AppState {
  // User — persisted
  user: UserProfile;
  setUser: (updates: Partial<UserProfile>) => void;
  setDiseaseState: (state: DiseaseState) => void;

  // Weekly goal — persisted
  weeklyGoal: WeeklyGoal | null;
  setWeeklyGoal: (text: string, target: number) => void;
  updateGoalProgress: (progress: number) => void;
  clearWeeklyGoal: () => void;

  // Weekly check-in — persisted
  lastCheckin: WeeklyCheckin | null;
  saveCheckin: (feeling: number, notes: string) => void;

  // Today's summary — NOT persisted (refreshed from DB on load)
  today: TodaySummary;
  setToday: (updates: Partial<TodaySummary>) => void;
  resetToday: () => void;

  // App state — NOT persisted
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const defaultUser: UserProfile = {
  name: '',
  diagnosisType: 'crohns',
  hasResection: false,
  resectionStatus: 'none',
  diseaseState: 'uncertain',
  dietaryPhase: 'phase_5_maintenance',
  onboardingComplete: false,
  dietaryPreferences: [],
  dislikedFoods: [],
};

function getMonday(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().split('T')[0];
}

const defaultToday: TodaySummary = {
  mealsLogged: 0,
  symptomsLogged: 0,
  medicationsTaken: 0,
  medicationsTotal: 0,
  waterMl: 0,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: defaultUser,
      setUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),
      setDiseaseState: (diseaseState) =>
        set((state) => ({ user: { ...state.user, diseaseState } })),

      weeklyGoal: null,
      setWeeklyGoal: (text, target) =>
        set({
          weeklyGoal: { text, target, progress: 0, weekStart: getMonday() },
        }),
      updateGoalProgress: (progress) =>
        set((state) => {
          if (!state.weeklyGoal) return {};
          return { weeklyGoal: { ...state.weeklyGoal, progress } };
        }),
      clearWeeklyGoal: () => set({ weeklyGoal: null }),

      lastCheckin: null,
      saveCheckin: (feeling, notes) =>
        set({
          lastCheckin: {
            date: new Date().toISOString().split('T')[0],
            feeling,
            notes,
          },
        }),

      today: defaultToday,
      setToday: (updates) =>
        set((state) => ({ today: { ...state.today, ...updates } })),
      resetToday: () => set({ today: defaultToday }),

      isLoading: true,
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'crohnsapp-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Persist user profile, weekly goal, and last check-in
      partialize: (state) => ({
        user: state.user,
        weeklyGoal: state.weeklyGoal,
        lastCheckin: state.lastCheckin,
      }),
    }
  )
);
