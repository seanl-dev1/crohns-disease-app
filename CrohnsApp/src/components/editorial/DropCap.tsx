/**
 * DropCap — magazine-style drop capital on the first letter of a paragraph.
 *
 * Mockup CSS: `.d5 .art-body p.drop::first-letter { float:left; font-size:56px;
 * line-height:0.85; padding:6px 8px 0 0; color:#C85A3E; }`
 *
 * On web we lean on CSS `float:left` so the body text wraps under the cap
 * (the closest match to the mockup). On native iOS/Android, `float` isn't
 * supported, so we fall back to a row layout: the drop cap sits left, the
 * paragraph flows beside it but does not wrap below — still magazine-feel,
 * just less tight.
 *
 * The opening paragraph of an article is the canonical use case
 * (e.g. the Smoking article: "Of everything you can change about living
 * with Crohn's…").
 */

import { Text, StyleSheet, View, Platform, type TextStyle } from 'react-native';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from './fonts';

interface DropCapProps {
  children: string;
  /** Color override for the cap letter (default terracotta). */
  capColor?: string;
  /** Body text color (default near-black ink). */
  color?: string;
  /** Body font size (default 14.5 to match `.art-body p`). */
  fontSize?: number;
  /** Body line height (default 24 to match the 1.7 ratio). */
  lineHeight?: number;
  style?: TextStyle;
}

export function DropCap({
  children,
  capColor = EDITORIAL_COLORS.terracotta,
  color = EDITORIAL_COLORS.ink,
  fontSize = 14.5,
  lineHeight = 24,
  style,
}: DropCapProps) {
  const trimmed = children.trimStart();
  if (trimmed.length === 0) return null;
  const first = trimmed.charAt(0);
  const rest = trimmed.slice(1);

  // Drop cap letter sits at ~3.9x the body size to match `font-size:56px`
  // against `font-size:14.5px`.
  const capSize = Math.round(fontSize * 3.86);

  if (Platform.OS === 'web') {
    // react-native-web accepts raw CSS via the style prop — the closest
    // 1:1 reproduction of the mockup CSS.
    const webBody: any = {
      fontFamily: EDITORIAL_FONTS.bodyRegular,
      marginBottom: 14,
      display: 'block',
      color,
      fontSize,
      lineHeight,
      fontWeight: '400',
    };
    const webCap: any = {
      fontFamily: EDITORIAL_FONTS.serifRegular,
      float: 'left',
      paddingTop: 6,
      paddingRight: 8,
      paddingBottom: 0,
      paddingLeft: 0,
      letterSpacing: -1,
      color: capColor,
      fontSize: capSize,
      lineHeight: capSize * 0.85,
      fontWeight: '400',
    };
    return (
      <Text style={[webBody, style]}>
        <Text style={webCap}>{first}</Text>
        {rest}
      </Text>
    );
  }

  // Native fallback — row layout so the cap renders beside the paragraph.
  return (
    <View style={styles.wrap}>
      <Text
        style={[
          styles.cap,
          {
            color: capColor,
            fontSize: capSize,
            lineHeight: capSize * 0.85,
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
    fontFamily: EDITORIAL_FONTS.serifRegular,
    paddingRight: 8,
    paddingTop: 4,
    letterSpacing: -1,
  },
  body: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    flex: 1,
    paddingTop: 8,
  },
});
