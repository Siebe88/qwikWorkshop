import { createTheme } from '@vanilla-extract/css';
import { themeContract } from './contract.css';

// Light theme implementation
export const lightTheme = createTheme(themeContract, {
  color: {
    brand: '#1976d2',
    white: '#fff',
    black: '#000',
    background: '#f5f5f5',
    foreground: '#111',
    card: '#fff',
    cardForeground: '#111',
    border: '#e0e0e0',
    input: '#f5f5f5',
    primary: {
      background: '#1976d2',
      foreground: '#fff',
    },
    secondary: {
      background: '#9c27b0',
      foreground: '#fff',
    },
    accent: {
      background: '#f48fb1',
      foreground: '#111',
    },
    destructive: {
      background: '#f44336',
      foreground: '#fff',
    },
    muted: {
      background: '#f5f5f5',
      foreground: '#666',
    },
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  },
  space: {
    none: '0',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  fonts: {
    body: '"Roboto", "Helvetica", "Arial", sans-serif',
    heading: '"Roboto", "Helvetica", "Arial", sans-serif',
    mono: 'monospace',
  },
  lineHeights: {
    none: '1',
    tight: '1.25',
    normal: '1.5',
    loose: '2',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  borderWidths: {
    thin: '1px',
    normal: '2px',
    thick: '4px',
  },
  borderRadius: {
    none: '0',
    sm: '2px',
    md: '4px',
    lg: '8px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  zIndices: {
    beneath: '-1',
    normal: '1',
    above: '10',
    modal: '100',
    tooltip: '1000',
  },
});
