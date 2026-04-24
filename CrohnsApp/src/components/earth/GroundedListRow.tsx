/**
 * GroundedListRow — list row with a warm-brown left rule, hairline
 * underline, and a clay chevron on the right.
 *
 * Visual spec: composite of `.d6 .d6-repl` (replacement row),
 * `.d6 .art-nav-row` (article TOC row), and `.d6 .d6-reason` (reason row).
 * The shared pattern across all three:
 *   - 12 px vertical pad
 *   - 1px hairline bottom border (suppressible on the last row)
 *   - left "marker" — either a square avatar (replacement), a Fraunces
 *     numeral (reason), or a small caps label (TOC)
 *   - right chevron (›) tinted clay
 *
 * Made generic so the screens can pass either a glyph-avatar, numeral, or
 * label as the marker, and a body subtitle.
 */

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import type { ReactNode } from 'react';
import { EARTH_COLORS, EARTH_FONTS } from './fonts';

interface GroundedListRowProps {
  /** Title text (rendered in Inter SemiBold ink). */
  title: string;
  /** Optional subtitle below title (Inter regular bark). */
  subtitle?: string;
  /** Left marker — number, glyph, or any node. */
  marker?: ReactNode;
  /** Right marker — defaults to a clay chevron `›`. Pass null to suppress. */
  trailing?: ReactNode | null;
  /** Hide the bottom hairline (use on the final row). */
  last?: boolean;
  /** Tap handler. Renders as Pressable when provided. */
  onPress?: () => void;
  /** Accessibility label override. Defaults to `title`. */
  accessibilityLabel?: string;
  /** Override the title font to Fraunces serif (used in some rows). */
  titleSerif?: boolean;
  style?: ViewStyle;
}

export function GroundedListRow({
  title,
  subtitle,
  marker,
  trailing = '\u203A',
  last = false,
  onPress,
  accessibilityLabel,
  titleSerif = false,
  style,
}: GroundedListRowProps) {
  const Container: any = onPress ? Pressable : View;
  const containerProps = onPress
    ? {
        onPress,
        accessibilityRole: 'button' as const,
        accessibilityLabel: accessibilityLabel ?? title,
      }
    : {};

  return (
    <Container
      {...containerProps}
      style={[
        styles.row,
        last ? null : styles.rowDivider,
        style,
      ]}
    >
      {marker !== undefined ? <View style={styles.marker}>{marker}</View> : null}
      <View style={styles.body}>
        <Text style={[styles.title, titleSerif ? styles.titleSerif : null]}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {trailing !== null ? (
        typeof trailing === 'string' ? (
          <Text style={styles.chev}>{trailing}</Text>
        ) : (
          trailing
        )
      ) : null}
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
  },
  marker: {
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  title: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 13.5,
    color: EARTH_COLORS.ink,
    letterSpacing: 0,
  },
  titleSerif: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 16,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 11.5,
    color: EARTH_COLORS.bark,
    marginTop: 2,
    lineHeight: 16,
  },
  chev: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 22,
    color: EARTH_COLORS.clay,
  },
});
