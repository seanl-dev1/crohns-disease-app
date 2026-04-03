/**
 * Meal Log Modal — Quick meal entry form.
 *
 * Design principles:
 * - 10-second logging: food name + meal type is all that's required
 * - Optional details expandable (nutrition, notes)
 * - Large tap targets, compassionate design
 * - Auto-suggests meal type based on time of day
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
import { MEAL_TYPES, suggestMealType, type MealType } from '../types/food';

interface MealLogModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (entry: MealLogData) => void;
}

export interface MealLogData {
  food_name: string;
  meal_type: MealType;
  serving_size?: string;
  calories?: number;
  protein_g?: number;
  fat_g?: number;
  carbs_g?: number;
  fiber_g?: number;
  notes?: string;
}

export function MealLogModal({ visible, onClose, onSave }: MealLogModalProps) {
  const c = useThemeColors();

  const [foodName, setFoodName] = useState('');
  const [mealType, setMealType] = useState<MealType>(suggestMealType());
  const [servingSize, setServingSize] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fiber, setFiber] = useState('');
  const [notes, setNotes] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (visible) {
      setFoodName('');
      setMealType(suggestMealType());
      setServingSize('');
      setCalories('');
      setProtein('');
      setFat('');
      setCarbs('');
      setFiber('');
      setNotes('');
      setShowDetails(false);
    }
  }, [visible]);

  const handleSave = () => {
    if (!foodName.trim()) return;

    const entry: MealLogData = {
      food_name: foodName.trim(),
      meal_type: mealType,
    };

    // Only include optional fields if they have values
    if (servingSize.trim()) entry.serving_size = servingSize.trim();
    if (calories) entry.calories = parseFloat(calories);
    if (protein) entry.protein_g = parseFloat(protein);
    if (fat) entry.fat_g = parseFloat(fat);
    if (carbs) entry.carbs_g = parseFloat(carbs);
    if (fiber) entry.fiber_g = parseFloat(fiber);
    if (notes.trim()) entry.notes = notes.trim();

    onSave(entry);
  };

  const canSave = foodName.trim().length > 0;
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
          <Text style={[s.headerTitle, { color: c.text }]}>Log Meal</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={s.headerButton}
            disabled={!canSave}
            accessibilityLabel="Save meal"
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
          {/* Food Name — Required */}
          <Text style={[s.label, { color: c.textSecondary }]}>
            What did you eat? *
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
            placeholder="e.g., White rice with chicken"
            placeholderTextColor={c.placeholder}
            value={foodName}
            onChangeText={setFoodName}
            autoFocus
            returnKeyType="next"
          />

          {/* Meal Type Selector */}
          <Text style={[s.label, { color: c.textSecondary }]}>Meal</Text>
          <View style={s.mealTypeRow}>
            {MEAL_TYPES.map((mt) => {
              const isActive = mealType === mt.value;
              return (
                <TouchableOpacity
                  key={mt.value}
                  style={[
                    s.mealTypeButton,
                    {
                      backgroundColor: isActive
                        ? c.primary + '15'
                        : c.inputBackground,
                      borderColor: isActive ? c.primary : c.inputBorder,
                    },
                  ]}
                  onPress={() => setMealType(mt.value)}
                  accessibilityLabel={mt.label}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                >
                  <Ionicons
                    name={mt.icon as any}
                    size={20}
                    color={isActive ? c.primary : c.textTertiary}
                  />
                  <Text
                    style={[
                      s.mealTypeLabel,
                      { color: isActive ? c.primary : c.textSecondary },
                      isActive && { fontWeight: '600' },
                    ]}
                  >
                    {mt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Serving Size */}
          <Text style={[s.label, { color: c.textSecondary }]}>
            Serving size (optional)
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
            placeholder="e.g., 1 cup, 200g, 1 bowl"
            placeholderTextColor={c.placeholder}
            value={servingSize}
            onChangeText={setServingSize}
            returnKeyType="next"
          />

          {/* Optional Details Toggle */}
          <TouchableOpacity
            style={s.detailsToggle}
            onPress={() => setShowDetails(!showDetails)}
            accessibilityLabel={
              showDetails ? 'Hide nutrition details' : 'Add nutrition details'
            }
            accessibilityRole="button"
          >
            <Ionicons
              name={showDetails ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={c.primary}
            />
            <Text style={[s.detailsToggleText, { color: c.primary }]}>
              {showDetails ? 'Hide nutrition details' : 'Add nutrition details'}
            </Text>
          </TouchableOpacity>

          {/* Nutrition Details (optional) */}
          {showDetails && (
            <View style={s.nutritionGrid}>
              <NutritionInput
                label="Calories"
                unit="kcal"
                value={calories}
                onChangeText={setCalories}
                themeColors={c}
              />
              <NutritionInput
                label="Protein"
                unit="g"
                value={protein}
                onChangeText={setProtein}
                themeColors={c}
              />
              <NutritionInput
                label="Fat"
                unit="g"
                value={fat}
                onChangeText={setFat}
                themeColors={c}
              />
              <NutritionInput
                label="Carbs"
                unit="g"
                value={carbs}
                onChangeText={setCarbs}
                themeColors={c}
              />
              <NutritionInput
                label="Fiber"
                unit="g"
                value={fiber}
                onChangeText={setFiber}
                themeColors={c}
              />
            </View>
          )}

          {/* Notes */}
          <Text style={[s.label, { color: c.textSecondary }]}>
            Notes (optional)
          </Text>
          <TextInput
            style={[
              s.input,
              s.notesInput,
              {
                backgroundColor: c.inputBackground,
                borderColor: c.inputBorder,
                color: c.text,
              },
            ]}
            placeholder="How did it make you feel? Any concerns?"
            placeholderTextColor={c.placeholder}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Reminder — compassionate tone */}
          <View style={[s.reminder, { backgroundColor: c.primaryLight }]}>
            <Ionicons name="information-circle-outline" size={18} color={c.primary} />
            <Text style={[s.reminderText, { color: c.textSecondary }]}>
              Just logging the food name is enough. You can always add details later.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// --- Nutrition Input Sub-component ---

function NutritionInput({
  label,
  unit,
  value,
  onChangeText,
  themeColors: c,
}: {
  label: string;
  unit: string;
  value: string;
  onChangeText: (text: string) => void;
  themeColors: ThemeColors;
}) {
  return (
    <View style={nutritionStyles.container}>
      <Text style={[nutritionStyles.label, { color: c.textSecondary }]}>
        {label}
      </Text>
      <View style={nutritionStyles.row}>
        <TextInput
          style={[
            nutritionStyles.input,
            {
              backgroundColor: c.inputBackground,
              borderColor: c.inputBorder,
              color: c.text,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          placeholder="—"
          placeholderTextColor={c.placeholder}
        />
        <Text style={[nutritionStyles.unit, { color: c.textTertiary }]}>
          {unit}
        </Text>
      </View>
    </View>
  );
}

const nutritionStyles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: spacing.md,
  },
  label: {
    fontSize: sizing.fontSm,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: sizing.radiusSmall,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: sizing.fontBase,
  },
  unit: {
    fontSize: sizing.fontSm,
    marginLeft: spacing.sm,
    width: 30,
  },
});

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
      paddingBottom: spacing.xxl,
    },
    label: {
      fontSize: sizing.fontSm,
      fontWeight: '500',
      marginBottom: spacing.sm,
      marginTop: spacing.md,
    },
    input: {
      height: sizing.tapTarget,
      borderRadius: sizing.radiusSmall,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
      fontSize: sizing.fontBase,
    },
    notesInput: {
      height: 80,
      paddingTop: spacing.md,
    },
    mealTypeRow: {
      flexDirection: 'row',
      gap: spacing.sm,
    },
    mealTypeButton: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.md,
      borderRadius: sizing.radiusMedium,
      borderWidth: 1.5,
      minHeight: sizing.tapTargetLarge,
      justifyContent: 'center',
      gap: 4,
    },
    mealTypeLabel: {
      fontSize: sizing.fontXs,
    },
    detailsToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
      paddingVertical: spacing.md,
      marginTop: spacing.sm,
    },
    detailsToggleText: {
      fontSize: sizing.fontSm,
      fontWeight: '500',
    },
    nutritionGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
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
