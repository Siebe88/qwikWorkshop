import { globalStyle } from '@vanilla-extract/css';
import { themeContract } from './theme';

// Reset and base styles
globalStyle('*', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html, body', {
  height: '100%',
  width: '100%',
  fontFamily: themeContract.fonts.body,
  fontSize: themeContract.fontSizes.base,
  lineHeight: themeContract.lineHeights.normal,
  fontWeight: themeContract.fontWeights.normal,
  color: themeContract.color.foreground,
  backgroundColor: themeContract.color.background,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('body', {
  overflowX: 'hidden',
  position: 'relative',
});

// Focus outline styles
globalStyle('button:focus-visible, a:focus-visible', {
  outline: `2px solid ${themeContract.color.brand}`,
  outlineOffset: '2px',
});

// Transitions for theme switching
globalStyle('body, body *', {
  transition: `background-color ${themeContract.transitions.normal}, color ${themeContract.transitions.normal}, border-color ${themeContract.transitions.normal}, box-shadow ${themeContract.transitions.normal}`,
});

// Performance metrics box styling
globalStyle('#performance-metrics', {
  position: 'fixed',
  bottom: themeContract.space.sm,
  right: themeContract.space.sm,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  color: themeContract.color.white,
  padding: themeContract.space.md,
  borderRadius: themeContract.borderRadius.md,
  zIndex: themeContract.zIndices.tooltip,
  fontSize: themeContract.fontSizes.sm,
  fontFamily: themeContract.fonts.mono,
});
