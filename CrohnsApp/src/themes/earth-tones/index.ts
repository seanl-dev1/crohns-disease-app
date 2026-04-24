/**
 * Nature-Grounded Earth Tones theme registry entry.
 *
 * Oatmeal canvas + forest-green serif accents + clay eyebrows.
 * Mockup spec: `public/designs/index.html` → section `.d6`.
 *
 * Mirrors the Heritage Apothecary entry shape so the global registry can
 * swap presets at runtime.
 */

import EarthDashboard from '../../screens/earth/EarthDashboard';
import EarthScanResult from '../../screens/earth/EarthScanResult';
import EarthArticle from '../../screens/earth/EarthArticle';
import type { ThemeRegistryEntry } from '../registry';

export const earthTonesTheme: ThemeRegistryEntry = {
  id: 'earth-tones',
  Dashboard: EarthDashboard as any,
  ScanResult: EarthScanResult as any,
  Article: EarthArticle as any,
  fonts: {
    families: ['Fraunces', 'Inter'],
    imports: [
      {
        pkg: '@expo-google-fonts/fraunces',
        names: [
          'Fraunces_400Regular',
          'Fraunces_500Medium',
          'Fraunces_600SemiBold',
          'Fraunces_400Regular_Italic',
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
  tabBarStyle: {
    backgroundColor: '#FAF4E7',
    borderTopColor: '#D0C5AE',
    borderTopWidth: 1,
    activeTintColor: '#2B4A3F',
    inactiveTintColor: '#8A8170',
    labelFontFamily: 'Inter_500Medium',
    labelLetterSpacing: 1,
    labelTextTransform: 'uppercase' as const,
  },
  header: {
    backgroundColor: '#FAF4E7',
    tintColor: '#1E1B15',
    titleFontFamily: 'Fraunces_500Medium',
    titleColor: '#2B4A3F',
  },
};
