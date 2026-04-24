/**
 * EarthArticle — Earth Tones rendering of a Knowledge Hub article.
 *
 * Visual spec: `public/designs/index.html` → section `.d6` → Phone 3.
 *
 * Renders a full `KnowledgeArticle` from `knowledgeArticles.ts` with:
 *   - `.d6 .scan-header` top nav (back button + "Library" title)
 *   - `.d6 .art-hero` hero block with botanical flourish, category eyebrow,
 *     Fraunces serif title with italic forest accent, byline row
 *   - `.d6 .art-body` long-form copy with serif h3 section heads
 *   - `.d6 .art-nav` inline TOC card with numbered rows
 *
 * Default behavior: pass an `articleId` prop (defaults to 17 — the
 * "Smoking & Crohn's" article featured in the mockup). Internally it looks
 * up the full article + neighbours and renders the field-journal layout.
 *
 * The component is also compatible with the explicit-article shape used by
 * Heritage so it can plug into the existing `app/article/[id].tsx` route
 * without changes (still requires the route to gate on the theme preset).
 */

import { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  knowledgeArticles,
  type KnowledgeArticle,
} from '../../data/knowledgeArticles';
import { EARTH_COLORS, EARTH_FONTS } from '../../components/earth/fonts';
import { PaperTexture } from '../../components/earth/PaperTexture';
import { TanLabel } from '../../components/earth/TanLabel';
import { LeafDivider } from '../../components/earth/LeafDivider';
import { BotanicalCorner } from '../../components/earth/BotanicalCorner';
import { ForestButton } from '../../components/earth/ForestButton';

interface EarthArticleProps {
  /** Direct article id — convenient when used in isolation. Default 17 (Smoking). */
  articleId?: number;
  /** Pre-resolved article — used when the route already loaded it. */
  article?: KnowledgeArticle;
  /** Index of this article inside `knowledgeArticles` for "Vol." display. */
  libraryIndex?: number;
  /** Optional previous / next neighbours for the prev-next nav. */
  prev?: KnowledgeArticle | null;
  next?: KnowledgeArticle | null;
  /** Back-button handler; if omitted, the back button is hidden. */
  onBack?: () => void;
  /** Navigate to a specific article id (used by prev/next buttons). */
  onGoTo?: (id: number) => void;
}

const DEFAULT_ARTICLE_ID = 17;

/** Split title so the final word becomes italic forest accent. */
function splitTitleForAccent(title: string): { head: string; accent: string } {
  // Prefer em-dash split first ("Smoking and Crohn's — The …")
  const dashIdx = title.indexOf('\u2014');
  if (dashIdx > 0) {
    const head = title.slice(0, dashIdx).trim();
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

/** Italicize the last 1-2 words of an h3. */
function splitHeadingForAccent(heading: string): { head: string; accent: string } {
  const trimmed = heading.trim();
  const parts = trimmed.split(' ');
  if (parts.length <= 2) {
    if (parts.length === 2) return { head: parts[0] + ' ', accent: parts[1] };
    return { head: '', accent: trimmed };
  }
  return {
    head: parts.slice(0, -1).join(' ') + ' ',
    accent: parts[parts.length - 1],
  };
}

function categoryDisplay(category: KnowledgeArticle['category']): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function reviewerLine(): string {
  // Fixed reviewer copy that mirrors the mockup byline tone.
  // No real reviewer data ships in the article schema today.
  return 'Reviewed by the editorial team';
}

function updatedLine(): string {
  const now = new Date();
  return `Updated ${now.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })}`;
}

export function EarthArticle({
  articleId,
  article: providedArticle,
  libraryIndex,
  prev: providedPrev,
  next: providedNext,
  onBack,
  onGoTo,
}: EarthArticleProps) {
  const resolved = useMemo(() => {
    if (providedArticle) {
      const idx =
        typeof libraryIndex === 'number'
          ? libraryIndex
          : knowledgeArticles.findIndex((a) => a.id === providedArticle.id);
      const computedPrev =
        providedPrev !== undefined
          ? providedPrev
          : idx > 0
          ? knowledgeArticles[idx - 1]
          : null;
      const computedNext =
        providedNext !== undefined
          ? providedNext
          : idx >= 0 && idx < knowledgeArticles.length - 1
          ? knowledgeArticles[idx + 1]
          : null;
      return {
        article: providedArticle,
        index: idx,
        prev: computedPrev,
        next: computedNext,
      };
    }
    const id = articleId ?? DEFAULT_ARTICLE_ID;
    const idx = knowledgeArticles.findIndex((a) => a.id === id);
    const safeIdx =
      idx >= 0
        ? idx
        : knowledgeArticles.findIndex((a) => a.id === DEFAULT_ARTICLE_ID);
    const finalIdx = safeIdx >= 0 ? safeIdx : 0;
    return {
      article: knowledgeArticles[finalIdx],
      index: finalIdx,
      prev: finalIdx > 0 ? knowledgeArticles[finalIdx - 1] : null,
      next:
        finalIdx < knowledgeArticles.length - 1
          ? knowledgeArticles[finalIdx + 1]
          : null,
    };
  }, [
    articleId,
    providedArticle,
    libraryIndex,
    providedPrev,
    providedNext,
  ]);

  if (!resolved.article) {
    return (
      <View style={[styles.outer, styles.emptyState]}>
        <Text style={styles.emptyText}>Article not found.</Text>
      </View>
    );
  }

  const { article, prev, next } = resolved;
  const titleParts = splitTitleForAccent(article.title);
  const [firstSection, ...restSections] = article.sections;

  // The mockup TOC shows section names with two-digit numerals; cap at 4.
  const tocSections = restSections.slice(0, 4);

  return (
    <View style={styles.outer}>
      <PaperTexture />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top nav ── */}
        <View style={styles.scanHeader}>
          {onBack ? (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Back to library"
            >
              <Text style={styles.backArrow}>{'\u2039'}</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ width: 32 }} />
          )}
          <Text style={styles.scanTitle}>Library</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* ── Hero ── */}
        <View style={styles.hero}>
          <BotanicalCorner
            position="top-right"
            color={EARTH_COLORS.forest}
            opacity={0.4}
            size="md"
            variant="frond"
            style={{ top: 22, right: 0 }}
          />
          <TanLabel
            color={EARTH_COLORS.clay}
            size={10.5}
            tracking={2.4}
            style={{ marginBottom: 12 }}
          >
            {`${categoryDisplay(article.category)} \u00b7 ${article.readTime} read`}
          </TanLabel>
          <Text style={styles.title}>
            {titleParts.head}
            <Text style={styles.titleAccent}>{titleParts.accent}</Text>
          </Text>
          <Text style={styles.subtitle}>{article.subtitle}</Text>
          <View style={styles.byline}>
            <Text style={styles.bylineText}>{updatedLine()}</Text>
            <View style={styles.bylineDot} />
            <Text style={styles.bylineText}>{reviewerLine()}</Text>
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>
          {/* First section: lead + paragraphs */}
          {firstSection ? (
            <View>
              <SectionHead heading={firstSection.heading} />
              <SectionParagraphs body={firstSection.body} firstIsLead />
            </View>
          ) : null}

          {/* In-this-piece TOC card */}
          {tocSections.length >= 2 ? (
            <View style={styles.tocCard}>
              <Text style={styles.tocTitle}>In this piece</Text>
              {tocSections.map((s, i) => {
                const parts = splitHeadingForAccent(s.heading);
                return (
                  <View
                    key={i}
                    style={[
                      styles.tocRow,
                      i === tocSections.length - 1 ? null : styles.tocRowDivider,
                    ]}
                  >
                    <Text style={styles.tocRowText} numberOfLines={1}>
                      {parts.head}
                      <Text style={styles.tocRowAccent}>{parts.accent}</Text>
                    </Text>
                    <Text style={styles.tocRowNumber}>
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          {/* Remaining sections */}
          {restSections.map((section, i) => (
            <View key={i} style={{ marginTop: 8 }}>
              <SectionHead heading={section.heading} />
              <SectionParagraphs body={section.body} firstIsLead={false} />
            </View>
          ))}

          {/* Sources / disclaimer */}
          <LeafDivider variant="branch" margin={20} />

          <View style={styles.colophon}>
            <TanLabel
              color={EARTH_COLORS.clay}
              size={10}
              tracking={2}
              align="left"
              style={{ marginBottom: 6 }}
            >
              Sources
            </TanLabel>
            <Text style={styles.colophonBody}>{article.citation}</Text>
          </View>

          <View style={styles.colophon}>
            <TanLabel
              color={EARTH_COLORS.clay}
              size={10}
              tracking={2}
              align="left"
              style={{ marginBottom: 6 }}
            >
              Caveat
            </TanLabel>
            <Text style={styles.colophonBody}>{article.disclaimer}</Text>
          </View>

          {/* Prev / next */}
          {(prev || next) && onGoTo ? (
            <View style={styles.prevNextRow}>
              <View style={{ flex: 1 }}>
                {prev ? (
                  <ForestButton
                    label={`\u2039 ${prev.title.split(' ').slice(0, 3).join(' ')}\u2026`}
                    variant="ghost"
                    onPress={() => onGoTo(prev.id)}
                  />
                ) : null}
              </View>
              <View style={{ flex: 1 }}>
                {next ? (
                  <ForestButton
                    label={`${next.title.split(' ').slice(0, 3).join(' ')}\u2026 \u203A`}
                    variant="ghost"
                    onPress={() => onGoTo(next.id)}
                  />
                ) : null}
              </View>
            </View>
          ) : null}

          <View style={{ height: 60 }} />
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Subcomponents ────────────────────────────────────────

function SectionHead({ heading }: { heading: string }) {
  const parts = splitHeadingForAccent(heading);
  return (
    <Text style={styles.h3}>
      {parts.head}
      <Text style={styles.h3Accent}>{parts.accent}</Text>
    </Text>
  );
}

function SectionParagraphs({
  body,
  firstIsLead,
}: {
  body: string;
  firstIsLead: boolean;
}) {
  const paragraphs = body
    .split(/\n\n+/g)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      {paragraphs.map((p, i) => (
        <Text
          key={i}
          style={[styles.bodyText, firstIsLead && i === 0 ? styles.leadText : null]}
        >
          {p}
        </Text>
      ))}
    </>
  );
}

// ─── Styles ────────────────────────────────────────────────

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: EARTH_COLORS.oatmeal },
  container: { flex: 1, backgroundColor: 'transparent' },
  content: { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 100 },
  emptyState: { alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyText: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 16,
    color: EARTH_COLORS.bark,
  },
  scanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: EARTH_COLORS.paperWarm,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 18,
    color: EARTH_COLORS.ink,
    lineHeight: 22,
  },
  scanTitle: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 16,
    color: EARTH_COLORS.ink,
  },
  hero: {
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
    position: 'relative',
  },
  title: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 30,
    lineHeight: 32,
    color: EARTH_COLORS.ink,
    letterSpacing: -0.8,
    marginBottom: 14,
  },
  titleAccent: {
    fontFamily: EARTH_FONTS.serifItalic,
    color: EARTH_COLORS.forest,
  },
  subtitle: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 14,
    color: EARTH_COLORS.bark,
    lineHeight: 20,
    marginBottom: 12,
  },
  byline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  bylineText: {
    fontFamily: EARTH_FONTS.bodyMedium,
    fontSize: 11.5,
    color: EARTH_COLORS.bark,
  },
  bylineDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: EARTH_COLORS.clay,
  },
  body: {
    paddingTop: 18,
  },
  bodyText: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 14,
    lineHeight: 24,
    color: EARTH_COLORS.ink,
    marginBottom: 14,
  },
  leadText: {
    fontFamily: EARTH_FONTS.bodyMedium,
    fontSize: 15,
    lineHeight: 24,
  },
  h3: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.3,
    color: EARTH_COLORS.ink,
    marginTop: 22,
    marginBottom: 10,
  },
  h3Accent: {
    fontFamily: EARTH_FONTS.serifItalic,
    color: EARTH_COLORS.forest,
  },
  tocCard: {
    backgroundColor: EARTH_COLORS.paperWarm,
    borderWidth: 1,
    borderColor: EARTH_COLORS.hairline,
    borderRadius: 6,
    padding: 16,
    marginVertical: 18,
  },
  tocTitle: {
    fontFamily: EARTH_FONTS.serifMedium,
    fontSize: 14,
    color: EARTH_COLORS.forest,
    letterSpacing: -0.2,
    marginBottom: 12,
  },
  tocRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  tocRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: EARTH_COLORS.hairline,
  },
  tocRowText: {
    flex: 1,
    fontFamily: EARTH_FONTS.bodyMedium,
    fontSize: 13,
    color: EARTH_COLORS.ink,
  },
  tocRowAccent: {
    fontFamily: EARTH_FONTS.serifItalic,
    color: EARTH_COLORS.forest,
  },
  tocRowNumber: {
    fontFamily: EARTH_FONTS.bodySemiBold,
    fontSize: 10.5,
    letterSpacing: 1.4,
    color: EARTH_COLORS.clay,
  },
  colophon: {
    paddingTop: 14,
    marginBottom: 6,
    borderTopWidth: 1,
    borderTopColor: EARTH_COLORS.hairline,
  },
  colophonBody: {
    fontFamily: EARTH_FONTS.bodyRegular,
    fontSize: 13,
    color: EARTH_COLORS.bark,
    lineHeight: 19,
  },
  prevNextRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
});

export default EarthArticle;
