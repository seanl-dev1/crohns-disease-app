/**
 * More screen — settings, knowledge hub, reports, etc.
 */

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing } from '../../src/theme';
import { useAuth } from '../../src/contexts/AuthContext';

interface MenuItemProps {
  icon: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
  themeColors: any;
}

function MenuItem({ icon, label, subtitle, onPress, themeColors: c }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, { borderBottomColor: c.divider }]}
      onPress={onPress}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <View style={[styles.menuIcon, { backgroundColor: c.primaryLight }]}>
        <Ionicons name={icon as any} size={22} color={c.primary} />
      </View>
      <View style={styles.menuText}>
        <Text style={[styles.menuLabel, { color: c.text }]}>{label}</Text>
        {subtitle && (
          <Text style={[styles.menuSubtitle, { color: c.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={c.textTertiary} />
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  const c = useThemeColors();
  const { signOut, user } = useAuth();

  return (
    <ScrollView style={[styles.container, { backgroundColor: c.background }]}>
      <View style={[styles.section, { backgroundColor: c.card, borderColor: c.border }]}>
        <MenuItem
          icon="book-outline"
          label="Knowledge Hub"
          subtitle="Learn about Crohn's disease"
          onPress={() => router.push('/knowledge-hub')}
          themeColors={c}
        />
        <MenuItem
          icon="calendar-outline"
          label="Meal Plan"
          subtitle="Weekly personalized meal plans"
          onPress={() => router.push('/meal-plan')}
          themeColors={c}
        />
        <MenuItem
          icon="nutrition-outline"
          label="Dietary Guide"
          subtitle="Post-resection recovery phases"
          onPress={() => router.push('/dietary-guide')}
          themeColors={c}
        />
        <MenuItem
          icon="flask-outline"
          label="Lab Results"
          subtitle="Track your blood work"
          onPress={() => {}}
          themeColors={c}
        />
        <MenuItem
          icon="document-text-outline"
          label="Doctor Report"
          subtitle="Generate PDF for your GI"
          onPress={() => {}}
          themeColors={c}
        />
      </View>

      <View style={[styles.section, { backgroundColor: c.card, borderColor: c.border }]}>
        <MenuItem
          icon="person-outline"
          label="Profile"
          subtitle="Your health info"
          onPress={() => router.push('/profile')}
          themeColors={c}
        />
        <MenuItem
          icon="settings-outline"
          label="Settings"
          subtitle="Notifications, theme, privacy"
          onPress={() => {}}
          themeColors={c}
        />
        <MenuItem
          icon="download-outline"
          label="Export Data"
          subtitle="Download your data as CSV/JSON"
          onPress={() => {}}
          themeColors={c}
        />
      </View>

      <View style={[styles.section, { backgroundColor: c.card, borderColor: c.border }]}>
        {user && (
          <View style={[styles.menuItem, { borderBottomColor: c.divider }]}>
            <View style={[styles.menuIcon, { backgroundColor: c.safeBackground }]}>
              <Ionicons name="person-circle" size={22} color={c.safe} />
            </View>
            <View style={styles.menuText}>
              <Text style={[styles.menuLabel, { color: c.text }]}>Signed In</Text>
              <Text style={[styles.menuSubtitle, { color: c.textSecondary }]}>
                {user.email}
              </Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={[styles.menuItem, { borderBottomColor: c.divider }]}
          onPress={signOut}
          accessibilityLabel="Sign out"
          accessibilityRole="button"
        >
          <View style={[styles.menuIcon, { backgroundColor: c.dangerBackground }]}>
            <Ionicons name="log-out-outline" size={22} color={c.danger} />
          </View>
          <View style={styles.menuText}>
            <Text style={[styles.menuLabel, { color: c.danger }]}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.disclaimer}>
        <Text style={[styles.disclaimerText, { color: c.textTertiary }]}>
          CrohnsApp is not a medical device. It does not diagnose, treat, cure,
          or prevent any disease. Always consult your healthcare provider.
        </Text>
        <Text style={[styles.version, { color: c.textTertiary }]}>
          Version 0.1.0
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: sizing.radiusLarge,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    minHeight: sizing.tapTargetLarge,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: sizing.radiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  menuLabel: {
    fontSize: sizing.fontBase,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: sizing.fontSm,
    marginTop: 2,
  },
  disclaimer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: sizing.fontSm,
    textAlign: 'center',
    lineHeight: 20,
  },
  version: {
    fontSize: sizing.fontXs,
    marginTop: spacing.sm,
  },
});
