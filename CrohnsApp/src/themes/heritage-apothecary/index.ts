/**
 * Heritage Apothecary theme registry entry.
 * Aged cream + navy + copper — Victorian apothecary / medical journal.
 */

import { HeritageDashboard } from '../../screens/heritage/HeritageDashboard';
import { HeritageScanResult } from '../../screens/heritage/HeritageScanResult';
import { HeritageArticle } from '../../screens/heritage/HeritageArticle';
import type { ThemeRegistryEntry } from '../registry';

export const heritageTheme: ThemeRegistryEntry = {
  id: 'heritage-apothecary',
  Dashboard: HeritageDashboard as any,
  ScanResult: HeritageScanResult as any,
  Article: HeritageArticle as any,
  fonts: {
    families: ['Playfair Display', 'Cormorant Garamond', 'Lora', 'Oswald'],
    imports: [
      {
        pkg: '@expo-google-fonts/playfair-display',
        names: [
          'PlayfairDisplay_400Regular',
          'PlayfairDisplay_500Medium',
          'PlayfairDisplay_600SemiBold',
          'PlayfairDisplay_700Bold',
          'PlayfairDisplay_400Regular_Italic',
          'PlayfairDisplay_500Medium_Italic',
        ],
      },
      {
        pkg: '@expo-google-fonts/cormorant-garamond',
        names: [
          'CormorantGaramond_400Regular',
          'CormorantGaramond_400Regular_Italic',
          'CormorantGaramond_500Medium',
          'CormorantGaramond_500Medium_Italic',
          'CormorantGaramond_600SemiBold',
        ],
      },
      {
        pkg: '@expo-google-fonts/lora',
        names: [
          'Lora_400Regular',
          'Lora_400Regular_Italic',
          'Lora_500Medium',
          'Lora_600SemiBold',
        ],
      },
      {
        pkg: '@expo-google-fonts/oswald',
        names: [
          'Oswald_300Light',
          'Oswald_400Regular',
          'Oswald_500Medium',
          'Oswald_600SemiBold',
        ],
      },
    ],
  },
  tabBarStyle: {
    backgroundColor: '#EFE8D6',
    borderTopColor: '#1B2A3E',
    borderTopWidth: 1,
    activeTintColor: '#A06A2D',
    inactiveTintColor: '#9E8F6F',
    labelFontFamily: 'Oswald_400Regular',
    labelLetterSpacing: 2,
    labelTextTransform: 'uppercase',
    labelFontSize: 10.5,
  },
  header: {
    backgroundColor: '#EFE8D6',
    tintColor: '#1B2A3E',
    titleFontFamily: 'PlayfairDisplay_500Medium_Italic',
    titleColor: '#1B2A3E',
    titleFontSize: 18,
    hidden: true, // Heritage ships its own masthead
  },
};
