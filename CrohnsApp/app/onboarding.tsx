/**
 * Onboarding — First-time setup for new users.
 *
 * Collects the essentials that drive food scoring:
 * 1. Welcome
 * 2. Name
 * 3. Disease state (flare/remission/uncertain)
 * 4. Bowel resection (yes/no + details)
 * 5. Dietary phase
 * 6. All set — go to dashboard
 *
 * Warm, low-pressure tone. Every screen explains
 * WHY we need the info in plain language.
 */

import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors } from '../src/theme/colors';
import { spacing, sizing } from '../src/theme/spacing';
import {
  useAppStore,
  type DiseaseState,
  type DietaryPhase,
  type ResectionStatus,
} from '../src/store/useAppStore';

const TOTAL_STEPS = 6;

export default function OnboardingScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = colors[scheme];
  const { setUser } = useAppStore();

  const [step, setStep] = useState(0);

  // Collected data
  const [name, setName] = useState('');
  const [diseaseState, setDiseaseState] = useState<DiseaseState>('uncertain');
  const [hasResection, setHasResection] = useState(false);
  const [resectionStatus, setResectionStatus] = useState<ResectionStatus>('none');
  const [resectionType, setResectionType] = useState('');
  const [dietaryPhase, setDietaryPhase] = useState<DietaryPhase>('phase_5_maintenance');

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const finish = () => {
    setUser({
      name: name.trim(),
      diseaseState,
      hasResection,
      resectionStatus: hasResection ? resectionStatus : 'none',
      resectionType: hasResection ? resectionType : undefined,
      dietaryPhase,
      onboardingComplete: true,
    });
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Progress bar */}
      {step > 0 && step < TOTAL_STEPS - 1 && (
        <View style={styles.progressContainer}>
          <View style={[styles.progressBg, { backgroundColor: c.border }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: c.primary,
                  width: `${((step) / (TOTAL_STEPS - 2)) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Back button */}
      {step > 0 && step < TOTAL_STEPS - 1 && (
        <TouchableOpacity style={styles.backButton} onPress={back}>
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
      )}

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 0: Welcome */}
        {step === 0 && (
          <View style={styles.stepCenter}>
            <View style={[styles.iconCircle, { backgroundColor: c.primaryLight }]}>
              <Ionicons name="shield-checkmark" size={56} color={c.primary} />
            </View>
            <Text style={[styles.welcomeTitle, { color: c.text }]}>
              Welcome to CrohnsApp
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: c.textSecondary }]}>
              Your personal Crohn's disease companion.{'\n\n'}
              We'll ask a few quick questions so the app can give you{' '}
              <Text style={{ fontWeight: '600', color: c.text }}>
                personalized food safety ratings
              </Text>
              {' '}based on your specific situation.
            </Text>
            <Text style={[styles.welcomeNote, { color: c.textTertiary }]}>
              Takes about 1 minute. You can change everything later in Settings.
            </Text>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: c.primary }]}
              onPress={next}
            >
              <Text style={styles.primaryButtonText}>Let's Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Step 1: Name */}
        {step === 1 && (
          <View style={styles.step}>
            <Text style={[styles.stepTitle, { color: c.text }]}>
              What should we call you?
            </Text>
            <Text style={[styles.stepDescription, { color: c.textSecondary }]}>
              Just your first name — we'll use it to greet you on the dashboard.
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: c.inputBackground,
                  borderColor: c.inputBorder,
                  color: c.text,
                },
              ]}
              value={name}
              onChangeText={setName}
              placeholder="Your first name"
              placeholderTextColor={c.placeholder}
              autoCapitalize="words"
              autoFocus
            />
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: c.primary }]}
              onPress={next}
            >
              <Text style={styles.primaryButtonText}>
                {name.trim() ? 'Continue' : 'Skip for now'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Disease State */}
        {step === 2 && (
          <View style={styles.step}>
            <Text style={[styles.stepTitle, { color: c.text }]}>
              How are things right now?
            </Text>
            <Text style={[styles.stepDescription, { color: c.textSecondary }]}>
              This is the most important setting — it changes which foods get flagged as risky.
              You can update this anytime from the dashboard.
            </Text>
            {[
              {
                value: 'remission' as DiseaseState,
                label: 'Remission',
                desc: 'Symptoms are under control. I feel pretty good.',
                icon: 'sunny-outline',
                color: c.safe,
              },
              {
                value: 'uncertain' as DiseaseState,
                label: 'Uncertain',
                desc: "Not sure where I'm at. Some good days, some bad.",
                icon: 'help-circle-outline',
                color: c.caution,
              },
              {
                value: 'flare' as DiseaseState,
                label: 'In a Flare',
                desc: 'Active symptoms right now. Need to be extra careful.',
                icon: 'flame-outline',
                color: c.danger,
              },
            ].map((ds) => {
              const isActive = diseaseState === ds.value;
              return (
                <TouchableOpacity
                  key={ds.value}
                  style={[
                    styles.optionCard,
                    {
                      backgroundColor: isActive ? ds.color + '12' : c.inputBackground,
                      borderColor: isActive ? ds.color : c.inputBorder,
                    },
                  ]}
                  onPress={() => setDiseaseState(ds.value)}
                >
                  <Ionicons
                    name={ds.icon as any}
                    size={28}
                    color={isActive ? ds.color : c.textTertiary}
                  />
                  <View style={styles.optionText}>
                    <Text style={[styles.optionLabel, { color: isActive ? ds.color : c.text }]}>
                      {ds.label}
                    </Text>
                    <Text style={[styles.optionDesc, { color: c.textSecondary }]}>
                      {ds.desc}
                    </Text>
                  </View>
                  {isActive && (
                    <Ionicons name="checkmark-circle" size={24} color={ds.color} />
                  )}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: c.primary }]}
              onPress={next}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: Bowel Resection */}
        {step === 3 && (
          <View style={styles.step}>
            <Text style={[styles.stepTitle, { color: c.text }]}>
              Have you had bowel surgery?
            </Text>
            <Text style={[styles.stepDescription, { color: c.textSecondary }]}>
              If you've had part of your bowel removed, the app will flag additional risks
              like high-fat foods (bile acid diarrhea) and high-oxalate foods (kidney stones).
            </Text>

            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: c.text }]}>
                I've had bowel surgery
              </Text>
              <Switch
                value={hasResection}
                onValueChange={setHasResection}
                trackColor={{ false: c.disabled, true: c.primary + '60' }}
                thumbColor={hasResection ? c.primary : c.textTertiary}
              />
            </View>

            {hasResection && (
              <View style={[styles.detailsBox, { backgroundColor: c.primaryLight, borderColor: c.primary + '30' }]}>
                <Text style={[styles.detailLabel, { color: c.textSecondary }]}>
                  How does your gut work now?
                </Text>
                {[
                  {
                    value: 'adapted' as ResectionStatus,
                    label: 'Adapted',
                    desc: 'Had surgery, but I tolerate most foods now',
                  },
                  {
                    value: 'sensitive' as ResectionStatus,
                    label: 'Still Sensitive',
                    desc: 'Had surgery and still deal with digestive issues',
                  },
                ].map((rs) => {
                  const isActive = resectionStatus === rs.value;
                  return (
                    <TouchableOpacity
                      key={rs.value}
                      style={[
                        styles.miniOption,
                        {
                          backgroundColor: isActive ? c.primary + '15' : c.card,
                          borderColor: isActive ? c.primary : c.inputBorder,
                        },
                      ]}
                      onPress={() => setResectionStatus(rs.value)}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.miniOptionLabel, { color: isActive ? c.primary : c.text }]}>
                          {rs.label}
                        </Text>
                        <Text style={[styles.miniOptionDesc, { color: c.textSecondary }]}>
                          {rs.desc}
                        </Text>
                      </View>
                      {isActive && <Ionicons name="checkmark-circle" size={20} color={c.primary} />}
                    </TouchableOpacity>
                  );
                })}

                <Text style={[styles.detailLabel, { color: c.textSecondary, marginTop: spacing.md }]}>
                  Type of surgery (optional)
                </Text>
                {['Ileocecal resection', 'Small bowel resection', 'Large bowel / colectomy', 'Other / not sure'].map((rt) => {
                  const isActive = resectionType === rt;
                  return (
                    <TouchableOpacity
                      key={rt}
                      style={[
                        styles.chip,
                        {
                          backgroundColor: isActive ? c.primary + '15' : c.card,
                          borderColor: isActive ? c.primary : c.inputBorder,
                        },
                      ]}
                      onPress={() => setResectionType(isActive ? '' : rt)}
                    >
                      <Text style={[styles.chipText, { color: isActive ? c.primary : c.textSecondary }]}>
                        {rt}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: c.primary }]}
              onPress={next}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 4: Dietary Phase */}
        {step === 4 && (
          <View style={styles.step}>
            <Text style={[styles.stepTitle, { color: c.text }]}>
              Where are you in your diet journey?
            </Text>
            <Text style={[styles.stepDescription, { color: c.textSecondary }]}>
              This helps filter meal plans and recipes to match what your gut can handle right now.
              Most people who aren't recovering from surgery are in Phase 5.
            </Text>
            {[
              { value: 'phase_1_clear_liquids' as DietaryPhase, label: 'Phase 1 — Clear Liquids', desc: 'Post-surgery or severe flare' },
              { value: 'phase_2_full_liquids' as DietaryPhase, label: 'Phase 2 — Full Liquids', desc: 'Broths, smoothies, protein shakes' },
              { value: 'phase_3_low_residue' as DietaryPhase, label: 'Phase 3 — Low Residue', desc: 'Soft, easy-to-digest foods' },
              { value: 'phase_4_reintroduction' as DietaryPhase, label: 'Phase 4 — Reintroduction', desc: 'Carefully adding foods back' },
              { value: 'phase_5_maintenance' as DietaryPhase, label: 'Phase 5 — Maintenance', desc: 'Eating normally with awareness' },
            ].map((dp) => {
              const isActive = dietaryPhase === dp.value;
              return (
                <TouchableOpacity
                  key={dp.value}
                  style={[
                    styles.miniOption,
                    {
                      backgroundColor: isActive ? c.primary + '12' : c.inputBackground,
                      borderColor: isActive ? c.primary : c.inputBorder,
                    },
                  ]}
                  onPress={() => setDietaryPhase(dp.value)}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.miniOptionLabel, { color: isActive ? c.primary : c.text }]}>
                      {dp.label}
                    </Text>
                    <Text style={[styles.miniOptionDesc, { color: c.textSecondary }]}>
                      {dp.desc}
                    </Text>
                  </View>
                  {isActive && <Ionicons name="checkmark-circle" size={20} color={c.primary} />}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: c.primary }]}
              onPress={next}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 5: All Set */}
        {step === 5 && (
          <View style={styles.stepCenter}>
            <View style={[styles.iconCircle, { backgroundColor: c.safeBackground }]}>
              <Ionicons name="checkmark-circle" size={56} color={c.safe} />
            </View>
            <Text style={[styles.welcomeTitle, { color: c.text }]}>
              You're all set{name.trim() ? `, ${name.trim()}` : ''}!
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: c.textSecondary }]}>
              Your food scans will now be personalized to your{' '}
              {diseaseState === 'flare' ? 'flare' : diseaseState === 'remission' ? 'remission' : 'current'}{' '}
              state{hasResection ? ' and resection history' : ''}.
            </Text>

            <View style={[styles.summaryCard, { backgroundColor: c.card, borderColor: c.border }]}>
              <SummaryRow label="Disease State" value={diseaseState === 'flare' ? 'Flare' : diseaseState === 'remission' ? 'Remission' : 'Uncertain'} color={c} />
              <SummaryRow label="Bowel Surgery" value={hasResection ? 'Yes' : 'No'} color={c} />
              <SummaryRow label="Dietary Phase" value={dietaryPhase.replace('phase_', 'Phase ').replace('_', ' — ').replace(/_/g, ' ')} color={c} />
            </View>

            <Text style={[styles.welcomeNote, { color: c.textTertiary }]}>
              You can change any of this in Profile under the More tab.
            </Text>

            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: c.safe }]}
              onPress={finish}
            >
              <Text style={styles.primaryButtonText}>Start Using CrohnsApp</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function SummaryRow({ label, value, color: c }: { label: string; value: string; color: typeof colors.light }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, { color: c.textSecondary }]}>{label}</Text>
      <Text style={[styles.summaryValue, { color: c.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  progressBg: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  backButton: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    width: sizing.tapTarget,
    height: sizing.tapTarget,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  stepCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  step: {
    paddingTop: spacing.md,
  },
  iconCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  welcomeTitle: {
    fontSize: sizing.fontHeading,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  welcomeSubtitle: {
    fontSize: sizing.fontBase,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: spacing.md,
  },
  welcomeNote: {
    fontSize: sizing.fontSm,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  stepTitle: {
    fontSize: sizing.fontXl,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  stepDescription: {
    fontSize: sizing.fontBase,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  textInput: {
    height: sizing.tapTargetLarge,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: sizing.fontLg,
    marginBottom: spacing.lg,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 2,
    marginBottom: spacing.sm,
    minHeight: sizing.tapTargetLarge + 8,
    gap: spacing.md,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
  },
  optionDesc: {
    fontSize: sizing.fontSm,
    marginTop: 2,
    lineHeight: 18,
  },
  miniOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1.5,
    marginBottom: spacing.sm,
    minHeight: sizing.tapTargetLarge,
  },
  miniOptionLabel: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
  },
  miniOptionDesc: {
    fontSize: sizing.fontSm,
    marginTop: 2,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  switchLabel: {
    fontSize: sizing.fontLg,
    fontWeight: '500',
  },
  detailsBox: {
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: sizing.radiusRound,
    borderWidth: 1.5,
    marginBottom: spacing.xs,
    minHeight: 40,
    justifyContent: 'center',
  },
  chipText: {
    fontSize: sizing.fontSm,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: sizing.radiusMedium,
    marginTop: spacing.lg,
    minHeight: sizing.tapTargetLarge,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: sizing.fontLg,
    fontWeight: '700',
  },
  summaryCard: {
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    padding: spacing.md,
    width: '100%',
    marginTop: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    fontSize: sizing.fontSm,
  },
  summaryValue: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
  },
});
