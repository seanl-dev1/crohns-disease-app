/**
 * Symptom Log Modal — Quick symptom entry form.
 *
 * Design principles:
 * - Feeling check + optional Bristol scale is the minimum (10 seconds)
 * - Symptom tags are toggleable chips (fast tapping)
 * - Pain slider for quick input
 * - No guilt — "Skip anything you don't want to track"
 */

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColors, spacing, sizing, type ThemeColors } from '../theme';
import {
  BRISTOL_SCALE,
  SYMPTOM_TAGS,
  ENERGY_LEVELS,
} from '../types/symptoms';

interface SymptomLogModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (entry: SymptomLogData) => void;
}

export interface SymptomLogData {
  overall_feeling: number;
  bristol_scale?: number;
  bowel_movement_count?: number;
  pain_level?: number;
  energy_level?: number;
  symptoms?: string[];
  notes?: string;
}

const FEELINGS = [
  { value: 1, label: 'Terrible', emoji: '😣' },
  { value: 2, label: 'Bad', emoji: '😞' },
  { value: 3, label: 'Okay', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '🙂' },
  { value: 5, label: 'Great', emoji: '😊' },
];

export function SymptomLogModal({ visible, onClose, onSave }: SymptomLogModalProps) {
  const c = useThemeColors();

  const [feeling, setFeeling] = useState<number | null>(null);
  const [bristolScale, setBristolScale] = useState<number | null>(null);
  const [bmCount, setBmCount] = useState('');
  const [painLevel, setPainLevel] = useState<number | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      setFeeling(null);
      setBristolScale(null);
      setBmCount('');
      setPainLevel(null);
      setEnergyLevel(null);
      setSelectedSymptoms([]);
      setNotes('');
    }
  }, [visible]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (feeling == null) return;

    const entry: SymptomLogData = {
      overall_feeling: feeling,
    };

    if (bristolScale != null) entry.bristol_scale = bristolScale;
    if (bmCount) entry.bowel_movement_count = parseInt(bmCount, 10);
    if (painLevel != null) entry.pain_level = painLevel;
    if (energyLevel != null) entry.energy_level = energyLevel;
    if (selectedSymptoms.length > 0) entry.symptoms = selectedSymptoms;
    if (notes.trim()) entry.notes = notes.trim();

    onSave(entry);
  };

  const canSave = feeling != null;
  const s = createStyles(c);

  const feelingColors = [
    c.feelingTerrible,
    c.feelingBad,
    c.feelingOkay,
    c.feelingGood,
    c.feelingGreat,
  ];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={[s.container, { backgroundColor: c.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={[s.header, { borderBottomColor: c.divider }]}>
          <TouchableOpacity
            onPress={onClose}
            style={s.headerButton}
            accessibilityLabel="Cancel"
            accessibilityRole="button"
          >
            <Text style={[s.headerButtonText, { color: c.textSecondary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={[s.headerTitle, { color: c.text }]}>Log Symptoms</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={s.headerButton}
            disabled={!canSave}
            accessibilityLabel="Save symptoms"
            accessibilityRole="button"
          >
            <Text
              style={[
                s.headerButtonText,
                { color: canSave ? c.primary : c.disabled },
                canSave && { fontWeight: '700' },
              ]}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={s.body}
          contentContainerStyle={s.bodyContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Overall Feeling — Required */}
          <Text style={[s.sectionTitle, { color: c.text }]}>
            How are you feeling? *
          </Text>
          <View style={s.feelingRow}>
            {FEELINGS.map((f) => {
              const isActive = feeling === f.value;
              const color = feelingColors[f.value - 1];
              return (
                <TouchableOpacity
                  key={f.value}
                  style={[
                    s.feelingButton,
                    {
                      backgroundColor: isActive ? color + '20' : c.inputBackground,
                      borderColor: isActive ? color : 'transparent',
                    },
                  ]}
                  onPress={() => setFeeling(f.value)}
                  accessibilityLabel={`Feeling ${f.label}`}
                  accessibilityRole="button"
                >
                  <Text style={s.feelingEmoji}>{f.emoji}</Text>
                  <Text
                    style={[
                      s.feelingLabel,
                      { color: isActive ? color : c.textSecondary },
                    ]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bristol Stool Scale */}
          <Text style={[s.sectionTitle, { color: c.text }]}>
            Stool type (Bristol Scale)
          </Text>
          <Text style={[s.sectionHint, { color: c.textTertiary }]}>
            Skip if no bowel movement
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.bristolRow}
          >
            {BRISTOL_SCALE.map((b) => {
              const isActive = bristolScale === b.value;
              return (
                <TouchableOpacity
                  key={b.value}
                  style={[
                    s.bristolButton,
                    {
                      backgroundColor: isActive
                        ? c.primary + '15'
                        : c.inputBackground,
                      borderColor: isActive ? c.primary : c.inputBorder,
                    },
                  ]}
                  onPress={() =>
                    setBristolScale(isActive ? null : b.value)
                  }
                  accessibilityLabel={`${b.label}: ${b.desc}`}
                  accessibilityRole="button"
                >
                  <Text style={s.bristolEmoji}>{b.emoji}</Text>
                  <Text
                    style={[
                      s.bristolLabel,
                      { color: isActive ? c.primary : c.text },
                    ]}
                  >
                    {b.label}
                  </Text>
                  <Text
                    style={[
                      s.bristolDesc,
                      { color: isActive ? c.primary : c.textTertiary },
                    ]}
                    numberOfLines={2}
                  >
                    {b.desc}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* BM Count */}
          <View style={s.inlineField}>
            <Text style={[s.inlineLabel, { color: c.text }]}>
              Bowel movements today
            </Text>
            <TextInput
              style={[
                s.inlineInput,
                {
                  backgroundColor: c.inputBackground,
                  borderColor: c.inputBorder,
                  color: c.text,
                },
              ]}
              value={bmCount}
              onChangeText={setBmCount}
              keyboardType="numeric"
              placeholder="—"
              placeholderTextColor={c.placeholder}
            />
          </View>

          {/* Pain Level */}
          <Text style={[s.sectionTitle, { color: c.text }]}>Pain level</Text>
          <View style={s.painRow}>
            {Array.from({ length: 11 }, (_, i) => {
              const isActive = painLevel === i;
              const painColor =
                i === 0
                  ? c.safe
                  : i <= 3
                  ? c.feelingGood
                  : i <= 6
                  ? c.caution
                  : c.danger;
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    s.painButton,
                    {
                      backgroundColor: isActive
                        ? painColor + '20'
                        : c.inputBackground,
                      borderColor: isActive ? painColor : 'transparent',
                    },
                  ]}
                  onPress={() => setPainLevel(isActive ? null : i)}
                  accessibilityLabel={`Pain level ${i}`}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      s.painNumber,
                      { color: isActive ? painColor : c.textSecondary },
                      isActive && { fontWeight: '700' },
                    ]}
                  >
                    {i}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={s.painLabels}>
            <Text style={[s.painLabelText, { color: c.textTertiary }]}>
              No pain
            </Text>
            <Text style={[s.painLabelText, { color: c.textTertiary }]}>
              Worst pain
            </Text>
          </View>

          {/* Energy Level */}
          <Text style={[s.sectionTitle, { color: c.text }]}>Energy level</Text>
          <View style={s.energyRow}>
            {ENERGY_LEVELS.map((e) => {
              const isActive = energyLevel === e.value;
              return (
                <TouchableOpacity
                  key={e.value}
                  style={[
                    s.energyButton,
                    {
                      backgroundColor: isActive
                        ? c.primary + '15'
                        : c.inputBackground,
                      borderColor: isActive ? c.primary : 'transparent',
                    },
                  ]}
                  onPress={() =>
                    setEnergyLevel(isActive ? null : e.value)
                  }
                  accessibilityLabel={`Energy: ${e.label}`}
                  accessibilityRole="button"
                >
                  <Text style={s.energyEmoji}>{e.emoji}</Text>
                  <Text
                    style={[
                      s.energyLabel,
                      { color: isActive ? c.primary : c.textSecondary },
                    ]}
                  >
                    {e.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Symptom Tags */}
          <Text style={[s.sectionTitle, { color: c.text }]}>Symptoms</Text>
          <Text style={[s.sectionHint, { color: c.textTertiary }]}>
            Tap all that apply
          </Text>
          <View style={s.chipGrid}>
            {SYMPTOM_TAGS.map((symptom) => {
              const isActive = selectedSymptoms.includes(symptom);
              return (
                <TouchableOpacity
                  key={symptom}
                  style={[
                    s.chip,
                    {
                      backgroundColor: isActive
                        ? c.caution + '20'
                        : c.inputBackground,
                      borderColor: isActive ? c.caution : c.inputBorder,
                    },
                  ]}
                  onPress={() => toggleSymptom(symptom)}
                  accessibilityLabel={symptom}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                >
                  <Text
                    style={[
                      s.chipText,
                      { color: isActive ? c.caution : c.textSecondary },
                      isActive && { fontWeight: '600' },
                    ]}
                  >
                    {symptom}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Notes */}
          <Text style={[s.sectionTitle, { color: c.text }]}>Notes</Text>
          <TextInput
            style={[
              s.notesInput,
              {
                backgroundColor: c.inputBackground,
                borderColor: c.inputBorder,
                color: c.text,
              },
            ]}
            placeholder="Anything else you want to remember..."
            placeholderTextColor={c.placeholder}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Compassionate reminder */}
          <View style={[s.reminder, { backgroundColor: c.primaryLight }]}>
            <Ionicons
              name="heart-outline"
              size={18}
              color={c.primary}
            />
            <Text style={[s.reminderText, { color: c.textSecondary }]}>
              Only the feeling check is required. Skip anything you don&apos;t
              want to track right now.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// --- Styles ---

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
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
    headerButtonText: {
      fontSize: sizing.fontBase,
    },
    headerTitle: {
      fontSize: sizing.fontLg,
      fontWeight: '600',
    },
    body: {
      flex: 1,
    },
    bodyContent: {
      padding: spacing.md,
      paddingBottom: spacing.xxl * 2,
    },
    sectionTitle: {
      fontSize: sizing.fontBase,
      fontWeight: '600',
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
    },
    sectionHint: {
      fontSize: sizing.fontSm,
      marginBottom: spacing.sm,
    },

    // Feeling
    feelingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.xs,
    },
    feelingButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderRadius: sizing.radiusMedium,
      borderWidth: 2,
      minHeight: sizing.tapTargetLarge,
      justifyContent: 'center',
    },
    feelingEmoji: {
      fontSize: 24,
    },
    feelingLabel: {
      fontSize: sizing.fontXs,
      marginTop: 2,
    },

    // Bristol Scale
    bristolRow: {
      gap: spacing.sm,
      paddingVertical: spacing.xs,
    },
    bristolButton: {
      width: 100,
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.sm,
      borderRadius: sizing.radiusMedium,
      borderWidth: 1.5,
      minHeight: sizing.tapTargetLarge,
      justifyContent: 'center',
    },
    bristolEmoji: {
      fontSize: 20,
    },
    bristolLabel: {
      fontSize: sizing.fontSm,
      fontWeight: '600',
      marginTop: 4,
    },
    bristolDesc: {
      fontSize: sizing.fontXs,
      textAlign: 'center',
      marginTop: 2,
    },

    // BM Count
    inlineField: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.lg,
    },
    inlineLabel: {
      fontSize: sizing.fontBase,
      fontWeight: '500',
    },
    inlineInput: {
      width: 64,
      height: 44,
      borderRadius: sizing.radiusSmall,
      borderWidth: 1,
      textAlign: 'center',
      fontSize: sizing.fontLg,
    },

    // Pain Level
    painRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 2,
    },
    painButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderRadius: sizing.radiusSmall,
      borderWidth: 2,
      minHeight: 40,
      justifyContent: 'center',
    },
    painNumber: {
      fontSize: sizing.fontSm,
    },
    painLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    painLabelText: {
      fontSize: sizing.fontXs,
    },

    // Energy Level
    energyRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.xs,
    },
    energyButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderRadius: sizing.radiusMedium,
      borderWidth: 2,
      minHeight: sizing.tapTarget,
      justifyContent: 'center',
    },
    energyEmoji: {
      fontSize: 20,
    },
    energyLabel: {
      fontSize: sizing.fontXs,
      marginTop: 2,
    },

    // Symptom Chips
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
    chipText: {
      fontSize: sizing.fontSm,
    },

    // Notes
    notesInput: {
      height: 80,
      borderRadius: sizing.radiusSmall,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      fontSize: sizing.fontBase,
    },

    // Reminder
    reminder: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.md,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.lg,
    },
    reminderText: {
      flex: 1,
      fontSize: sizing.fontSm,
      lineHeight: 20,
    },
  });
}
