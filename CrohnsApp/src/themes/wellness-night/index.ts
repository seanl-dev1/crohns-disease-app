/**
 * Wellness Night theme export manifest.
 *
 * This module is the only thing the main process needs to wire into the
 * theme registry — it surfaces the three screen components, the Google Font
 * packages required to render correctly, and the tab/header chrome overrides
 * the existing `app/(tabs)/_layout.tsx` should apply when this preset is
 * active.
 *
 * Mirrors the shape of the heritage theme manifest (forthcoming) so the
 * registry can treat themes uniformly.
 */

import { WellnessNightDashboard } from '../../screens/wellnessnight/WellnessNightDashboard';
import { WellnessNightScanResult } from '../../screens/wellnessnight/WellnessNightScanResult';
import { WellnessNightArticle } from '../../screens/wellnessnight/WellnessNightArticle';

export const wellnessNightTheme = {
  id: 'wellness-night' as const,
  Dashboard: WellnessNightDashboard,
  ScanResult: WellnessNightScanResult,
  Article: WellnessNightArticle,
  fonts: {
    // Google Font package names to load — main process will wire these.
    families: ['Instrument Serif', 'Inter'],
    // Import statements the main process should add to app/_layout.tsx.
    // Each entry: { pkg, names: [<expo-google-fonts export name>] }.
    imports: [
      {
        pkg: '@expo-google-fonts/instrument-serif',
        names: [
          'InstrumentSerif_400Regular',
          'InstrumentSerif_400Regular_Italic',
        ],
      },
      {
        pkg: '@expo-google-fonts/inter',
        names: [
          'Inter_400Regular',
          'Inter_500Medium',
          'Inter_600SemiBold',
        ],
      },
    ],
  },
  // Tab bar style override (applied in `app/(tabs)/_layout.tsx` when active).
  tabBarStyle: {
    backgroundColor: '#0F0D0B',
    borderTopColor: '#2A2620',
    borderTopWidth: 1,
    activeTintColor: '#D4AF8C',
    inactiveTintColor: '#6F6558',
    labelFontFamily: 'Inter_500Medium',
    labelLetterSpacing: 1,
    labelTextTransform: 'uppercase' as const,
  },
  header: {
    backgroundColor: '#0F0D0B',
    tintColor: '#E8DFD0',
    titleFontFamily: 'InstrumentSerif_400Regular_Italic',
    titleColor: '#D4AF8C',
  },
};
