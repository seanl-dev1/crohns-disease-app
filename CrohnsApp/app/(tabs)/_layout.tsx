/**
 * Tab navigation layout — 2026 modernized.
 *
 * Design updates:
 * - Larger, cleaner icons (26pt outline, 26pt filled when active)
 * - Active icon switches to FILLED variant (visual weight contrast)
 * - Soft primary-tinted background pill on the active tab label
 * - No top border — uses subtle elevation shadow instead
 * - Refined label typography (weight/size)
 * - Haptic light-impact on tab press
 */

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useThemeColors, sizing, typography, elevation } from '../../src/theme';
import { useAppStore } from '../../src/store/useAppStore';
import { useHaptic } from '../../src/hooks/useHaptic';
import { getThemeImpl } from '../../src/themes/registry';

type IoniconsName = keyof typeof Ionicons.glyphMap;

type TabIcon = { outline: IoniconsName; filled: IoniconsName };

const ICONS: Record<string, TabIcon> = {
  index: { outline: 'home-outline', filled: 'home' },
  food: { outline: 'restaurant-outline', filled: 'restaurant' },
  symptoms: { outline: 'pulse-outline', filled: 'pulse' },
  meds: { outline: 'medical-outline', filled: 'medical' },
  more: { outline: 'apps-outline', filled: 'apps' },
};

export default function TabLayout() {
  const c = useThemeColors();
  const haptic = useHaptic();
  const themePreset = useAppStore((s) => s.themePreset);
  const themeImpl = getThemeImpl(themePreset);
  const tabOverride = themeImpl?.tabBarStyle;
  const headerOverride = themeImpl?.header;

  const tabIcon = (name: keyof typeof ICONS) =>
    ({ color, focused }: { color: string; focused: boolean }) => (
      <Ionicons
        name={focused ? ICONS[name].filled : ICONS[name].outline}
        size={focused ? 26 : 24}
        color={color}
      />
    );

  // When a registered theme provides tab-bar overrides, apply them.
  // Otherwise fall back to the default modern elevation-shadow style.
  const tabBarStyle = tabOverride
    ? {
        backgroundColor: tabOverride.backgroundColor ?? c.tabBar,
        borderTopWidth: tabOverride.borderTopWidth ?? 0,
        borderTopColor: tabOverride.borderTopColor,
        height: Platform.OS === 'ios' ? 88 : 72,
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        paddingTop: 10,
        ...(tabOverride.extraStyle ?? {}),
      }
    : {
        backgroundColor: c.tabBar,
        borderTopWidth: 0,
        ...elevation.floating,
        height: Platform.OS === 'ios' ? 88 : 72,
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        paddingTop: 10,
      };

  const tabBarLabelStyle = tabOverride
    ? {
        fontSize: tabOverride.labelFontSize ?? 10.5,
        fontFamily: tabOverride.labelFontFamily,
        letterSpacing: tabOverride.labelLetterSpacing ?? 1.5,
        textTransform: tabOverride.labelTextTransform ?? 'uppercase',
        marginTop: 2,
      }
    : {
        fontSize: 11,
        fontWeight: typography.weightSemibold,
        letterSpacing: typography.tracking.wide,
        marginTop: 2,
      };

  return (
    <Tabs
      screenListeners={{
        tabPress: () => haptic.light(),
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: headerOverride?.backgroundColor ?? c.background,
          // Large-title style headers feel more modern; subtle bottom shadow
          ...Platform.select({
            ios: { shadowColor: 'transparent' },
            android: { elevation: 0 },
          }),
        },
        headerTintColor: headerOverride?.tintColor ?? c.text,
        headerTitleStyle: headerOverride
          ? {
              fontFamily: headerOverride.titleFontFamily,
              fontSize: headerOverride.titleFontSize ?? 18,
              color: headerOverride.titleColor ?? c.text,
            }
          : {
              fontWeight: typography.weightBold,
              fontSize: sizing.fontXl,
              letterSpacing: typography.tracking.tight,
            },
        tabBarStyle,
        tabBarActiveTintColor: tabOverride?.activeTintColor ?? c.tabActive,
        tabBarInactiveTintColor: tabOverride?.inactiveTintColor ?? c.tabInactive,
        tabBarLabelStyle,
        tabBarItemStyle: {
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerTitle: 'Today',
          // Themes that ship their own masthead hide the native header.
          headerShown: !(headerOverride?.hidden ?? false),
          tabBarIcon: tabIcon('index'),
        }}
      />
      <Tabs.Screen
        name="food"
        options={{
          title: 'Food',
          headerTitle: 'Food Diary',
          tabBarIcon: tabIcon('food'),
        }}
      />
      <Tabs.Screen
        name="symptoms"
        options={{
          title: 'Symptoms',
          headerTitle: 'Symptom Tracker',
          tabBarIcon: tabIcon('symptoms'),
        }}
      />
      <Tabs.Screen
        name="meds"
        options={{
          title: 'Meds',
          headerTitle: 'Medications',
          tabBarIcon: tabIcon('meds'),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          headerTitle: 'More',
          tabBarIcon: tabIcon('more'),
        }}
      />
    </Tabs>
  );
}
