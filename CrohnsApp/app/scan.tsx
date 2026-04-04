/**
 * Barcode Scanner screen — Scan a food item's barcode to get
 * Crohn's-specific safety analysis.
 *
 * Flow:
 * 1. Camera opens with barcode scanner
 * 2. Barcode detected → look up Open Food Facts
 * 3. Run through food classification engine
 * 4. Show results with safety rating
 */

import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { CameraView, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing, type ThemeColors } from '../src/theme';
import { useAppStore } from '../src/store/useAppStore';
import { lookupBarcode } from '../src/services/openFoodFacts';
import { classifyFood, type ClassificationResult, type Rating, type Flag } from '../src/engine/foodClassifier';
import { getProductReplacements, type ProductCategory } from '../src/engine/productReplacements';

type ScanState =
  | { phase: 'scanning' }
  | { phase: 'loading'; barcode: string }
  | { phase: 'not_found'; barcode: string }
  | { phase: 'results'; result: ClassificationResult }
  | { phase: 'error'; message: string };

export default function ScanScreen() {
  const c = useThemeColors();
  const { user } = useAppStore();
  const [permission, requestPermission] = useCameraPermissions();
  const [state, setState] = useState<ScanState>({ phase: 'scanning' });
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
    if (scanned) return;
    setScanned(true);

    const barcode = result.data;
    setState({ phase: 'loading', barcode });

    try {
      const lookup = await lookupBarcode(barcode);

      if (!lookup.found || !lookup.product) {
        setState({ phase: 'not_found', barcode });
        return;
      }

      const product = lookup.product;
      const classification = classifyFood(
        product.ingredients_text,
        product.nutriments,
        product.product_name,
        product.brands,
        {
          diseaseState: user.diseaseState,
          hasResection: user.hasResection,
          monthsSinceResection: undefined,
        },
        product.serving_quantity || 100
      );

      setState({ phase: 'results', result: classification });
    } catch (err: any) {
      setState({ phase: 'error', message: err.message || 'Something went wrong' });
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setState({ phase: 'scanning' });
  };

  const s = createStyles(c);

  // Permission handling
  if (!permission) {
    return (
      <View style={[s.container, s.center, { backgroundColor: c.background }]}>
        <ActivityIndicator size="large" color={c.primary} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[s.container, s.center, { backgroundColor: c.background }]}>
        <Ionicons name="camera-outline" size={64} color={c.textTertiary} />
        <Text style={[s.permissionTitle, { color: c.text }]}>
          Camera Permission Needed
        </Text>
        <Text style={[s.permissionText, { color: c.textSecondary }]}>
          We need your camera to scan barcodes on food packages.
        </Text>
        <TouchableOpacity
          style={[s.permissionButton, { backgroundColor: c.primary }]}
          onPress={requestPermission}
        >
          <Text style={s.permissionButtonText}>Allow Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[s.backButton, { borderColor: c.border }]}
          onPress={() => router.back()}
        >
          <Text style={[s.backButtonText, { color: c.textSecondary }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[s.header, { backgroundColor: c.background }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={s.headerBack}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[s.headerTitle, { color: c.text }]}>Scan Barcode</Text>
        <View style={s.headerBack} />
      </View>

      {state.phase === 'scanning' && (
        <View style={s.cameraContainer}>
          <CameraView
            style={s.camera}
            barcodeScannerSettings={{
              barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'],
            }}
            onBarcodeScanned={handleBarCodeScanned}
          />
          {/* Overlay with scan window */}
          <View style={s.overlay}>
            <View style={s.overlayTop} />
            <View style={s.overlayMiddle}>
              <View style={s.overlaySide} />
              <View style={s.scanWindow}>
                <View style={[s.cornerTL, { borderColor: c.primary }]} />
                <View style={[s.cornerTR, { borderColor: c.primary }]} />
                <View style={[s.cornerBL, { borderColor: c.primary }]} />
                <View style={[s.cornerBR, { borderColor: c.primary }]} />
              </View>
              <View style={s.overlaySide} />
            </View>
            <View style={s.overlayBottom}>
              <Text style={s.scanHint}>
                Point your camera at a barcode on a food package
              </Text>
            </View>
          </View>
        </View>
      )}

      {state.phase === 'loading' && (
        <View style={[s.container, s.center]}>
          <ActivityIndicator size="large" color={c.primary} />
          <Text style={[s.loadingText, { color: c.textSecondary }]}>
            Looking up product...
          </Text>
          <Text style={[s.loadingBarcode, { color: c.textTertiary }]}>
            Barcode: {state.barcode}
          </Text>
        </View>
      )}

      {state.phase === 'not_found' && (
        <View style={[s.container, s.center]}>
          <Ionicons name="search-outline" size={64} color={c.textTertiary} />
          <Text style={[s.notFoundTitle, { color: c.text }]}>
            Product Not Found
          </Text>
          <Text style={[s.notFoundText, { color: c.textSecondary }]}>
            Barcode {state.barcode} isn&apos;t in the Open Food Facts database yet.
          </Text>
          <TouchableOpacity
            style={[s.actionButton, { backgroundColor: c.primary }]}
            onPress={resetScanner}
          >
            <Ionicons name="scan-outline" size={20} color="#FFFFFF" />
            <Text style={s.actionButtonText}>Scan Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.secondaryButton, { borderColor: c.border }]}
            onPress={() => router.back()}
          >
            <Text style={[s.secondaryButtonText, { color: c.textSecondary }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {state.phase === 'error' && (
        <View style={[s.container, s.center]}>
          <Ionicons name="alert-circle-outline" size={64} color={c.danger} />
          <Text style={[s.notFoundTitle, { color: c.text }]}>Error</Text>
          <Text style={[s.notFoundText, { color: c.textSecondary }]}>
            {state.message}
          </Text>
          <TouchableOpacity
            style={[s.actionButton, { backgroundColor: c.primary }]}
            onPress={resetScanner}
          >
            <Text style={s.actionButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      )}

      {state.phase === 'results' && (
        <ResultsView
          result={state.result}
          onScanAgain={resetScanner}
          onGoBack={() => router.back()}
          themeColors={c}
        />
      )}
    </View>
  );
}

// --- Results View ---

function ResultsView({
  result,
  onScanAgain,
  onGoBack,
  themeColors: c,
}: {
  result: ClassificationResult;
  onScanAgain: () => void;
  onGoBack: () => void;
  themeColors: ThemeColors;
}) {
  const [showReplacements, setShowReplacements] = useState(false);

  const ratingColors: Record<Rating, string> = {
    GREEN: c.safe,
    YELLOW: c.caution,
    RED: c.danger,
  };

  const ratingBgColors: Record<Rating, string> = {
    GREEN: c.safeBackground,
    YELLOW: c.cautionBackground,
    RED: c.dangerBackground,
  };

  const ratingLabels: Record<Rating, string> = {
    GREEN: 'Looks Safe',
    YELLOW: 'Use Caution',
    RED: 'Not Recommended',
  };

  const ratingIcons: Record<Rating, string> = {
    GREEN: 'checkmark-circle',
    YELLOW: 'warning',
    RED: 'close-circle',
  };

  const dangers = result.allFlags.filter((f) => f.type === 'danger');
  const warnings = result.allFlags.filter((f) => f.type === 'warning');
  const positives = result.allFlags.filter((f) => f.type === 'positive');

  // Get product-level replacements for RED/YELLOW items
  const productReplacements =
    result.overallRating !== 'GREEN'
      ? getProductReplacements(result.productName, result.ingredients)
      : null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{ padding: spacing.md, paddingBottom: 120 }}
    >
      {/* Overall Rating Card */}
      <View
        style={[
          resultStyles.ratingCard,
          { backgroundColor: ratingBgColors[result.overallRating] },
        ]}
      >
        <Ionicons
          name={ratingIcons[result.overallRating] as any}
          size={48}
          color={ratingColors[result.overallRating]}
        />
        <Text
          style={[
            resultStyles.ratingLabel,
            { color: ratingColors[result.overallRating] },
          ]}
        >
          {ratingLabels[result.overallRating]}
        </Text>
        <Text style={[resultStyles.productName, { color: c.text }]}>
          {result.productName}
        </Text>
        {result.brand ? (
          <Text style={[resultStyles.brand, { color: c.textSecondary }]}>
            {result.brand}
          </Text>
        ) : null}
        <Text style={[resultStyles.summary, { color: c.textSecondary }]}>
          {result.summary}
        </Text>
      </View>

      {/* Safer Alternatives — shown immediately for RED/YELLOW */}
      {productReplacements && !showReplacements && (
        <TouchableOpacity
          style={[resultStyles.replacementCta, { backgroundColor: c.safe, }]}
          onPress={() => setShowReplacements(true)}
          activeOpacity={0.8}
          accessibilityLabel="See safer alternatives"
          accessibilityRole="button"
        >
          <Ionicons name="swap-horizontal" size={24} color="#FFFFFF" />
          <View style={{ flex: 1 }}>
            <Text style={resultStyles.replacementCtaTitle}>
              Want a safer alternative?
            </Text>
            <Text style={resultStyles.replacementCtaSubtitle}>
              Tap to see Crohn's-friendly replacements
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}

      {productReplacements && showReplacements && (
        <View style={[resultStyles.replacementSection, { backgroundColor: c.safeBackground, borderColor: c.safe }]}>
          <View style={resultStyles.replacementHeader}>
            <Ionicons name="swap-horizontal" size={22} color={c.safe} />
            <Text style={[resultStyles.replacementSectionTitle, { color: c.safe }]}>
              {productReplacements.label}
            </Text>
          </View>
          {productReplacements.replacements.map((r, idx) => (
            <View
              key={idx}
              style={[
                resultStyles.productReplacementCard,
                { backgroundColor: c.card, borderColor: c.border },
              ]}
            >
              <View style={resultStyles.productReplacementTop}>
                <Ionicons name="checkmark-circle" size={20} color={c.safe} />
                <Text style={[resultStyles.productReplacementName, { color: c.text }]}>
                  {r.name}
                </Text>
              </View>
              <Text style={[resultStyles.productReplacementWhy, { color: c.textSecondary }]}>
                {r.why}
              </Text>
              {r.findsAt && (
                <Text style={[resultStyles.productReplacementFinds, { color: c.textTertiary }]}>
                  Find it: {r.findsAt}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Danger Flags */}
      {dangers.length > 0 && (
        <View style={resultStyles.section}>
          <Text style={[resultStyles.sectionTitle, { color: c.danger }]}>
            🔴 Avoid — {dangers.length} {dangers.length === 1 ? 'concern' : 'concerns'}
          </Text>
          {dangers.map((flag, i) => (
            <FlagCard key={i} flag={flag} themeColors={c} />
          ))}
        </View>
      )}

      {/* Warning Flags */}
      {warnings.length > 0 && (
        <View style={resultStyles.section}>
          <Text style={[resultStyles.sectionTitle, { color: c.caution }]}>
            🟡 Caution — {warnings.length} {warnings.length === 1 ? 'note' : 'notes'}
          </Text>
          {warnings.map((flag, i) => (
            <FlagCard key={i} flag={flag} themeColors={c} />
          ))}
        </View>
      )}

      {/* Positive Flags */}
      {positives.length > 0 && (
        <View style={resultStyles.section}>
          <Text style={[resultStyles.sectionTitle, { color: c.safe }]}>
            Good stuff
          </Text>
          {positives.map((flag, i) => (
            <FlagCard key={i} flag={flag} themeColors={c} />
          ))}
        </View>
      )}

      {/* Ingredients List */}
      {result.ingredients.length > 0 && (
        <View style={resultStyles.section}>
          <Text style={[resultStyles.sectionTitle, { color: c.textSecondary }]}>
            Ingredients parsed ({result.ingredients.length})
          </Text>
          <Text style={[resultStyles.ingredientsList, { color: c.textTertiary }]}>
            {result.ingredients.join(', ')}
          </Text>
        </View>
      )}

      {/* Actions */}
      <View style={resultStyles.actions}>
        <TouchableOpacity
          style={[resultStyles.actionButton, { backgroundColor: c.primary }]}
          onPress={onScanAgain}
        >
          <Ionicons name="scan-outline" size={20} color="#FFFFFF" />
          <Text style={resultStyles.actionButtonText}>Scan Another</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[resultStyles.secondaryButton, { borderColor: c.border }]}
          onPress={onGoBack}
        >
          <Text style={[resultStyles.secondaryButtonText, { color: c.textSecondary }]}>
            Back to Food Diary
          </Text>
        </TouchableOpacity>
      </View>

      {/* Disclaimer */}
      <Text style={[resultStyles.disclaimer, { color: c.textTertiary }]}>
        This analysis is for informational purposes only. It does not constitute medical
        advice. Always consult your gastroenterologist about dietary decisions.
      </Text>
    </ScrollView>
  );
}

// --- Flag Card ---

function FlagCard({
  flag,
  themeColors: c,
}: {
  flag: Flag;
  themeColors: ThemeColors;
}) {
  const bgColor =
    flag.type === 'danger'
      ? c.dangerBackground
      : flag.type === 'warning'
      ? c.cautionBackground
      : flag.type === 'positive'
      ? c.safeBackground
      : c.inputBackground;

  return (
    <View style={[resultStyles.flagCard, { backgroundColor: bgColor }]}>
      <Text style={[resultStyles.flagTitle, { color: c.text }]}>
        {flag.title}
      </Text>
      <Text style={[resultStyles.flagDetail, { color: c.textSecondary }]}>
        {flag.detail}
      </Text>
      {flag.category && (
        <Text style={[resultStyles.flagCategory, { color: c.textTertiary }]}>
          {flag.category}
        </Text>
      )}
      {flag.replacements && flag.replacements.length > 0 && (
        <View style={resultStyles.replacementsContainer}>
          <Text style={[resultStyles.replacementsTitle, { color: c.safe }]}>
            Try instead:
          </Text>
          {flag.replacements.map((r, idx) => (
            <View key={idx} style={[resultStyles.replacementRow, { borderColor: c.border }]}>
              <Text style={[resultStyles.replacementName, { color: c.text }]}>
                {r.name}
              </Text>
              <Text style={[resultStyles.replacementWhy, { color: c.textTertiary }]}>
                {r.why}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const resultStyles = StyleSheet.create({
  ratingCard: {
    borderRadius: sizing.radiusLarge,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  ratingLabel: {
    fontSize: sizing.fontXl,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  productName: {
    fontSize: sizing.fontLg,
    fontWeight: '600',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  brand: {
    fontSize: sizing.fontBase,
    marginTop: 2,
  },
  summary: {
    fontSize: sizing.fontBase,
    marginTop: spacing.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  flagCard: {
    borderRadius: sizing.radiusMedium,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  flagTitle: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
  },
  flagDetail: {
    fontSize: sizing.fontSm,
    marginTop: 4,
    lineHeight: 20,
  },
  flagCategory: {
    fontSize: sizing.fontXs,
    marginTop: 4,
  },
  replacementsContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  replacementsTitle: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
    marginBottom: 6,
  },
  replacementRow: {
    paddingVertical: 4,
    paddingLeft: spacing.sm,
    marginBottom: 4,
    borderLeftWidth: 2,
  },
  replacementName: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
  },
  replacementWhy: {
    fontSize: sizing.fontXs,
    marginTop: 1,
    lineHeight: 16,
  },
  ingredientsList: {
    fontSize: sizing.fontSm,
    lineHeight: 20,
  },
  replacementCta: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: sizing.radiusLarge,
    marginBottom: spacing.lg,
    gap: spacing.md,
    minHeight: sizing.tapTargetLarge,
  },
  replacementCtaTitle: {
    color: '#FFFFFF',
    fontSize: sizing.fontBase,
    fontWeight: '700',
  },
  replacementCtaSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: sizing.fontSm,
    marginTop: 2,
  },
  replacementSection: {
    borderRadius: sizing.radiusLarge,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  replacementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  replacementSectionTitle: {
    fontSize: sizing.fontBase,
    fontWeight: '700',
  },
  productReplacementCard: {
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  productReplacementTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  productReplacementName: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
    flex: 1,
  },
  productReplacementWhy: {
    fontSize: sizing.fontSm,
    marginTop: 4,
    marginLeft: 28,
    lineHeight: 20,
  },
  productReplacementFinds: {
    fontSize: sizing.fontXs,
    marginTop: 4,
    marginLeft: 28,
    fontStyle: 'italic',
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: sizing.radiusMedium,
    gap: spacing.sm,
    minHeight: sizing.tapTargetLarge,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: sizing.fontBase,
    fontWeight: '600',
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    minHeight: sizing.tapTarget,
  },
  secondaryButtonText: {
    fontSize: sizing.fontBase,
  },
  disclaimer: {
    fontSize: sizing.fontXs,
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 18,
  },
});

// --- Main Styles ---

function createStyles(c: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
    },
    headerBack: {
      width: 44,
      height: 44,
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: sizing.fontLg,
      fontWeight: '600',
    },
    cameraContainer: {
      flex: 1,
      position: 'relative',
    },
    camera: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
    },
    overlayTop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlayMiddle: {
      flexDirection: 'row',
      height: 250,
    },
    overlaySide: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    scanWindow: {
      width: 280,
      height: 250,
      position: 'relative',
    },
    overlayBottom: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      paddingTop: spacing.lg,
    },
    scanHint: {
      color: '#FFFFFF',
      fontSize: sizing.fontBase,
      textAlign: 'center',
    },
    cornerTL: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 30,
      height: 30,
      borderTopWidth: 3,
      borderLeftWidth: 3,
      borderTopLeftRadius: 8,
    },
    cornerTR: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 30,
      height: 30,
      borderTopWidth: 3,
      borderRightWidth: 3,
      borderTopRightRadius: 8,
    },
    cornerBL: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 30,
      height: 30,
      borderBottomWidth: 3,
      borderLeftWidth: 3,
      borderBottomLeftRadius: 8,
    },
    cornerBR: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 30,
      height: 30,
      borderBottomWidth: 3,
      borderRightWidth: 3,
      borderBottomRightRadius: 8,
    },
    loadingText: {
      fontSize: sizing.fontLg,
      marginTop: spacing.md,
    },
    loadingBarcode: {
      fontSize: sizing.fontSm,
      marginTop: spacing.xs,
    },
    permissionTitle: {
      fontSize: sizing.fontXl,
      fontWeight: '700',
      marginTop: spacing.md,
    },
    permissionText: {
      fontSize: sizing.fontBase,
      textAlign: 'center',
      marginTop: spacing.sm,
      lineHeight: 22,
    },
    permissionButton: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.lg,
      minHeight: sizing.tapTargetLarge,
      justifyContent: 'center',
    },
    permissionButtonText: {
      color: '#FFFFFF',
      fontSize: sizing.fontBase,
      fontWeight: '600',
    },
    backButton: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.md,
      borderWidth: 1,
      minHeight: sizing.tapTarget,
      justifyContent: 'center',
    },
    backButtonText: {
      fontSize: sizing.fontBase,
    },
    notFoundTitle: {
      fontSize: sizing.fontXl,
      fontWeight: '700',
      marginTop: spacing.md,
    },
    notFoundText: {
      fontSize: sizing.fontBase,
      textAlign: 'center',
      marginTop: spacing.sm,
      lineHeight: 22,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.lg,
      gap: spacing.sm,
      minHeight: sizing.tapTargetLarge,
      justifyContent: 'center',
    },
    actionButtonText: {
      color: '#FFFFFF',
      fontSize: sizing.fontBase,
      fontWeight: '600',
    },
    secondaryButton: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: sizing.radiusMedium,
      marginTop: spacing.md,
      borderWidth: 1,
      minHeight: sizing.tapTarget,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondaryButtonText: {
      fontSize: sizing.fontBase,
    },
  });
}
