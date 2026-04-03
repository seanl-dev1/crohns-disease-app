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

export interface UserProfile {
  name: string;
  diagnosisType: string;
  diagnosisDate?: string;
  crohnsLocation?: string;
  hasResection: boolean;
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
  diseaseState: 'uncertain',
  dietaryPhase: 'phase_5_maintenance',
  onboardingComplete: false,
  dietaryPreferences: [],
  dislikedFoods: [],
};

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
      // Only persist the user profile — today's summary resets daily
      partialize: (state) => ({ user: state.user }),
    }
  )
);
