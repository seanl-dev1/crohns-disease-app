/**
 * Theme Picker — "Appearance" settings screen.
 *
 * Lets users pick from 10 visual presets. Selection applies instantly
 * and persists via the Zustand store's themePreset field.
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  useThemeColors,
  spacing,
  sizing,
  typography,
  elevation,
  THEME_PRESETS,
  THEME_PRESET_ORDER,
  type ThemePresetId,
  type ThemePreset,
} from '../src/theme';
import { useAppStore } from '../src/store/useAppStore';
import { useHaptic } from '../src/hooks/useHaptic';

function ThemePreviewCard({
  preset,
  isActive,
  onSelect,
}: {
  preset: ThemePreset;
  isActive: boolean;
  onSelect: () => void;
}) {
  const c = useThemeColors();

  // Preview uses the preset's own light colors to show what it looks like
  const p = preset.light;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onSelect}
      style={[
        styles.previewCard,
        {
          borderColor: isActive ? c.primary : c.border,
          borderWidth: isActive ? 2 : 1,
          backgroundColor: c.surfaceElevated,
          ...elevation.subtle,
        },
      ]}
      accessibilityLabel={`Theme: ${preset.name}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
    >
      {/* Mini mockup strip — phone-frame preview */}
      <View style={[styles.previewMock, { backgroundColor: p.background }]}>
        {/* Top bar */}
        <View style={[styles.previewTopBar, { backgroundColor: p.surface }]}>
          <View style={[styles.previewDot, { backgroundColor: p.primary }]} />
          <View style={[styles.previewLineBar, { backgroundColor: p.textSecondary, width: 40 }]} />
        </View>
        {/* Content rows */}
        <View style={styles.previewContent}>
          <View style={[styles.previewLine, { backgroundColor: p.text, width: '65%' }]} />
          <View style={[styles.previewLine, { backgroundColor: p.textSecondary, width: '85%', opacity: 0.6 }]} />
          <View style={[styles.previewLine, { backgroundColor: p.textSecondary, width: '45%', opacity: 0.4 }]} />
          {/* Rating pill */}
          <View style={styles.previewPillRow}>
            <View style={[styles.previewPill, { backgroundColor: p.safeBackground }]}>
              <View style={[styles.previewPillText, { backgroundColor: p.safe }]} />
            </View>
            <View style={[styles.previewPill, { backgroundColor: p.cautionBackground }]}>
              <View style={[styles.previewPillText, { backgroundColor: p.caution }]} />
            </View>
            <View style={[styles.previewPill, { backgroundColor: p.dangerBackground }]}>
              <View style={[styles.previewPillText, { backgroundColor: p.danger }]} />
            </View>
          </View>
          {/* Button */}
          <View
            style={[
              styles.previewButton,
              {
                backgroundColor: p.primary,
                borderRadius: preset.flavor.buttonShape === 'pill' ? 999 :
                              preset.flavor.buttonShape === 'square' ? 4 : 12,
              },
            ]}
          />
        </View>
      </View>

      {/* Info row */}
      <View style={styles.previewInfo}>
        <View style={styles.previewHeader}>
          <Text style={[styles.previewName, { color: c.text }]}>{preset.name}</Text>
          {isActive && (
            <View style={[styles.activeBadge, { backgroundColor: c.primary }]}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={[styles.previewTagline, { color: c.textSecondary }]}>
          {preset.tagline}
        </Text>
        <Text style={[styles.previewDescription, { color: c.textTertiary }]} numberOfLines={2}>
          {preset.description}
        </Text>

        {/* Swatches */}
        <View style={styles.swatchRow}>
          {preset.previewSwatches.map((color, i) => (
            <View
              key={i}
              style={[styles.swatch, { backgroundColor: color, borderColor: c.border }]}
            />
          ))}
        </View>

        {/* Metadata chips */}
        <View style={styles.chipRow}>
          {preset.fixedColorMode && (
            <View style={[styles.chip, { backgroundColor: c.surface, borderColor: c.border }]}>
              <Ionicons
                name={preset.fixedColorMode === 'dark' ? 'moon' : 'sunny'}
                size={11}
                color={c.textSecondary}
              />
              <Text style={[styles.chipText, { color: c.textSecondary }]}>
                {preset.fixedColorMode === 'dark' ? 'Dark only' : 'Light only'}
              </Text>
            </View>
          )}
          <View style={[styles.chip, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Text style={[styles.chipText, { color: c.textSecondary }]}>
              {preset.flavor.heroTypeStyle.replace('-', ' ')}
            </Text>
          </View>
          <View style={[styles.chip, { backgroundColor: c.surface, borderColor: c.border }]}>
            <Text style={[styles.chipText, { color: c.textSecondary }]}>
              {preset.flavor.buttonShape} btns
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ThemePickerScreen() {
  const c = useThemeColors();
  const haptic = useHaptic();
  const activePreset = useAppStore((s) => s.themePreset);
  const setThemePreset = useAppStore((s) => s.setThemePreset);

  const [lastSelected, setLastSelected] = useState<ThemePresetId | null>(null);

  const handleSelect = (id: ThemePresetId) => {
    haptic.selection();
    setThemePreset(id);
    setLastSelected(id);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={26} color={c.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.headerTitle, { color: c.text }]}>Appearance</Text>
          <Text style={[styles.headerSubtitle, { color: c.textSecondary }]}>
            Pick a visual style. Changes apply instantly.
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Currently applied banner */}
        <View style={[styles.currentBanner, { backgroundColor: c.primaryLight, borderColor: c.primary }]}>
          <Ionicons name="color-palette" size={18} color={c.primary} />
          <Text style={[styles.currentBannerText, { color: c.primary }]}>
            Current theme: <Text style={{ fontWeight: typography.weightBold }}>{THEME_PRESETS[activePreset].name}</Text>
          </Text>
        </View>

        {/* Preset grid */}
        {THEME_PRESET_ORDER.map((id) => {
          const preset = THEME_PRESETS[id];
          return (
            <ThemePreviewCard
              key={id}
              preset={preset}
              isActive={id === activePreset}
              onSelect={() => handleSelect(id)}
            />
          );
        })}

        {/* Note */}
        <View style={[styles.noteBox, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Text style={[styles.noteText, { color: c.textSecondary }]}>
            Full typography, glass effects, and ornament details for each theme arrive in a follow-up update.
            Today's pick changes colors, borders, shadows, and shapes across every screen.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: Platform.OS === 'ios' ? 0 : spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
  },
  headerText: { flex: 1 },
  headerTitle: {
    fontSize: sizing.fontXxl,
    fontWeight: typography.weightBold,
    letterSpacing: typography.tracking.tight,
  },
  headerSubtitle: {
    fontSize: sizing.fontSm,
    marginTop: 2,
  },
  scrollContent: {
    padding: spacing.md,
  },
  currentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  currentBannerText: {
    fontSize: sizing.fontSm,
    flex: 1,
  },
  previewCard: {
    borderRadius: sizing.radiusXL,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    gap: spacing.md,
  },
  previewMock: {
    width: 96,
    height: 140,
    borderRadius: sizing.radiusMedium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  previewTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  previewDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  previewLineBar: {
    height: 4,
    borderRadius: 2,
  },
  previewContent: {
    padding: 8,
    gap: 6,
  },
  previewLine: {
    height: 5,
    borderRadius: 2,
  },
  previewPillRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 4,
  },
  previewPill: {
    flex: 1,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewPillText: {
    width: '60%',
    height: 2,
    borderRadius: 1,
  },
  previewButton: {
    height: 14,
    marginTop: 6,
  },
  previewInfo: {
    flex: 1,
    gap: 4,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  previewName: {
    fontSize: sizing.fontBase,
    fontWeight: typography.weightBold,
    letterSpacing: typography.tracking.snug,
  },
  activeBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewTagline: {
    fontSize: sizing.fontSm,
    fontWeight: typography.weightMedium,
  },
  previewDescription: {
    fontSize: sizing.fontXs,
    lineHeight: sizing.fontXs * sizing.lineHeightRelaxed,
    marginTop: 2,
  },
  swatchRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 8,
  },
  swatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 10,
    fontWeight: typography.weightMedium,
    letterSpacing: typography.tracking.wide,
  },
  noteBox: {
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginTop: spacing.sm,
  },
  noteText: {
    fontSize: sizing.fontSm,
    lineHeight: sizing.fontSm * sizing.lineHeightRelaxed,
  },
});
