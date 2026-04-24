/**
 * DropCap — magazine-style drop capital on the first letter of a paragraph.
 *
 * React Native doesn't support CSS ::first-letter, so we manually split the
 * first character, enlarge it in Playfair Display, and rely on negative top
 * margin + line-height alignment to sit flush with the body.
 *
 * Mockup usage: opening paragraph of the article "Of everything you can change…"
 */

import { Text, StyleSheet, View, Platform, type TextStyle } from 'react-native';
import { HERITAGE_COLORS, HERITAGE_FONTS } from './fonts';

interface DropCapProps {
  children: string;
  /** Color override for the drop cap letter (default copper) */
  capColor?: string;
  /** Color for the body text (default ink) */
  color?: string;
  /** Body font size (default 14) */
  fontSize?: number;
  /** Body line height (default 24) */
  lineHeight?: number;
  style?: TextStyle;
}

export function DropCap({
  children,
  capColor = HERITAGE_COLORS.copper,
  color = HERITAGE_COLORS.ink,
  fontSize = 14,
  lineHeight = 24,
  style,
}: DropCapProps) {
  const trimmed = children.trimStart();
  if (trimmed.length === 0) return null;
  const first = trimmed.charAt(0);
  const rest = trimmed.slice(1);

  // On web we can use CSS float so the body text wraps under the cap — the
  // closest match to the magazine spec. On native (iOS/Android) we fall back
  // to a side-by-side row; text doesn't wrap below but the cap still reads.
  const capSize = Math.round(fontSize * 3.4);

  if (Platform.OS === 'web') {
    // react-native-web accepts raw CSS properties via the style prop.
    const webBody: any = {
      fontFamily: HERITAGE_FONTS.bodyRegular,
      marginBottom: 14,
      display: 'block',
      color,
      fontSize,
      lineHeight,
    };
    const webCap: any = {
      fontFamily: HERITAGE_FONTS.serifSemiBold,
      float: 'left',
      marginRight: 10,
      marginTop: 4,
      marginBottom: -4,
      letterSpacing: -1,
      color: capColor,
      fontSize: capSize,
      lineHeight: capSize * 0.9,
    };
    return (
      <Text style={[webBody, style]}>
        <Text style={webCap}>{first}</Text>
        {rest}
      </Text>
    );
  }

  // Native fallback — row layout, text flows beside but not beneath.
  return (
    <View style={styles.wrap}>
      <Text
        style={[
          styles.cap,
          {
            color: capColor,
            fontSize: capSize,
            lineHeight: capSize * 0.9,
          },
        ]}
      >
        {first}
      </Text>
      <Text
        style={[
          styles.body,
          { color, fontSize, lineHeight },
          style,
        ]}
      >
        {rest}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  cap: {
    fontFamily: HERITAGE_FONTS.serifSemiBold,
    marginRight: 10,
    marginTop: 2,
    marginBottom: -6,
    letterSpacing: -1,
  },
  body: {
    fontFamily: HERITAGE_FONTS.bodyRegular,
    flex: 1,
    paddingTop: 6,
  },
});
