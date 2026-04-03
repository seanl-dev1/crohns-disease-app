/**
 * Knowledge Hub — article list screen.
 * Organized by category with search.
 */

import { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useThemeColors, spacing, sizing } from '../src/theme';
import {
  knowledgeArticles,
  ARTICLE_CATEGORIES,
  type KnowledgeArticle,
} from '../src/data/knowledgeArticles';

function ArticleCard({
  article,
  themeColors: c,
}: {
  article: KnowledgeArticle;
  themeColors: any;
}) {
  return (
    <TouchableOpacity
      style={[styles.articleCard, { backgroundColor: c.card, borderColor: c.border }]}
      onPress={() => router.push({ pathname: '/article/[id]', params: { id: article.id } })}
      accessibilityLabel={`Read article: ${article.title}`}
      accessibilityRole="button"
    >
      <View style={[styles.articleIcon, { backgroundColor: c.primaryLight }]}>
        <Ionicons name={article.icon as any} size={24} color={c.primary} />
      </View>
      <View style={styles.articleContent}>
        <Text style={[styles.articleTitle, { color: c.text }]} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={[styles.articleSubtitle, { color: c.textSecondary }]} numberOfLines={2}>
          {article.subtitle}
        </Text>
        <View style={styles.articleMeta}>
          <Ionicons name="time-outline" size={14} color={c.textTertiary} />
          <Text style={[styles.readTime, { color: c.textTertiary }]}>{article.readTime}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={c.textTertiary} />
    </TouchableOpacity>
  );
}

export default function KnowledgeHubScreen() {
  const c = useThemeColors();
  const [search, setSearch] = useState('');

  const filteredArticles = useMemo(() => {
    if (!search.trim()) return null; // null = show by category
    const q = search.toLowerCase();
    return knowledgeArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q)
    );
  }, [search]);

  const categories = Object.entries(ARTICLE_CATEGORIES) as [
    keyof typeof ARTICLE_CATEGORIES,
    (typeof ARTICLE_CATEGORIES)[keyof typeof ARTICLE_CATEGORIES],
  ][];

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
        <Text style={[styles.headerTitle, { color: c.text }]}>Knowledge Hub</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: c.inputBackground, borderColor: c.inputBorder }]}>
          <Ionicons name="search" size={20} color={c.placeholder} />
          <TextInput
            style={[styles.searchInput, { color: c.text }]}
            placeholder="Search articles..."
            placeholderTextColor={c.placeholder}
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Clear search">
              <Ionicons name="close-circle" size={20} color={c.placeholder} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {filteredArticles ? (
          // Search results
          filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} themeColors={c} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={c.textTertiary} />
              <Text style={[styles.emptyText, { color: c.textSecondary }]}>
                No articles found for "{search}"
              </Text>
            </View>
          )
        ) : (
          // Category view
          categories.map(([key, cat]) => {
            const articles = knowledgeArticles.filter((a) => a.category === key);
            if (articles.length === 0) return null;
            return (
              <View key={key} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <Ionicons name={cat.icon as any} size={20} color={c.primary} />
                  <Text style={[styles.categoryTitle, { color: c.text }]}>{cat.label}</Text>
                </View>
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} themeColors={c} />
                ))}
              </View>
            );
          })
        )}
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
    fontSize: sizing.fontXl,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerSpacer: { width: sizing.tapTarget },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    height: sizing.tapTarget,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: sizing.fontBase,
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: spacing.md },
  categorySection: {
    marginTop: spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryTitle: {
    fontSize: sizing.fontLg,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    marginBottom: spacing.sm,
    minHeight: sizing.tapTargetLarge,
  },
  articleIcon: {
    width: 44,
    height: 44,
    borderRadius: sizing.radiusSmall,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleContent: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  articleTitle: {
    fontSize: sizing.fontBase,
    fontWeight: '600',
    lineHeight: 22,
  },
  articleSubtitle: {
    fontSize: sizing.fontSm,
    lineHeight: 18,
    marginTop: 2,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  readTime: {
    fontSize: sizing.fontXs,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    fontSize: sizing.fontBase,
    marginTop: spacing.md,
  },
});
