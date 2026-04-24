/**
 * DoubleRule — horizontal divider: thin navy line, gap, thin navy line.
 *
 * Mockup CSS: `.d10-dbl-rule { height: 6px; border-top: 1px; border-bottom: 1px }`.
 * Exact reproduction: two 1px Views stacked with 4px gap between.
 */

import { View, StyleSheet, type ViewStyle } from 'react-native';
import { HERITAGE_COLORS } from './fonts';

interface DoubleRuleProps {
  /** Color override (default navy) */
  color?: string;
  /** Vertical spacing above + below the rule */
  margin?: number;
  style?: ViewStyle;
}

export function DoubleRule({
  color = HERITAGE_COLORS.navy,
  margin = 14,
  style,
}: DoubleRuleProps) {
  return (
    <View
      style={[
        styles.wrap,
        { marginVertical: margin },
        style,
      ]}
    >
      <View style={[styles.line, { backgroundColor: color }]} />
      <View style={styles.gap} />
      <View style={[styles.line, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  line: {
    height: 1,
  },
  gap: {
    height: 4,
  },
});
