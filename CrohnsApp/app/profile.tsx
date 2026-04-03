/**
 * Profile screen — Configure your Crohn's disease details.
 * This data drives the food classification engine's analysis.
 *
 * Fields:
 * - Name
 * - Diagnosis type
 * - Disease state (flare/remission/uncertain)
 * - Bowel resection (yes/no + type + date)
 * - Dietary phase
 * - Crohn's location
 */

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing, type ThemeColors } from '../src/theme';
import {
  useAppStore,
  type DiseaseState,
  type DietaryPhase,
  type UserProfile,
} from '../src/store/useAppStore';

const DISEASE_STATES: { value: DiseaseState; label: string; desc: string }[] = [
  { value: 'remission', label: 'Remission', desc: 'Symptoms under control' },
  { value: 'uncertain', label: 'Uncertain', desc: 'Not sure right now' },
  { value: 'flare', label: 'Flare', desc: 'Active symptoms' },
];

const DIETARY_PHASES: { value: DietaryPhase; label: string; desc: string }[] = [
  { value: 'phase_1_clear_liquids', label: 'Phase 1', desc: 'Clear liquids only' },
  { value: 'phase_2_full_liquids', label: 'Phase 2', desc: 'Full liquids' },
  { value: 'phase_3_low_residue', label: 'Phase 3', desc: 'Low residue / soft foods' },
  { value: 'phase_4_reintroduction', label: 'Phase 4', desc: 'Reintroduction' },
  { value: 'phase_5_maintenance', label: 'Phase 5', desc: 'Maintenance / normal diet' },
];

const CROHNS_LOCATIONS = [
  'Ileal (small intestine)',
  'Colonic (large intestine)',
  'Ileocolonic (both)',
  'Upper GI',
  'Not sure',
];

const RESECTION_TYPES = [
  'Ileocecal resection',
  'Small bowel resection',
  'Large bowel / colectomy',
  'Strictureplasty',
  'Other / not sure',
];

export default function ProfileScreen() {
  const c = useThemeColors();
  const { user, setUser } = useAppStore();

  // Local state so edits don't immediately propagate
  const [name, setName] = useState(user.name);
  const [diseaseState, setDiseaseState] = useState(user.diseaseState);
  const [hasResection, setHasResection] = useState(user.hasResection);
  const [resectionType, setResectionType] = useState(user.resectionType || '');
  const [resectionDate, setResectionDate] = useState(user.resectionDate || '');
  const [dietaryPhase, setDietaryPhase] = useState(user.dietaryPhase);
  const [crohnsLocation, setCrohnsLocation] = useState(user.crohnsLocation || '');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(true);
  }, [name, diseaseState, hasResection, resectionType, resectionDate, dietaryPhase, crohnsLocation]);

  const handleSave = () => {
    setUser({
      name: name.trim(),
      diseaseState,
      hasResection,
      resectionType: hasResection ? resectionType : undefined,
      resectionDate: hasResection ? resectionDate : undefined,
      dietaryPhase,
      crohnsLocation: crohnsLocation || undefined,
    });
    Alert.alert('Saved', 'Your profile has been updated. Food scan results will now reflect your settings.');
    setHasChanges(false);
  };

  const s = createStyles(c);

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.divider }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.headerButton}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.text }]}>My Profile</Text>
        <TouchableOpacity onPress={handleSave} style={s.headerButton}>
          <Text style={[s.saveText, { color: c.primary, fontWeight: '700' }]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={s.body}
        contentContainerStyle={s.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Name */}
        <Text style={[s.sectionTitle, { color: c.text }]}>Your Name</Text>
        <TextInput
          style={[s.input, { backgroundColor: c.inputBackground, borderColor: c.inputBorder, color: c.text }]}
          value={name}
          onChangeText={setName}
          placeholder="First name"
          placeholderTextColor={c.placeholder}
          autoCapitalize="words"
        />

        {/* Disease State */}
        <Text style={[s.sectionTitle, { color: c.text }]}>Current Disease State</Text>
        <Text style={[s.sectionHint, { color: c.textTertiary }]}>
          This affects which foods are flagged as risky
        </Text>
        {DISEASE_STATES.map((ds) => {
          const isActive = diseaseState === ds.value;
          const stateColor = ds.value === 'remission' ? c.safe : ds.value === 'flare' ? c.danger : c.caution;
          return (
            <TouchableOpacity
              key={ds.value}
              style={[
                s.optionCard,
                {
                  backgroundColor: isActive ? stateColor + '12' : c.inputBackground,
                  borderColor: isActive ? stateColor : c.inputBorder,
                },
              ]}
              onPress={() => setDiseaseState(ds.value)}
            >
              <View style={s.optionInfo}>
                <Text style={[s.optionLabel, { color: isActive ? stateColor : c.text }]}>
                  {ds.label}
                </Text>
                <Text style={[s.optionDesc, { color: c.textSecondary }]}>{ds.desc}</Text>
              </View>
              {isActive && <Ionicons name="checkmark-circle" size={24} color={stateColor} />}
            </TouchableOpacity>
          );
        })}

        {/* Bowel Resection */}
        <View style={s.switchRow}>
          <View style={s.switchInfo}>
            <Text style={[s.sectionTitle, { color: c.text, marginTop: 0 }]}>
              Bowel Resection
            </Text>
            <Text style={[s.sectionHint, { color: c.textTertiary, marginBottom: 0 }]}>
              Have you had bowel surgery?
            </Text>
          </View>
          <Switch
            value={hasResection}
            onValueChange={setHasResection}
            trackColor={{ false: c.disabled, true: c.primary + '60' }}
            thumbColor={hasResection ? c.primary : c.textTertiary}
          />
        </View>

        {hasResection && (
          <View style={[s.resectionDetails, { backgroundColor: c.primaryLight, borderColor: c.primary + '30' }]}>
            <Text style={[s.detailLabel, { color: c.textSecondary }]}>Type of surgery</Text>
            <View style={s.chipGrid}>
              {RESECTION_TYPES.map((rt) => {
                const isActive = resectionType === rt;
                return (
                  <TouchableOpacity
                    key={rt}
                    style={[
                      s.chip,
                      {
                        backgroundColor: isActive ? c.primary + '20' : c.inputBackground,
                        borderColor: isActive ? c.primary : c.inputBorder,
                      },
                    ]}
                    onPress={() => setResectionType(isActive ? '' : rt)}
                  >
                    <Text style={[s.chipText, { color: isActive ? c.primary : c.textSecondary }]}>
                      {rt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[s.detailLabel, { color: c.textSecondary, marginTop: spacing.md }]}>
              Approximate surgery date
            </Text>
            <TextInput
              style={[s.input, { backgroundColor: c.card, borderColor: c.inputBorder, color: c.text }]}
              value={resectionDate}
              onChangeText={setResectionDate}
              placeholder="e.g., March 2025, 6 months ago"
              placeholderTextColor={c.placeholder}
            />

            <View style={[s.infoBox, { backgroundColor: c.cautionBackground }]}>
              <Ionicons name="information-circle" size={18} color={c.caution} />
              <Text style={[s.infoText, { color: c.textSecondary }]}>
                With resection enabled, food scans will flag high-fat foods (bile acid diarrhea risk),
                high-oxalate foods (kidney stone risk), and obstruction risks from seeds/nuts.
              </Text>
            </View>
          </View>
        )}

        {/* Crohn's Location */}
        <Text style={[s.sectionTitle, { color: c.text }]}>Crohn's Location</Text>
        <Text style={[s.sectionHint, { color: c.textTertiary }]}>
          Where your Crohn's primarily affects you
        </Text>
        <View style={s.chipGrid}>
          {CROHNS_LOCATIONS.map((loc) => {
            const isActive = crohnsLocation === loc;
            return (
              <TouchableOpacity
                key={loc}
                style={[
                  s.chip,
                  {
                    backgroundColor: isActive ? c.primary + '20' : c.inputBackground,
                    borderColor: isActive ? c.primary : c.inputBorder,
                  },
                ]}
                onPress={() => setCrohnsLocation(isActive ? '' : loc)}
              >
                <Text style={[s.chipText, { color: isActive ? c.primary : c.textSecondary }]}>
                  {loc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Dietary Phase */}
        <Text style={[s.sectionTitle, { color: c.text }]}>Dietary Recovery Phase</Text>
        <Text style={[s.sectionHint, { color: c.textTertiary }]}>
          Post-surgery or current dietary phase
        </Text>
        {DIETARY_PHASES.map((dp) => {
          const isActive = dietaryPhase === dp.value;
          return (
            <TouchableOpacity
              key={dp.value}
              style={[
                s.optionCard,
                {
                  backgroundColor: isActive ? c.primary + '12' : c.inputBackground,
                  borderColor: isActive ? c.primary : c.inputBorder,
                },
              ]}
              onPress={() => setDietaryPhase(dp.value)}
            >
              <View style={s.optionInfo}>
                <Text style={[s.optionLabel, { color: isActive ? c.primary : c.text }]}>
                  {dp.label}
                </Text>
                <Text style={[s.optionDesc, { color: c.textSecondary }]}>{dp.desc}</Text>
              </View>
              {isActive && <Ionicons name="checkmark-circle" size={24} color={c.primary} />}
            </TouchableOpacity>
          );
        })}

        <View style={{ height: spacing.xxl * 2 }} />
      </ScrollView>
    </View>
  );
}

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
    },
    headerButton: {
      minWidth: 60,
      minHeight: sizing.tapTarget,
      justifyContent: 'center',
    },
    headerTitle: { fontSize: sizing.fontLg, fontWeight: '600' },
    saveText: { fontSize: sizing.fontBase },
    body: { flex: 1 },
    bodyContent: { padding: spacing.md },
    sectionTitle: {
      fontSize: sizing.fontBase,
      fontWeight: '600',
      marginTop: spacing.lg,
      marginBottom: spacing.xs,
    },
    sectionHint: {
      fontSize: sizing.fontSm,
      marginBottom: spacing.sm,
    },
    input: {
      height: sizing.tapTarget,
      borderRadius: sizing.radiusSmall,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
      fontSize: sizing.fontBase,
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.md,
      borderRadius: sizing.radiusMedium,
      borderWidth: 1.5,
      marginBottom: spacing.sm,
      minHeight: sizing.tapTargetLarge,
    },
    optionInfo: { flex: 1 },
    optionLabel: { fontSize: sizing.fontBase, fontWeight: '600' },
    optionDesc: { fontSize: sizing.fontSm, marginTop: 2 },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.lg,
      paddingVertical: spacing.sm,
    },
    switchInfo: { flex: 1 },
    resectionDetails: {
      padding: spacing.md,
      borderRadius: sizing.radiusMedium,
      borderWidth: 1,
      marginTop: spacing.sm,
    },
    detailLabel: {
      fontSize: sizing.fontSm,
      fontWeight: '500',
      marginBottom: spacing.sm,
    },
    chipGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    chip: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: sizing.radiusRound,
      borderWidth: 1.5,
      minHeight: 36,
      justifyContent: 'center',
    },
    chipText: { fontSize: sizing.fontSm },
    infoBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing.sm,
      padding: spacing.md,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.md,
    },
    infoText: {
      flex: 1,
      fontSize: sizing.fontSm,
      lineHeight: 20,
    },
  });
}
