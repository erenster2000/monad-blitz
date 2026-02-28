import { style, keyframes } from '@vanilla-extract/css';
import { colors, shadows } from '../../styles/theme.css';

// Keyframes
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

// Container
export const container = style({
  minHeight: '100vh',
  backgroundColor: colors.monadDark,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  userSelect: 'none',
});

// Navigation
export const nav = style({
  position: 'absolute',
  top: 0,
  width: '100%',
  padding: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 10,
});

export const logoSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const logo = style({
  width: '2rem',
  height: '2rem',
  backgroundColor: colors.monadPurple,
  borderRadius: '0.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: shadows.neonGlow,
});

export const logoIcon = style({
  color: colors.white,
});

export const logoText = style({
  fontWeight: 'bold',
  fontSize: '1.25rem',
  letterSpacing: '-0.05em',
  color: colors.white,
});

export const navLinks = style({
  display: 'flex',
  gap: '1.5rem',
  fontSize: '0.875rem',
  fontWeight: 500,
  color: colors.whiteFaded50,
});

export const walletButton = style({
  padding: '0.375rem 1rem',
  borderRadius: '9999px',
  border: `1px solid ${colors.whiteFaded10}`,
  backgroundColor: 'transparent',
  color: colors.whiteFaded50,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
  ':hover': {
    borderColor: `${colors.monadPurple}50`,
    color: colors.white,
  },
});

export const walletButtonConnected = style({
  padding: '0.375rem 1rem',
  borderRadius: '9999px',
  border: `1px solid ${colors.monadPurple}`,
  backgroundColor: `${colors.monadPurple}20`,
  color: colors.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
  boxShadow: shadows.neonGlow,
  ':hover': {
    backgroundColor: `${colors.monadPurple}30`,
  },
});

// Main content
export const main = style({
  position: 'relative',
  zIndex: 10,
  width: '100%',
  maxWidth: '48rem',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '400px',
  justifyContent: 'center',
});

// Idle state
export const idleContent = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const title = style({
  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
  fontWeight: 'bold',
  letterSpacing: '-0.02em',
  marginBottom: '2rem',
  color: colors.white,
  lineHeight: 1.2,
});

export const highlightText = style({
  color: colors.monadPurple,
});

// Input
export const inputWrapper = style({
  width: '100%',
  position: 'relative',
});

export const inputGlow = style({
  position: 'absolute',
  top: '-0.25rem',
  left: '-0.25rem',
  right: '-0.25rem',
  bottom: '-0.25rem',
  backgroundColor: `${colors.monadPurple}20`,
  borderRadius: '1rem',
  filter: 'blur(1rem)',
  opacity: 0,
  transition: 'opacity 0.5s ease',
  pointerEvents: 'none',
});

export const inputGlowFocused = style({
  opacity: 1,
});

export const inputContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.whiteFaded3,
  border: `1px solid ${colors.whiteFaded10}`,
  borderRadius: '1rem',
  padding: '0.5rem',
  transition: 'all 0.3s ease',
});

export const inputContainerFocused = style({
  borderColor: colors.monadPurple,
  boxShadow: `0 0 0 1px ${colors.purpleFaded50}`,
});

export const inputIcon = style({
  paddingLeft: '1rem',
  color: colors.whiteFaded20,
});

export const twitterIcon = style({
  width: '1.25rem',
  height: '1.25rem',
  fill: 'currentColor',
});

export const input = style({
  flex: 1,
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  fontSize: '1.125rem',
  color: colors.white,
  fontFamily: 'inherit',
  selectors: {
    '&::placeholder': {
      color: colors.whiteFaded20,
    },
  },
});

export const analyzeButton = style({
  backgroundColor: colors.monadPurple,
  color: colors.white,
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  borderRadius: '0.75rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  border: 'none',
  boxShadow: shadows.neonGlow,
  ':hover': {
    backgroundColor: `${colors.monadPurple}e6`,
  },
  ':active': {
    transform: 'scale(0.95)',
  },
});

// Loading state
export const loadingContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const spinner = style({
  width: '5rem',
  height: '5rem',
  borderWidth: '0.25rem',
  borderStyle: 'solid',
  borderColor: colors.purpleFaded30,
  borderTopColor: colors.monadPurple,
  borderRadius: '50%',
  animation: `${spin} 1s linear infinite`,
  boxShadow: shadows.neonGlow,
});

// Result state
export const resultContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
});

export const resultTitle = style({
  fontSize: 'clamp(1.875rem, 6vw, 3.75rem)',
  fontWeight: 'bold',
  color: colors.white,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
});

export const resultImage = style({
  width: '16rem',
  height: '16rem',
  objectFit: 'contain',
});

// Footer
export const footer = style({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  color: colors.whiteFaded20,
  fontSize: '0.75rem',
  letterSpacing: '0.125em',
  textTransform: 'uppercase',
  gap: '0.25rem',
});