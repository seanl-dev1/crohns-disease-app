/**
 * WellnessNightArticle — premium dark rendering of a Knowledge Hub article.
 *
 * Visual spec: `public/designs/index.html` -> section `.d2` -> Phone 3.
 *
 * Real wiring:
 *   - Receives the live `KnowledgeArticle` from `knowledgeArticles.ts`
 *   - Hero title splits on "and"/"&"/"\u2014" so we can italicize a single
 *     word in sand color — the mockup uses "the *one* lifestyle change"
 *   - "In this piece" nav table is generated from sections 2..n with roman
 *     numerals on the right (mockup `.d2 .art-nav`)
 *   - Body uses Inter for paragraphs at 1.75 line-height, with the first
 *     paragraph bumped up as a "lead" and italic accents on key terms.
 */

import { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type { KnowledgeArticle } from '../../data/knowledgeArticles';
import {
  WELLNESS_NIGHT_COLORS,
  WELLNESS_NIGHT_FONTS,
} from '../../components/wellnessnight/fonts';
import { NightMasthead } from '../../components/wellnessnight/NightMasthead';
import { WarmSandLabel } from '../../components/wellnessnight/WarmSandLabel';
import { HeroSerif } from '../../components/wellnessnight/HeroSerif';
import { StatCard } from '../../components/wellnessnight/StatCard';
import { NightButton } from '../../components/wellnessnight/NightButton';

interface WellnessNightArticleProps {
  article: KnowledgeArticle;
  /** Current article index in the library (used for "Vol. XXXIV") */
  libraryIndex: number;
  prev?: KnowledgeArticle | null;
  next?: KnowledgeArticle | null;
  onBack: () => void;
  onGoTo: (id: number) => void;
}

/**
 * Pick a single accent word in the title to italicize in sand.
 *
 * Rules (in order of preference):
 *   1. If title contains "the X " or "the X." — italicize "X"
 *   2. If title contains an em-dash — italicize the word right after it
 *   3. Else, italicize the last word, with a trailing period
 */
function splitTitleForAccent(title: string): {
  before: string;
  accent: string;
  after: string;
} {
  const trimmed = title.trim();

  // Rule 1: "the <word> "
  const theMatch = trimmed.match(/(.*?\bthe\s+)(\w+)(\b.*)/i);
  if (theMatch) {
    return {
      before: theMatch[1],
      accent: theMatch[2],
      after: theMatch[3],
    };
  }

  // Rule 2: em-dash followed by a noun
  const dashIdx = trimmed.indexOf('\u2014');
  if (dashIdx > 0) {
    const after = trimmed.slice(dashIdx + 1).trim();
    const parts = after.split(' ');
    if (parts.length >= 2) {
      const before = trimmed.slice(0, dashIdx + 1) + ' ';
      return {
        before,
        accent: parts[0],
        after: ' ' + parts.slice(1).join(' '),
      };
    }
  }

  // Rule 3: italicize the trailing word
  const stripped = trimmed.replace(/[.\s]+$/, '');
  const parts = stripped.split(' ');
  if (parts.length === 1) return { before: '', accent: stripped, after: '.' };
  const accent = parts[parts.length - 1];
  return {
    before: parts.slice(0, -1).join(' ') + ' ',
    accent,
    after: '.',
  };
}

function toRomanUpper(n: number): string {
  const table: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
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

/** Pick an accent word in a section heading (for the body's H3s). */
function splitHeadingForAccent(heading: string): {
  before: string;
  accent: string;
} {
  const trimmed = heading.trim();
  const parts = trimmed.split(' ');
  if (parts.length <= 2) {
    if (parts.length === 2) return { before: parts[0] + ' ', accent: parts[1] };
    return { before: '', accent: trimmed };
  }
  return {
    before: parts.slice(0, -1).join(' ') + ' ',
    accent: parts[parts.length - 1],
  };
}

export function WellnessNightArticle({
  article,
  libraryIndex: _libraryIndex,
  prev,
  next,
  onBack,
  onGoTo,
}: WellnessNightArticleProps) {
  const titleParts = useMemo(
    () => splitTitleForAccent(article.title),
    [article.title]
  );

  const issue = useMemo(
    () =>
      new Date()
        .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        .replace(/\s/g, ' '),
    []
  );

  const lengthTag = useMemo(() => {
    const len = article.sections.reduce((sum, s) => sum + s.body.length, 0);
    if (len > 6000) return 'Long read';
    if (len > 2500) return 'Essay';
    return 'Brief';
  }, [article.sections]);

  const categoryLabel = useMemo(
    () =>
      `${article.category.charAt(0).toUpperCase() + article.category.slice(1)} \u00b7 ${lengthTag}`,
    [article.category, lengthTag]
  );

  const [firstSection, ...restSections] = article.sections;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <NightMasthead title="Library" onBack={onBack} />

      {/* ── Hero ── */}
      <View style={styles.hero}>
        <WarmSandLabel
          size={11}
          tracking={2}
          align="left"
          style={{ marginBottom: 14 }}
        >
          {categoryLabel}
        </WarmSandLabel>

        <HeroSerif
          leading={titleParts.before}
          accent={titleParts.accent}
          trailing={titleParts.after}
          size={34}
          align="left"
          style={styles.title}
        />

        <View style={styles.byline}>
          <Text style={styles.bylineText}>{article.readTime} read</Text>
          <View style={styles.bylineDot} />
          <Text style={styles.bylineText}>Updated {issue}</Text>
          <View style={styles.bylineDot} />
          <Text style={styles.bylineText}>Reviewed clinically</Text>
        </View>
      </View>

      {/* ── Body ── */}
      <View style={styles.body}>
        {firstSection ? (
          <View>
            <SectionHeading heading={firstSection.heading} />
            {paragraphs(firstSection.body).map((p, i) => (
              <Text
                key={i}
                style={i === 0 ? styles.lead : styles.paragraph}
              >
                {p}
              </Text>
            ))}
          </View>
        ) : null}

        {/* "In this piece" nav table — only render if 2+ remaining sections */}
        {restSections.length >= 2 ? (
          <StatCard padding={16} style={{ marginVertical: 18 }}>
            <WarmSandLabel
              size={10.5}
              tracking={2}
              align="left"
              style={{ marginBottom: 12 }}
            >
              In this piece
            </WarmSandLabel>
            {restSections.slice(0, 4).map((s, i) => {
              const last = i === Math.min(restSections.length, 4) - 1;
              const parts = splitHeadingForAccent(s.heading);
              return (
                <View
                  key={i}
                  style={[
                    styles.navRow,
                    last ? null : styles.navRowDivider,
                  ]}
                >
                  <Text style={styles.navTitle} numberOfLines={1}>
                    {parts.before}
                    <Text style={styles.navAccent}>{parts.accent}</Text>
                  </Text>
                  <Text style={styles.navRight}>{toRomanUpper(i + 1)}</Text>
                </View>
              );
            })}
          </StatCard>
        ) : null}

        {/* Remaining sections */}
        {restSections.map((s, idx) => (
          <View key={idx} style={{ marginTop: 6 }}>
            <SectionHeading heading={s.heading} />
            {paragraphs(s.body).map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {p}
              </Text>
            ))}
          </View>
        ))}

        {/* Sources + caveat */}
        <View style={styles.colophon}>
          <WarmSandLabel
            size={10.5}
            tracking={2}
            align="left"
            style={{ marginBottom: 8 }}
          >
            Sources
          </WarmSandLabel>
          <Text style={styles.colophonBody}>{article.citation}</Text>
        </View>

        <View style={styles.colophon}>
          <WarmSandLabel
            size={10.5}
            tracking={2}
            align="left"
            style={{ marginBottom: 8 }}
          >
            A caveat
          </WarmSandLabel>
          <Text style={styles.colophonBody}>{article.disclaimer}</Text>
        </View>

        {/* Prev / Next */}
        <View style={styles.prevNextRow}>
          {prev ? (
            <View style={{ flex: 1 }}>
              <NightButton
                label={'\u2039  Previous'}
                variant="ghost"
                onPress={() => onGoTo(prev.id)}
                fullWidth
              />
              <Text style={styles.prevNextTitle} numberOfLines={2}>
                {prev.title}
              </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          <View style={{ width: 10 }} />
          {next ? (
            <View style={{ flex: 1 }}>
              <NightButton
                label={'Next  \u203A'}
                variant="primary"
                onPress={() => onGoTo(next.id)}
                fullWidth
              />
              <Text
                style={[styles.prevNextTitle, { textAlign: 'right' }]}
                numberOfLines={2}
              >
                {next.title}
              </Text>
            </View>
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>

        <View style={{ height: 60 }} />
      </View>
    </ScrollView>
  );
}

// ─── Subcomponents ─────────────────────────────────────────

function SectionHeading({ heading }: { heading: string }) {
  const parts = splitHeadingForAccent(heading);
  return (
    <Text style={headingStyles.h3}>
      {parts.before}
      <Text style={headingStyles.h3Accent}>{parts.accent}</Text>
    </Text>
  );
}

function paragraphs(body: string): string[] {
  return body
    .split(/\n\n+/g)
    .map((p) => p.trim())
    .filter(Boolean);
}

const headingStyles = StyleSheet.create({
  h3: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 20,
    lineHeight: 24,
    color: WELLNESS_NIGHT_COLORS.textBright,
    fontWeight: '400',
    letterSpacing: -0.2,
    marginTop: 22,
    marginBottom: 10,
  },
  h3Accent: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifItalic,
    fontStyle: 'italic',
    color: WELLNESS_NIGHT_COLORS.sand,
  },
});

// ─── Styles ────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WELLNESS_NIGHT_COLORS.canvas,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 60,
  },
  hero: {
    paddingTop: 30,
    paddingBottom: 16,
  },
  title: {
    marginBottom: 16,
  },
  byline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  bylineText: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 12,
    color: WELLNESS_NIGHT_COLORS.textFaint,
  },
  bylineDot: {
    width: 3,
    height: 3,
    borderRadius: 999,
    backgroundColor: WELLNESS_NIGHT_COLORS.textDim,
  },
  body: {},
  lead: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 15.5,
    lineHeight: 26,
    color: WELLNESS_NIGHT_COLORS.text,
    marginBottom: 14,
  },
  paragraph: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 14,
    lineHeight: 24,
    color: WELLNESS_NIGHT_COLORS.textMuted,
    marginBottom: 14,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  navRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: WELLNESS_NIGHT_COLORS.border,
  },
  navTitle: {
    flex: 1,
    fontFamily: WELLNESS_NIGHT_FONTS.bodyRegular,
    fontSize: 13,
    color: WELLNESS_NIGHT_COLORS.textMuted,
  },
  navAccent: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifItalic,
    fontStyle: 'italic',
    color: WELLNESS_NIGHT_COLORS.sand,
  },
  navRight: {
    fontFamily: WELLNESS_NIGHT_FONTS.bodySemiBold,
    fontSize: 11,
    color: WELLNESS_NIGHT_COLORS.sand,
    letterSpacing: 0.4,
    fontVariant: ['tabular-nums'],
  },
  colophon: {
    borderTopWidth: 1,
    borderTopColor: WELLNESS_NIGHT_COLORS.border,
    paddingTop: 16,
    marginTop: 18,
    marginBottom: 4,
  },
  colophonBody: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifItalic,
    fontStyle: 'italic',
    fontSize: 13,
    lineHeight: 19,
    color: WELLNESS_NIGHT_COLORS.textFaint,
  },
  prevNextRow: {
    flexDirection: 'row',
    marginTop: 22,
  },
  prevNextTitle: {
    fontFamily: WELLNESS_NIGHT_FONTS.serifRegular,
    fontSize: 13.5,
    color: WELLNESS_NIGHT_COLORS.textMuted,
    letterSpacing: -0.1,
    marginTop: 8,
  },
});
