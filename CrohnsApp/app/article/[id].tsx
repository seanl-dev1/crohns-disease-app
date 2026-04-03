/**
 * Article detail screen — renders a single Knowledge Hub article.
 * Accessible via /article/:id
 */

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useThemeColors, spacing, sizing } from '../../src/theme';
import { knowledgeArticles } from '../../src/data/knowledgeArticles';

export default function ArticleScreen() {
  const c = useThemeColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = knowledgeArticles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <View style={[styles.container, { backgroundColor: c.background }]}>
        <View style={[styles.header, { borderBottomColor: c.divider }]}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={c.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>Article</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.notFound}>
          <Ionicons name="document-outline" size={48} color={c.textTertiary} />
          <Text style={[styles.notFoundText, { color: c.textSecondary }]}>
            Article not found
          </Text>
        </View>
      </View>
    );
  }

  // Find prev/next articles for navigation
  const currentIndex = knowledgeArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? knowledgeArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < knowledgeArticles.length - 1 ? knowledgeArticles[currentIndex + 1] : null;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.divider }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color={c.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>
          {article.title}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title block */}
        <View style={styles.titleBlock}>
          <View style={[styles.iconCircle, { backgroundColor: c.primaryLight }]}>
            <Ionicons name={article.icon as any} size={32} color={c.primary} />
          </View>
          <Text style={[styles.title, { color: c.text }]}>{article.title}</Text>
          <Text style={[styles.subtitle, { color: c.textSecondary }]}>
            {article.subtitle}
          </Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={16} color={c.textTertiary} />
            <Text style={[styles.metaText, { color: c.textTertiary }]}>
              {article.readTime} read
            </Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={[styles.disclaimerCard, { backgroundColor: c.cautionBackground, borderColor: c.caution }]}>
          <Ionicons name="information-circle" size={20} color={c.caution} />
          <Text style={[styles.disclaimerText, { color: c.text }]}>
            {article.disclaimer}
          </Text>
        </View>

        {/* Article sections */}
        {article.sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionHeading, { color: c.text }]}>
              {section.heading}
            </Text>
            <Text style={[styles.sectionBody, { color: c.textSecondary }]}>
              {section.body}
            </Text>
          </View>
        ))}

        {/* Citation */}
        <View style={[styles.citationCard, { backgroundColor: c.surface, borderColor: c.border }]}>
          <Text style={[styles.citationLabel, { color: c.textTertiary }]}>Sources</Text>
          <Text style={[styles.citationText, { color: c.textSecondary }]}>
            {article.citation}
          </Text>
        </View>

        {/* Prev / Next navigation */}
        <View style={styles.navRow}>
          {prevArticle ? (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: c.card, borderColor: c.border }]}
              onPress={() =>
                router.replace({ pathname: '/article/[id]', params: { id: prevArticle.id } })
              }
              accessibilityLabel={`Previous article: ${prevArticle.title}`}
            >
              <Ionicons name="arrow-back" size={16} color={c.primary} />
              <Text style={[styles.navLabel, { color: c.primary }]} numberOfLines={1}>
                {prevArticle.title}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.navSpacer} />
          )}
          {nextArticle ? (
            <TouchableOpacity
              style={[styles.navButton, { backgroundColor: c.card, borderColor: c.border }]}
              onPress={() =>
                router.replace({ pathname: '/article/[id]', params: { id: nextArticle.id } })
              }
              accessibilityLabel={`Next article: ${nextArticle.title}`}
            >
              <Text style={[styles.navLabel, { color: c.primary }]} numberOfLines={1}>
                {nextArticle.title}
              </Text>
              <Ionicons name="arrow-forward" size={16} color={c.primary} />
            </TouchableOpacity>
          ) : (
            <View style={styles.navSpacer} />
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 44,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: sizing.tapTarget,
    height: sizing.tapTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: sizing.fontLg,
    fontWeight: '600',
    textAlign: 'center',
  },
  headerSpacer: { width: sizing.tapTarget },
  scrollView: { flex: 1 },
  scrollContent: { padding: spacing.md },
  titleBlock: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: sizing.fontXxl,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitle: {
    fontSize: sizing.fontBase,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  metaText: {
    fontSize: sizing.fontSm,
    marginLeft: 4,
  },
  disclaimerCard: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  disclaimerText: {
    flex: 1,
    fontSize: sizing.fontSm,
    lineHeight: 20,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    fontSize: sizing.fontLg,
    fontWeight: '600',
    marginBottom: spacing.sm,
    lineHeight: 26,
  },
  sectionBody: {
    fontSize: sizing.fontBase,
    lineHeight: 24,
  },
  citationCard: {
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  citationLabel: {
    fontSize: sizing.fontXs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  citationText: {
    fontSize: sizing.fontSm,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    gap: spacing.xs,
    minHeight: sizing.tapTarget,
  },
  navLabel: {
    flex: 1,
    fontSize: sizing.fontSm,
    fontWeight: '500',
  },
  navSpacer: { flex: 1 },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: sizing.fontBase,
    marginTop: spacing.md,
  },
});
