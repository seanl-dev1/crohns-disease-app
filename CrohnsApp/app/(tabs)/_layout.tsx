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
import { useHaptic } from '../../src/hooks/useHaptic';

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

  const tabIcon = (name: keyof typeof ICONS) =>
    ({ color, focused }: { color: string; focused: boolean }) => (
      <Ionicons
        name={focused ? ICONS[name].filled : ICONS[name].outline}
        size={focused ? 26 : 24}
        color={color}
      />
    );

  return (
    <Tabs
      screenListeners={{
        tabPress: () => haptic.light(),
      }}
      screenOptions={{
        headerStyle: {
          backgroundColor: c.background,
          // Large-title style headers feel more modern; subtle bottom shadow
          ...Platform.select({
            ios: { shadowColor: 'transparent' },
            android: { elevation: 0 },
          }),
        },
        headerTintColor: c.text,
        headerTitleStyle: {
          fontWeight: typography.weightBold,
          fontSize: sizing.fontXl,
          letterSpacing: typography.tracking.tight,
        },
        tabBarStyle: {
          backgroundColor: c.tabBar,
          borderTopWidth: 0,       // Replaces harsh border with soft shadow
          ...elevation.floating,
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 10,
        },
        tabBarActiveTintColor: c.tabActive,
        tabBarInactiveTintColor: c.tabInactive,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: typography.weightSemibold,
          letterSpacing: typography.tracking.wide,
          marginTop: 2,
        },
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
