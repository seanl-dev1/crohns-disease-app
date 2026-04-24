/**
 * EditorialArticle — Bold Editorial rendering of a Knowledge Hub article.
 *
 * Visual spec: `public/designs/index.html` → section `.d5` → Phone 3.
 *
 * Renders a `KnowledgeArticle` from `src/data/knowledgeArticles.ts` with the
 * magazine treatment:
 *   - Top bar: "‹ Library     No. 34"  with a 1px black hairline below
 *   - Category eyebrow ("— Lifestyle")
 *   - 42px Instrument Serif hero title (italic terracotta accent on the
 *     final word, e.g. "Smoking & *Crohn's.*")
 *   - Byline row: "8 MIN · APR 26 · CLINICALLY REVIEWED"
 *   - First paragraph with drop-cap, optionally followed by a 16px lead
 *   - Section h3 headings in 22px Instrument Serif with italic accent
 *   - "In this piece" inline navigation block (top-bold + bottom-soft hairlines)
 *
 * The screen accepts `articleId` from the registry signature and looks up
 * the article from the knowledge base. When the bold-editorial preset is
 * the active theme, the wiring layer can pass id 17 (Smoking) by default.
 */

import { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { knowledgeArticles, type KnowledgeArticle } from '../../data/knowledgeArticles';
import { EDITORIAL_COLORS, EDITORIAL_FONTS } from '../../components/editorial/fonts';
import { CategoryEyebrow } from '../../components/editorial/CategoryEyebrow';
import { EditorialHero } from '../../components/editorial/EditorialHero';
import { BylineRow } from '../../components/editorial/BylineRow';
import { HairlineRule } from '../../components/editorial/HairlineRule';
import { DropCap } from '../../components/editorial/DropCap';
import { Pullquote } from '../../components/editorial/Pullquote';

interface EditorialArticleProps {
  /** Knowledge article id. Defaults to 17 (Smoking) per spec. */
  articleId?: number;
  /** Override back-navigation. Defaults to router.back(). */
  onBack?: () => void;
}

/** Split title on the last word so we can italicize it as the accent. */
function splitTitle(raw: string): { head: string; accent: string } {
  const trimmed = raw.replace(/\s+/g, ' ').trim();
  if (!trimmed) return { head: '', accent: '' };
  // Prefer em-dash split: "Smoking and Crohn's — The Single Biggest Thing"
  const emIdx = trimmed.indexOf('\u2014');
  let workingHead = trimmed;
  if (emIdx > 0) {
    workingHead = trimmed.slice(0, emIdx).trim();
  }
  const cleaned = workingHead.replace(/[.\s]+$/, '');
  const parts = cleaned.split(' ');
  if (parts.length === 1) return { head: '', accent: parts[0] + '.' };
  // Mockup: "Smoking\n& *Crohn's.*"  — last 1-2 words become italic accent.
  // Keep it simple: italic on the final word (with apostrophe-safe handling).
  const accent = parts[parts.length - 1] + '.';
  const head = parts.slice(0, -1).join(' ') + '\n';
  return { head, accent };
}

/** Split a section heading so the closing word becomes italic accent. */
function splitHeadingForAccent(heading: string): { head: string; accent: string } {
  const trimmed = heading.trim();
  const parts = trimmed.split(' ');
  if (parts.length <= 1) return { head: '', accent: trimmed };
  if (parts.length === 2) return { head: parts[0] + ' ', accent: parts[1] };
  const accent = parts.slice(-2).join(' ');
  return {
    head: parts.slice(0, -2).join(' ') + ' ',
    accent,
  };
}

/** Convert 1 → "I", 2 → "II", up to 10. */
function toRomanUpper(n: number): string {
  const table = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
  return table[n] ?? String(n);
}

/** Format the read-time string the database stores ("6 min") into "6 MIN". */
function formatReadTime(readTime: string): string {
  return readTime.replace(/\s+/g, ' ').toUpperCase();
}

/** Today's month + day in NYT style: "APR 26". */
function formatToday(d: Date = new Date()): string {
  const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  return `${month} ${day}`;
}

export function EditorialArticle({
  articleId = 17,
  onBack,
}: EditorialArticleProps) {
  const article: KnowledgeArticle =
    knowledgeArticles.find((a) => a.id === articleId) ??
    knowledgeArticles[0];

  const titleParts = useMemo(() => splitTitle(article.title), [article.title]);
  const issueNo = useMemo(() => `No. ${article.id}`, [article.id]);
  const categoryLabel = useMemo(() => {
    const cat = article.category;
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  }, [article.category]);
  const bylineItems = useMemo(
    () => [
      formatReadTime(article.readTime),
      formatToday(),
      'Clinically reviewed',
    ],
    [article.readTime],
  );

  const [firstSection, ...restSections] = article.sections;
  const visibleNav = restSections.slice(0, 4);
  const remainingSections = restSections;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/knowledge-hub');
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <Pressable
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Back to library"
          hitSlop={8}
        >
          <Text style={styles.topBack}>{'\u2039 Library'}</Text>
        </Pressable>
        <Text style={styles.topIssue}>{issueNo.toUpperCase()}</Text>
      </View>
      <HairlineRule weight="bold" />

      {/* ── Hero ── */}
      <CategoryEyebrow style={styles.heroEye}>{categoryLabel}</CategoryEyebrow>
      <EditorialHero
        variant="article"
        leading={titleParts.head}
        accent={titleParts.accent}
        align="left"
      />

      {/* ── Byline row ── */}
      <View style={styles.bylineWrap}>
        <BylineRow items={bylineItems} />
      </View>
      <HairlineRule weight="soft" style={{ marginBottom: 18 }} />

      {/* ── Body ── */}
      {firstSection ? (
        <View style={styles.body}>
          {firstSection.body
            .split(/\n\n+/g)
            .map((p) => p.trim())
            .filter(Boolean)
            .map((para, i) =>
              i === 0 ? (
                <DropCap key={`first-${i}`}>{para}</DropCap>
              ) : (
                <Text
                  key={`first-${i}`}
                  style={i === 1 ? styles.lead : styles.paragraph}
                >
                  {para}
                </Text>
              ),
            )}
        </View>
      ) : null}

      {/* ── In-piece navigation ── */}
      {visibleNav.length >= 2 ? (
        <View style={styles.nav}>
          <Text style={styles.navLabel}>{'\u2014 In this piece'}</Text>
          {visibleNav.map((section, i) => {
            const heading = splitHeadingForAccent(section.heading);
            const minutes = Math.max(1, Math.round(section.body.length / 900));
            return (
              <View
                key={`nav-${i}`}
                style={[
                  styles.navRow,
                  i === visibleNav.length - 1 ? null : styles.navRowDivided,
                ]}
              >
                <Text style={styles.navTitle} numberOfLines={2}>
                  {heading.head}
                  <Text style={styles.navTitleAccent}>{heading.accent}</Text>
                </Text>
                <Text style={styles.navMeta}>
                  {`${toRomanUpper(i + 1)} \u00b7 ${minutes} MIN`}
                </Text>
              </View>
            );
          })}
        </View>
      ) : null}

      {/* ── Remaining sections ── */}
      {remainingSections.map((section, sIdx) => {
        const heading = splitHeadingForAccent(section.heading);
        const paragraphs = section.body
          .split(/\n\n+/g)
          .map((p) => p.trim())
          .filter(Boolean);
        return (
          <View key={`sect-${sIdx}`} style={styles.body}>
            <Text style={styles.h3}>
              {heading.head}
              <Text style={styles.h3Accent}>{heading.accent}</Text>
            </Text>
            {paragraphs.map((para, i) => (
              <Text key={`para-${sIdx}-${i}`} style={styles.paragraph}>
                {para}
              </Text>
            ))}
          </View>
        );
      })}

      {/* ── Citation pullquote / sources ── */}
      <View style={styles.body}>
        <Pullquote
          quote={article.citation}
          attribution={'\u2014 Sources'}
        />
      </View>

      {/* ── Caveat ── */}
      <View style={[styles.body, styles.caveat]}>
        <Text style={styles.caveatLabel}>{'\u2014 The Caveat'}</Text>
        <Text style={styles.caveatBody}>{article.disclaimer}</Text>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: EDITORIAL_COLORS.cream },
  content: { paddingHorizontal: 22, paddingTop: 8, paddingBottom: 100 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 10,
  },
  topBack: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 12.5,
    color: EDITORIAL_COLORS.ink,
    letterSpacing: 0.2,
  },
  topIssue: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.inkMid,
    fontVariant: ['tabular-nums'],
  },

  heroEye: {
    marginTop: 22,
    marginBottom: 16,
    letterSpacing: 2.8,
  },

  bylineWrap: {
    marginTop: 14,
    marginBottom: 18,
  },

  body: {
    paddingTop: 2,
  },
  paragraph: {
    fontFamily: EDITORIAL_FONTS.bodyRegular,
    fontSize: 14.5,
    lineHeight: 24,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 14,
  },
  lead: {
    fontFamily: EDITORIAL_FONTS.bodyMedium,
    fontSize: 16,
    lineHeight: 24,
    color: EDITORIAL_COLORS.ink,
    marginBottom: 14,
  },
  h3: {
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.4,
    color: EDITORIAL_COLORS.ink,
    marginTop: 22,
    marginBottom: 10,
  },
  h3Accent: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    color: EDITORIAL_COLORS.ink,
  },

  nav: {
    paddingVertical: 18,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: EDITORIAL_COLORS.hairline,
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineSoft,
  },
  navLabel: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.ink,
    marginBottom: 14,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    gap: 10,
  },
  navRowDivided: {
    borderBottomWidth: 1,
    borderBottomColor: EDITORIAL_COLORS.hairlineFaint,
  },
  navTitle: {
    flex: 1,
    fontFamily: EDITORIAL_FONTS.serifRegular,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.2,
    color: EDITORIAL_COLORS.ink,
  },
  navTitleAccent: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    color: EDITORIAL_COLORS.ink,
  },
  navMeta: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 1.6,
    color: EDITORIAL_COLORS.terracotta,
    fontVariant: ['tabular-nums'],
    marginTop: 3,
    textTransform: 'uppercase',
  },

  caveat: {
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: EDITORIAL_COLORS.hairlineSoft,
  },
  caveatLabel: {
    fontFamily: EDITORIAL_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: EDITORIAL_COLORS.terracotta,
    marginBottom: 10,
  },
  caveatBody: {
    fontFamily: EDITORIAL_FONTS.serifItalic,
    fontSize: 13.5,
    lineHeight: 20,
    color: EDITORIAL_COLORS.inkSoft,
  },
});
