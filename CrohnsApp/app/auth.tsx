/**
 * Sign In / Sign Up screen
 * Simple email + password auth with Supabase.
 */

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../src/theme/colors';
import { spacing, sizing } from '../src/theme/spacing';
import { useAuth } from '../src/contexts/AuthContext';

export default function AuthScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = colors[scheme];
  const { signIn, signUp } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords don\'t match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    if (isSignUp) {
      const { error: signUpError } = await signUp(email.trim(), password);
      if (signUpError) {
        setError(signUpError);
      } else {
        setSuccessMessage('Check your email for a confirmation link!');
      }
    } else {
      const { error: signInError } = await signIn(email.trim(), password);
      if (signInError) {
        setError(signInError);
      }
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: theme.primaryLight }]}>
            <Ionicons name="shield-checkmark" size={48} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>
            CrohnsApp
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Your personal Crohn's disease companion.{'\n'}
            Sign in to sync your data across devices.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="you@example.com"
            placeholderTextColor={theme.placeholder}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
          />

          <Text style={[styles.label, { color: theme.textSecondary }]}>Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.inputBackground,
                borderColor: theme.inputBorder,
                color: theme.text,
              },
            ]}
            placeholder="At least 6 characters"
            placeholderTextColor={theme.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType={isSignUp ? 'newPassword' : 'password'}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />

          {isSignUp && (
            <>
              <Text style={[styles.label, { color: theme.textSecondary }]}>
                Confirm Password
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.inputBackground,
                    borderColor: theme.inputBorder,
                    color: theme.text,
                  },
                ]}
                placeholder="Re-enter your password"
                placeholderTextColor={theme.placeholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                textContentType="newPassword"
                autoComplete="new-password"
              />
            </>
          )}

          {error && (
            <View style={[styles.messageBanner, { backgroundColor: theme.dangerBackground }]}>
              <Ionicons name="alert-circle" size={18} color={theme.danger} />
              <Text style={[styles.messageText, { color: theme.danger }]}>{error}</Text>
            </View>
          )}

          {successMessage && (
            <View style={[styles.messageBanner, { backgroundColor: theme.safeBackground }]}>
              <Ionicons name="checkmark-circle" size={18} color={theme.safe} />
              <Text style={[styles.messageText, { color: theme.safe }]}>{successMessage}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setSuccessMessage(null);
            }}
          >
            <Text style={[styles.switchText, { color: theme.textSecondary }]}>
              {isSignUp
                ? 'Already have an account? '
                : 'Don\'t have an account? '}
              <Text style={{ color: theme.primary, fontWeight: '600' }}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy note */}
        <Text style={[styles.privacy, { color: theme.textTertiary }]}>
          Your health data is encrypted and private.{'\n'}
          We never sell or share your information.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: sizing.fontHeading,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: sizing.fontBase,
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: sizing.fontSm,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    height: sizing.tapTargetLarge,
    borderRadius: sizing.radiusMedium,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: sizing.fontBase,
  },
  messageBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: sizing.radiusMedium,
    marginTop: spacing.md,
  },
  messageText: {
    fontSize: sizing.fontSm,
    flex: 1,
  },
  button: {
    height: sizing.tapTargetLarge,
    borderRadius: sizing.radiusMedium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: sizing.fontLg,
    fontWeight: '700',
  },
  switchButton: {
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.sm,
  },
  switchText: {
    fontSize: sizing.fontSm,
  },
  privacy: {
    fontSize: sizing.fontXs,
    textAlign: 'center',
    lineHeight: 18,
  },
});
