/**
 * Post-Resection Dietary Guide screen.
 * Shows 5 recovery phases with expandable sections.
 */

import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing } from '../src/theme';
import { dietaryPhases, type DietaryPhase, type PhaseSection } from '../src/data/dietaryPhases';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function PhaseCard({
  phase,
  isExpanded,
  onToggle,
  themeColors: c,
}: {
  phase: DietaryPhase;
  isExpanded: boolean;
  onToggle: () => void;
  themeColors: any;
}) {
  const colorMap = {
    danger: { bg: c.dangerBackground, accent: c.danger },
    caution: { bg: c.cautionBackground, accent: c.caution },
    primary: { bg: c.primaryLight, accent: c.primary },
    safe: { bg: c.safeBackground, accent: c.safe },
  };
  const phaseColor = colorMap[phase.color];

  return (
    <View style={[styles.phaseCard, { backgroundColor: c.card, borderColor: c.border }]}>
      {/* Phase header — always visible */}
      <TouchableOpacity
        style={styles.phaseHeader}
        onPress={onToggle}
        accessibilityLabel={`${isExpanded ? 'Collapse' : 'Expand'} Phase ${phase.id}: ${phase.title}`}
        accessibilityRole="button"
      >
        <View style={[styles.phaseNumber, { backgroundColor: phaseColor.bg }]}>
          <Ionicons name={phase.icon as any} size={24} color={phaseColor.accent} />
        </View>
        <View style={styles.phaseInfo}>
          <View style={styles.phaseTitleRow}>
            <Text style={[styles.phaseLabel, { color: phaseColor.accent }]}>
              Phase {phase.id}
            </Text>
          </View>
          <Text style={[styles.phaseTitle, { color: c.text }]}>{phase.title}</Text>
          <Text style={[styles.phaseTiming, { color: c.textSecondary }]}>{phase.timing}</Text>
        </View>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={c.textTertiary}
        />
      </TouchableOpacity>

      {/* Expanded content */}
      {isExpanded && (
        <View style={[styles.phaseContent, { borderTopColor: c.divider }]}>
          {/* Duration & Purpose */}
          <View style={[styles.purposeBox, { backgroundColor: phaseColor.bg }]}>
            <Text style={[styles.durationText, { color: phaseColor.accent }]}>
              Duration: {phase.duration}
            </Text>
            <Text style={[styles.purposeText, { color: c.text }]}>{phase.purpose}</Text>
          </View>

          {/* Sections */}
          {phase.sections.map((section, index) => (
            <SectionBlock key={index} section={section} themeColors={c} />
          ))}
        </View>
      )}
    </View>
  );
}

function SectionBlock({
  section,
  themeColors: c,
}: {
  section: PhaseSection;
  themeColors: any;
}) {
  return (
    <View style={styles.sectionBlock}>
      <Text style={[styles.sectionHeading, { color: c.text }]}>{section.heading}</Text>
      <Text style={[styles.sectionContent, { color: c.textSecondary }]}>
        {section.content}
      </Text>
    </View>
  );
}

export default function DietaryGuideScreen() {
  const c = useThemeColors();
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const togglePhase = useCallback((phaseId: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPhase((prev) => (prev === phaseId ? null : phaseId));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.divider }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]}>Dietary Guide</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Intro */}
        <View style={styles.intro}>
          <Text style={[styles.introTitle, { color: c.text }]}>
            Post-Resection Recovery Phases
          </Text>
          <Text style={[styles.introBody, { color: c.textSecondary }]}>
            Your diet after bowel resection follows a careful progression. Each phase builds on the
            previous one. Go slow — your gut needs time to heal.
          </Text>
        </View>

        {/* Disclaimer */}
        <View style={[styles.disclaimerCard, { backgroundColor: c.cautionBackground, borderColor: c.caution }]}>
          <Ionicons name="information-circle" size={20} color={c.caution} />
          <Text style={[styles.disclaimerText, { color: c.text }]}>
            This guide is for educational purposes only. All dietary changes should be made under
            supervision of your gastroenterologist and dietitian.
          </Text>
        </View>

        {/* Timeline visual */}
        <View style={styles.timeline}>
          {dietaryPhases.map((phase) => {
            const colorMap = {
              danger: c.danger,
              caution: c.caution,
              primary: c.primary,
              safe: c.safe,
            };
            return (
              <View key={phase.id} style={styles.timelineDot}>
                <View style={[styles.dot, { backgroundColor: colorMap[phase.color] }]} />
                <Text style={[styles.timelineDotLabel, { color: c.textSecondary }]} numberOfLines={1}>
                  {phase.id}
                </Text>
              </View>
            );
          })}
          <View style={[styles.timelineLine, { backgroundColor: c.border }]} />
        </View>

        {/* Phase cards */}
        {dietaryPhases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            isExpanded={expandedPhase === phase.id}
            onToggle={() => togglePhase(phase.id)}
            themeColors={c}
          />
        ))}

        {/* Source citation */}
        <View style={[styles.citationCard, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Text style={[styles.citationLabel, { color: c.textTertiary }]}>Sources</Text>
          <Text style={[styles.citationText, { color: c.textSecondary }]}>
            Crohn's & Colitis Foundation surgical nutrition guidelines, ESPEN Clinical Nutrition in
            IBD (2023) and Surgery (2025) guidelines, AGA guidelines, British Society of
            Gastroenterology guidelines, and major academic medical center protocols.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 44,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: sizing.tapTarget,
    height: sizing.tapTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: sizing.fontXl,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: { width: sizing.tapTarget },
  scrollView: { flex: 1 },
  scrollContent: { padding: spacing.md },
  intro: {
    marginBottom: spacing.md,
  },
  introTitle: {
    fontSize: sizing.fontXxl,
    fontWeight: '700',
    lineHeight: 34,
  },
  introBody: {
    fontSize: sizing.fontBase,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  disclaimerCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  disclaimerText: {
    flex: 1,
    fontSize: sizing.fontSm,
    lineHeight: 20,
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    position: 'relative',
    height: 40,
  },
  timelineLine: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    height: 2,
    top: 8,
    zIndex: 0,
  },
  timelineDot: {
    alignItems: 'center',
    zIndex: 1,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  timelineDotLabel: {
    fontSize: sizing.fontXs,
    marginTop: 2,
    fontWeight: '600',
  },
  phaseCard: {
    borderRadius: sizing.radiusLarge,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    minHeight: sizing.tapTargetLarge,
  },
  phaseNumber: {
    width: 48,
    height: 48,
    borderRadius: sizing.radiusMedium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  phaseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phaseLabel: {
    fontSize: sizing.fontXs,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  phaseTitle: {
    fontSize: sizing.fontLg,
    fontWeight: '600',
    lineHeight: 24,
  },
  phaseTiming: {
    fontSize: sizing.fontSm,
    marginTop: 2,
  },
  phaseContent: {
    padding: spacing.md,
    borderTopWidth: 1,
  },
  purposeBox: {
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    marginBottom: spacing.lg,
  },
  durationText: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  purposeText: {
    fontSize: sizing.fontBase,
    lineHeight: 22,
  },
  sectionBlock: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  sectionContent: {
    fontSize: sizing.fontBase,
    lineHeight: 24,
  },
  citationCard: {
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginTop: spacing.md,
  },
  citationLabel: {
    fontSize: sizing.fontXs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  citationText: {
    fontSize: sizing.fontSm,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
