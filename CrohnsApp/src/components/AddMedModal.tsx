/**
 * Add Medication Modal — Quick form to add a new medication to track.
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
import { MED_FREQUENCIES, MED_TIMES, MED_CATEGORIES } from '../types/medications';

interface AddMedModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: AddMedData) => void;
}

export interface AddMedData {
  name: string;
  dosage?: string;
  frequency?: string;
  time_of_day?: string;
  category?: string;
}

export function AddMedModal({ visible, onClose, onSave }: AddMedModalProps) {
  const c = useThemeColors();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (visible) {
      setName('');
      setDosage('');
      setFrequency(null);
      setTimeOfDay(null);
      setCategory(null);
    }
  }, [visible]);

  const handleSave = () => {
    if (!name.trim()) return;

    const data: AddMedData = { name: name.trim() };
    if (dosage.trim()) data.dosage = dosage.trim();
    if (frequency) data.frequency = frequency;
    if (timeOfDay) data.time_of_day = timeOfDay;
    if (category) data.category = category;

    onSave(data);
  };

  const canSave = name.trim().length > 0;
  const s = createStyles(c);

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
          <Text style={[s.headerTitle, { color: c.text }]}>Add Medication</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={s.headerButton}
            disabled={!canSave}
            accessibilityLabel="Save medication"
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
          {/* Name — Required */}
          <Text style={[s.label, { color: c.textSecondary }]}>
            Medication name *
          </Text>
          <TextInput
            style={[
              s.input,
              {
                backgroundColor: c.inputBackground,
                borderColor: c.inputBorder,
                color: c.text,
              },
            ]}
            placeholder="e.g., Humira, Prednisone, B12"
            placeholderTextColor={c.placeholder}
            value={name}
            onChangeText={setName}
            autoFocus
            autoCapitalize="words"
          />

          {/* Dosage */}
          <Text style={[s.label, { color: c.textSecondary }]}>
            Dosage (optional)
          </Text>
          <TextInput
            style={[
              s.input,
              {
                backgroundColor: c.inputBackground,
                borderColor: c.inputBorder,
                color: c.text,
              },
            ]}
            placeholder="e.g., 40mg, 1000mcg, 2 capsules"
            placeholderTextColor={c.placeholder}
            value={dosage}
            onChangeText={setDosage}
          />

          {/* Frequency */}
          <Text style={[s.label, { color: c.textSecondary }]}>Frequency</Text>
          <View style={s.chipGrid}>
            {MED_FREQUENCIES.map((f) => {
              const isActive = frequency === f.value;
              return (
                <TouchableOpacity
                  key={f.value}
                  style={[
                    s.chip,
                    {
                      backgroundColor: isActive
                        ? c.primary + '15'
                        : c.inputBackground,
                      borderColor: isActive ? c.primary : c.inputBorder,
                    },
                  ]}
                  onPress={() => setFrequency(isActive ? null : f.value)}
                  accessibilityLabel={f.label}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      s.chipText,
                      { color: isActive ? c.primary : c.textSecondary },
                      isActive && { fontWeight: '600' },
                    ]}
                  >
                    {f.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Time of Day */}
          <Text style={[s.label, { color: c.textSecondary }]}>Time of day</Text>
          <View style={s.timeRow}>
            {MED_TIMES.map((t) => {
              const isActive = timeOfDay === t.value;
              return (
                <TouchableOpacity
                  key={t.value}
                  style={[
                    s.timeButton,
                    {
                      backgroundColor: isActive
                        ? c.primary + '15'
                        : c.inputBackground,
                      borderColor: isActive ? c.primary : c.inputBorder,
                    },
                  ]}
                  onPress={() => setTimeOfDay(isActive ? null : t.value)}
                  accessibilityLabel={t.label}
                  accessibilityRole="button"
                >
                  <Ionicons
                    name={t.icon as any}
                    size={20}
                    color={isActive ? c.primary : c.textTertiary}
                  />
                  <Text
                    style={[
                      s.timeLabel,
                      { color: isActive ? c.primary : c.textSecondary },
                    ]}
                  >
                    {t.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Category */}
          <Text style={[s.label, { color: c.textSecondary }]}>Category</Text>
          <View style={s.chipGrid}>
            {MED_CATEGORIES.map((cat) => {
              const isActive = category === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    s.chip,
                    {
                      backgroundColor: isActive
                        ? c.safe + '15'
                        : c.inputBackground,
                      borderColor: isActive ? c.safe : c.inputBorder,
                    },
                  ]}
                  onPress={() => setCategory(isActive ? null : cat)}
                  accessibilityLabel={cat}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      s.chipText,
                      { color: isActive ? c.safe : c.textSecondary },
                      isActive && { fontWeight: '600' },
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
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
    headerButtonText: { fontSize: sizing.fontBase },
    headerTitle: { fontSize: sizing.fontLg, fontWeight: '600' },
    body: { flex: 1 },
    bodyContent: { padding: spacing.md, paddingBottom: spacing.xxl * 2 },
    label: {
      fontSize: sizing.fontSm,
      fontWeight: '500',
      marginBottom: spacing.sm,
      marginTop: spacing.lg,
    },
    input: {
      height: sizing.tapTarget,
      borderRadius: sizing.radiusSmall,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
      fontSize: sizing.fontBase,
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
    timeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    timeButton: {
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: sizing.radiusMedium,
      borderWidth: 1.5,
      minHeight: sizing.tapTarget,
      justifyContent: 'center',
      gap: 4,
    },
    timeLabel: { fontSize: sizing.fontXs },
  });
}
