/**
 * HeritageArticle — Heritage-styled rendering of a Knowledge Hub article.
 *
 * Visual spec: `public/designs/index.html` → section `.d10` → Phone 3.
 *
 * Receives the real `KnowledgeArticle` from `knowledgeArticles.ts` and renders:
 *   - Masthead: "‹ LIBRARY · *The Compendium* · VOL. XXXIV"
 *   - Hero title with optional italic accent (derived from the title string)
 *   - Meta row: "8 MIN · APR 2026 · REVIEWED"
 *   - First paragraph with drop cap
 *   - Section headings with Playfair italic accent on last noun
 *   - Inline "In this compendium" nav table with Roman numerals
 */

import { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type { KnowledgeArticle } from '../../data/knowledgeArticles';
import { HERITAGE_COLORS, HERITAGE_FONTS } from '../../components/heritage/fonts';
import { SmallCapsLabel } from '../../components/heritage/SmallCapsLabel';
import { Fleuron } from '../../components/heritage/Fleuron';
import { DropCap } from '../../components/heritage/DropCap';
import { RomanNumeral } from '../../components/heritage/RomanNumeral';

interface HeritageArticleProps {
  article: KnowledgeArticle;
  /** Current article index in the library (used for "Vol. XXXIV" numeral). */
  libraryIndex: number;
  prev?: KnowledgeArticle | null;
  next?: KnowledgeArticle | null;
  onBack: () => void;
  onGoTo: (id: number) => void;
}

/** Split title on the last word, so we can italicize it in copper ("Crohn's."). */
function splitTitleForAccent(title: string): { head: string; accent: string } {
  // Prefer an em-dash split if present ("Smoking and Crohn's — The …")
  const emDashIdx = title.indexOf('\u2014');
  if (emDashIdx > 0) {
    const head = title.slice(0, emDashIdx).trim();
    const parts = head.split(' ');
    if (parts.length >= 2) {
      const accent = parts[parts.length - 1];
      return { head: parts.slice(0, -1).join(' ') + ' ', accent: accent + '.' };
    }
  }
  const trimmed = title.trim().replace(/[.\s]+$/, '');
  const parts = trimmed.split(' ');
  if (parts.length === 1) return { head: '', accent: trimmed + '.' };
  const accent = parts[parts.length - 1];
  return {
    head: parts.slice(0, -1).join(' ') + ' ',
    accent: accent + '.',
  };
}

/** Split a section heading so the final noun becomes italic copper. */
function splitHeadingForAccent(heading: string): { head: string; accent: string } {
  const trimmed = heading.trim();
  const parts = trimmed.split(' ');
  if (parts.length <= 2) {
    // Heading is short — italicize second word if present.
    if (parts.length === 2) return { head: parts[0] + ' ', accent: parts[1] };
    return { head: '', accent: trimmed };
  }
  const accent = parts.slice(-2).join(' ');
  return {
    head: parts.slice(0, -2).join(' ') + ' ',
    accent,
  };
}

function toRomanUpper(n: number): string {
  const table: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let num = Math.max(0, Math.floor(n));
  let out = '';
  for (const [v, s] of table) {
    while (num >= v) {
      out += s;
      num -= v;
    }
  }
  return out || 'I';
}

function toRomanLower(n: number): string {
  return toRomanUpper(n).toLowerCase();
}

/** Format read-time "8 min" → "8 MIN" and prepare meta pieces. */
function formatMeta(readTime: string): {
  duration: string;
  issue: string;
  status: string;
} {
  return {
    duration: readTime.toUpperCase(),
    issue: new Date()
      .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      .toUpperCase(),
    status: 'Reviewed',
  };
}

export function HeritageArticle({
  article,
  libraryIndex,
  prev,
  next,
  onBack,
  onGoTo,
}: HeritageArticleProps) {
  const titleParts = useMemo(() => splitTitleForAccent(article.title), [article.title]);
  const meta = useMemo(() => formatMeta(article.readTime), [article.readTime]);
  const vol = useMemo(() => toRomanUpper(libraryIndex + 1), [libraryIndex]);

  // Category eyebrow: "LIFESTYLE · LONG READ" — or similar based on the real category.
  const categoryLabel = useMemo(() => {
    const cat = article.category.charAt(0).toUpperCase() + article.category.slice(1);
    const len = article.sections.reduce((sum, s) => sum + s.body.length, 0);
    const lengthTag = len > 6000 ? 'Long read' : len > 2500 ? 'Essay' : 'Brief';
    return `${cat} \u00b7 ${lengthTag}`;
  }, [article]);

  const [firstSection, ...restSections] = article.sections;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Top bar ── */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBack} accessibilityRole="button" accessibilityLabel="Back to library">
          <Text style={styles.backLabel}>&lsaquo; Library</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>The Compendium</Text>
        <Text style={styles.volLabel}>Vol. {vol}</Text>
      </View>

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <SmallCapsLabel
          color={HERITAGE_COLORS.copper}
          size={10}
          tracking={3}
          align="center"
          withDashes
          style={{ marginBottom: 14 }}
        >
          {categoryLabel}
        </SmallCapsLabel>
        <Text style={styles.title}>
          {titleParts.head}
          <Text style={styles.titleAccent}>{titleParts.accent}</Text>
        </Text>
        <Text style={styles.subtitle}>{article.subtitle}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{meta.duration}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.meta}>{meta.issue}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.meta}>{meta.status}</Text>
        </View>
      </View>

      {/* ── Body ── */}
      <View style={styles.body}>
        {/* First section with drop cap */}
        {firstSection ? (
          <View style={{ marginBottom: 18 }}>
            <HeadingWithAccent heading={firstSection.heading} />
            {splitFirstParagraph(firstSection.body, true).map((para, i) => (
              <ParagraphBlock key={i} body={para} dropCap={i === 0} />
            ))}
          </View>
        ) : null}

        {/* "In this compendium" navigation — only if more than 3 sections */}
        {restSections.length >= 2 ? (
          <View style={styles.compNav}>
            <SmallCapsLabel
              color={HERITAGE_COLORS.copper}
              size={9.5}
              tracking={3}
              align="center"
              withDashes
              style={{ marginBottom: 12 }}
            >
              In this compendium
            </SmallCapsLabel>
            {restSections.slice(0, 4).map((s, i) => {
              const parts = splitHeadingForAccent(s.heading);
              const readMinutes = Math.max(1, Math.round(s.body.length / 900));
              return (
                <View
                  key={i}
                  style={[
                    styles.compNavRow,
                    i === Math.min(restSections.length, 4) - 1 ? null : styles.compNavRowDivider,
                  ]}
                >
                  <Text style={styles.compNavTitle} numberOfLines={1}>
                    {parts.head}
                    <Text style={styles.compNavAccent}>{parts.accent}</Text>
                  </Text>
                  <Text style={styles.compNavRight}>
                    {`${toRomanLower(i + 1)} \u00b7 ${readMinutes} min`}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : null}

        {/* Remaining sections */}
        {restSections.map((s, idx) => (
          <View key={idx} style={{ marginTop: 10, marginBottom: 18 }}>
            <HeadingWithAccent heading={s.heading} />
            {splitFirstParagraph(s.body, false).map((para, i) => (
              <ParagraphBlock key={i} body={para} dropCap={false} />
            ))}
          </View>
        ))}

        {/* Citation / Sources */}
        <Fleuron count={3} size="md" style={{ paddingVertical: 10 }} />
        <View style={styles.colophon}>
          <SmallCapsLabel
            color={HERITAGE_COLORS.copper}
            size={9.5}
            tracking={3}
            align="center"
          >
            The Sources
          </SmallCapsLabel>
          <Text style={styles.colophonBody}>{article.citation}</Text>
        </View>

        <View style={styles.colophon}>
          <SmallCapsLabel
            color={HERITAGE_COLORS.copper}
            size={9.5}
            tracking={3}
            align="center"
          >
            The Caveat
          </SmallCapsLabel>
          <Text style={styles.colophonBody}>{article.disclaimer}</Text>
        </View>

        {/* Prev / Next */}
        <View style={styles.prevNextRow}>
          {prev ? (
            <TouchableOpacity
              onPress={() => onGoTo(prev.id)}
              style={[styles.prevNextBtn, { borderRightWidth: 1, borderColor: HERITAGE_COLORS.navy }]}
              accessibilityRole="button"
            >
              <SmallCapsLabel size={9} tracking={2} color={HERITAGE_COLORS.copper} align="left">
                Previous
              </SmallCapsLabel>
              <Text style={styles.prevNextTitle} numberOfLines={2}>{prev.title}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.prevNextBtn} />
          )}
          {next ? (
            <TouchableOpacity
              onPress={() => onGoTo(next.id)}
              style={styles.prevNextBtn}
              accessibilityRole="button"
            >
              <SmallCapsLabel size={9} tracking={2} color={HERITAGE_COLORS.copper} align="right">
                Next
              </SmallCapsLabel>
              <Text style={[styles.prevNextTitle, { textAlign: 'right' }]} numberOfLines={2}>
                {next.title}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.prevNextBtn} />
          )}
        </View>

        <View style={{ height: 60 }} />
      </View>
    </ScrollView>
  );
}

// ─── Helpers / subcomponents ────────────────────────────────

function splitFirstParagraph(body: string, _dropCap: boolean): string[] {
  // The engine returns body text with \n\n paragraph breaks.
  return body
    .split(/\n\n+/g)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}

function ParagraphBlock({ body, dropCap }: { body: string; dropCap: boolean }) {
  if (dropCap) {
    return <DropCap>{body}</DropCap>;
  }
  return <Text style={paragraphStyles.body}>{body}</Text>;
}

function HeadingWithAccent({ heading }: { heading: string }) {
  const parts = splitHeadingForAccent(heading);
  return (
    <Text style={headingStyles.h3}>
      {parts.head}
      <Text style={headingStyles.h3Accent}>{parts.accent}</Text>
    </Text>
  );
}

const paragraphStyles = StyleSheet.create({
  body: {
    fontFamily: HERITAGE_FONTS.bodyRegular,
    fontSize: 14,
    lineHeight: 24,
    color: HERITAGE_COLORS.ink,
    marginBottom: 14,
  },
});

const headingStyles = StyleSheet.create({
  h3: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 20,
    lineHeight: 24,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.3,
    marginTop: 22,
    marginBottom: 8,
  },
  h3Accent: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    color: HERITAGE_COLORS.copper,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: HERITAGE_COLORS.cream },
  content: { paddingHorizontal: 22, paddingTop: 24, paddingBottom: 40 },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    marginTop: 6,
  },
  backLabel: {
    fontFamily: HERITAGE_FONTS.labelMedium,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.navy,
  },
  topTitle: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    fontSize: 15,
    color: HERITAGE_COLORS.navy,
  },
  volLabel: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 9.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.copper,
  },
  hero: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 34,
    lineHeight: 38,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.6,
    textAlign: 'center',
    marginBottom: 12,
  },
  titleAccent: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    color: HERITAGE_COLORS.copper,
  },
  subtitle: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 16,
    lineHeight: 22,
    color: HERITAGE_COLORS.ink,
    textAlign: 'center',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  meta: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 9.5,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.ink,
  },
  metaDot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: HERITAGE_COLORS.ink,
  },
  body: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: HERITAGE_COLORS.navy,
    marginTop: 14,
  },
  compNav: {
    borderWidth: 2,
    borderColor: HERITAGE_COLORS.navy,
    padding: 16,
    marginVertical: 18,
    backgroundColor: HERITAGE_COLORS.paperWarm,
  },
  compNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 7,
    alignItems: 'baseline',
    gap: 10,
  },
  compNavRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: HERITAGE_COLORS.dottedLine,
  },
  compNavTitle: {
    flex: 1,
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 14,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.1,
  },
  compNavAccent: {
    fontFamily: HERITAGE_FONTS.serifMediumItalic,
    color: HERITAGE_COLORS.copper,
  },
  compNavRight: {
    fontFamily: HERITAGE_FONTS.labelRegular,
    fontSize: 9.5,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: HERITAGE_COLORS.copper,
  },
  colophon: {
    borderTopWidth: 1,
    borderTopColor: HERITAGE_COLORS.dottedLine,
    paddingTop: 14,
    marginTop: 18,
    marginBottom: 18,
  },
  colophonBody: {
    fontFamily: HERITAGE_FONTS.elegantItalic,
    fontSize: 14,
    lineHeight: 20,
    color: HERITAGE_COLORS.ink,
    textAlign: 'center',
    marginTop: 10,
  },
  prevNextRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: HERITAGE_COLORS.navy,
    marginTop: 10,
  },
  prevNextBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: HERITAGE_COLORS.paperWarm,
    minHeight: 70,
  },
  prevNextTitle: {
    fontFamily: HERITAGE_FONTS.serifMedium,
    fontSize: 14,
    color: HERITAGE_COLORS.navy,
    letterSpacing: -0.2,
    marginTop: 6,
  },
});
