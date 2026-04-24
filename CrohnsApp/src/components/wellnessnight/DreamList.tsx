/**
 * DreamList — list-row style with thin rule between rows and generous padding.
 *
 * Used for:
 *   - The "In this piece" article navigation table (mockup `.art-nav-row`)
 *   - The reasons list inside scan results (mockup `.d2-reason`)
 *   - The replacement-products list (mockup `.d2-repl`)
 *
 * Provides:
 *   - <DreamList>          : container that adds the surface card
 *   - <DreamList.Row>      : single row with optional left numeral, right meta
 *   - <DreamList.Divider>  : thin warm hairline between rows
 */

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import type { ReactNode } from 'react';
import { WELLNESS_NIGHT_COLORS, WELLNESS_NIGHT_FONTS } from './fonts';

interface DreamListProps {
  children: ReactNode;
  /** Wrap rows in a surface card (default true) */
  card?: boolean;
  /** Padding override (default 16) */
  padding?: number;
  style?: ViewStyle;
}

export function DreamList({
  children,
  card = true,
  padding = 16,
  style,
}: DreamListProps) {
  if (!card) {
    return <View style={style}>{children}</View>;
  }
  return (
    <View
      style={[
        styles.card,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface RowProps {
  /** Optional left-side numeral (e.g. "1", "I") rendered as a small chip */
  numeral?: string | number;
  /** Numeral chip variant — 'warn' for danger reasons, 'sand' for nav rows */
  numeralVariant?: 'warn' | 'sand' | 'plain';
  /** Optional left-side glyph instead of a numeral chip */
  glyph?: string;
  /** Primary text */
  title: string;
  /** Secondary smaller text below the title */
  subtitle?: string;
  /** Right-side meta string (e.g. roman numeral, chevron) */
  right?: string;
  /** Right-side meta color override */
  rightColor?: string;
  /** Show a divider below the row (default true; pass `last` to skip) */
  last?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

function Row({
  numeral,
  numeralVariant = 'warn',
  glyph,
  title,
  subtitle,
  right,
  rightColor,
  last = false,
  onPress,
  style,
  titleStyle,
}: RowProps) {
  const Wrapper: any = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : undefined}
      style={[
        styles.row,
        last ? null : styles.rowDivider,
        style,
      ]}
    >
      {numeral !== undefined ? (
        <View style={[styles.chip, NUMERAL_VARIANTS[numeralVariant].chip]}>
          <Text style={[styles.chipText, NUMERAL_VARIANTS[numeralVariant].text]}>
            {String(numeral)}
          </Text>
        </View>
      ) : null}

      {glyph ? (
        <View style={styles.glyphPill}>
          <Text style={styles.glyphText}>{glyph}</Text>
        </View>
      ) : null}

      <View style={{ flex: 1 }}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {right ? (
        <Text
          style={[
            styles.right,
            rightColor ? { color: rightColor } : null,
          ]}
        >
          {right}
        </Text>
      ) : null}
    </Wrapper>
  );
}

DreamList.Row = Row;

function Divider() {
  return <View style={styles.divider} />;
}

DreamList.Divider = Divider;

// Plain JS objects (not StyleSheet.create) — nested groupings aren't allowed
// inside StyleSheet.create, but RN happily accepts plain style objects in style
// arrays.
const NUMERAL_VARIANTS: Record<
  'warn' | 'sand' | 'plain',
  { chip: ViewStyle; text: TextStyle }
> = {
  warn: {
    chip: {
      backgroundColor: WELLNESS_NIGHT_COLORS.warnBg,
      borderColor: WELLNESS_NIGHT_COLORS.warnBorder,
    },
    text: {
      color: WELLNESS_NIGHT_COLORS.warnText,
    },
  },
  sand: {
    chip: {
      backgroundColor: WELLNESS_NIGHT_COLORS.surfaceDeep,
      borderColor: WELLNESS_NIGHT_COLORS.borderWarm,
    },
    text: {
      color: WELLNESS_NIGHT_COLORS.sand,
    },
  },
  plain: {
    chip: {
      backgroundColor: 'transparent',
      borderColor: WELLNESS_NIGHT_COLORS.border,
    },
    text: {
      color: WELLNESS_NIGHT_COLORS.textMuted,
    },
  },
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: WELLNESS_NIGHT_COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: WELLNESS_NIGHT_COLORS.border,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 10,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: WELLNESS_NIGHT_COLORS.border,
  },
  divider: {
    height: 1,
    backgroundColor: WELLNESS_NIGHT_COLORS.border,
  },
  chip: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  chipText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 11,
    letterSpacing: 0,
  },
  glyphPill: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: WELLNESS_NIGHT_COLORS.surfaceDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyphText: {
    fontSize: 16,
    color: WELLNESS_NIGHT_COLORS.sand,
  },
  title: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyMedium,
    fontSize: 13.5,
    color: WELLNESS_NIGHT_COLORS.text,
    lineHeight: 19,
  },
  subtitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 11.5,
    color: WELLNESS_NIGHT_COLORS.textFaint,
    marginTop: 2,
    lineHeight: 16,
  },
  right: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 11,
    color: WELLNESS_NIGHT_COLORS.sand,
    letterSpacing: 0.4,
    marginLeft: 8,
    fontVariant: ['tabular-nums'],
  },
});
