import { createTheme } from '@vanilla-extract/css';
import { themeContract } from './contract.css';

// Dark theme implementation
export const darkTheme = createTheme(themeContract, {
  color: {
    brand: '#90caf9',
    white: '#fff',
    black: '#000',
    background: '#121212',
    foreground: '#e0e0e0',
    card: '#1e1e1e',
    cardForeground: '#e0e0e0',
    border: '#333333',
    input: '#1e1e1e',
    primary: {
      background: '#90caf9',
      foreground: '#121212',
    },
    secondary: {
      background: '#ce93d8',
      foreground: '#121212',
    },
    accent: {
      background: '#f48fb1',
      foreground: '#121212',
    },
    destructive: {
      background: '#f44336',
      foreground: '#f5f5f5',
    },
    muted: {
      background: '#1e1e1e',
      foreground: '#a0a0a0',
    },
    low: '#66bb6a',
    medium: '#ffb74d',
    high: '#ef5350',
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
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
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
