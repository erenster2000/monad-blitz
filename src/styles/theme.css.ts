import { globalStyle } from '@vanilla-extract/css';

// Color definitions
export const colors = {
  monadPurple: '#836EF9',
  monadDark: '#050505',
  white: '#FFFFFF',
  whiteFaded: 'rgba(255, 255, 255, 0.5)',
  whiteFaded10: 'rgba(255, 255, 255, 0.1)',
  whiteFaded20: 'rgba(255, 255, 255, 0.2)',
  whiteFaded3: 'rgba(255, 255, 255, 0.03)',
  whiteFaded50: 'rgba(255, 255, 255, 0.5)',
  purpleFaded20: 'rgba(131, 110, 249, 0.2)',
  purpleFaded30: 'rgba(131, 110, 249, 0.3)',
  purpleFaded40: 'rgba(131, 110, 249, 0.4)',
  purpleFaded50: 'rgba(131, 110, 249, 0.5)',
  purpleFaded66: 'rgba(131, 110, 249, 0.66)',
};

export const shadows = {
  neonGlow: `0 0 15px ${colors.purpleFaded40}`,
  neonGlowStrong: `0 0 25px ${colors.purpleFaded50}`,
};

// Global styles
globalStyle('body', {
  backgroundColor: colors.monadDark,
  color: colors.white,
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  margin: 0,
  padding: 0,
  WebkitFontSmoothing: 'antialiased',
});

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle('::selection', {
  backgroundColor: `${colors.monadPurple}30`,
});

// Input wrapper hover effect for glow
globalStyle('[data-input-wrapper]:hover [data-input-glow]', {
  opacity: '0.5',
});
