/**
 * Meal Plan screen — Weekly pre-planned meals personalized to user.
 *
 * Features:
 * - Set dietary preferences (dairy-free, gluten-free, etc.)
 * - Add disliked foods
 * - Generate a 7-day meal plan based on profile + preferences
 * - View each day's meals with nutrition totals
 * - Regenerate anytime for a fresh plan
 * - Tap a recipe to see details
 */

import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing, type ThemeColors } from '../src/theme';
import { useAppStore } from '../src/store/useAppStore';
import { generateMealPlan, type WeeklyMealPlan, type DayPlan } from '../src/engine/mealPlanner';
import { type RecipeSummary } from '../src/engine/recipeDatabase';

const DIETARY_OPTIONS = [
  { value: 'low-fodmap', label: 'Low-FODMAP' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'low-fat', label: 'Low-Fat' },
  { value: 'low-fiber', label: 'Low-Fiber' },
  { value: 'high-protein', label: 'High-Protein' },
  { value: 'low-residue', label: 'Low-Residue' },
  { value: 'low-oxalate', label: 'Low-Oxalate' },
];

export default function MealPlanScreen() {
  const c = useThemeColors();
  const { user, setUser } = useAppStore();

  const [plan, setPlan] = useState<WeeklyMealPlan | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(user.dietaryPreferences || []);
  const [dislikedText, setDislikedText] = useState((user.dislikedFoods || []).join(', '));
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeSummary | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const togglePref = (pref: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleGenerate = useCallback(() => {
    // Save preferences to store
    const dislikedFoods = dislikedText
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setUser({ dietaryPreferences: selectedPrefs, dislikedFoods });

    const newPlan = generateMealPlan(
      user.dietaryPhase,
      user.diseaseState,
      selectedPrefs,
      dislikedFoods,
      user.calorieTarget,
    );

    if (newPlan.days.length === 0) {
      Alert.alert(
        'No Recipes Match',
        'Your preferences are too restrictive. Try removing some dietary filters.',
      );
      return;
    }

    setPlan(newPlan);
    setShowPreferences(false);
  }, [user, selectedPrefs, dislikedText, setUser]);

  const s = createStyles(c);

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: c.divider }]}>
        <TouchableOpacity onPress={() => router.back()} style={s.headerButton}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.text }]}>Meal Plan</Text>
        <TouchableOpacity
          onPress={() => setShowPreferences(true)}
          style={s.headerButton}
        >
          <Ionicons name="options-outline" size={24} color={c.primary} />
        </TouchableOpacity>
      </View>

      {!plan ? (
        /* No plan yet — show setup */
        <ScrollView contentContainerStyle={s.setupContent}>
          <Ionicons name="calendar-outline" size={64} color={c.textTertiary} />
          <Text style={[s.setupTitle, { color: c.text }]}>Weekly Meal Plan</Text>
          <Text style={[s.setupSubtitle, { color: c.textSecondary }]}>
            Get a personalized 7-day meal plan based on your Crohn's profile, disease state, and food preferences.
          </Text>

          {/* Quick preferences */}
          <Text style={[s.prefLabel, { color: c.textSecondary }]}>
            Dietary preferences
          </Text>
          <View style={s.chipGrid}>
            {DIETARY_OPTIONS.map((opt) => {
              const isActive = selectedPrefs.includes(opt.value);
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    s.chip,
                    {
                      backgroundColor: isActive ? c.primary + '20' : c.inputBackground,
                      borderColor: isActive ? c.primary : c.inputBorder,
                    },
                  ]}
                  onPress={() => togglePref(opt.value)}
                >
                  <Text
                    style={[
                      s.chipText,
                      { color: isActive ? c.primary : c.textSecondary },
                      isActive && { fontWeight: '600' },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[s.prefLabel, { color: c.textSecondary }]}>
            Foods you dislike (comma-separated)
          </Text>
          <TextInput
            style={[s.input, { backgroundColor: c.inputBackground, borderColor: c.inputBorder, color: c.text }]}
            value={dislikedText}
            onChangeText={setDislikedText}
            placeholder="e.g., fish, eggs, tofu"
            placeholderTextColor={c.placeholder}
          />

          {/* Profile summary */}
          <View style={[s.profileSummary, { backgroundColor: c.primaryLight }]}>
            <Ionicons name="person-circle-outline" size={20} color={c.primary} />
            <Text style={[s.profileSummaryText, { color: c.textSecondary }]}>
              Phase: {user.dietaryPhase.replace('phase_', 'Phase ').replace(/_/g, ' ')}
              {'\n'}State: {user.diseaseState}
              {user.hasResection ? '\nResection: Yes' : ''}
            </Text>
          </View>

          <TouchableOpacity
            style={[s.generateButton, { backgroundColor: c.primary }]}
            onPress={handleGenerate}
          >
            <Ionicons name="sparkles-outline" size={22} color="#FFFFFF" />
            <Text style={s.generateButtonText}>Generate My Meal Plan</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        /* Plan generated — show weekly view */
        <ScrollView contentContainerStyle={s.planContent}>
          {/* Summary card */}
          <View style={[s.summaryCard, { backgroundColor: c.primaryLight }]}>
            <Text style={[s.summaryTitle, { color: c.primary }]}>Your Week</Text>
            <View style={s.summaryRow}>
              <View style={s.summaryItem}>
                <Text style={[s.summaryValue, { color: c.text }]}>
                  {plan.summary.avgCalories}
                </Text>
                <Text style={[s.summaryLabel, { color: c.textSecondary }]}>
                  avg cal/day
                </Text>
              </View>
              <View style={s.summaryItem}>
                <Text style={[s.summaryValue, { color: c.text }]}>
                  {plan.summary.avgProtein}g
                </Text>
                <Text style={[s.summaryLabel, { color: c.textSecondary }]}>
                  avg protein/day
                </Text>
              </View>
              <View style={s.summaryItem}>
                <Text style={[s.summaryValue, { color: c.text }]}>
                  {plan.summary.recipesUsed}
                </Text>
                <Text style={[s.summaryLabel, { color: c.textSecondary }]}>
                  unique recipes
                </Text>
              </View>
            </View>
          </View>

          {/* Day cards */}
          {plan.days.map((day) => (
            <DayCard
              key={day.day}
              day={day}
              expanded={expandedDay === day.day}
              onToggle={() =>
                setExpandedDay(expandedDay === day.day ? null : day.day)
              }
              onRecipeTap={setSelectedRecipe}
              themeColors={c}
            />
          ))}

          {/* Regenerate */}
          <TouchableOpacity
            style={[s.regenerateButton, { borderColor: c.primary }]}
            onPress={handleGenerate}
          >
            <Ionicons name="refresh-outline" size={20} color={c.primary} />
            <Text style={[s.regenerateText, { color: c.primary }]}>
              Generate New Plan
            </Text>
          </TouchableOpacity>

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      )}

      {/* Preferences Modal */}
      <Modal
        visible={showPreferences}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowPreferences(false)}
      >
        <View style={[s.container, { backgroundColor: c.background }]}>
          <View style={[s.header, { borderBottomColor: c.divider }]}>
            <TouchableOpacity onPress={() => setShowPreferences(false)} style={s.headerButton}>
              <Text style={{ color: c.textSecondary, fontSize: sizing.fontBase }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[s.headerTitle, { color: c.text }]}>Preferences</Text>
            <TouchableOpacity onPress={handleGenerate} style={s.headerButton}>
              <Text style={{ color: c.primary, fontSize: sizing.fontBase, fontWeight: '700' }}>Apply</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{ padding: spacing.md }}>
            <Text style={[s.prefLabel, { color: c.textSecondary }]}>Dietary preferences</Text>
            <View style={s.chipGrid}>
              {DIETARY_OPTIONS.map((opt) => {
                const isActive = selectedPrefs.includes(opt.value);
                return (
                  <TouchableOpacity
                    key={opt.value}
                    style={[s.chip, { backgroundColor: isActive ? c.primary + '20' : c.inputBackground, borderColor: isActive ? c.primary : c.inputBorder }]}
                    onPress={() => togglePref(opt.value)}
                  >
                    <Text style={[s.chipText, { color: isActive ? c.primary : c.textSecondary }, isActive && { fontWeight: '600' }]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={[s.prefLabel, { color: c.textSecondary, marginTop: spacing.lg }]}>
              Disliked foods
            </Text>
            <TextInput
              style={[s.input, { backgroundColor: c.inputBackground, borderColor: c.inputBorder, color: c.text }]}
              value={dislikedText}
              onChangeText={setDislikedText}
              placeholder="e.g., fish, eggs, tofu"
              placeholderTextColor={c.placeholder}
            />
          </ScrollView>
        </View>
      </Modal>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <Modal
          visible={!!selectedRecipe}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setSelectedRecipe(null)}
        >
          <RecipeDetailView
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            themeColors={c}
          />
        </Modal>
      )}
    </View>
  );
}

// --- Day Card ---

function DayCard({
  day,
  expanded,
  onToggle,
  onRecipeTap,
  themeColors: c,
}: {
  day: DayPlan;
  expanded: boolean;
  onToggle: () => void;
  onRecipeTap: (recipe: RecipeSummary) => void;
  themeColors: ThemeColors;
}) {
  return (
    <View style={[dayStyles.card, { backgroundColor: c.card, borderColor: c.border }]}>
      <TouchableOpacity style={dayStyles.header} onPress={onToggle}>
        <Text style={[dayStyles.dayName, { color: c.text }]}>{day.day}</Text>
        <View style={dayStyles.headerRight}>
          <Text style={[dayStyles.cals, { color: c.textTertiary }]}>
            {day.totalCalories} cal
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={c.textTertiary}
          />
        </View>
      </TouchableOpacity>

      {!expanded && (
        <Text style={[dayStyles.preview, { color: c.textSecondary }]} numberOfLines={1}>
          {day.breakfast.name} · {day.lunch.name} · {day.dinner.name}
        </Text>
      )}

      {expanded && (
        <View style={dayStyles.meals}>
          <MealRow label="Breakfast" recipe={day.breakfast} onTap={onRecipeTap} themeColors={c} icon="sunny-outline" />
          <MealRow label="Lunch" recipe={day.lunch} onTap={onRecipeTap} themeColors={c} icon="partly-sunny-outline" />
          <MealRow label="Dinner" recipe={day.dinner} onTap={onRecipeTap} themeColors={c} icon="moon-outline" />
          <MealRow label="Snack" recipe={day.snack} onTap={onRecipeTap} themeColors={c} icon="cafe-outline" />

          <View style={[dayStyles.totals, { borderTopColor: c.divider }]}>
            <Text style={[dayStyles.totalText, { color: c.textSecondary }]}>
              Total: {day.totalCalories} cal · {day.totalProtein}g protein
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

function MealRow({
  label,
  recipe,
  onTap,
  themeColors: c,
  icon,
}: {
  label: string;
  recipe: RecipeSummary;
  onTap: (r: RecipeSummary) => void;
  themeColors: ThemeColors;
  icon: string;
}) {
  return (
    <TouchableOpacity
      style={dayStyles.mealRow}
      onPress={() => onTap(recipe)}
      accessibilityLabel={`${label}: ${recipe.name}`}
    >
      <Ionicons name={icon as any} size={18} color={c.primary} />
      <View style={dayStyles.mealInfo}>
        <Text style={[dayStyles.mealLabel, { color: c.textTertiary }]}>{label}</Text>
        <Text style={[dayStyles.mealName, { color: c.text }]} numberOfLines={1}>
          {recipe.name}
        </Text>
      </View>
      <Text style={[dayStyles.mealCals, { color: c.textTertiary }]}>
        {recipe.nutrition.calories} cal
      </Text>
      <Ionicons name="chevron-forward" size={16} color={c.textTertiary} />
    </TouchableOpacity>
  );
}

const dayStyles = StyleSheet.create({
  card: {
    borderRadius: sizing.radiusLarge,
    borderWidth: 1,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    minHeight: sizing.tapTarget,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dayName: { fontSize: sizing.fontLg, fontWeight: '600' },
  cals: { fontSize: sizing.fontSm },
  preview: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, fontSize: sizing.fontSm },
  meals: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    minHeight: 44,
  },
  mealInfo: { flex: 1 },
  mealLabel: { fontSize: sizing.fontXs },
  mealName: { fontSize: sizing.fontBase, fontWeight: '500' },
  mealCals: { fontSize: sizing.fontSm },
  totals: { borderTopWidth: 1, paddingTop: spacing.sm, marginTop: spacing.sm },
  totalText: { fontSize: sizing.fontSm, fontWeight: '500', textAlign: 'center' },
});

// --- Recipe Detail View ---

function RecipeDetailView({
  recipe,
  onClose,
  themeColors: c,
}: {
  recipe: RecipeSummary;
  onClose: () => void;
  themeColors: ThemeColors;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: c.divider }}>
        <TouchableOpacity onPress={onClose} style={{ minHeight: sizing.tapTarget, justifyContent: 'center' }}>
          <Ionicons name="close" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: sizing.fontLg, fontWeight: '600', color: c.text, flex: 1, textAlign: 'center' }}>
          Recipe
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xxl * 2 }}>
        <Text style={{ fontSize: sizing.fontXl, fontWeight: '700', color: c.text }}>
          {recipe.name}
        </Text>
        <Text style={{ fontSize: sizing.fontBase, color: c.textSecondary, marginTop: spacing.xs }}>
          {recipe.description}
        </Text>

        {/* Quick stats */}
        <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.md }}>
          <StatBadge label="Prep" value={`${recipe.prepMinutes}m`} c={c} />
          <StatBadge label="Cook" value={`${recipe.cookMinutes}m`} c={c} />
          <StatBadge label="Serves" value={`${recipe.servings}`} c={c} />
          <StatBadge label="Cal" value={`${recipe.nutrition.calories}`} c={c} />
        </View>

        {/* Nutrition */}
        <Text style={{ fontSize: sizing.fontBase, fontWeight: '600', color: c.text, marginTop: spacing.lg }}>
          Nutrition per serving
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm }}>
          <NutriBadge label="Calories" value={`${recipe.nutrition.calories}`} c={c} />
          <NutriBadge label="Protein" value={`${recipe.nutrition.protein_g}g`} c={c} />
          <NutriBadge label="Fat" value={`${recipe.nutrition.fat_g}g`} c={c} />
          <NutriBadge label="Carbs" value={`${recipe.nutrition.carbs_g}g`} c={c} />
          <NutriBadge label="Fiber" value={`${recipe.nutrition.fiber_g}g`} c={c} />
        </View>

        {/* Key nutrients */}
        {recipe.keyNutrients.length > 0 && (
          <>
            <Text style={{ fontSize: sizing.fontBase, fontWeight: '600', color: c.text, marginTop: spacing.lg }}>
              Key nutrients
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm }}>
              {recipe.keyNutrients.map((n) => (
                <View key={n} style={{ backgroundColor: c.safeBackground, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: sizing.radiusRound }}>
                  <Text style={{ color: c.safe, fontSize: sizing.fontSm, fontWeight: '500' }}>✅ {n}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Dietary tags */}
        <Text style={{ fontSize: sizing.fontBase, fontWeight: '600', color: c.text, marginTop: spacing.lg }}>
          Dietary tags
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm }}>
          {recipe.dietaryTags.map((tag) => (
            <View key={tag} style={{ backgroundColor: c.primaryLight, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: sizing.radiusRound }}>
              <Text style={{ color: c.primary, fontSize: sizing.fontSm }}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Crohn's notes */}
        <View style={{ backgroundColor: c.primaryLight, padding: spacing.md, borderRadius: sizing.radiusMedium, marginTop: spacing.lg }}>
          <Text style={{ fontSize: sizing.fontSm, fontWeight: '600', color: c.primary, marginBottom: spacing.xs }}>
            Crohn's Notes
          </Text>
          <Text style={{ fontSize: sizing.fontSm, color: c.textSecondary, lineHeight: 20 }}>
            {recipe.crohnsNotes}
          </Text>
        </View>

        {/* Post-resection notes */}
        {recipe.postResectionNotes ? (
          <View style={{ backgroundColor: c.cautionBackground, padding: spacing.md, borderRadius: sizing.radiusMedium, marginTop: spacing.md }}>
            <Text style={{ fontSize: sizing.fontSm, fontWeight: '600', color: c.caution, marginBottom: spacing.xs }}>
              Post-Resection Notes
            </Text>
            <Text style={{ fontSize: sizing.fontSm, color: c.textSecondary, lineHeight: 20 }}>
              {recipe.postResectionNotes}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

function StatBadge({ label, value, c }: { label: string; value: string; c: ThemeColors }) {
  return (
    <View style={{ alignItems: 'center', backgroundColor: c.inputBackground, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: sizing.radiusMedium, flex: 1 }}>
      <Text style={{ fontSize: sizing.fontLg, fontWeight: '700', color: c.text }}>{value}</Text>
      <Text style={{ fontSize: sizing.fontXs, color: c.textTertiary }}>{label}</Text>
    </View>
  );
}

function NutriBadge({ label, value, c }: { label: string; value: string; c: ThemeColors }) {
  return (
    <View style={{ backgroundColor: c.inputBackground, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: sizing.radiusSmall }}>
      <Text style={{ fontSize: sizing.fontSm, fontWeight: '600', color: c.text }}>{value}</Text>
      <Text style={{ fontSize: sizing.fontXs, color: c.textTertiary }}>{label}</Text>
    </View>
  );
}

// --- Main Styles ---

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
    headerButton: { minWidth: 44, minHeight: sizing.tapTarget, justifyContent: 'center' },
    headerTitle: { fontSize: sizing.fontLg, fontWeight: '600' },
    setupContent: {
      padding: spacing.xl,
      alignItems: 'center',
    },
    setupTitle: {
      fontSize: sizing.fontXl,
      fontWeight: '700',
      marginTop: spacing.md,
    },
    setupSubtitle: {
      fontSize: sizing.fontBase,
      textAlign: 'center',
      marginTop: spacing.sm,
      lineHeight: 24,
    },
    prefLabel: {
      fontSize: sizing.fontSm,
      fontWeight: '500',
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
      alignSelf: 'flex-start',
    },
    chipGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
      width: '100%',
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
    input: {
      height: sizing.tapTarget,
      borderRadius: sizing.radiusSmall,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
      fontSize: sizing.fontBase,
      width: '100%',
    },
    profileSummary: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      padding: spacing.md,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.lg,
      width: '100%',
    },
    profileSummaryText: {
      flex: 1,
      fontSize: sizing.fontSm,
      lineHeight: 20,
    },
    generateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.lg,
      gap: spacing.sm,
      minHeight: sizing.tapTargetLarge,
      width: '100%',
    },
    generateButtonText: {
      color: '#FFFFFF',
      fontSize: sizing.fontBase,
      fontWeight: '600',
    },
    planContent: {
      padding: spacing.md,
    },
    summaryCard: {
      borderRadius: sizing.radiusLarge,
      padding: spacing.md,
      marginBottom: spacing.lg,
    },
    summaryTitle: {
      fontSize: sizing.fontBase,
      fontWeight: '600',
      marginBottom: spacing.sm,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    summaryItem: { alignItems: 'center' },
    summaryValue: { fontSize: sizing.fontXl, fontWeight: '700' },
    summaryLabel: { fontSize: sizing.fontXs, marginTop: 2 },
    regenerateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: spacing.md,
      borderRadius: sizing.radiusMedium,
      borderWidth: 1.5,
      gap: spacing.sm,
      minHeight: sizing.tapTarget,
    },
    regenerateText: { fontSize: sizing.fontBase, fontWeight: '500' },
  });
}
