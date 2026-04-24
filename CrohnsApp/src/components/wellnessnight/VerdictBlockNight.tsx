/**
 * VerdictBlockNight — scan-result verdict treatment in the Wellness Night style.
 *
 * Mockup CSS: `.d2-prod` + `.d2-rating`. The mockup composes a brand small-caps
 * label, a serif italic product name, and a pill-shaped tinted rating chip.
 *
 * Tones:
 *   - 'warn'    → red-tinted pill, "Often a trigger" (mockup default)
 *   - 'caution' → amber-tinted pill, "Worth pausing"
 *   - 'good'    → sage-tinted pill, "Agreeable for you"
 */

import { View, Text, StyleSheet } from 'react-native';
import { WELLNESS_NIGHT_COLORS, WELLNESS_NIGHT_FONTS } from './fonts';
import { HeroSerif } from './HeroSerif';

export type VerdictTone = 'good' | 'caution' | 'warn';

interface VerdictBlockNightProps {
  brand?: string;
  /** Product name — first chunk gets serif regular, optional accent gets italic+sand */
  productName: string;
  /** Optional accent suffix italicized in sand (e.g. "Monkey") */
  productAccent?: string;
  /** Pill rating text (e.g. "Often a trigger for you") */
  ratingText: string;
  tone?: VerdictTone;
  /** Optional one-line subtitle below the name */
  subtitle?: string;
}

const TONE_STYLES: Record<VerdictTone, {
  pillBg: string;
  pillBorder: string;
  pillText: string;
}> = {
  warn: {
    pillBg: WELLNESS_NIGHT_COLORS.warnBg,
    pillBorder: WELLNESS_NIGHT_COLORS.warnBorder,
    pillText: WELLNESS_NIGHT_COLORS.warnText,
  },
  caution: {
    pillBg: '#2D2316',
    pillBorder: '#4A3A1F',
    pillText: WELLNESS_NIGHT_COLORS.amber,
  },
  good: {
    pillBg: '#1D2B1B',
    pillBorder: '#2F4530',
    pillText: WELLNESS_NIGHT_COLORS.sage,
  },
};

export function VerdictBlockNight({
  brand,
  productName,
  productAccent,
  ratingText,
  tone = 'warn',
  subtitle,
}: VerdictBlockNightProps) {
  const t = TONE_STYLES[tone];
  return (
    <View style={styles.block}>
      {brand ? (
        <Text style={styles.brand} numberOfLines={1}>
          {brand}
        </Text>
      ) : null}

      <HeroSerif
        leading={productName}
        accent={productAccent ? ` ${productAccent}` : ''}
        size={26}
        align="left"
        style={styles.name}
      />

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      <View
        style={[
          styles.pill,
          { backgroundColor: t.pillBg, borderColor: t.pillBorder },
        ]}
      >
        <View style={[styles.dot, { backgroundColor: t.pillText }]} />
        <Text style={[styles.pillText, { color: t.pillText }]}>{ratingText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginVertical: 8,
    marginBottom: 16,
  },
  brand: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 11.5,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: WELLNESS_NIGHT_COLORS.sand,
    marginBottom: 6,
  },
  name: {
    marginVertical: 0,
  },
  subtitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 13,
    color: WELLNESS_NIGHT_COLORS.textSubtle,
    marginTop: 6,
    lineHeight: 18,
  },
  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 14,
  },
  pillText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 12,
    letterSpacing: -0.1,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
  },
});
