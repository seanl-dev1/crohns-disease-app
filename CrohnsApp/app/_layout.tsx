/**
 * Root layout — wraps the entire app.
 * Initializes database, auth, and handles loading state.
 */

import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_400Regular_Italic,
  PlayfairDisplay_500Medium_Italic,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_500Medium,
  CormorantGaramond_500Medium_Italic,
  CormorantGaramond_600SemiBold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  Lora_400Regular,
  Lora_400Regular_Italic,
  Lora_500Medium,
  Lora_600SemiBold,
} from '@expo-google-fonts/lora';
import {
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
} from '@expo-google-fonts/oswald';
import { getDatabase } from '../src/db/database';
import { useAppStore } from '../src/store/useAppStore';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';
import { colors } from '../src/theme/colors';
import { performSync } from '../src/services/syncService';

function RootNavigator() {
  const scheme = useColorScheme() ?? 'light';
  const theme = colors[scheme];
  const setLoading = useAppStore((s) => s.setLoading);
  const { session, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Load Heritage Apothecary fonts (also used by other serif-leaning presets).
  // expo-font handles both web (<link> injection) and native (bundled assets).
  // Load Heritage fonts but do NOT block render on them. If fonts fail or
  // take time to load, app renders with system-font fallback and re-renders
  // once fonts are ready. Blocking on useFonts() caused a blank page on web
  // when a single font import errored silently.
  const [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_400Regular_Italic,
    PlayfairDisplay_500Medium_Italic,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_500Medium,
    CormorantGaramond_500Medium_Italic,
    CormorantGaramond_600SemiBold,
    Lora_400Regular,
    Lora_400Regular_Italic,
    Lora_500Medium,
    Lora_600SemiBold,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
  });
  if (fontError) {
    // Log to console but don't block — system font fallback is fine.
    console.warn('Heritage font load error:', fontError);
  }

  useEffect(() => {
    async function init() {
      try {
        await getDatabase();
      } catch (error) {
        console.error('Failed to initialize database:', error);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const onboardingComplete = useAppStore((s) => s.user.onboardingComplete);

  // Redirect based on auth state, onboarding, + trigger sync
  useEffect(() => {
    if (authLoading) return;

    const onAuthScreen = segments[0] === 'auth';
    const onOnboarding = segments[0] === 'onboarding';

    if (!session && !onAuthScreen) {
      router.replace('/auth');
    } else if (session && onAuthScreen) {
      // Signed in — go to onboarding or dashboard
      if (!onboardingComplete) {
        router.replace('/onboarding');
      } else {
        router.replace('/');
      }
    } else if (session && !onboardingComplete && !onOnboarding) {
      router.replace('/onboarding');
    } else if (session && onboardingComplete && onOnboarding) {
      router.replace('/');
    }

    // Sync data when user is signed in
    if (session?.user?.id) {
      performSync(session.user.id).catch((err) =>
        console.warn('Background sync failed:', err)
      );
    }
  }, [session, authLoading, segments, onboardingComplete]);

  // Block render only on auth loading. Fonts are non-blocking — app will
  // paint with system-font fallback immediately and swap to Playfair/etc.
  // once they arrive.
  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" options={{ animation: 'fade' }} />
        <Stack.Screen name="onboarding" options={{ animation: 'fade', gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="scan"
          options={{
            presentation: 'fullScreenModal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="meal-plan"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="knowledge-hub"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="article/[id]"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="dietary-guide"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="theme"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
