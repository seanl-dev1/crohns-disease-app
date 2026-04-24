---
topic: mobile-ui-design-system-2026
last_reviewed: 2026-04-23
evidence_review_status: working-draft
primary_sources_checked: [Apple HIG 2025, Material 3 Expressive, Radix Colors, Tailwind v4, State of React Native 2025, Mobbin, Dribbble, published app design systems]
scope: design/engineering reference (not clinical). Does NOT follow the Tier 1 clinical sourcing rules — this is a UI/UX handbook for building the CrohnsApp front-end.
---

# Design System 2026 — Health & Wellness App

> **Purpose.** A concrete, engineering-ready design system for a React Native + Expo SDK 54 app in the Crohn's / IBD space. Every value is a copy-pasteable token, component pattern, or library pick. Real hex codes, real pt sizes, real easing curves — no vague "use modern colors."
>
> **Audience context.** Patients are frequently symptomatic at 3am, in waiting rooms, or on low-spoon days. The interface has to work under fatigue, brain fog, trembling hands, emotional weight. Warm minimalism over clinical cold. Guidance over nagging.
>
> **Stack assumed.** Expo SDK 54, React Native 0.76+, TypeScript, Expo Router, Zustand + AsyncStorage, SQLite. Current project uses plain `StyleSheet` + `src/theme/` — recommendations include incremental upgrade paths.

---

## INDEX

`## PRINCIPLE:` · `## COLOR:` · `## TYPE:` · `## SPACE:` · `## RADIUS:` · `## ELEVATION:` ·
`## PATTERN:` · `## MOTION:` · `## DARK:` · `## NAV:` · `## HEALTH:` · `## BEFORE-AFTER:` ·
`## STACK:` · `## TOP10:` · `## APPENDIX:`

---

## PRINCIPLE: design-principles-for-health-apps-2026

### PRINCIPLE: warm-minimalism
Cold `#FFFFFF` + cobalt `#0066FF` reads as "insurance portal." 2025-26 winning aesthetic for chronic illness: warm off-white backgrounds with cream/beige cast, rounded geometry, soft elevation, a single muted sage/teal accent. Think Headspace, Oura, Balance, Finch — not MyChart.

### PRINCIPLE: generous-white-space
Breathing room reduces decision fatigue. Floor values: section padding 20pt, card padding 16-20, screen gutters 20 (not the old 16 iOS default — cramped in 2026). Stacked list items ≥12pt vertical spacing.

### PRINCIPLE: card-based-composition
Everything non-full-bleed lives in a card. Default: radius 16, elevation `subtle`, padding 16-20. A screen = vertical stack of 3-6 cards, never a wall of rows.

### PRINCIPLE: serif-forward-hero-typography
Pair a warm transitional serif (Instrument Serif, Fraunces, PP Editorial New) for hero / emotional copy with a neutral geometric sans (Inter, Geist) for body. Tradeoff: serifs need leading-tuning time. Ship sans-only first, add serif for hero later.

### PRINCIPLE: subtle-spring-motion
Springs over bezier. Stiffness 180-220, damping 20-26 for cards/sheets/toggles. Entry ~300ms, exit ~180ms. Respect `AccessibilityInfo.isReduceMotionEnabled()` — swap for 150ms fade.

### PRINCIPLE: oled-dark-mode-first-class
Not inverted light mode. First-class surface hierarchy. OLED saves 30-60% battery on true-black at full brightness. Elevated surfaces get LIGHTER in dark (opposite of light mode). Ship in MVP, not later.

### PRINCIPLE: wcag-aaa-default
Text contrast ≥7:1 (WCAG AAA). Body ≥16pt. Tap targets ≥48×48dp (Material AAA) / 44×44pt (Apple floor). Non-negotiable for a patient population including older adults and users on fatigue-inducing drugs.

### PRINCIPLE: living-ui
One or two anchors breathe: primary CTA, check-in ring, meditation timer. 2.5-3s scale oscillation 1.0↔1.03, spring-based. One focal element per screen — overuse kills the effect.

---

## COLOR: token-system-2026

The palette below is **two scales in one** — a light and a dark theme that share semantic names. Color values are deliberate: warm off-whites over pure white, sage-teal brand over sterile medical blue, desaturated warning/danger over fire-engine red.

### COLOR: light-theme

```
// BACKGROUND (warm off-white beats pure #FFF — eye strain at 3am flare check-ins)
bg-canvas      #FAFAF7   bg-surface   #FFFFFF   bg-surface-alt #F4F3EE   bg-elevated #FFFFFF
bg-scrim       rgba(20,18,14,0.48)

// TEXT (warm near-black — pure #000 on off-white feels harsh)
text-primary   #14120E   text-secondary #4A4740   text-tertiary #837E74
text-disabled  #BFBAAF   text-inverse   #FAFAF7

// BORDERS
border-subtle  #EDEBE4   border-default #DDDAD0   border-strong #B8B3A5

// BRAND — sage-teal (calming, natural, non-clinical)
brand-50  #F0F7F4   -100 #D8EBE2   -200 #B3D7C4   -300 #88BFA2   -400 #5BA47F
brand-500 #3E8866 (primary)   -600 #2F6E52   -700 #255743   -800 #1E4337
brand-900 #15302A   -950 #0B1A17

// ACCENT — dusty coral (warmth, celebration)
accent-50  #FDF5F2   -100 #FAE5DC   -200 #F3C9B6   -300 #E8A185   -400 #D97C56
accent-500 #C55F33 (primary)   -600 #A84A24   -700 #87391C   -800 #682C17
accent-900 #4A2011   -950 #2A120A

// FOOD RATING — warm, non-judgmental (NOT #FF0000 — shames users; dusty rose = "heads up")
safe:    bg #E8F3EA · fg #2D6B3F · border #C3E0CB   (mint)
caution: bg #FCF4E1 · fg #8A5A0F · border #F3E1A8   (butter)
danger:  bg #FAE6E2 · fg #A0332B · border #F1C2BA   (dusty rose)

// SYSTEM (reuse food rating families) + info #E5EEF7 / #1E4E8C

// INTERACTIVE
state-hover    rgba(20,18,14,0.04)   state-pressed   rgba(20,18,14,0.08)
state-focus    #3E8866 (2pt)          state-selected  #F0F7F4 (brand-50)
shadow-color   rgba(42,36,22,0.08)   (warm umber, not pure black)
```

### COLOR: dark-theme

```
// BACKGROUND (near-black canvas, lifted-gray surfaces)
// Why not pure #000? Scrollbar + status bar feel bottomless. #0A0A09 gives elevation cues.
bg-canvas  #0A0A09   bg-surface #15140F   bg-surface-alt #1C1A14   bg-elevated #22201A
bg-scrim   rgba(0,0,0,0.72)

// TEXT (warm off-white — pure #FFF vibrates on OLED)
text-primary   #F4F1EA (13.5:1 AAA)   text-secondary #BFB8A8 (8.8:1 AAA)
text-tertiary  #827B6C (5.3:1 AA borderline)   text-disabled #5A544A   text-inverse #14120E

// BORDERS
border-subtle  #22201A   border-default #2E2B23   border-strong  #4A4538

// BRAND (sage-teal lifts ~2 steps brighter)
brand-50  #0B1A17   -100 #15302A   -200 #1E4337   -300 #255743   -400 #2F6E52
brand-500 #5BA47F (primary)   -600 #88BFA2   -700 #B3D7C4   -800 #D8EBE2
brand-900 #F0F7F4   -950 #FFFFFF

accent-500 #E89878   (lifted from #C55F33)

// FOOD RATING (dark mode)
safe:    bg #16291C · fg #88BFA2 · border #1E4337
caution: bg #2E2514 · fg #E6C678 · border #4A3C20
danger:  bg #2E1814 · fg #E8A8A0 · border #4A2620

// SHADOWS don't work in dark mode (invisible). Use surface lightness instead.
shadow-color rgba(0,0,0,0.3)   // only for modal scrims
```

### COLOR: usage-rules

```
brand-500   primary interactive — buttons, active tab, links, focus rings. ANCHOR color.
accent-500  "pop" — 1 per screen max. Streak counter, celebration, empty-state CTA.
            NEVER two accent-500 elements competing for attention.
text on color: --text-inverse (#FAFAF7) on brand-500 / accent-500 bg. 5.8:1 — AA.
               semantic bg/fg pairs match: safe-bg ↔ safe-fg, never mixed across semantics.
borders: subtle=list dividers only · default=inputs+outlined cards · strong=focus/emphasis
         Most cards: NO border. Use elevation + surface contrast instead.
```

---

## TYPE: typography-scale-2026

### TYPE: font-family-recommendation

```
PRIMARY:   Inter                   @expo-google-fonts/inter — 9 weights + variable, large x-height,
                                   renders at 11pt, zero tuning. Ubiquitous (feels "default").
HERO:      Instrument Serif        @expo-google-fonts/instrument-serif — warm editorial serif, ≥24pt.
                                   Alt: system SF Pro Display (iOS — bulletproof).
MONOSPACE: JetBrains / Geist Mono  only for precise numbers (doses, labs). Inline: Inter with
                                   fontVariant ['tabular-nums'].

DO NOT USE: Satoshi (66% x-height too short) · Poppins (geometric, dated) · Helvetica/Arial (no variable)
```

**Tradeoff.** Inter-only = 90% of the result for 20% of the work. Serif adds 1-2 days of tuning. Ship Inter first; add Instrument Serif later for Dashboard hero + onboarding.

### TYPE: scale

```
// name | size | leading | tracking | weight | usage
hero-display 34 / 38 / -0.5 / 700   dashboard greeting, onboarding titles
hero         28 / 34 / -0.4 / 700   modal screen titles, empty states
title        22 / 28 / -0.3 / 600   card titles, section titles
heading      18 / 24 / -0.2 / 600   list section headers
body-lg      17 / 24 /  0   / 400   primary body (iOS default)
body         16 / 22 /  0   / 400   FLOOR — never smaller for prose
body-em      16 / 22 /  0   / 500   emphasized inline
caption      14 / 20 /  0   / 400   metadata, helper text
caption-em   14 / 20 /  0.2 / 600   section labels (uppercase optional)
micro        12 / 16 /  0.1 / 500   badges, pills — never reading content
```

### TYPE: weight + dynamic-type

```
WEIGHT USAGE
  400 regular  — all body text, default
  500 medium   — emphasized body, selected tab labels
  600 semibold — all titles and headings, button labels
  700 bold     — hero/display only, NEVER inside paragraphs

DYNAMIC TYPE
  allowFontScaling: true on all Text (default) — don't disable except icon-as-text / badges
  maxFontSizeMultiplier: 1.6 on body+ — beyond 1.6× layouts fracture
  icon + text: wrap in flex, reflow vertically at scale > 1.3
```

---

## SPACE: 4pt-grid-tokens

Every value is a multiple of 4. No arbitrary 13/17/22 — single most abused rule in dated apps.

```
SCALE    0 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80

SEMANTIC
  padding-screen    20    (edge gutter)     padding-card        20   (card internal)
  padding-card-sm   16    (dense rows)      padding-input v/h   14/16
  padding-button    14/20 (yields 48pt tap) gap-between-cards    12
  gap-sections      32                      gap-inline / -lg      8 / 12
  tap-target-min    48   (every interactive ≥48×48)

// ✅ paddingHorizontal: tokens.padding.screen, gap: tokens.space[3]
// ❌ paddingHorizontal: 17, marginBottom: 13
```

---

## RADIUS: corner-radius-scale

```
xs 4        chip, tag edge
sm 8        badges, small pills
md 12       buttons, inputs (NOT 8 — dated in 2026)
lg 16       cards — DEFAULT
xl 20       hero cards, onboarding illustrations
2xl 24      bottom sheets (top corners only)
full 9999   pill buttons, circular avatars, FAB, floating tab bar

USAGE
  inputs 12 · buttons 12 · cards 16 · sheet-top 24 · modal container 20
  image thumbnails 12 · avatars 9999 · floating tab 9999
  buttons pill 9999 — only for onboarding / marketing hero CTAs
```

**iOS squircle.** SwiftUI uses continuous corners; RN defaults to circular (slightly sharper). Accept the tiny difference or overlay with react-native-skia — usually not worth the complexity.

---

## ELEVATION: shadow-tokens

Modern elevation is soft, warm, low-contrast. Harsh `#000` at 0.25 opacity = 2017 Material. Warm umber `#2A2416` tint replaces pure black.

```
// iOS — shadowColor #2A2416 for all levels
subtle   opacity 0.04, radius 6,  offsetY  2    cards
raised   opacity 0.06, radius 12, offsetY  4    hero cards
floating opacity 0.08, radius 20, offsetY  8    tab bar, toast, FAB
modal    opacity 0.12, radius 32, offsetY 16    bottom sheet

// Android — elevation prop: subtle 1 · raised 4 · floating 8 · modal 16

// DARK MODE — shadows don't render. Use lighter surface values:
//   subtle→surface #15140F · raised→surface-alt #1C1A14 · floating→elevated #22201A · modal→#2A281F
```

---

## PATTERN: buttons

```tsx
// Shared: padding 14×20, radius 12, minHeight 48, text 17pt 600, tracking -0.2

PRIMARY (brand fill)    bg pressed ? brand[600] : brand[500]; text inverse
SECONDARY (outline)     bg pressed ? brand[50] : transparent; border 1.5 brand[500]; text brand[500]
TERTIARY (text-only)    padding 12×16; opacity pressed ? 0.6 : 1; text secondary 500 16pt
DESTRUCTIVE             secondary geometry, border + text = danger.fg

STATES
  disabled:  bg brand-200, text inverse @ 0.6 opacity, no press state
  loading:   <ActivityIndicator color=inverse size="small" />, keep height stable
  press:     Haptics.selectionAsync() on pressIn
  success:   Haptics.notificationAsync(Success) AFTER action completes
  pill:      radius 9999 — onboarding hero CTA only
```

---

## PATTERN: input-field

**2026 consensus: persistent label ABOVE input, not floating.** Floating labels are peak 2019 — they add animation complexity, fail screen readers, and obscure the label once filled.

```tsx
<View style={{ gap: 6 }}>
  <Text style={{ fontSize: 14, fontWeight: 600, letterSpacing: 0.2,
                 color: tokens.text.secondary }}>Medication name</Text>
  <TextInput
    style={{
      backgroundColor: tokens.bg.surface,
      borderWidth: 1, borderColor: focused ? tokens.brand[500] : tokens.border.default,
      borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16,
      fontSize: 17,  // 17 on iOS prevents zoom-on-focus
      color: tokens.text.primary, minHeight: 48,
    }}
    placeholder="e.g. Humira" placeholderTextColor={tokens.text.tertiary}
  />
  {helper && <Text style={{ fontSize: 13,
    color: error ? tokens.danger.fg : tokens.text.tertiary }}>{error || helper}</Text>}
</View>

// STATES
- focused:  border brand-500, width 1.5
- error:    border danger.border, helper danger.fg
- disabled: bg surface-alt, text disabled
- filled:   border default (no color change)
```

---

## PATTERN: card-standard

```tsx
<View style={{
  backgroundColor: tokens.bg.surface, borderRadius: 16, padding: 20,
  gap: 12,  // vertical rhythm inside card
  ...tokens.elevation.subtle,
}}>
  <Text style={tokens.type.title}>Today's plan</Text>
  <Text style={{...tokens.type.body, color: tokens.text.secondary}}>
    3 meals • 2L water target • 1 medication</Text>
</View>
```

- **interactive card:** whole card = Pressable, scale 0.98 spring on press, `Haptics.selectionAsync()`.
- **leading-icon card:** 40×40 circle container, bg tinted from semantic (e.g. brand-50 for info, safe-bg for safe). Layout: `[○] Title / subtitle ... >` with 12pt gap.

---

## PATTERN: list-item-standard

```tsx
<Pressable style={({pressed}) => ({
  flexDirection: 'row', alignItems: 'center', gap: 12,
  paddingVertical: 12, paddingHorizontal: 20, minHeight: 56,
  backgroundColor: pressed ? tokens.state.pressed : 'transparent',
})}>
  {/* leading: 40×40 radius-12 tinted icon container */}
  <View style={{ width: 40, height: 40, borderRadius: 12,
                 backgroundColor: tokens.brand[50],
                 alignItems: 'center', justifyContent: 'center' }}>
    <PillIcon size={20} color={tokens.brand[500]} />
  </View>
  {/* main: title + subtitle, gap 2 */}
  <View style={{ flex: 1, gap: 2 }}>
    <Text style={tokens.type.body}>Humira</Text>
    <Text style={{...tokens.type.caption, color: tokens.text.tertiary}}>
      40mg subcutaneous • every 2 weeks</Text>
  </View>
  {/* trailing: chevron, badge, or toggle */}
  <ChevronRight size={20} color={tokens.text.tertiary} />
</Pressable>

// divider: height 1, bg border-subtle, marginLeft 72 (= 20 pad + 40 icon + 12 gap)
// aligns divider with main text column — critical detail
```

---

## PATTERN: bottom-sheet

Use `@gorhom/bottom-sheet` v5. Stock `Modal` is for full-screen takeovers; sheets are for action menus, pickers, contextual detail.

```tsx
<BottomSheetModal ref={sheetRef} snapPoints={['40%','85%']}
  enableDynamicSizing={false}
  backgroundStyle={{ backgroundColor: tokens.bg.elevated,
                     borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
  handleIndicatorStyle={{ backgroundColor: tokens.border.strong,
                          width: 40, height: 4 }}
  backdropComponent={renderBackdrop}>
  <BottomSheetView style={{ padding: 20 }}>{/* content */}</BottomSheetView>
</BottomSheetModal>
```

- **40%** — action menu, quick picker
- **85%** — detail with long content
- **100%** — use a regular modal/screen, not a sheet
- always include grabber (4×40 rounded) + scrim backdrop rgba(0,0,0,0.48)

---

## PATTERN: tab-bar

**2026 consensus: floating pill tab bar.** iOS 26 Liquid Glass introduced system-wide floating tabs — match it on Android too for cross-platform consistency.

```tsx
<View style={{
  position: 'absolute', bottom: insets.bottom + 8, left: 20, right: 20,
  height: 64, backgroundColor: tokens.bg.elevated, borderRadius: 9999,
  flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
  paddingHorizontal: 8, ...tokens.elevation.floating,
}}>
  {tabs.map(tab => (
    <Pressable key={tab.id} style={{ flex: 1, minHeight: 48,
      alignItems: 'center', justifyContent: 'center', gap: 2 }}>
      <Icon variant={active ? 'filled' : 'outline'} size={24}
            color={active ? tokens.brand[500] : tokens.text.tertiary} />
      <Text style={{ fontSize: 11, fontWeight: active ? 600 : 500,
        color: active ? tokens.brand[500] : tokens.text.tertiary }}>{tab.label}</Text>
    </Pressable>
  ))}
</View>
```

- active: filled icon + brand-500. inactive: outline + text-tertiary.
- NEVER rely on color alone — always pair with filled/outline weight (accessibility).
- labels always visible (HIG 2025 explicit rule).
- 3-5 tabs. 4 is ideal for chronic illness apps.

---

## PATTERN: empty-state

```tsx
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',
               paddingHorizontal: 40, gap: 16 }}>
  <EmptyPlateIllustration width={160} height={160} />  {/* semi-abstract, ≤180pt */}
  <Text style={{...tokens.type.title, textAlign: 'center'}}>No meals logged yet</Text>
  <Text style={{...tokens.type.body, color: tokens.text.secondary,
                textAlign: 'center', maxWidth: 280 }}>
    Scan a food or log a meal to start seeing patterns in what feels good.
  </Text>
  <PrimaryButton>Scan first food</PrimaryButton>
  <TertiaryButton>Learn how it works</TertiaryButton>
</View>
```

- NEVER "You haven't logged any X" — shames. Say "No X yet. Let's start."
- Max 2 CTAs: primary (positive) + tertiary (learn / skip).
- Illustration optional but high-ROI — use Lottie for subtle motion.

---

## PATTERN: toast-notification

Avoid stock `Alert.alert`. Use `react-native-toast-message`, `burnt`, or custom.

```tsx
// top-anchored, with 4pt semantic-color left border stripe
<Animated.View style={[{
  position: 'absolute', top: insets.top + 8, left: 20, right: 20,
  backgroundColor: tokens.bg.surface, borderRadius: 12, padding: 16,
  flexDirection: 'row', alignItems: 'center', gap: 12,
  borderLeftWidth: 4, borderLeftColor: semanticColor,
  ...tokens.elevation.floating,
}, animatedStyle]}>
  <Icon size={20} color={semanticColor} />
  <View style={{ flex: 1 }}>
    <Text style={{...tokens.type.body, fontWeight: 600}}>{title}</Text>
    <Text style={{...tokens.type.caption, color: tokens.text.secondary}}>{msg}</Text>
  </View>
</Animated.View>

// enter: translateY -20→0, opacity 0→1, spring stiffness 220
// dwell: 3500ms (5500ms for error)
// exit:  translateY 0→-20, opacity 1→0, timing 200ms
```

---

## PATTERN: food-rating-pill

Traffic-light red/yellow/green feels like judgment. 2026 tasteful version:

```tsx
const config = {
  safe:    { bg: tokens.safe.bg,    fg: tokens.safe.fg,    icon: 'Check',       label: 'Usually fine' },
  caution: { bg: tokens.caution.bg, fg: tokens.caution.fg, icon: 'AlertCircle', label: 'Watch for triggers' },
  danger:  { bg: tokens.danger.bg,  fg: tokens.danger.fg,  icon: 'XCircle',     label: 'Often a trigger' },
}[rating];

<View style={{ flexDirection: 'row', alignItems: 'center', gap: 6,
               backgroundColor: config.bg, paddingHorizontal: 10, paddingVertical: 6,
               borderRadius: 9999, alignSelf: 'flex-start' }}>
  <Icon name={config.icon} size={14} color={config.fg} />
  <Text style={{...tokens.type.caption, fontWeight: 600, color: config.fg}}>
    {config.label}</Text>
</View>
```

### IBD-specific rules
- Hedged language. NEVER "safe" / "avoid" — always "usually fine" / "often a trigger".
- Include rationale one tap away: "Why? (lactose, raw brassica)".
- Prefer user's own history over generic rating — 5 positive meals with dairy → don't flag dairy.
- Never a pill without rationale reachable in 1 tap.

---

## PATTERN: progress-indicators

**Linear:** 6pt tall track in `bg.surface-alt`, radius 9999. Fill with `brand[500]`, animated width.

**Ring (hero):** `react-native-svg` + animated circle with `strokeDashoffset`. 72pt outer, 60pt inner (6pt stroke), 10pt gap if segmented. Primary visualization for daily completion on dashboards.

**Skeleton:** `moti/skeleton` — `<Skeleton colorMode={isDark ? 'dark' : 'light'} radius={12} height={80} />`. Shimmer 1200ms ease-in-out, opacity 0.4→0.8.

- Skeleton over spinner for loads >200ms.
- Mirror actual content structure (title bar + 2 line bars + trailing).
- Honor prefers-reduced-motion — swap shimmer for static 0.5 opacity.

---

## PATTERN: hero-dashboard-section

```tsx
<View style={{ paddingHorizontal: 20, paddingTop: insets.top + 16,
               paddingBottom: 24, gap: 24 }}>
  {/* 1. date micro — uppercase, tertiary */}
  <Text style={{...tokens.type.caption, fontWeight: 600, letterSpacing: 0.4,
                color: tokens.text.tertiary, textTransform: 'uppercase'}}>
    Thursday, April 23</Text>

  {/* 2. hero greeting — SERIF if available, else Inter 700 */}
  <Text style={{ fontFamily: 'InstrumentSerif-Regular',
                 fontSize: 34, lineHeight: 40, letterSpacing: -0.8 }}>
    Good morning, Sean.{'\n'}
    <Text style={{color: tokens.text.secondary}}>How are you feeling today?</Text>
  </Text>

  {/* 3. feeling picker — 5 options, tap to log */}
  <FeelingPicker />
</View>
```

- Greeting personal, uses name, shifts by time-of-day.
- Invites check-in, never commands ("how are you feeling" not "log symptoms").
- 5-option picker (never 1-10 slider — too much load during flare).
- NO streak counter / reminder in hero. That's pressure. Push it to a secondary card.

---

## MOTION: animation-language-2026

```
DURATION   instant 80 · fast 160 · base 240 · slow 360 · breath 2800 (ms)
           (icon · exit · enter default · hero · ambient living elements)

SPRING     default {stiff 200, damp 22, mass 1}    — most interactions
           gentle  {stiff 140, damp 20, mass 1}    — sheets, modals
           snappy  {stiff 280, damp 24, mass 0.9}  — micro-interactions
           bouncy  {stiff 220, damp 16, mass 1}    — celebration (rare)

EASING     (opacity fades only — prefer springs everywhere else)
           ease-out  cubic-bezier(0.16, 1, 0.3, 1)
           ease-in   cubic-bezier(0.7, 0, 0.84, 0)
```

### MOTION: entry-exit-patterns

```
screen (iOS):     push from right, 350ms ease-out, native driver
screen (Android): fade + slide up 8pt, 300ms ease-out
card appear:      opacity 0→1, translateY 8→0, spring-default
card dismiss:     opacity 1→0, translateY 0→-8, timing-fast ease-in
modal / sheet:    translateY 100%→0, spring-gentle; backdrop fade 0→0.48 timing-base
list stagger:     40ms between items, each 300ms spring-default, cap at 6 items
button press:     scale 1→0.98 in, back to 1 out, both spring-snappy
```

### MOTION: reanimated-snippets

```tsx
// PRESS ANIMATION — wrap every button
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const scale = useSharedValue(1);
const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
const cfg = { stiffness: 280, damping: 24 };
<AnimatedPressable
  onPressIn ={() => { scale.value = withSpring(0.98, cfg); }}
  onPressOut={() => { scale.value = withSpring(1,    cfg); }}
  style={[buttonStyle, style]} />

// BREATHING CTA — "living" effect on primary action / check-in ring
useEffect(() => {
  scale.value = withRepeat(
    withTiming(1.03, { duration: 1400, easing: Easing.inOut(Easing.sin) }),
    -1, true  // infinite, reversing
  );
}, []);
// PAUSE when: action done / reduce-motion on / screen unfocused
```

### MOTION: haptics-mapping

```
selectionAsync              button press-in, tab switch, chip pick, picker change
impactAsync(Light)          toggle on, open sheet, drag-snap
impactAsync(Medium)         drop into category, confirm delete
impactAsync(Heavy)          milestone (30-day streak) — RARE only
notificationAsync(Success)  symptom/meal logged, scan GREEN
notificationAsync(Warning)  scan YELLOW, recoverable validation error
notificationAsync(Error)    scan RED (user-test — may feel punitive), fatal form error
```

### MOTION: reduce-motion-respect

```tsx
const [rm, setRm] = useState(false);
useEffect(() => {
  AccessibilityInfo.isReduceMotionEnabled().then(setRm);
  const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setRm);
  return () => sub.remove();
}, []);
// when rm: springs → 150ms opacity fades, disable breathing/stagger/parallax.
// HAPTICS REMAIN ON (they aren't motion).
```

---

## DARK: dark-mode-specifics

```
WHICH BLACK
  #0A0A09  warm near-black — DEFAULT canvas. ~85% of OLED savings, avoids void feel
  #000000  true black      — media playback, meditation timer, optional toggle
  #121212  Material default — LCD-only Android (no OLED savings anyway)

ELEVATION VIA LUMINANCE (not shadow — shadows don't render on dark)
  canvas #0A0A09 → surface #15140F → surface-alt #1C1A14 → elevated #22201A → modal-top #2A281F
  each step ~4-6% lighter; tiny shifts read as depth on OLED

TEXT & IMAGERY
  text-primary   #F4F1EA (13.5:1 AAA)  — NEVER pure #FFF, it vibrates
  text-secondary #BFB8A8 (8.8:1 AAA)   text-tertiary #827B6C (5.3:1 AA)
  brand/accent lift ~2 steps: brand-500 #3E8866 → #5BA47F
  icons:         use semantic tokens (adapts automatically)
  photos:        DO NOT invert. Add 12% dark overlay instead.
  illustrations: provide dark variant (white → #F4F1EA, brand → dark-mode brand)
```

---

## NAV: navigation-patterns

```
TAB BAR STYLE (2026)
  iOS 26+:   Floating pill (Liquid Glass)     ← CrohnsApp target
  iOS ≤25:   Anchored bar, translucent blur
  Android:   Floating pill OR Material 3 Expressive nav bar
  RECOMMEND: Floating pill everywhere — simplest + most modern

SCREEN HEADERS
  default: large title collapses on scroll. Expo Router { headerLargeTitle: true }.
  modal:   left "Cancel" (text, clearer than X) / center semibold 17pt title /
           right primary action (brand-500, disabled until valid)
  collapse: 34pt at top → 17pt after 30pt scroll, subtitle persists through collapse

BACK BUTTON
  iOS:     chevron + "Back" text (stock)
  Android: chevron only (stock Material)
  custom:  chevron inside 32×32 radius-8 surface-alt button — better tap target, not loud
```

---

## HEALTH: app-specific-patterns

### HEALTH: streak-visualization

**Drop the shame.** Calendar dot grid without hard penalties.

```tsx
// 7-day horizontal strip, today centered. Letter above, dot below.
<View style={{ alignItems: 'center', gap: 4 }}>
  <Text style={{...tokens.type.micro, color: tokens.text.tertiary}}>{day.letter}</Text>
  <View style={{
    width: 28, height: 28, borderRadius: 9999,
    backgroundColor: day.logged ? tokens.brand[500]
                   : day.isToday ? 'transparent'
                   : tokens.bg.surface-alt,
    borderWidth: day.isToday ? 2 : 0, borderColor: tokens.brand[500],
  }} />
</View>
```

- NEVER "You broke your streak." → "Back to it when you're ready."
- Celebrate minor wins ("3 days in a row") — don't gate at 7/30/365.
- Offer opt-in "rest days" — planned skips don't penalize.
- No fire emoji, flame, or countdown timer.

### HEALTH: symptom-severity-scale

```
A. 5-point visual (DEFAULT for Crohn's)
   [much worse]·[worse]·[same]·[better]·[much better]
   color: danger → caution → neutral → safe → brand
   size: 14 → 20 → 14 (weighted toward "same")
B. 1-10 slider — power-user mode ONLY. High cognitive load during flare.
C. Words over numbers: [tired][crampy][foggy][ok][clear][strong] multi-select
   Better ethnographic data than a scale.
```

### HEALTH: body-anatomy-selector

```
RECOMMENDED FOR MVP: chip row
  [abdomen] [lower-right] [rectal] [joint] [skin]  — users pick 1-3
FULL SILHOUETTE: SVG with tap regions, selected = brand-200 fill + brand-500 outline.
  Max 20 regions. Reference: Oura sleep-zone breakdown, Apple Health symptom map.
```

### HEALTH: empty-log-state-language

```
NEVER                              INSTEAD
"You missed 3 days"                "Welcome back."
"Last entry was 5 days ago"        "What's on your mind today?"
"Don't lose your streak!"          "Ready whenever you are."
```

### HEALTH: daily-check-in-ring

```
Central 140pt outer / 14pt stroke ring on dashboard.
Segments: meals 40% · symptoms 20% · meds 20% · hydration 20%
Fills brand-500 as user completes. Rest state breathes (see MOTION: breathing-cta).

Celebration (100%): flash accent-500 for 600ms, single pulse, settle to filled brand.
  Haptic: notificationAsync(Success). Small label "Rest well tonight" under ring.
  NEVER: confetti, fireworks, trophy icon. Too loud for health context.
```

---

## BEFORE-AFTER: modernization-examples

### BEFORE-AFTER: 1-primary-button

```
BEFORE (2019):  gradient #0066FF→#0099FF, 12×24 padding, radius 6,
                "TAP TO CONTINUE" uppercase 12pt tracking 2, shadow 0 2px 4 rgba(0,0,0,.2)
AFTER (2026):   solid #3E8866, 14×20, radius 12 (or 9999 pill),
                "Continue" sentence case 17pt weight 600,
                shadow 0 2px 6 rgba(42,36,22,.04), press scale 0.98 spring + haptic
```

### BEFORE-AFTER: 2-card

```
BEFORE:  bg #FFF, 1px #DDD border, radius 8, padding 12,
         sharp shadow 0 4px 12 rgba(0,0,0,.15), title 18pt 700 #333, subtitle 14pt #999
AFTER:   bg #FFF on canvas #FAFAF7, NO border (elevation does the work), radius 16,
         padding 20, warm shadow 0 2px 6 rgba(42,36,22,.04),
         title 22pt 600 #14120E, subtitle 16pt 400 #4A4740, 8pt gap between
```

### BEFORE-AFTER: 3-food-rating-badge

```
BEFORE:  red #FF0000 bg, white "DANGER" 16pt BOLD UPPERCASE, square corners
AFTER:   dusty rose #FAE6E2 bg, oxblood #A0332B "Often a trigger" 13pt semibold
         sentence case, pill radius 9999, leading XCircle icon 14pt,
         tap → expands rationale card below
```

### BEFORE-AFTER: 4-empty-state

```
BEFORE:  centered "No data yet", gray icon, small "Add" button bottom
AFTER:   160pt semi-abstract Lottie illustration, title 22pt 600 "No meals logged yet",
         subcopy 16pt secondary max-width 280 "Scan a food to start seeing patterns...",
         primary CTA "Scan first food" + tertiary "Learn how it works"
```

### BEFORE-AFTER: 5-onboarding

```
BEFORE:  5-slide slider with static images, "Next" arrow bottom right,
         progress dots at top, "3/5" page counter
AFTER:   full-screen warm illustration top 60%, SERIF question below
         ("How long have you been managing Crohn's?"), 4 large chip answers
         [Newly diagnosed][1-3 years][3+ years][Decades], tap→spring transition,
         thin progress bar bottom (NOT dots), small "skip" top-right (respects choice)
```

---

## STACK: react-native-expo-library-picks-2026

### STACK: styling

```
RECOMMENDED:  NativeWind v4     — Tailwind utilities in RN, lowest-friction upgrade from StyleSheet
RISING:       Unistyles 3       — compiler-driven, great perf, big design systems
AMBITIOUS:    Tamagui           — RN+Web single codebase, higher setup cost
STAY-ONGOING: StyleSheet.create — current CrohnsApp; fine if you extract tokens. Biggest win isn't
                                  switching libraries — it's adopting consistent design tokens.
```

### STACK: animation & icons

```
ANIMATION
  react-native-reanimated 4 (or 3) — industry standard, UI-thread perf. gestures, scroll-driven, transitions.
  moti                             — declarative wrapper on Reanimated. enter/exit, skeletons, simple stuff.
  lottie-react-native              — illustrated micro-animations (empty states, celebrations). ≤50KB per file.

ICONS
  RECOMMENDED: Lucide (lucide-react-native) — 1500+ icons, 1.5px stroke, tree-shakeable, filled+outline
  ALTERNATIVE: Phosphor Icons — 6 weight variants for stronger visual hierarchy
  AVOID: react-native-vector-icons (older, poor tree-shake), ionicons (dated)
```

### STACK: rest-of-toolkit

```
bottom-sheet: @gorhom/bottom-sheet v5     — MANDATORY. wrap root in <GestureHandlerRootView>.
gesture:      react-native-gesture-handler 2.x — required by Reanimated + Gorhom
fonts:        @expo-google-fonts/inter, instrument-serif — useFonts hook gates render
forms:        react-hook-form + zod
dates:        date-fns                    — tree-shakes better than moment/dayjs
charts:       victory-native OR react-native-skia (more control)
SVG:          react-native-svg            — needed for progress rings, body map
async:        @tanstack/react-query       — when Cloudflare back-end lands
toast:        react-native-toast-message OR burnt (native iOS feel)
haptics:      expo-haptics                — already in Expo
skeleton:     moti/skeleton
images:       expo-image                  — NOT react-native-fast-image
```

---

## TOP10: modernization-wins-prioritized

> If you can only do 10 things to modernize the CrohnsApp UI, do these. Ordered by impact-to-effort.

```
 1. Design tokens in src/theme/ (colors, spacing, type, radius, elevation)      [1 day]
    START HERE. Kills magic-number drift. Everything else builds on this.

 2. Swap #FFF → warm #FAFAF7 canvas + warm near-black #14120E text              [2 hrs]
    Single-file change. Instant "warm minimalism" upgrade.

 3. Card radius 8/12 → 16; screen padding 16 → 20                                [2 hrs]
    The cramped 2019 look vanishes with 4 extra pixels.

 4. expo-haptics + selectionAsync on every button press-in                       [2 hrs]
    Tactile feedback ≈ 2× perceived quality. useHaptic() hook abstraction.

 5. Reanimated scale 0.98 press animation as shared <AnimatedPressable>          [3 hrs]
    Universal pattern across all pressables.

 6. Replace ad-hoc fontSize with a proper type scale (tokens.type.body etc)      [4-6 hrs]
    Audit every <Text>, normalize to body/caption/title/heading.

 7. Rebuild food rating pill: warm semantic colors + hedged language             [3 hrs]
    "Usually fine / Watch for triggers / Often a trigger" — not Safe/Warn/Danger.
    Most important visual change for IBD patient experience.

 8. Shared BottomSheet component on @gorhom/bottom-sheet v5                       [1 day]
    Replace Alert.alert and full-screen Modal for contextual actions.

 9. Dark mode with luminance hierarchy (NOT inverted colors)                     [1-2 days]
    4 surface levels. Lift brand-500 2 steps. Text #F4F1EA. OLED power-friendly.

10. Floating pill tab bar (iOS 26 Liquid Glass feel, cross-platform)             [½ day]
    Filled-on-active icons. Huge modernization hit for the effort.
```

---

## APPENDIX: CrohnsApp-project-mapping

```
CURRENT (CrohnsApp/src/theme/colors.ts)       PROPOSED
  safe    '#4CAF50' (saturated green)      →  fg '#2D6B3F' on bg '#E8F3EA'
  caution '#FFC107' (alarm yellow)         →  fg '#8A5A0F' on bg '#FCF4E1'
  danger  '#F44336' (hot, shaming)         →  fg '#A0332B' on bg '#FAE6E2'

SCREENS MOST IMPACTED
  app/(tabs)/index.tsx     dashboard, hero treatment
  app/(tabs)/food.tsx      list items, rating pills
  app/scan.tsx             scan result rating card
  app/(tabs)/symptoms.tsx  severity picker, calendar strip
  app/(tabs)/meds.tsx      list item pattern
  app/_layout.tsx          floating tab bar rebuild

SUGGESTED SEQUENCE
  Week 1:  TOP10 #1-3   (tokens + warm colors + spacing/radius)
  Week 2:  TOP10 #4-6   (haptics + press anim + type scale)
  Week 3:  TOP10 #7-8   (food rating rebuild + shared BottomSheet)
  Week 4:  TOP10 #9-10  (dark mode + floating tab bar)
```

---

## SOURCES

Primary references (April 2026):
- Apple HIG 2025, iOS 26 Liquid Glass — `developer.apple.com/design/human-interface-guidelines`
- Material Design 3 Expressive (May 2025) — `m3.material.io`, Android Developers Blog
- Radix Colors 12-step system — `radix-ui.com/colors`
- Tailwind CSS v4 (Jan 2025) — `tailwindcss.com`
- State of React Native 2025 — `results.stateofreactnative.com`
- Mobbin UI library — Headspace, Calm, Oura, Finch, Zero, Flo, Bearable captures
- @gorhom/bottom-sheet v5 — `gorhom.dev/react-native-bottom-sheet`
- Expo SDK 54 docs (expo-haptics, expo-font, expo-image)
- Lucide React Native — `lucide.dev`; Phosphor Icons — `phosphoricons.com`
- WCAG 2.2 SC 2.5.5 / 2.5.8 (target size)
- Reanimated 4 — `docs.swmansion.com/react-native-reanimated`; Moti — `moti.fyi`
- NativeWind v4 / Unistyles 3 / Tamagui benchmarks (independent benchmarks repo)
- Instrument Serif, Inter, Geist — Google Fonts / Vercel Geist repo
- OLED power research — Google display measurements, Samsung 2025 OLED specs

**Status.** `working-draft` per METHODOLOGY.md — this is a design/engineering reference, not clinical content. No PubMed tier required. Revisit quarterly; mobile design shifts fast.
