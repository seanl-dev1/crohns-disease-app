/**
 * Bold Editorial theme export manifest.
 *
 * This module is the only thing the main process needs to wire into the
 * theme registry — it surfaces the three screen components, the Google Font
 * packages required to render correctly, and the tab/header chrome overrides
 * the existing `app/(tabs)/_layout.tsx` should apply when this preset is
 * active.
 *
 * Mirrors the shape of the heritage / wellness-night theme manifests so the
 * registry can treat themes uniformly. The screens are exposed under the
 * generic `Dashboard` / `ScanResult` / `Article` keys so the wiring layer
 * never has to know the theme name.
 */

import { EditorialDashboard } from '../../screens/editorial/EditorialDashboard';
import { EditorialScanResult } from '../../screens/editorial/EditorialScanResult';
import { EditorialArticle } from '../../screens/editorial/EditorialArticle';

export const boldEditorialTheme = {
  id: 'bold-editorial' as const,
  Dashboard: EditorialDashboard,
  ScanResult: EditorialScanResult,
  Article: EditorialArticle,
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
          'Inter_700Bold',
        ],
      },
    ],
  },
  // Tab bar style override (applied in `app/(tabs)/_layout.tsx` when active).
  tabBarStyle: {
    backgroundColor: '#F7F3EC',
    borderTopColor: '#1A1A1A',
    borderTopWidth: 1,
    activeTintColor: '#C85A3E',
    inactiveTintColor: '#87817A',
    labelFontFamily: 'Inter_500Medium',
    labelLetterSpacing: 1.5,
    labelTextTransform: 'uppercase' as const,
  },
  header: {
    backgroundColor: '#F7F3EC',
    tintColor: '#1A1A1A',
    titleFontFamily: 'InstrumentSerif_400Regular_Italic',
    titleColor: '#1A1A1A',
  },
};
